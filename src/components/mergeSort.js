import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { cloneDeep, map } from "lodash-es";
import { AnimatePresence } from "framer-motion";

import Portal from "components/portal";
import SampleCode from "components/codeBlocks";
import { mergeSort } from "algorithms/merge-sort";
import { delay, generateRandomArray, Node } from "utils";
import { addProgress, resetProgress } from "features/treeSlice";

export const MergeSort = () => {
    const [viewMergeSort, setViewMergeSort] = useState(false);
    return (
        <>
            <button
                id="mergeSort"
                className="h-10 px-4 rounded bg-teal-600 font-medium text-white"
                onClick={() => setViewMergeSort(true)}
            >
                Visualise Merge Sort
            </button>

            <AnimatePresence>
                {viewMergeSort && (
                    <Portal
                        onClose={() => setViewMergeSort(false)}
                        title="Merge Sort"
                    >
                        <MergeSortVisualizer />
                    </Portal>
                )}
            </AnimatePresence>
        </>
    );
};

const MergeSortVisualizer = () => {
    const [tree, setTree] = useState(null);
    const [speed, setSpeed] = useState(250);
    const [isSorting, setIsSorting] = useState(false);

    const { progress } = useSelector((state) => state.tree);
    const dispatch = useDispatch();

    useEffect(() => {
        const elem = generateRandomArray(15);
        const node = new Node(cloneDeep(elem));
        setTree(cloneDeep(node));
        return () => {
            setIsSorting(false);
            dispatch(resetProgress());
            setTree(null);
        };
    }, [dispatch]);

    const sort = () => {
        setIsSorting(true);
        const data = mergeSort(cloneDeep(tree.data), tree);
        let sortedNode = new Node(cloneDeep(data));
        sortedNode.isFinal = true;
        sortedNode.isSorted = true;
        dispatch(addProgress(cloneDeep(sortedNode)));
    };

    const reset = () => {
        setIsSorting(false);
        dispatch(resetProgress());
        const elem = generateRandomArray(15);
        const node = new Node(cloneDeep(elem));
        setTree(cloneDeep(node));
    };

    useEffect(() => {
        const render = async () => {
            if (progress) {
                for (let index = 0; index < progress.length; index++) {
                    const element = progress[index];
                    setTree(cloneDeep(element));
                    await delay(speed);
                }
                setIsSorting(false);
            }
        };
        render();
    }, [progress, speed]);

    const changeSpeed = (e) => {
        reset();
        setSpeed(e.target.value);
    };

    return (
        <div className="w-full flex">
            <div className="w-3/5">
                {tree && (
                    <RenderTree
                        data={tree.data}
                        left={tree.left}
                        right={tree.right}
                        isSorted={tree.isSorted}
                        mid={tree.mid}
                    />
                )}
            </div>
            <div className="w-2/5">
                <div className="mb-10 w-full flex">
                    <button
                        disabled={isSorting}
                        onClick={sort}
                        className="h-10 w-40 shadow font-medium px-2 bg-green-600 text-white rounded disabled:bg-green-300"
                    >
                        {isSorting ? "Sorting" : "Start"}
                    </button>
                    <button
                        disabled={isSorting}
                        onClick={reset}
                        className="h-10 w-40 shadow font-medium px-2 bg-yellow-400 text-white rounded disabled:bg-yellow-200 ml-3"
                    >
                        Reset
                    </button>
                </div>
                <div className="mb-10">
                    <h1 className="text-xl font-medium">Color Code</h1>
                    <div className="flex space-x-4">
                        <div className="flex justify-start items-center space-x-2">
                            <div className="h-4 w-4 bg-red-500 rounded"></div>
                            <div>Middle Element</div>
                        </div>
                        <div className="flex justify-start items-center space-x-2">
                            <div className="h-4 w-4 bg-green-500 rounded"></div>
                            <div>Sorted Element</div>
                        </div>
                    </div>
                </div>
                <div className="mb-10">
                    <h1 className="text-xl font-medium mb-2">Speed</h1>
                    <div className="flex justify-start items-center">
                        <input
                            className="w-1/2"
                            type="range"
                            min="100"
                            max="1000"
                            step="10"
                            value={speed}
                            onChange={changeSpeed}
                            disabled={isSorting}
                        />
                        <div className="ml-4 h-8 flex justify-center items-center px-2 border border-gray-800 rounded bg-green-50">
                            {speed}
                        </div>
                    </div>
                </div>
                <div className="mb-10">
                    <h1 className="text-xl font-medium mb-2">Explaination</h1>
                    <div className="text-justify mb-8">
                        <p>
                            Merge Sort is a Divide and Conquer algorithm. It
                            divides the input array into two halves, calls
                            itself for the two halves, and then merges the two
                            sorted halves. The merge() function is used for
                            merging two halves. The merge(arr, l, m, r) is a key
                            process that assumes that arr[l..m] and arr[m+1..r]
                            are sorted and merges the two sorted sub-arrays into
                            one.
                        </p>
                        <p>
                            Source
                            <a
                                href="https://www.geeksforgeeks.org/merge-sort/"
                                className="ml-1 font-medium text-green-600"
                            >
                                geeksforgeeks
                            </a>
                        </p>
                    </div>
                    <h1 className="text-xl font-medium mb-2">Algorithm</h1>
                    <div className="mb-4">
                        <SampleCode algorithm="merge" />
                    </div>
                    <h1 className="text-xl font-medium mb-2">
                        Space and Time Complexity
                    </h1>
                    <div className="text-justify mb-4">
                        <div className="flex items-center mb-2">
                            <span className="block font-medium w-32">Time</span>
                            <span className="font-mono italic">O(nLogn)</span>
                        </div>
                        <div className="flex items-center">
                            <span className="block font-medium w-32">
                                Space
                            </span>
                            <span className="font-mono italic">O(n)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Block = ({ elem, isSorted, isMid }) => {
    return (
        <div
            className={`w-8 h-8 rounded border border-solid border-gray-400 border-collapse flex justify-center items-center ${
                isMid ? "bg-red-500" : isSorted ? "bg-green-500" : "bg-gray-200"
            }`}
        >
            <span
                className={`font-medium ${
                    isSorted || isMid ? "text-white" : ""
                }`}
            >
                {elem}
            </span>
        </div>
    );
};

const RenderTree = ({ data, left, right, isSorted, mid }) => {
    return (
        <div className="w-full">
            <div className="w-full">
                <div className="flex justify-center">
                    {map(data, (elem, idx) => (
                        <Block
                            key={idx}
                            isMid={idx === mid}
                            elem={elem}
                            isSorted={isSorted}
                        />
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
                            isSorted={left.isSorted}
                            mid={left.mid}
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
                            isSorted={right.isSorted}
                            mid={right.mid}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
