// 物品个数n = 5
// 物品重量 weights = [2,2,6,5,4]
// 物品价值 values = [6,3,5,4,6]
// 背包总容量 W = 10
const weightList = [2, 2, 6, 5, 4];
const valueList = [6, 3, 5, 4, 6];
const WNumber = 10;
/**
 * 
 * @param {*} weights number[]
 * @param {*} values number[]
 * @param {*} W number
 * @returns number
 */
function knapsack(weights, values, W) {
    const n = weights.length;
    if (n <= 0) {
        return [];
    }
    const f = new Array(n);
    for (let i = 0; i < n; i++) { // 重量循环
        f[i] = [];
        for (let j = 0; j <= W; j++) { // 重量循环
            if (i === 0) { // 第一行
                f[i][j] = j < weights[i] ? 0 : values[i];
            }
            else { // 其他行
                if (j < weights[i]) { // 之前最优值
                    f[i][j] = f[i - 1][j];
                }
                else {
                    f[i][j] = Math.max(f[i - 1][j], f[i - 1][j - weights[i]] + values[i]);
                }
            }
        }
    }
    // 找到物品
    findValue(weights, values, W, f)
    return f[n - 1][W];
}

function findValue(weights, values, W, T){
    const n = weights.length;
	let i = n - 1;
	while (i > 0 && W > 0){
		if(T[i][W] !== T[i-1][W]){
			console.log(`选择物品${i}, 重量: ${weights[i]}, 价值: ${values[i]}`);
			W = W - weights[i];
			i--;
		}else{
			i--;  // 如果相等，那么就到 i-1 行
		}
	}
	if(i === 0){
		if(T[i][W] !== 0){ // 那么第一行的物品也可以取
            console.log(`选择物品${i}, 重量: ${weights[i]}, 价值: ${values[i]}`);
		}
	}
}

console.log(knapsack(weightList, valueList, WNumber))