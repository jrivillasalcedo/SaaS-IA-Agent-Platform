import { auth } from "@/lib/auth";
import { SignUnView } from "@/modules/auth/ui/views/sign-up-view";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if(!!session) {
    redirect("/");
  }
  return (
   <SignUnView />
  );
}

export default Page;
