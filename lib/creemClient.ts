import { Creem } from "creem";

export const creem = new Creem({ serverIdx: 1, debugLogger: console });

const testXApiKey = "creem_test_7SPQJt5U8FXp9NgbgsU6Fh";
const testProductId = "prod_1HIjZHQVruqlWht9MeTAvn";

export type createCheckoutProps = {
  metadata: {
    userId: string;
  };
  productId: string;
};

export const createCheckout = async ({metadata,productId}:createCheckoutProps) => {
  const product = await creem.createCheckout({
    xApiKey: testXApiKey,
    createCheckoutRequest: {
      productId,
      metadata,
      successUrl: "https://a3d9-2409-8a28-242a-c9a1-c81f-57e-6337-3a85.ngrok-free.app/",
    },
  });
  console.log("product", product);
  return product;
};
