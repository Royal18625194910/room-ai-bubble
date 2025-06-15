import { Button } from "@/components/ui/button";
import { images } from "@/constants/images";
import Image from "next/image";
import Link from "next/link";

const EmptyState = () => {
  return (
    <div className="flex items-center justify-center mt-10 flex-col">
      <Image src={images.placeholderImg} alt="empty" width={200} height={200} />
      <h2>Create New Room Design</h2>
      <Link href="/dashboard/create-new">
        <Button className="mt-5">+ Redesign Room</Button>
      </Link>
    </div>
  );
};

export default EmptyState;
