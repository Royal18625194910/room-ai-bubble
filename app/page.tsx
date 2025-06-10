import { Button } from "@/components/ui/button";

export default function Home() {
  console.log("neon url", process.env.NEXT_PUBLIC_NEON_URL);
  return (
    <div>
      <h1>Hello World</h1>
      <Button>hello shadcn</Button>
    </div>
  );
}
