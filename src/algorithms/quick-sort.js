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
