"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
const HomeView = () => {
    const router = useRouter();
  const { data: session } = authClient.useSession();
  if (!session) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col p-4 gap-y-4">
        Welcome, {session.user?.name}
        <Button onClick={() => authClient.signOut({fetchOptions: {onSuccess: () => router.push("/sign-in")}})}>Sign out</Button>
      </div>
  );
}

export default HomeView;