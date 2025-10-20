// 请输出1到400之间所有数字中包含的1的个数，
// 比如数字1中包含了一个1, 数字11中包含了两个1, 数字20中不包含1,
// 数字1到21中共包含了13个1
// 统计1~400 1的个数

function getCount(num) {
    let str = Array.from({length: num}, (v, k) => k + 1).join('')
    return str.match(/[1]/g).length;
}

getCount(400);
