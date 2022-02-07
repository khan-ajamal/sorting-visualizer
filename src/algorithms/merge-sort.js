import { clone } from "lodash-es";
import { Node } from "../utils";

export const mergeSort = (arr, rootNode) => {
    if (arr.length < 2) {
        // array already sorted
        return arr;
    }

    let mid = Math.floor(arr.length / 2);

    let left = arr.slice(0, mid);
    let right = arr.slice(mid);

    rootNode.left = new Node(clone(left));
    rootNode.right = new Node(clone(right));

    let sortedLeft = mergeSort(left, rootNode.left);
    let sortedRight = mergeSort(right, rootNode.right);

    let sortedArr = merge(sortedLeft, sortedRight);

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
