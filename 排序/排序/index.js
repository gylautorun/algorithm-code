var MergeSort = {
    binaryInsert: function (arr) {
        console.log(arr);

        var i, j, left, right, center, tmp, len = arr.length;
        for (i = 1; i < len; i++) {

            //如果新记录小于有序序列的最大元素，则用二分法找出新纪录在有序序列中的位置
            if (arr[i] < arr[i - 1]) {
                left = 0;
                right = i - 1;
                while (left < right) {
                    //获取中间位置索引，把有序序列分成两个子序列
                    center = Math.ceil((right + left) / 2);

                    if (arr[center] < arr[i]) {
                        //如果新纪录大于中间位置记录，则在右边序列继续进行二分
                        left = center + 1;
                    } else {
                        //如果新纪录小于中间位置记录，则在左边序列继续进行二分
                        right = center - 1;
                    }
                }

                tmp = arr[i];

                //把比arr[i]大的记录往后移
                for (j = i; j > left; j--) {
                    arr[j] = arr[j - 1];
                }

                arr[left] = tmp;
            }
        }

        console.log(arr);
    },
    shell: function(arr){
        console.log(arr);

        var i, j, tmp, swap, len = arr.length, step = Math.floor(len / 2);
        while(step > 0){
            for(i = step; i < len; i++){
                tmp = arr[i];
                swap = false;
                for(j = i - step; j >= 0 && arr[j] > tmp; j -= step){
                    swap = true;
                    arr[j + step] = arr[j];
                }

                if(swap){
                    arr[j + step] = tmp;
                }
            }
            console.log(arr);

            step = Math.floor(step / 2);
        }

        console.log(arr);
    }
}

MergeSort.shell([1,3,4,6,7,9,8,5,4,3,2,1]);