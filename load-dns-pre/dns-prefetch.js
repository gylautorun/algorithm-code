const fs = require('fs');
const path = require('path');
const {parse} = require('node-html-parser');
const glob = require('glob');
const urlRegex = require('url-regex');

// 匹配域名
const urlPattern = /(https?:\/\/[^/]*)/i;
const urls = new Set();

// 遍历dist 目录所有html/css/js 文件
async function searchDomain() {
    // glob 根据相应匹配路径得到相应匹配结果
    const files = await glob('dist/**/*.{html,css,js}');
    for (const file of files) {
        // 读取文件内容
        const source = fs.readFileSync(file, 'utf-8');
        // urlRegex库 可以分析出文件藜麦呢所有的url地址
        const matches = source.match(urlRegex({strict: true}));
        if (matches) {
            matches.forEach(url => {
                // 匹配出域名
                const match = url.match(urlPattern);
                if (match && match[1]) {
                    // 加入到set urls
                    urls.add(match[1]);
                }
            });
        }
    }
}

// urls 所有的域名插入到 head 里面
async function insertLinks() {
    const files = glob('dist/**/*.html');
    const links = [...urls].map(url => {
        return `<link rel="dns-prefetch" href="${url}" />`;
    }).join('\n');

    for (const file of files) {
        // 读取文件内容
        const html = fs.readFileSync(file, 'utf-8');
        // 内容解析成节点 (node-html-parser: node 里面html 节点)
        // 脱离浏览器下解析html
        const root = parse(html);
        const head = root.querySelector('head');
        head.insertAdjacentHTML('afterbegin', links)
        fs.writeFileSync(file, root.toString());
    }
}

async function main() {
    await searchDomain();
    // head 中插入链接
    await insertLinks();
}

main();

// package.json
/**
 *  "script": {
        "build": "node build && node ./scripts/dns-prefetch.js"
    }
 */