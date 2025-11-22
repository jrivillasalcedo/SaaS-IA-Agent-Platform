import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import HomeView from "@/modules/home/ui/views/home-view";
import { redirect } from "next/navigation";
import { caller } from "@/trpc/server";

const Page = async () => {
  const greeting = await caller.hello({ text: "Hello from server" });
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }
  return <HomeView />;
};

export default Page;
