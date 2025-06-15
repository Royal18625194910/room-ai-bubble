"use client";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <h1>Hello World</h1>
      <Button>hello shadcn</Button>
      <UserButton />
    </div>
  );
}
