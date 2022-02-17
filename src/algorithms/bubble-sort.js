import store from "store";
import { compare, done } from "features/animationSlice";

export const bubbleSort = (array) => {
    let newArray = [...array];
    for (let i = 0; i < newArray.length; i++) {
        for (let j = 0; j < newArray.length - i - 1; j++) {
            const payload = {
                barOne: j,
                barTwo: j + 1,
                swapping: false,
                intermediateArray: [...newArray],
            };
            if (newArray[j] > newArray[j + 1]) {
                let temp = newArray[j];
                newArray[j] = newArray[j + 1];
                newArray[j + 1] = temp;

                payload.swapping = true;
                payload.intermediateArray = [...newArray];
            }
            store.dispatch(compare(payload));
        }
    }
    store.dispatch(done());
    return newArray;
};

export const codeBlock = {
    python: `def bubble_sort(arr):
    for i in range(len(arr)):
        for j in range(len(arr) - i - 1):
            if arr[j] > arr[j+1]:
            temp = arr[j]
            arr[i] = arr[j+1]
            arr[j+1] = temp`,
    javascript: `const bubbleSort = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }`,
};
