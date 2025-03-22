import { getCurrentUser } from "@/services/auth.service";

export default async function Profile() {
  const user = await getCurrentUser();
  console.log(user);
  return <div>Profile</div>;
}
