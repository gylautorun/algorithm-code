const lengthOfLongestSubstring = function(s) {
    const need = {};
    let max = 0;
    let l = 0;
    let r = 0;

    while (r < s.length) {
        const v = s[r];
        r++;
        need[v] = (need[v] || 0) + 1;

        while (need[v] > 1) {
            const _v = s[l];
            l++;
            need[_v]--;
        }
        max = Math.max(max, r - l);
    }
    return max;
};

console.log(lengthOfLongestSubstring('abcdefgahijklmnopqrstuvwxyz'));
console.log(lengthOfLongestSubstring('abcabcbb'));