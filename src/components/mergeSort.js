import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { cloneDeep, map } from "lodash-es";
import { AnimatePresence } from "framer-motion";

import Portal from "components/portal";
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
                    await delay(500);
                }
                setIsSorting(false);
            }
        };
        render();
    }, [progress]);

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
                    isSorted={tree.isSorted}
                    mid={tree.mid}
                />
            )}
            <div className="mt-10">
                <h1 className="text-xl font-medium">Color Code</h1>
                <div>
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
