/**
 * 
 *  给一非空的单词列表，返回前 k 个出现次数最多的单词。
    返回的答案应该按单词出现频率由高到低排序。如果不同的单词有相同出现频率，按字母顺序排序。

    示例 1：
    输入: ["i", "love", "leetcode", "i", "love", "coding"], k = 2
    输出: ["i", "love"]
    解析: "i" 和 "love" 为出现次数最多的两个单词，均为2次。
    注意，按字母顺序 "i" 在 "love" 之前。

    示例 2：
    输入: ["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], k = 4
    输出: ["the", "is", "sunny", "day"]
    解析: "the", "is", "sunny" 和 "day" 是出现次数最多的四个单词，
    出现次数依次为 4, 3, 2 和 1 次。
    注意：

    假定 k 总为有效值， 1 ≤ k ≤ 集合元素数。
    输入的单词均由小写字母组成。

    扩展练习：
    尝试以 O(n log k) 时间复杂度和 O(n)空间复杂度解决
    首先我们先把数组中的单词和个数存在哈希表中，然后题目就和上边问题一很相像了,也是用优先队列来解决
 */

/**
 * 前K个高频单词
 * @param {*} words: 单词数据
 * @param {*} k: 取出数值
 */
function topKWords(words, k) {
    words.sort();
    const takes = [];
    const wordsMap = {};
    for (const word of words) {
        wordsMap[word] = (wordsMap[word] || 0) + 1;
    }

    for (const key in wordsMap) {
        const len = takes.length;
        const lastTake = takes[len - 1];
        if (!len) {
            takes.push(key);
        }
        else {
            // k 范围内, 每次和最后一个takes对比, 比存储的小, 直接push
            if (len < k && wordsMap[key] <= wordsMap[lastTake]) {
                takes.push(key);
            }
            // 超出k, 比takes最后大, 需要往前移动
            else if (wordsMap[key] > wordsMap[lastTake]) {
                // 存储k, 需要先移除最后一个
                if(len >= k) {
                    // 移除最后一个
                    takes.pop();
                }
                // 双指针插入
                let l = 0;
                let r = len - 1;
                // 边界需要和最右边比较, 因此要<=
                while (l <= r) {
                    let m = Math.floor((l + r) / 2);
                    if (wordsMap[takes[m]] > wordsMap[key]) {
                        l = m + 1;
                    }
                    else {
                        r = m -1;
                    }
                }
                takes.splice(l, 0, key);
            }
        }

    }

    console.log(takes);
}
const oneWords = ["i", "love", "leetcode", "i", "love", "coding"];
const oneK = 2;
const twoWords = ["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"];
const twoK = 4;

topKWords(oneWords, oneK); // [ 'love', 'i' ]
topKWords(twoWords, twoK); // [ 'the', 'is', 'sunny', 'day' ]