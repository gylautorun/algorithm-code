/**
 *  在二维数组（顾客，购买的商品）中按照商品销售数量排序
    方法思路
    要统计并排序商品销售数量，我们可以：
    1. 遍历二维数组，统计每种商品的总销售数量
    2. 将统计结果转换为可排序的数组
    3. 按照销售数量降序排序
    4. 返回排序后的商品列表
 */


function sortProductsBySales(customerProducts) {
    // 统计每种商品的销售数量
    const productSales = {};
    
    customerProducts.forEach(([customer, products]) => {
        products.forEach(product => {
            productSales[product] = (productSales[product] || 0) + 1;
        });
    });
    
    // 转换为数组并排序
    const sortedProducts = Object.entries(productSales)
        .map(([product, count]) => ({ product, count }))
        .sort((a, b) => b.count - a.count);
    
    return sortedProducts;
}

// 测试用例
const customerProducts = [
    ["Alice", ["iPhone", "AirPods", "MacBook"]],
    ["Bob", ["iPhone", "iPad"]],
    ["Charlie", ["iPhone", "MacBook", "Apple Watch"]],
    ["David", ["iPad", "MacBook"]]
];

console.log(sortProductsBySales(customerProducts));
/*
[
    { product: 'iPhone', count: 3 },
    { product: 'MacBook', count: 3 },
    { product: 'iPad', count: 2 },
    { product: 'AirPods', count: 1 },
    { product: 'Apple Watch', count: 1 }
]
*/

