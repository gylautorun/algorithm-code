// [0,1,2,3,0,4,0,5] => [1,2,3,4,5,0,0,0]

const arr = [0,1,2,3,0,4,0,5];
function moveZero(arr) {
    let i0 = 0;
    let i = 0;
    while (i < arr.length) {
        if (arr[i] !== 0) {
            arr[i0] = arr[i];
            if (i !== i0) {
                arr[i] = 0;
            }
            i0++;
        }
        else {

        }
        i++;
    }
}

moveZero(arr);
console.log(arr);
