
function getTargetRange(list: number[], target: number) {
    const hash = {};
    for (let i = 0; i < list.length; i++) {
        const num = list[i];
        if (hash[target - num]) {
            return [num, target - num];
        }
        hash[num] = true;
    }
    list.forEach((it, index) => {
        
    });


}