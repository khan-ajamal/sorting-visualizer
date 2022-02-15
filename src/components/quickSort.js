import { useState, useEffect } from "react";

import { cloneDeep, includes, isNull, map } from "lodash-es";
import { AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import Portal from "components/portal";
import { quickSort } from "algorithms/quick-sort";
import { generateRandomArray, Node, delay } from "utils";
import { addProgress, resetProgress } from "features/quickSort";

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

    const { progress } = useSelector((state) => state.quickSort);
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
        quickSort(tree.data, 0, tree.data.length - 1);
        let sortedNode = new Node(cloneDeep(tree.data));
        sortedNode.left = 0;
        sortedNode.right = sortedNode.data.length;
        dispatch(addProgress(cloneDeep(sortedNode)));
    };

    const reset = () => {
        setIsSorting(false);
        const elem = generateRandomArray(15);
        const node = new Node(cloneDeep(elem));
        setTree(cloneDeep(node));
        dispatch(resetProgress());
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
            {tree && <RenderTree node={tree} />}
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
                    <div className="flex justify-start items-center space-x-2">
                        <div className="h-4 w-4 bg-blue-300 rounded"></div>
                        <div>Active Partition</div>
                    </div>
                    <div className="flex justify-start items-center space-x-2">
                        <div className="h-4 w-4 bg-pink-500 rounded"></div>
                        <div>Partition Index</div>
                    </div>
                    <div className="flex justify-start items-center space-x-2">
                        <div className="h-4 w-4 bg-purple-500 rounded"></div>
                        <div>Current Index</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Block = ({
    elem,
    isUnderActivePartition,
    pivot,
    pIndex,
    isSwapping,
    currentIndex,
}) => {
    let baseClassName =
        "w-8 h-8 relative rounded border border-solid border-gray-400 border-collapse flex justify-center items-center";
    if (isSwapping) {
        baseClassName += " bg-yellow-500";
    } else if (pivot) {
        baseClassName += " bg-red-500";
    } else if (isUnderActivePartition) {
        baseClassName += " bg-blue-300";
    } else {
        baseClassName += "bg-gray-200";
    }
    return (
        <div className={baseClassName}>
            <span className={`font-medium`}>{elem}</span>
            {pIndex && (
                <span className="block absolute top-9 left-5 rounded h-12 w-1 bg-pink-500 before:block before:bg-pink-500 before:w-2 before:h-2 before:transform before:-translate-x-0.5 before:rotate-45"></span>
            )}
            {currentIndex && (
                <span className="block absolute top-9 right-5 rounded h-12 w-1 bg-purple-500 before:block before:bg-purple-500 before:w-2 before:h-2 before:transform before:-translate-x-0.5 before:rotate-45"></span>
            )}
        </div>
    );
};

const RenderTree = ({ node }) => {
    return (
        <div className="w-full">
            <div className="w-full">
                <div className="flex justify-center">
                    {map(node.data, (elem, idx) => (
                        <Block
                            key={idx}
                            elem={elem}
                            isUnderActivePartition={
                                !isNull(node.left) &&
                                node.left <= idx &&
                                !isNull(node.right) &&
                                idx <= node.right
                            }
                            pivot={node.pivot === idx}
                            pIndex={node.pIndex === idx}
                            isSwapping={includes(node.swapping, idx)}
                            currentIndex={idx === node.currentIndex}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
