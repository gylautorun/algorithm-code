/**
 * 将扁平数组转换为树形结构（递归实现）
 * @param {Array} items 扁平数组
 * @param {String|Number} [parentId=null] 父节点ID
 * @param {Object} [config={}] 配置项
 * @param {String} [config.idKey='id'] 节点ID键名
 * @param {String} [config.parentKey='parentId'] 父节点ID键名
 * @param {String} [config.childrenKey='children'] 子节点键名
 * @returns {Array} 树形结构
 */
export function buildTreeRecursive(items, parentId = null, config = {}) {
    const {
        idKey = 'id',
        parentKey = 'parentId',
        childrenKey = 'children'
    } = config;
    
    return items
        .filter(item => item[parentKey] === parentId)
        .map(item => ({
            ...item,
            [childrenKey]: buildTreeRecursive(items, item[idKey], config)
        }));
}

/**
 * 将扁平数组转换为树形结构（非递归实现）
 * @param {Array} items 扁平数组
 * @param {Object} [config={}] 配置项
 * @param {String} [config.idKey='id'] 节点ID键名
 * @param {String} [config.parentKey='parentId'] 父节点ID键名
 * @param {String} [config.childrenKey='children'] 子节点键名
 * @returns {Array} 树形结构
 */
export function buildTreeIterative(items, config = {}) {
    const {
        idKey = 'id',
        parentKey = 'parentId',
        childrenKey = 'children'
    } = config;
    
    const result = [];
    const itemMap = {};
    
    // 第一次遍历：创建所有节点的映射
    for (const item of items) {
        itemMap[item[idKey]] = { ...item, [childrenKey]: [] };
    }
    
    // 第二次遍历：构建树形结构
    for (const item of items) {
        const id = item[idKey];
        const pid = item[parentKey];
        
        if (pid === null || pid === undefined) {
            result.push(itemMap[id]);
        } else {
            if (!itemMap[pid]) {
                itemMap[pid] = { [childrenKey]: [] };
            }
            itemMap[pid][childrenKey].push(itemMap[id]);
        }
    }
    
    return result;
}

// 使用示例
/*
const flatArray = [
    { id: 1, name: 'Node 1', parentId: null },
    { id: 2, name: 'Node 2', parentId: 1 },
    { id: 3, name: 'Node 3', parentId: 1 },
    { id: 4, name: 'Node 4', parentId: 2 }
];

const treeData = buildTreeRecursive(flatArray);
console.log(treeData);
*/