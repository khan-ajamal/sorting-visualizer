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
    rootNode.mid = mid;

    let left = arr.slice(0, mid);
    let right = arr.slice(mid);

    rootNode.left = new Node(cloneDeep(left));
    rootNode.right = new Node(cloneDeep(right));

    store.dispatch(addProgress(cloneDeep(rootNode)));

    let sortedLeft = mergeSort(left, rootNode.left);
    rootNode.left = new Node(cloneDeep(sortedLeft));
    rootNode.left.isSorted = true;
    store.dispatch(addProgress(cloneDeep(rootNode)));

    let sortedRight = mergeSort(right, rootNode.right);
    rootNode.right = new Node(cloneDeep(sortedRight));
    rootNode.right.isSorted = true;
    store.dispatch(addProgress(cloneDeep(rootNode)));

    let sortedArr = merge(sortedLeft, sortedRight);

    rootNode = new Node(cloneDeep(sortedArr));
    rootNode.isSorted = true;

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

export const codeBlock = {
    python: `def mergeSort(arr):
    if len(arr) > 1:
        # Finding the mid of the array
        mid = len(arr)//2
        # Dividing the array elements
        L = arr[:mid]
        # into 2 halves
        R = arr[mid:]
        # Sorting the first half
        mergeSort(L)
        # Sorting the second half
        mergeSort(R)
        i = j = k = 0
        # Copy data to temp arrays L[] and R[]
        while i < len(L) and j < len(R):
            if L[i] < R[j]:
                arr[k] = L[i]
                i += 1
            else:
                arr[k] = R[j]
                j += 1
            k += 1
        # Checking if any element was left
        while i < len(L):
            arr[k] = L[i]
            i += 1
            k += 1
        while j < len(R):
            arr[k] = R[j]
            j += 1
            k += 1`,
    javascript: `const merge = (arr, l, m, r) => {
        let n1 = m - l + 1;
        let n2 = r - m;

        let L = new Array(n1);
        let R = new Array(n2);

        for (let i = 0; i < n1; i++)
            L[i] = arr[l + i];
        for (let j = 0; j < n2; j++)
            R[j] = arr[m + 1 + j];

        var i = 0;
        var j = 0;
        var k = l;

        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                i++;
            }
            else {
                arr[k] = R[j];
                j++;
            }
            k++;
        }

        while (i < n1) {
            arr[k] = L[i];
            i++;
            k++;
        }
        while (j < n2) {
            arr[k] = R[j];
            j++;
            k++;
        }
    }

    const mergeSort = (arr, l, r) => {
        if(l >= r){
            return;
        }
        let m = l + parseInt((r-l)/2);
        mergeSort(arr, l, m);
        mergeSort(arr, m+1, r);
        merge(arr, l, m, r);
    }`,
};
