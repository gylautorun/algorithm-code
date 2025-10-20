/**
 * [
 {id:1, name: '课程', parentId: 0},
 {id:2, name: '数学', parentId: 1},
 {id:3, name: '线性代数', parentId: 2}
 ]

 data = [
 {
   name: '',
   children: [
      { name: '' }
  ]
}
 ]
 */

const transformTree = (list = []) => {
    let sortList = list.sort((pre, next) => pre.parentId - next.parentId);
    let splitList = sortList.slice(1).reduce((res, item) => {
        let len = res.length;
        let subLen = res[len - 1].length;
        if (res[len - 1][subLen - 1].parentId === item.parentId) {
            res[len - 1].push(item);
        }
        else {
            res.push([item])
        }
        return res;
    }, [[{...sortList[0], children: []}]])

    let result = [...splitList[0]];
    let obj = result[0];
    for (let i = 1; i < splitList.length; i++) {
        let current = splitList[i];
        obj.children = [...current];
        obj = obj.children[0];
    }

    return result;

}

console.log(transformTree([
    {id: 1, name: '课程', parentId: 0},
    {id: 2, name: '数学', parentId: 1},
    {id: 3, name: '线性代数', parentId: 2},
    {id: 4, name: '数学', parentId: 1},
    {id: 5, name: '线性代数', parentId: 2}
]))

let array = [
    {id: 1, name: '课程', parentId: 0},
    {id: 2, name: '数学', parentId: 1},
    {id: 3, name: '线性代数', parentId: 2}
];

function listToTree(list) {
    let map = {};
    list.forEach(item => {
        if (!map[item.id]) {
            map[item.id] = item;
        }
    });

    list.forEach(item => {
        if (item.parentId !== 0) {
            map[item.parentId].children
                ? map[item.parentId].children.push(item)
                : map[item.parentId].children = [item];
        }
    });

    return list.filter(item => {
        if (item.parentId === 0) {
            return item;
        }
    })
}

console.log(listToTree(array));
