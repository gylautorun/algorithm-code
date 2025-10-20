let array = [
    {"name": "一级", "id": 1, "pid": 0},
    {"name": "一级-1", "id": 11, "pid": 1},
    {"name": "一级-2", "id": 12, "pid": 1},
    {"name": "二级", "id": 2, "pid": 0},
    {"name": "二级-1", "id": 21, "pid": 2},
    {"name": "二级-2", "id": 22, "pid": 2},
    {"name": "三级", "id": 3, "pid": 0},
    {"name": "三级-1", "id": 31, "pid": 3},
    {"name": "三级-2", "id": 32, "pid": 3},
    {"name": "一级-1-1", "id": 111, "pid": 11},
    {"name": "一级-1-2", "id": 112, "pid": 11},
    {"name": "一级-2-1", "id": 121, "pid": 12},
    {"name": "一级-2-2", "id": 122, "pid": 12},
    {"name": "二级-1-1", "id": 211, "pid": 21},
    {"name": "二级-1-2", "id": 212, "pid": 21},
    {"name": "二级-2-1", "id": 221, "pid": 22},
    {"name": "二级-2-2", "id": 222, "pid": 22},
    {"name": "三级-1-1", "id": 311, "pid": 31},
    {"name": "三级-1-2", "id": 312, "pid": 31},
    {"name": "三级-2-1", "id": 321, "pid": 32},
    {"name": "三级-2-1-1", "id": 3221, "pid": 321},
];

const array2 = [
    {"name": "一级", "id": 1, "pid": 0},
    {"name": "一级-1", "id": 11, "pid": 1},
    {"name": "二级", "id": 2, "pid": 0},
    {"name": "二级-1", "id": 21, "pid": 2},
    {"name": "二级-2", "id": 22, "pid": 2},
    {"name": "三级", "id": 3, "pid": 0},
    {"name": "三级-1", "id": 31, "pid": 3},
    {"name": "一级-1-1", "id": 111, "pid": 11},
    {"name": "一级-1-2", "id": 112, "pid": 11},
    {"name": "二级-1-1", "id": 211, "pid": 21},
    {"name": "二级-2-1", "id": 221, "pid": 22},
    {"name": "三级-1-1", "id": 311, "pid": 31},
    {"name": "三级-1-2", "id": 312, "pid": 31},
    {"name": "三级-1-2-1", "id": 3121, "pid": 312},
];
// 扁平数组转树形结构
const arrayToTree = (list = []) => {
    let map = {}; // 存key => id
    let result = [];
    for (const item of list) {
        const {id, pid} = item;

        // if (!map[id]) {
        //     map[id] = {children: []};
        // }

        // map[id] = {
        //     ...item,
        //     children: map[id].children,
        // }

        // const currentItem = map[id];

        map[id] = {
            ...item,
            children: []
        };

        // 是否第一层
        if (pid === 0) {
            // result.push(currentItem);
            result.push(map[id]);
        }
        // 非第一层, 需要children 里添加
        else {
            // 有可能当前父级还未遍历到, 需要提前赋予children
            if (!map[pid]) {
                map[pid] = {
                    children: []
                }
            }
            map[pid].children.push(currentItem);
        }
    }
    return result;

};

console.log(JSON.stringify(arrayToTree(array)));

let treeArray = [
    {
        "name": "一级",
        "id": 1,
        "pid": 0,
        "children": [{
            "name": "一级子级1",
            "id": 11,
            "pid": 1,
            "children": [
                {"name": "一1级子级1", "id": 111, "pid": 11},
                {"name": "一1级子级2", "id": 112, "pid": 11}
            ]
        }, {
            "name": "一级子级2",
            "id": 12,
            "pid": 1,
            "children": [
                {"name": "一1级子级3", "id": 121, "pid": 12},
                {"name": "一1级子级4", "id": 122, "pid": 12}
            ]
        }]
    }, {
        "name": "二级",
        "id": 2,
        "pid": 0,
        "children": [{
            "name": "二级子级1",
            "id": 21,
            "pid": 2,
            "children": [
                {"name": "二1级子级1", "id": 211, "pid": 21},
                {"name": "二1级子级2", "id": 212, "pid": 21}
            ]
        }, {
            "name": "二级子级2",
            "id": 22,
            "pid": 2,
            "children": [{"name": "二1级子级3", "id": 221, "pid": 22}, {"name": "二1级子级4", "id": 222, "pid": 22}]
        }]
    }, {
        "name": "三级",
        "id": 3,
        "pid": 0,
        "children": [{
            "name": "三级子级1",
            "id": 31,
            "pid": 3,
            "children": [{"name": "三1级子级1", "id": 311, "pid": 31}, {"name": "三1级子级2", "id": 312, "pid": 31}]
        }, {"name": "三级子级1", "id": 32, "pid": 3, "children": [{"name": "三1级子级3", "id": 321, "pid": 32}]}]
    }]
// 树结构转偏平
const treeToArray = (list = []) => {
    let result = [];

    for (let value of list) {
        let clone = JSON.parse(JSON.stringify(value));
        delete clone.children;
        result.push(clone);

        if (value.children) {
            let temp = treeToArray(value.children);
            result = result.concat(temp);
        }
    }

    return result;
}

console.log(treeToArray(treeArray));