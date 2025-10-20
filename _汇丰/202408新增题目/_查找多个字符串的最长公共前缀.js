/**
    从一系列 string中，找到他们从第一个字母起的最长的公共子串。输入2行第一行数字N， ? > N >= 0第二行N个字符串 例如：4   molly molion molern mold 输出 mol
要实现的方法String solution(int N, String[] strings){} 
方法思路
要找到多个字符串从第一个字母起的最长公共子串（即最长公共前缀），我们可以：
1. 先处理边界情况（空数组或单个字符串）
2. 以第一个字符串作为初始公共前缀
3. 依次与其他字符串比较，逐步缩短公共前缀
4. 最终返回找到的最长公共前缀
 */


function solution(N, strings) {
    if (N === 0) return "";
    if (N === 1) return strings[0];
    
    let prefix = strings[0];
    
    for (let i = 1; i < N; i++) {
        while (strings[i].indexOf(prefix) !== 0) {
            prefix = prefix.substring(0, prefix.length - 1);
            if (prefix === "") return "";
        }
    }
    
    return prefix;
}

// 测试用例
console.log(solution(4, ["molly", "molion", "molern", "mold"])); // "mol"
console.log(solution(3, ["flower", "flow", "flight"])); // "fl"
console.log(solution(2, ["dog", "racecar"])); // ""
console.log(solution(1, ["single"])); // "single"
console.log(solution(0, [])); // ""
console.log('=====================');

// 垂直扫描法
function solutionOptimized(N, strings) {
    if (N === 0) return "";
    
    for (let i = 0; i < strings[0].length; i++) {
        const char = strings[0][i];
        for (let j = 1; j < N; j++) {
            if (i === strings[j].length || strings[j][i] !== char) {
                return strings[0].substring(0, i);
            }
        }
    }
    
    return strings[0];
}

// 测试用例
console.log(solutionOptimized(4, ["molly", "molion", "molern", "mold"])); // "mol"
console.log(solutionOptimized(3, ["flower", "flow", "flight"])); // "fl"
console.log(solutionOptimized(2, ["dog", "racecar"])); // ""
console.log(solutionOptimized(1, ["single"])); // "single"
console.log(solutionOptimized(0, [])); // ""
console.log('=====================');
