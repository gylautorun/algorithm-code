// 在 "100 game" 这个游戏中，两名玩家轮流选择从 1 到 10 的任意整数，累计整数和，先使
// 得累计整数和 达到或超过 100 的玩家，即为胜者。
// 如果我们将游戏规则改为 “玩家不能重复使用整数” 呢？
// 例如，两个玩家可以轮流从公共整数池中抽取从 1 到 15 的整数（不放回），直到累计整数
// 和 >= 100。
// 给定两个整数maxChoosableInteger （整数池中可选择的最大数）和desiredTotal （累计
// 和），若先出手的玩家是否能稳赢则返回true ，否则返回false 。假设两位玩家游戏时都
// 表现 最佳 。
// 提示
// 1 <= maxChoosableInteger <= 20
// 0 <= desiredTotal <= 300

// maxChoosableInteger = 10, desiredTotal = 11
// false
// 无论第一个玩家选择哪个整数，他都会失败。
// 第一个玩家可以选择从 1 到 10 的整数。
// 如果第一个玩家选择 1，那么第二个玩家只能选择从 2 到 10 的整数。
// 第二个玩家可以通过选择整数 10（那么累积和为 11 >= desiredTotal），从而取得胜利.
// 同样地，第一个玩家选择任意其他整数，第二个玩家都会赢。

// maxChoosableInteger = 10, desiredTotal = 0
// true

// maxChoosableInteger = 10, desiredTotal = 1
// true

function canWin(maxChoosableInteger, desiredTotal) {
    if (maxChoosableInteger >= desiredTotal) {
        return true;
    }
    if ((maxChoosableInteger * (maxChoosableInteger + 1) / 2) < desiredTotal) {
        return false;
    }

    const map = new Map();
    const array = new Array(maxChoosableInteger + 1).fill(0);

    return run(desiredTotal, array);

    function run(desiredTotal, array) {
        const state = array.toString();
        if (map.has(state)) {
            return map.get(state);
        }
        // 遍历取数
        for (let i = 1; i <= maxChoosableInteger; i++) {
            // 没有选择过
            if (!array[i]) {
                if (desiredTotal <= i) {
                    map.set(state, true);
                    return true;
                }
                // 状态赋值
                array[i] = 1;
                // 后面结果返回false, 那么当前赢
                // 后面结果返回true, 那么当前失败
                const result = run(desiredTotal - i, array);
                // 状态恢复
                array[i] = 0;

                if (result === false) {
                    map.set(state, true);
                    return true;
                }
            }
        }
        map.set(state, false);
        return false;
    }
}
console.log(canWin(10, 11));