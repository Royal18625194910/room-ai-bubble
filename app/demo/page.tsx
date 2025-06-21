"use client";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/useUser.Store";
import { useRouter } from "next/navigation";

const DemoPage = () => {
  const router = useRouter();
  const userDetail = useUserStore((state) => state.userDetail);
  console.log("userDetail", userDetail);
  const getCheckout = async (productId: string) => {
    const res = await (
      await fetch(
        `/api/checkout?userId=${userDetail.id}&productId=${productId}`
      )
    ).json();
    console.log("getCheckout", res);
    router.push(res.checkoutUrl);
  };
  return (
    <div>
      <Button
        onClick={async () => {
          console.log("clicked");
        }}>
        checkout
      </Button>
    </div>
  );
};

export default DemoPage;
