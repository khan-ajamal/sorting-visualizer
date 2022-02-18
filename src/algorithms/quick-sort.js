import { cloneDeep } from "lodash-es";

import store from "store";
import { Node } from "utils";
import { addProgress } from "features/quickSort";

export const quickSort = (arr, start, end) => {
    let node = new Node(cloneDeep(arr));
    node.left = start;
    node.right = end;
    store.dispatch(addProgress(cloneDeep(node)));

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

    let node = new Node(cloneDeep(arr));
    node.left = start;
    node.right = end;
    node.pivot = end;
    node.pIndex = pIndex;

    store.dispatch(addProgress(cloneDeep(node)));

    for (let idx = start; idx < end; idx++) {
        node.currentIndex = idx;
        if (arr[idx] < pivot) {
            node.swapping = [idx, pIndex];
            store.dispatch(addProgress(cloneDeep(node)));
            swap(arr, idx, pIndex);
            node.data = cloneDeep(arr);
            store.dispatch(addProgress(cloneDeep(node)));
            pIndex++;
        }
        node.swapping = [];
        node.pIndex = pIndex;
        store.dispatch(addProgress(cloneDeep(node)));
    }
    node.currentIndex = end;
    node.swapping = [end, pIndex];
    store.dispatch(addProgress(cloneDeep(node)));
    swap(arr, end, pIndex);
    node.swapping = [];
    store.dispatch(addProgress(cloneDeep(node)));
    return pIndex;
};

const swap = (arr, idx, idy) => {
    let temp = arr[idx];
    arr[idx] = arr[idy];
    arr[idy] = temp;
};

export const codeBlock = {
    python: `def partition(start, end, array):
    pivot_index = start
    pivot = array[pivot_index]
    while start < end:
        while start < len(array) and array[start] <= pivot:
            start += 1
        while array[end] > pivot:
            end -= 1
        if(start < end):
            array[start], array[end] = array[end], array[start]
    array[end], array[pivot_index] = array[pivot_index], array[end]
    return end

def quick_sort(start, end, array):
    if (start < end):
        p = partition(start, end, array)
        quick_sort(start, p - 1, array)
        quick_sort(p + 1, end, array)`,
    javascript: `const partition = (arr, low, high) => {
        let pivot = arr[high];

        let i = (low - 1);
        for (let j = low; j <= high - 1; j++) {
            if (arr[j] < pivot) {
                i++;
                swap(arr, i, j);
            }
        }
        swap(arr, i + 1, high);
        return (i + 1);
    }
    const quickSort = (arr, low, high) =? {
        if (low < high) {
            let pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }`,
};
