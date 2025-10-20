// 请实现下面代码中的函数fn,使其可以输出指定id对应的所有父id
let data = [
    {
        id: 1,
        name: '222',
        children: [{
            id: 2,
            name: '2',
            children: [{
                id: 112,
                name: '334',
                children: [{
                    id: 1122,
                    name: '334',
                }, {
                    id: 1123,
                    name: '354',
                }]
            }, {
                id: 113,
                name: '354',
            }]
        }, {
            id: 3,
            name: '3',
            children: [{
                id: 123,
                name: '334',
                children: [{
                    id: 1133,
                    name: '334',
                }, {
                    id: 1134,
                    name: '354',
                }]
            }, {
                id: 133,
                name: '354',
            }]
        }]
    }
];

// 输出  [1, 2, 112, 1122]
// console.log(find(1122))
// console.log(find1(data, 1122))
// console.log(find2(1122))
console.log(find3(1122))

function find(id) {
    return parentsIds(id, data).reverse();
}

function parentsIds(id, dataTree = []) {

    let match = dataTree.find(it => it.id === id);
    if (match) {
        return [match.id];
    }

    if (!dataTree.length) {
        return null;
    }

    // for (let node of dataTree) {
    //     let arr = combParentsIds(id, node.children);
    //     if(arr) {
    //         return arr.concat([node.id])
    //     }
    // }

    for (let i = 0; i < dataTree.length; i++) {
        let node = dataTree[i];
        let arr = parentsIds(id, node.children);
        if (arr) {
            return arr.concat([node.id])
        }
    }
}


function find1(data, id) {
    function getIds(result = [], data) {
        for (let item of data) {
            if (item.id === id) {
                result.push(item.id);
                return result;
            }

            let {children = []} = item;
            if (children.length) {
                const res = getIds([...result, item.id], children);
                if (res) {
                    return res;
                }
            }

            return null;
        }
    }

    return getIds([], data);
}

function find2(id) {
    return getNodeParents(data, id, []);
}

function getNodeParents(data, id, nodeParents = []) {
    let next = [];
    let reg = new RegExp(`${id}(?!\\d+)`, 'g');

    data.forEach(node => {
        let jsonStr = JSON.stringify(node);
        if (reg.test(jsonStr)) {
            nodeParents.push(node.id);
            next = node.children || [];
        }
    })

    if (next.length) {
        return getNodeParents(next, id, nodeParents);
    }

    return nodeParents;
}

function find3(thisId) {
    let result = [];

    function getIds(list = [], temp = []) {
        for (let {id, children = []} of list) {
            temp.push(id);

            if (id === thisId) {
                result = [...temp];
                return;
            }
            else {
                getIds(children, temp);
                temp.pop();
            }

        }
    }

    getIds(data, []);
    return result;
}










