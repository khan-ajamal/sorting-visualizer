import { cloneDeep } from "lodash-es";

import store from "store";
import { Node } from "utils";
import { addProgress } from "features/treeSlice";

export const mergeSort = (arr, rootNode) => {
    if (arr.length < 2) {
        // array already sorted
        store.dispatch(addProgress(cloneDeep(rootNode)));
        return arr;
    }

    let mid = Math.floor(arr.length / 2);

    let left = arr.slice(0, mid);
    let right = arr.slice(mid);

    rootNode.left = new Node(cloneDeep(left));
    rootNode.right = new Node(cloneDeep(right));

    store.dispatch(addProgress(cloneDeep(rootNode)));

    let sortedLeft = mergeSort(left, rootNode.left);
    let sortedRight = mergeSort(right, rootNode.right);

    rootNode.left = new Node(cloneDeep(sortedLeft));
    rootNode.right = new Node(cloneDeep(sortedRight));

    store.dispatch(addProgress(cloneDeep(rootNode)));

    let sortedArr = merge(sortedLeft, sortedRight);

    rootNode.data = cloneDeep(sortedArr);

    store.dispatch(addProgress(cloneDeep(rootNode)));

    return sortedArr;
};

const merge = (left, right) => {
    let arr = [];
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            arr.push(left.shift());
        } else {
            arr.push(right.shift());
        }
    }

    return [...arr, ...left, ...right];
};
