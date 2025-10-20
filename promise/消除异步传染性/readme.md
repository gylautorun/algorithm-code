# 消除函数的异步传染性：方法与权衡

异步传染性是指当一个函数使用了异步操作（如`async/await`）后，其调用链上的所有函数也必须变为异步函数的现象。这种传染性会导致代码中大量出现`async/await`，增加代码复杂度。以下是几种消除异步传染性的方法及其优缺点分析。

## 1. 抛出错误+缓存+重执行机制

这种方法通过修改`fetch`等异步函数的行为，使其在第一次调用时抛出错误并缓存结果，第二次调用时直接返回缓存值。

**实现原理**：
- 第一次调用时抛出`Promise`错误并启动异步请求
- 异步请求完成后将结果存入缓存
- 重新执行调用链，第二次调用时直接从缓存返回结果

**示例代码**：
```javascript
function syncFetch(fn) {
    // 1. 保存原始的 fetch
    const oldFetch = window.fetch;
    // 2. 定义缓存
    const cache = new WeakMap();
    cache.set(fn, {
        status: 'pending',
        value: null,
    });
    // 3. 定义新的 fetch
    function newFetch(...args) {
        const res = cache.get(fn);
        if (res.status === 'fulfilled') {
            return res.value;
        }
        else if (res.status === 'rejected') {
            throw res.value;
        }
        const promise = oldFetch(...args)
            .then(res => res.json())
            .then(value => {
                res.status = 'fulfilled';
                res.value = value;
            })
            .catch(error => {
                res.status = 'rejected';
                res.value = reason;
            });

        // 抛出错误，让调用者处理错误, 执行中断
        throw promise;
    }
    // 4. 替换 fetch
    window.fetch = newFetch;
    // 5. 捕获错误
    try {
        fn();
    } catch (error) {
        if (error instanceof Promise) {
            // 等待 promise 执行完成, 调用fn
            error.finally(() => {
                window.fetch = newFetch;
                fn();
                window.fetch = oldFetch;
            });
        }
    }
    // 6. 恢复 fetch
    window.fetch = oldFetch;
}

// 使用示例
syncFetch(() => {
    const data = fetch('https://api.example.com/data'); // 看起来是同步调用
    console.log(data);
});
```

**优缺点**：
- 优点：使异步代码看起来像同步代码，消除调用链上的 `async/await`
- 缺点：需要执行两次调用链，性能较差；改变了标准API行为；错误处理复杂

## 2. 生成器函数+自动执行器

利用生成器函数的`yield`暂停执行特性，配合自动执行器处理异步操作。

**实现原理**：
- 生成器函数使用`yield`暂停执行等待异步操作
- 自动执行器处理`Promise`并将结果传回生成器

**示例代码**：
```javascript
function runGenerator(generator) {
    const iterator = generator();
    function handle(iteration) {
        if (iteration.done) return iteration.value;
        return Promise.resolve(iteration.value)
            .then(res => handle(iterator.next(res)))
            .catch(err => handle(iterator.throw(err)));
    }
    return handle(iterator.next());
}

function* main() {
    try {
        const data = yield fetchData(); // yield暂停等待异步操作
        console.log("Data:", data);
    } catch (error) {
        console.error("Error:", error);
    }
}

runGenerator(main);
```

**优缺点**：
- 优点：代码结构清晰，类似同步风格
- 缺点：仍需顶层处理`Promise`，不能完全消除异步性

## 3. 预加载数据+缓存

在程序初始化阶段预加载所有需要的数据，后续直接使用缓存数据。

**实现原理**：
- 应用启动时预先加载所有可能需要的异步数据
- 后续业务代码直接访问缓存数据

**示例代码**：
```javascript
let cachedData = null;

async function initialize() {
    cachedData = await fetch('https://api.example.com/data').then(res => res.json());
}

// 初始化时预加载
initialize().catch(console.error);

// 业务代码
function processData() {
    if (!cachedData) throw new Error("Data not loaded");
    console.log(cachedData); // 同步访问
}
```

**优缺点**：
- 优点：业务代码完全同步，无传染性
- 缺点：需要预先知道所有数据需求；初始化时间长

## 4. React Suspense方案（框架特定）

React 18+的Suspense组件可以优雅地处理异步渲染。

**实现原理**：
- 使用`Suspense`组件包裹异步组件
- 异步组件抛出`Promise`时显示`fallback`内容
- `Promise`完成后重新渲染组件

**示例代码**：
```javascript
function fetchResource(promise) {
    let status = "pending";
    let result;
    const suspender = promise.then(
        res => { status = "success"; result = res; },
        err => { status = "error"; result = err; }
    );
    return {
        read() {
            if (status === "pending") throw suspender;
            if (status === "error") throw result;
            return result;
        }
    };
}

function MyComponent() {
    const data = resource.read(); // 看起来是同步读取
    return <div>{data}</div>;
}

// 使用
<Suspense fallback={<Loading />}>
    <MyComponent />
</Suspense>
```

**优缺点**：
- 优点：组件代码保持同步风格；React原生支持
- 缺点：仅适用于React框架；需要特定封装

## 5. 异步隔离设计模式

将异步操作限制在特定模块或层级，业务代码通过同步接口访问。

**实现原理**：
- 将异步操作封装在专门的Service层
- 业务层通过同步接口访问数据
- 使用观察者模式或状态管理通知数据更新

**示例代码**：
```javascript
// 数据服务层
class DataService {
    constructor() {
        this._data = null;
        this.loadData();
    }
    
    async loadData() {
        this._data = await fetch('/api/data').then(res => res.json());
    }
    
    get data() {
        return this._data || [];
    }
}

// 业务层
const service = new DataService();
function processData() {
    const data = service.data; // 同步访问
    console.log(data);
}
```

**优缺点**：
- 优点：业务代码无感知；架构清晰
- 缺点：需要良好的架构设计；数据更新需要额外机制

## 总结与建议

1. **框架环境**：在React中使用Suspense是最佳选择
2. **非框架环境**：
   - 简单场景可使用预加载+缓存
   - 复杂场景考虑生成器或异步隔离设计
3. **避免滥用**：抛出错误+重执行等hack方法虽然有趣，但生产环境慎用
4. **权衡取舍**：完全消除异步传染性可能带来其他复杂度，需根据项目需求选择

异步传染性本质上是JavaScript异步编程模型的一部分，完全消除可能不现实也不必要。最佳实践是合理设计代码结构，将异步操作限制在可控范围内，而非追求表面的同步风格。