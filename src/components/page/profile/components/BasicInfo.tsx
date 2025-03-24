import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IUser } from "@/interface/auth.interface";

export default function BasicInfo({ user }: { user: IUser }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome, {user.name}!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
      </CardContent>
    </Card>
  );
}
