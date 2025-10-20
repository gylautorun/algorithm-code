let nums1 = [1,3,5,7,9];
let nums2 = [2,4,6,8,10];

function merge(nums1, nums2) {
    const m = nums1.length;
    for (let i = 0; i < nums2.length; i++) {
        nums1[m + i] = nums2[i];
    }
    nums1.sort((a, b) => a - b);
}
// merge(nums1, nums2);

function merge2(nums1, nums2) {
    const m = nums1.length;
    const n = nums2.length;
    const temp = Array(m + n).fill(0);

    let i = 0;
    let j = 0;
    let l = 0;
    while (l < m + n) {
        if (i >= m) {
            temp[l] = nums2[j++];
        }
        else if (j >= n) {
            temp[l] = nums1[i++];
        }
        else if (nums1[i] > nums2[j]) {
            temp[l] = nums2[j++];
        }
        else {
            temp[l] = nums1[i++];
        }
        l++;
    }

    for (i = 0; i < m + n; i++) {
        nums1[i] = temp[i];
    }
}
// merge2(nums1, nums2);



function merge3(nums1, nums2) {
    const m = nums1.length;
    const n = nums2.length;

    let i = m - 1;
    let j = n - 1;
    let l = m + n - 1;
    while (l >= 0) {
        if (i < 0) {
            nums1[l] = nums2[j--];
        }
        else if (j < 0) {
            // 不用操作
        }
        else if (nums1[i] > nums2[j]) {
            nums1[l] = nums1[i--];
        }
        else {
            nums1[l] = nums2[j--];
        }
        l--;
    }
    
}
merge3(nums1, nums2);


console.log(nums1);





