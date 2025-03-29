import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // * step 1: configure cloudinary
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    // * step 2: get the file from the request
    const formData = await req.formData();
    const file = formData.get("file");

    // * step 3: validate the file
    if (!file) {
      return NextResponse.json(
        { success: false, message: "Please provide a file" },
        { status: 400 }
      );
    }

    // * step 4: Cast the file to File
    const fileStream = file as File;

    // * step 5: Upload the file using a promise that resolves in the Cloudinary callback
    const uploadResponse = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "rental_house",
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary error:", error);
            return reject(error);
          }
          return resolve(result);
        }
      );

      // Pipe the file stream to the upload stream
      fileStream.stream().pipeTo(
        new WritableStream({
          write(chunk) {
            uploadStream.write(chunk);
          },
          close() {
            uploadStream.end();
          },
          abort(err) {
            reject(err);
          },
        })
      );
    });

    // * step 6: Return the response
    return NextResponse.json(
      {
        success: true,
        message: "File uploaded successfully",
        uploadedFile: uploadResponse,
      },
      { status: 200 }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Something went wrong",
        errorDetails: error,
      },
      { status: 500 }
    );
  }
}
