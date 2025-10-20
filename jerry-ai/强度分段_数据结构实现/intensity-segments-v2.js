class IntensitySegments {
    /**
     * Using a map (because of it dscreteness) to store: [segemnt] -> intensity
     */
    constructor() {
        this.map = new Map()
    }
    /**
     * add a new range(from <-> to, to not included) of intensity to existing one.
     * @param {*} from 
     * @param {*} to 
     * @param {*} amount 
     * @returns 
     */
    add(from, to, amount) {
        // TODO: implement this
        const keys = this.orderedKeys()
        if (keys.length == 0) {
            this.set(from, to, amount);
            return;
        }

        const lKeys = keys.length
        if (to < keys[0] || from > keys[lKeys - 1]) {
            this.set(from, to, amount);
            return;
        }

        if (!this.map.has(to)) {
            const l = this.leftKey(to)
            this.map.set(to, this.map.get(l))
        }

        if (from < keys[0]) {
            this.map.set(from, amount)
        } else if (from == keys[0]) {
            this.map.set(from, this.map.get(from) + amount)
        } else {
            if (!this.map.has(from)) {
                this.map.set(from, amount)
                let l = this.leftKey(from)
                if (l != -1) {
                    this.map.set(from, this.map.get(from) + this.map.get(l))
                }
            } else {
                this.map.set(from, this.map.get(from) + amount)
            }
        }

        keys.forEach(k => {
            if (k > from && k < to) {
                this.map.set(k, this.map.get(k) + amount)
            }
        })

        this.merge()
    }
    /**
     * set a new range(from <-> to, to not included) of intensity based on existing one.
     * @param {*} from 
     * @param {*} to 
     * @param {*} amount 
     * @returns 
     */
    set(from, to, amount) {
        // TODO: implement this
        let keys = this.orderedKeys()
        if (keys.length == 0) {
            this.map.set(to, 0)
            this.map.set(from, amount)
            return
        }

        let lKeys = keys.length
        if (to < keys[0] || to > keys[lKeys - 1]) {
            this.map.set(to, 0)
        } else if (!this.map.has(to)) {
            let l = this.leftKey(to)
            this.map.set(to, this.map.get(l))
        }

        this.map.set(from, amount)

        keys = this.orderedKeys()
        for (const k in keys) {
            if (k > from && k < to) {
                this.map.delete(k)
            }
        }

        this.merge()
    }
    /**
     * print the dumped string simply
     */
    toString() {
        // TODO: implement this
        console.log(this.dumps())
    }

    /**
     * get ordered keys of 'it' member.
     * @returns a sorted keys of is.it
     */
    orderedKeys() {
        let keys = this.map.keys();
        let ks = Array.from(keys);
        ks.sort();
        return ks;
    }

    /**
     * get the left segment number for x from this.map
     * @param {*} x 
     * @returns the left segment number of the given.
     */
    leftKey(x) {
        let l = -1
        let keys = this.orderedKeys()
        keys.forEach(k => {
            if (k < x) {
                l = k
            }
        })
        return l
    }

    /**
     * merge continous segments to together if they have same intensity
     * @returns 
     */
    merge() {
        let keys = this.orderedKeys()
        if (keys.length == 0) {
            return
        }

        let i = 0
        for (; i < keys.length && this.map.get(keys[i]) == 0; i++) {
            this.map.delete(keys[i])
        }
        keys.splice(0, i)

        for (i = keys.length - 1; i >= 0; i--) {
            if (this.map.get(keys[i]) == 0) {
                if (i - 1 >= 0 && this.map.get(keys[i - 1]) == 0) {
                    this.map.delete(keys[i])
                    keys.splice(i, 1)
                }
            }
        }

        let last
        last = this.map.get(keys[0])
        for (let i = 1; i < keys.length; i++) {
            if (this.map.get(keys[i]) == last && last != 0) {
                this.map.delete(keys[i])
            } else {
                last = this.map.get(keys[i])
            }
        }

        last = 0
        for (let i = keys.length - 2; i >= 0; i--) {
            if (this.map.get(keys[i]) == 0 && last == 0) {
                this.map.delete(keys[i])
            } else {
                last = this.map.get(keys[i])
            }
        }
    }

    /**
     * dumps return a string of simple format, i.e. [[20 1] [30 2] [40 0]]
     * @returns 
     */
    dumps() {
        let keys = this.orderedKeys()
        let rlt = []
        keys.forEach(k => {
            rlt.push(`[${k},${this.map.get(k)}]`)
        })
        return `[${rlt.join(",")}]`
    }
}

const segments = new IntensitySegments();
segments.toString(); // Should be "[]"
segments.add(10, 30, 1);
segments.toString(); // Should be: "[[10,1],[30,0]]"
segments.add(20, 40, 1);
segments.toString(); // Should be: "[[10,1],[20,2],[30,1],[40,0]]"
segments.add(10, 40, -2);
segments.toString(); // Should be: "[[10,-1],[20,0],[30,-1],[40,0]]"
// Another example sequence:
const segments2 = new IntensitySegments();
segments2.toString(); // Should be "[]"
segments2.add(10, 30, 1);
segments2.toString(); // Should be "[[10,1],[30,0]]"
segments2.add(20, 40, 1);
segments2.toString(); // Should be "[[10,1],[20,2],[30,1],[40,0]]"
segments2.add(10, 40, -1);
segments2.toString(); // Should be "[[20,1],[30,0]]"
segments2.add(10, 40, -1);
segments2.toString(); // Should be "[[10,-1],[20,0],[30,-1],[40,0]]"

const segments3 = new IntensitySegments();
segments3.toString(); // Should be "[]"
segments3.set(10, 30, 1);
segments3.toString(); // Should be: "[[10,1],[30,0]]"
segments3.set(20, 40, 1);
segments3.toString(); // Should be: "[[10,1],[20,2],[30,1],[40,0]]"
segments3.set(10, 40, -2);
segments3.toString(); // Should be: "[[10,-1],[20,0],[30,-1],[40,0]]"

const segments4 = new IntensitySegments();
segments4.toString(); // Should be "[]"
segments4.set(10, 30, 1);
segments4.toString(); // Should be "[[10,1],[30,0]]"
segments4.set(20, 40, 1);
segments4.toString(); // Should be "[[10,1],[20,2],[30,1],[40,0]]"
segments4.set(10, 40, -1);
segments4.toString(); // Should be "[[20,1],[30,0]]"
segments4.set(10, 40, -4);
segments4.toString(); // Should be "[[10,-1],[20,0],[30,-1],[40,0]]"