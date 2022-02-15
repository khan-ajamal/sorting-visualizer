export const quickSort = (arr, start, end) => {
    /**
     * arr (array) - array of elements
     * start (number) - start index of array
     * end (number) - end index of array
     */
    if (start < end) {
        let pIndex = partition(arr, start, end);
        quickSort(arr, start, pIndex - 1);
        quickSort(arr, pIndex + 1, end);
    }
};

const partition = (arr, start, end) => {
    let pivot = arr[end];
    let pIndex = start;
    for (let idx = start; idx < end; idx++) {
        if (arr[idx] < pivot) {
            swap(arr, idx, pIndex);
            pIndex++;
        }
    }
    swap(arr, end, pIndex);
    return pIndex;
};

const swap = (arr, idx, idy) => {
    let temp = arr[idx];
    arr[idx] = arr[idy];
    arr[idy] = temp;
};
