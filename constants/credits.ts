export const creditPackages = [
  {
    credits: 50,
    price: 6.99,
    priceDisplay: "$6.99",  // 0.1398
    recommended: false,  // 4.49
    productId: 'prod_1HIjZHQVruqlWht9MeTAvn',
  },
  {
    credits: 120,
    price: 12.99,
    priceDisplay: "$12.99",  // 0.10825
    recommended: true,  // 8.39
    productId: 'prod_1X3f9RKZQMWiN40icqebEJ',
  },
  {
    credits: 300,
    price: 24.99,
    priceDisplay: "$24.99", // 0.0833
    recommended: false, // 14.99
    productId: 'prod_1zZtdy36TNpdHs0mSFF3JK',
  }
];

export type CreditPackageType = typeof creditPackages[number];