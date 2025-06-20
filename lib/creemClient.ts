import { Creem } from "creem";

export const creem = new Creem({ serverIdx: 1, debugLogger: console });

const testXApiKey = "creem_test_7SPQJt5U8FXp9NgbgsU6Fh";
const testProductId = "prod_1HIjZHQVruqlWht9MeTAvn";

export const createCheckout = async () => {
  const product = await creem.createCheckout({
    xApiKey: testXApiKey,
    createCheckoutRequest: {
      productId: testProductId,
      metadata: {
        userId: "123",
      },
      successUrl: "http://localhost:3000/",
    },
  });
  console.log("product", product);
  return product;
};
