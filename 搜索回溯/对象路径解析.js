const obj = {
    a: {
        b: {
            c: {
                d: 1,
            },
            e: {
                f: {
                    g: 2
                }
            }
        },
        h: 3,
        i: {
            j: 4,
            k: 5,
            l: {
                m: 6,
                n: 7,
            }
        }
    },
    o: {
        p: 8,
    },
    q: 9,
};
// => function pathObject(obj) 处理
const result ={
    'a.b.c.d': 1,
    'a.b.c.e.f.g': 2,
    'a.h': 3,
    'a.i.j': 4,
    'a.i.k': 5,
    'a.i.l.m': 6,
    'a.i.l.n': 7,
    'o.p': 8,
    'q': 9,
};


function pathObject(obj) {

    const result = {};
    const run = (data, list) => {
        if (typeof data !== 'object') {
            result[list.join('.')] = data;
            return;
        }
        Object.keys(data).forEach(key => {
            const value = data[key];
            run(value, [...list, key]);
        });
    };
    run(obj, []);
    return result;
}

console.log(pathObject(obj));
// {
//     'a.b.c.d': 1,
//     'a.b.e.f.g': 2,
//     'a.h': 3,
//     'a.i.j': 4,
//     'a.i.k': 5,
//     'a.i.l.m': 6,
//     'a.i.l.n': 7,
//     'o.p': 8,
//     'q': 9
// }