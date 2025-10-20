/**
 * 实现一个带缓存的Promise请求函数（考察闭包与缓存设计）:
 *   闭包管理缓存状态
 *   Promise 缓存解决并发问题 
 *   TTL 自动过期与自定义键支持
 *   错误处理与重试机制 
 */
function CreateCachePromise({ttl = 30000, retryCount = 0}) {
    const cache = new Map();

    async function request(url, options = {}) {
        const key = options.key || url;
        const cached = cache.get(key);

        if (cached && Date.now() - cached.timestamp < ttl) {
            return cached.promise;
        }

        const promise = (async () => {
            try {
                const res = await fetch(url, options);
                return res.json();
            }
            catch (e) {
                cache.delete(key);
                if (retryCount > 0) {
                    return request(url, {...options, retryCount: retryCount - 1});
                }
                throw e;
            }
        })();

        cache.set(key, {promise, timestamp: Date.now()});
        return promise();
    }

    return request;
}