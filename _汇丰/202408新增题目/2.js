
function simulateStreetLights(currentState, days) {
    let state = [...currentState];
    const n = state.length;
    
    for (let day = 0; day < days; day++) {
        const newState = new Array(n).fill(0);
        
        // 处理第一个灯（左侧假设为0）
        newState[0] = (0 === state[1]) ? 0 : 1;
        
        // 处理中间灯
        for (let i = 1; i < n - 1; i++) {
            newState[i] = (state[i-1] === state[i+1]) ? 0 : 1;
        }
        
        // 处理最后一个灯（右侧假设为0）
        newState[n-1] = (state[n-2] === 0) ? 0 : 1;
        
        state = newState;
        
        // 优化：检测状态循环，避免不必要计算
        if (day > 0 && state.every((val, idx) => val === currentState[idx])) {
            const cycleLength = day + 1;
            days = days % cycleLength;
            day = -1; // 重置计数器
            continue;
        }
    }
    
    return state;
}

// 1 0 0 0 0 1 0 0
// 1 1 1 0 1 1 1 1
// 示例输入处理 
const input = `8
1 0 0 0 0 1 0 0
1`;
const lines = input.split('\n');
const n = parseInt(lines[0]);
const initialState = lines[1].split(' ').map(Number);
const m = parseInt(lines[2]);

const result = simulateStreetLights(initialState, m);
console.log(result.join(' ')); // 输出：0 0 0 0 0 1 1 0
