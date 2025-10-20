function simulateLights(currentState, days) {
    let state = [...currentState];
    const n = state.length;
    
    for (let day = 0; day < days; day++) {
        const newState = new Array(n).fill(0);
        
        for (let i = 0; i < n; i++) {
            if (i === 0 || i === n - 1) {
                // 两端的路灯总是灭
                newState[i] = 0;
            } else {
                const left = state[i - 1];
                const right = state[i + 1];
                // 如果相邻路灯状态相同则灭，否则亮
                newState[i] = (left === right) ? 0 : 1;
            }
        }
        
        state = newState;
    }
    
    return state.join('');
}

// 测试用例
console.log(simulateLights([1,1,1,0,1,1,1,1], 2)); // "00000110"
console.log(simulateLights([1,0,0,0,0,1,0,0], 8)); // "01010010"
console.log(simulateLights([1,1,1,1,1,1,1,1], 3)); // "00000000"
console.log(simulateLights([0,0,0,0,0,0,0,0], 5)); // "00000000"
console.log(simulateLights([1,0,1,0,1,0,1,0], 4)); // "01010100"

function simulateLightsOptimized(currentState, days) {
    let state = [...currentState];
    const n = state.length;
    
    for (let day = 0; day < days; day++) {
        let prev = state[0];
        state[0] = 0; // 第一个路灯总是灭
        
        for (let i = 1; i < n - 1; i++) {
            const curr = state[i];
            const next = state[i + 1];
            state[i] = (prev === next) ? 0 : 1;
            prev = curr;
        }
        
        state[n - 1] = 0; // 最后一个路灯总是灭
    }
    
    return state.join('');
}
console.log(1);
console.log(simulateLightsOptimized([1,1,1,0,1,1,1,1], 2)); // "00000110"
console.log(simulateLightsOptimized([1,0,1,0,1,0,0,1], 1)); // "01010010"
console.log(simulateLightsOptimized([1,1,1,1,1,1,1,1], 3)); // "00000000"
console.log(simulateLightsOptimized([0,0,0,0,0,0,0,0], 5)); // "00000000"
console.log(simulateLightsOptimized([1,0,1,0,1,0,1,0], 4)); // "01010100"