import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { clone, map } from "lodash-es";
import { AnimatePresence } from "framer-motion";

import Portal from "../components/portal";
import { mergeSort } from "../algorithms/merge-sort";
import { delay, generateRandomArray, Node } from "../utils";

export const MergeSort = () => {
    const [viewMergeSort, setViewMergeSort] = useState(true);
    return (
        <>
            <button
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
    const [elements, setElements] = useState([]);

    const { progress } = useSelector((state) => state.tree);

    useEffect(() => {
        setElements(generateRandomArray());
    }, []);

    const sort = () => {
        let elem = clone(elements);
        const rootNode = new Node(elem);
        elem = mergeSort(elem, rootNode);
    };

    useEffect(() => {
        const render = async () => {
            if (progress) {
                for (let index = 0; index < progress.length; index++) {
                    const element = progress[index];
                    setTree(element);
                    await delay(500);
                }
            }
        };
        render();
    }, [progress]);

    return (
        <div className="w-full">
            <div className="mb-4 w-full flex justify-center">
                <button
                    onClick={sort}
                    className="h-10 w-40 font-medium px-2 bg-green-600 text-white rounded"
                >
                    Start
                </button>
            </div>
            <div className="w-full flex justify-center">
                {map(elements, (elem, idx) => (
                    <Block key={idx} elem={elem} />
                ))}
            </div>
            {tree && <RenderTree left={tree.left} right={tree.right} />}
        </div>
    );
};

const Block = ({ elem }) => {
    return (
        <div className="w-8 h-8 bg-gray-200 rounded border border-solid border-gray-400 border-collapse flex justify-center items-center">
            <span className="font-medium">{elem}</span>
        </div>
    );
};

const RenderTree = ({ data, left, right }) => {
    return (
        <div className="w-full">
            <div className="w-full">
                <div className="flex justify-center">
                    {map(data, (elem, idx) => (
                        <Block key={idx} elem={elem} />
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
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
