//16 – Calculus – Optimization Problems – Max Profit Example.
//Optimization Problems – Max Profit Example.
//The problem of finding the best solution from all feasible solutions .
//usually about founding the maximum or the minimum of somthing like max profit or min cost within a specific criteria.
//map routes example .

//create a function for company want to calculate max profit regaring the product price is 1.5$ they could sell 5000 unit of the product.if they apply discount of 10 cent they will be able to sell additional 1000 unit.this company have fixed costs 2000$ and variable costs 1000$ for each unit of the product.manufacturing cost per product 0.5$ what is the best price to sell the product and the company will be able to maximize profit. let the function accept arguments.

function maximumProfit(prices, profit, quantity) {
  let max = 0;
  for (let i = 0; i < prices.length; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      max = Math.max(max, prices[j] - prices[i]);
    }
  }
  return max;
}

function maxProfit(prices) {
  let max = 0;
  for (let i = 0; i < prices.length; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      max = Math.max(max, prices[j] - prices[i]);
    }
  }
  return max;
}

console.log(maxProfit([7, 1, 5, 3, 6, 4])); // 5
console.log(maxProfit([7, 6, 4, 3, 1])); // 0
function calculateMaxProfit(
  initialPrice,
  initialUnits,
  discount,
  additionalUnitsPerDiscount,
  fixedCosts,
  variableCostPerUnit
) {
  let maxProfit = 0;
  let bestPrice = initialPrice;

  for (
    let price = initialPrice;
    price >= variableCostPerUnit;
    price -= discount
  ) {
    let unitsSold =
      initialUnits +
      ((initialPrice - price) / discount) * additionalUnitsPerDiscount;
    let totalCost = fixedCosts + unitsSold * variableCostPerUnit;
    let totalRevenue = unitsSold * price;
    let profit = totalRevenue - totalCost;

    if (profit > maxProfit) {
      maxProfit = profit;
      bestPrice = price;
    }
  }

  return {maxProfit, bestPrice};
}

let result = calculateMaxProfit(1.5, 5000, 0.1, 2000, 2000, 0.5);
console.log(
  `The best price to sell the product is $${result.bestPrice.toFixed(
    2
  )} and the maximum profit is $${result.maxProfit.toFixed(2)}`
);
