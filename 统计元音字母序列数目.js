// 给你一个整数 n，请你帮忙统计一下我们可以按下述规则形成多少个长度为 n 的字符串：
// 字符串中的每个字符都应当是小写元音字母（'a', 'e', 'i', 'o', 'u'）
// 每个元音 'a' 后面都只能跟着 'e'
// 每个元音 'e' 后面只能跟着 'a' 或者是 'i'
// 每个元音 'i' 后面 不能 再跟着另一个 'i'
// 每个元音 'o' 后面只能跟着 'i' 或者是 'u'
// 每个元音 'u' 后面只能跟着 'a'
// 由于答案可能会很大，所以请你返回 模 10^9 + 7 之后的结果。

// 示例 1：
// 输入：n = 1
// 输出：5
// 解释：所有可能的字符串分别是："a", "e", "i" , "o" 和 "u"

// 示例 2：
// 输入：n = 2
// 输出：10
// 解释：所有可能的字符串分别是：
// "ae", "ea", "ei", "ia", "ie", "io", "iu", "oi", "ou" 和 "ua"

// 示例 3：
// 输入：n = 5
// 输出：68

// 提示：
// 1 <= n <= 2 * 10^4

/**
 * 
 * @param {number} n 
 * @return {number}
 */
function countVowelPermutation(n) {
    const mod = 1e9 + 7;
    // 矩阵相乘
    function multiply(matrixA, matrixB) {
        // 相乘约束
        if (matrixA[0].length !== matrixB.length) {
            throw new Error();
        }
        let m = matrixA.length;
        let n = matrixB[0].length;
        let p = matrixA[0].length;
    
        // 初始化 m*n 全 0 二维数组
        let result = new Array(m).fill(0).map(arr => new Array(n).fill(0));
    
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                for (let k = 0; k < p; k++) {
                    result[i][j] += matrixA[i][k] * matrixB[k][j];
                }
                // result[i][j] %= mod;
            }
        }
    
        return result;
    }

    // pow[][][]=new long[17][][];
    // pow[0]={{0,1,0,0,0},{1,0,1,0,0},{1,1,0,1,1},{0,0,1,0,1},{1,0,0,0,0}};
    // for(int i=1;i<17;i++){pow[i]=multiply(pow[i-1],pow[i-1]);}
    // long matrix[][]=new long[][]{{1,0,0,0,0},{0,1,0,0,0},{0,0,1,0,0},{0,0,0,1,0},{0,0,0,0,1}};
    // long ans[]=new long[]{1,1,1,1,1};
    // //下面求矩阵的n-1次方：
    // n--;
    // for(int i=0;i<17;i++){
    //     if(n%2==1){matrix=multiply(matrix,pow[i]);}
    //     n/=2;
    // }
    // for(int i=0;i<5;i++){ans[i]=(matrix[0][i]+matrix[1][i]+matrix[2][i]+matrix[3][i]+matrix[4][i])%mod;}
    // return (int)((ans[0]+ans[1]+ans[2]+ans[3]+ans[4])%mod);

}

