"use client";

import { Button } from "@/components/ui/button";
import { creditPackages, CreditPackageType } from "@/constants/credits";
import { useUserStore } from "@/store/useUser.Store";
import { Sparkles, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

const BuyCreditsPage = () => {
  const router = useRouter();
  const userDetail = useUserStore((state) => state.userDetail);
  const handleSelect = async (item: CreditPackageType) => {
    // TODO: 实现支付逻辑
    console.log(`选择了 ${item.credits} 积分，价格：$${item.price}`);
    const res = await getCheckout(item.productId);
    console.log("getCheckout", res);
  };

  const getCheckout = async (productId: string) => {
    const res = await (
      await fetch(
        `/api/checkout?userId=${userDetail.id}&productId=${productId}`
      )
    ).json();
    console.log("getCheckout", res);
    router.push(res.checkoutUrl);
  };

  // 计算每个套餐的单价
  const calculateUnitPrice = (credits: number, price: number) => {
    return (price / credits).toFixed(3);
  };

  // 找出最优惠的套餐
  const bestValue = creditPackages.reduce((prev, current) =>
    current.price / current.credits < prev.price / prev.credits ? current : prev
  );

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Buy Credits</h1>
        <p className="text-center text-gray-600 mb-8">
          Choose a credit package to transform your room with AI magic ✨ 🏠
        </p>

        <div className="justify-center items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {creditPackages.map((pkg) => (
            <div
              key={pkg.credits}
              className={`bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-between border transition-all relative
                ${
                  pkg.recommended ? "border-primary" : "hover:border-primary"
                }`}>
              {pkg.recommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-3 py-2 rounded-full text-sm flex items-center">
                  <Zap className="w-4 h-4 mr-1" />
                  <p className="text-nowrap">Best Value</p>
                </div>
              )}
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-2">{pkg.credits}</h2>
                <p className="text-gray-600 mb-2">Credits</p>
                <p className="text-sm text-gray-500 mb-4">
                  ${calculateUnitPrice(pkg.credits, pkg.price)}/credit
                </p>
              </div>
              <div className="w-full">
                <Button
                  onClick={() => handleSelect(pkg)}
                  className={`w-full text-white transition-colors
                    ${
                      pkg.credits === bestValue.credits
                        ? "bg-primary hover:bg-primary"
                        : "bg-primary hover:bg-primary"
                    }`}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  {pkg.priceDisplay}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          * Credits never expire and can be used for any room design
        </p>
      </div>
    </div>
  );
};

export default BuyCreditsPage;
