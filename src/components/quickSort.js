import { useState, useEffect } from "react";

import { cloneDeep, map } from "lodash-es";
import { AnimatePresence } from "framer-motion";

import Portal from "components/portal";
import { quickSort } from "algorithms/quick-sort";
import { generateRandomArray } from "utils";

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
        this.pIdex = null;
    }
}

export const QuickSort = () => {
    const [viewQuickSort, setViewQuickSort] = useState(false);
    return (
        <>
            <button
                id="mergeSort"
                className="h-10 px-4 rounded bg-teal-600 font-medium text-white"
                onClick={() => setViewQuickSort(true)}
            >
                Visualise Quick Sort
            </button>

            <AnimatePresence>
                {viewQuickSort && (
                    <Portal
                        onClose={() => setViewQuickSort(false)}
                        title="Quick Sort"
                    >
                        <QuickSortVisualizer />
                    </Portal>
                )}
            </AnimatePresence>
        </>
    );
};

const QuickSortVisualizer = () => {
    const [tree, setTree] = useState(null);
    const [isSorting, setIsSorting] = useState(false);

    useEffect(() => {
        const elem = generateRandomArray(15);
        const node = new Node(cloneDeep(elem));
        setTree(cloneDeep(node));
        return () => {
            setIsSorting(false);
            setTree(null);
        };
    }, []);

    const sort = () => {
        setIsSorting(true);
        quickSort(tree.data, 0, tree.data.length - 1);
        let sortedNode = new Node(cloneDeep(tree.data));
        sortedNode.isFinal = true;
        setTree(cloneDeep(sortedNode));
        setIsSorting(false);
    };

    const reset = () => {
        setIsSorting(false);
        const elem = generateRandomArray(15);
        const node = new Node(cloneDeep(elem));
        setTree(cloneDeep(node));
    };

    return (
        <div className="w-full">
            <div className="mb-4 w-full flex justify-center">
                <button
                    disabled={isSorting}
                    onClick={sort}
                    className="h-10 w-40 font-medium px-2 bg-green-600 text-white rounded disabled:bg-green-300"
                >
                    {isSorting ? "Sorting" : "Start"}
                </button>
                <button
                    disabled={isSorting}
                    onClick={reset}
                    className="h-10 w-40 font-medium px-2 bg-yellow-400 text-white rounded disabled:bg-yellow-200 ml-3"
                >
                    Reset
                </button>
            </div>
            {tree && (
                <RenderTree
                    data={tree.data}
                    left={tree.left}
                    right={tree.right}
                    pIndex={tree.pIndex}
                />
            )}
            <div className="mt-10">
                <h1 className="text-xl font-medium">Color Code</h1>
                <div>
                    <div className="flex justify-start items-center space-x-2">
                        <div className="h-4 w-4 bg-red-500 rounded"></div>
                        <div>Pivot Element</div>
                    </div>
                    <div className="flex justify-start items-center space-x-2">
                        <div className="h-4 w-4 bg-yellow-500 rounded"></div>
                        <div>Swapping Elements</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Block = ({ elem, isPivot }) => {
    return (
        <div
            className={`w-8 h-8 rounded border border-solid border-gray-400 border-collapse flex justify-center items-center ${
                isPivot ? "bg-red-500" : "bg-gray-200"
            }`}
        >
            <span className={`font-medium ${isPivot ? "text-white" : ""}`}>
                {elem}
            </span>
        </div>
    );
};

const RenderTree = ({ data, left, right, pIndex }) => {
    return (
        <div className="w-full">
            <div className="w-full">
                <div className="flex justify-center">
                    {map(data, (elem, idx) => (
                        <Block key={idx} isPivot={idx === pIndex} elem={elem} />
                    ))}
                </div>
            </div>
            <div className="w-full flex justify-between">
                <div className="w-1/2 left-block">
                    {left && (
                        <div className="w-full h-10 flex justify-end">
                            <div className="h-1 w-10 rounded bg-slate-600 origin-top-right transform -rotate-45"></div>
                        </div>
                    )}

                    {left && (
                        <RenderTree
                            data={left.data}
                            left={left.left}
                            right={left.right}
                            pIndex={left.pIndex}
                        />
                    )}
                </div>
                <div className="w-1/2 right-block">
                    {right && (
                        <div className="w-full h-10 flex justify-start">
                            <div className="h-1 w-10 rounded bg-slate-600 origin-top-left transform rotate-45"></div>
                        </div>
                    )}
                    {right && (
                        <RenderTree
                            data={right.data}
                            left={right.left}
                            right={right.right}
                            pIndex={right.pIndex}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
