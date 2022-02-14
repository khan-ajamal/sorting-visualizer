import { createSlice } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash-es";

const findNodeByIdx = (payload, node) => {
    if (node.left) {
        let a = findNodeByIdx(payload, node.left);
        if (a) {
            node.left = a;
        }
    }
    if (node.right) {
        let b = findNodeByIdx(payload, node.right);
        if (b) {
            node.right = b;
        }
    }
    if (node.idx === payload.idx) {
        node.left = cloneDeep(payload.left);
        node.right = cloneDeep(payload.right);
        node.mid = payload.mid;
    }
    return node;
};

export const treeSlice = createSlice({
    name: "tree",
    initialState: {
        progress: [],
    },
    reducers: {
        addProgress: (state, action) => {
            let payload = action.payload;
            if (payload.isFinal) {
                state.progress.push(payload);
            } else {
                let lastNodeArr = state.progress.slice(-1);
                if (lastNodeArr.length) {
                    let lastNode = cloneDeep(lastNodeArr[0]);
                    state.progress.push(findNodeByIdx(payload, lastNode));
                } else {
                    // first node, push directly
                    state.progress.push(payload);
                }
            }
        },
        resetProgress: (state) => {
            state.progress = [];
        },
    },
});

// Action creators are generated for each case reducer function
export const { addProgress, resetProgress } = treeSlice.actions;

export default treeSlice.reducer;
