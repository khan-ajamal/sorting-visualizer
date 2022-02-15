import { uniqueId } from "lodash-es";

export const NUMBER_OF_BARS = 25;

export const delay = (n) => {
    n = n || 2000;
    return new Promise((done) => {
        setTimeout(() => {
            done();
        }, n);
    });
};

export const generateRandomArray = (numberOfElements = NUMBER_OF_BARS) => {
    const array = [];
    for (let index = 0; index < numberOfElements; index++) {
        array.push(Math.ceil(Math.random() * 100));
    }
    return array;
};

export class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
        this.idx = uniqueId("root_");
        this.isSorted = false;
        this.isFinal = false;
        this.mid = null;
        this.pivot = null;
        this.pIndex = null;
        this.swapping = [];
        this.currentIndex = null;
    }
}
