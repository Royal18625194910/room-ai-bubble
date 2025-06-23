import { Creem } from "creem";

export const creem = new Creem({ serverIdx: 1, debugLogger: console });


export type createCheckoutProps = {
  metadata: {
    userId: string;
  };
  productId: string;
};

export const createCheckout = async ({metadata,productId}:createCheckoutProps) => {
  const product = await creem.createCheckout({
    xApiKey: process.env.NEXT_PUBLIC_CREEM_TEST_API_KEY!,
    createCheckoutRequest: {
      productId,
      metadata,
    },
  });
  console.log("product", product);
  return product;
};
