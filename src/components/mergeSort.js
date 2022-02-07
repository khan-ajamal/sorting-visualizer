import { useState, useEffect } from "react";

import { clone, map } from "lodash-es";

import { mergeSort } from "../algorithms/merge-sort";
import { BinaryTree, generateRandomArray, Node } from "../utils";

const MergeSortVisualizer = () => {
    const [tree, setTree] = useState(null);
    const [elements, setElements] = useState([]);

    useEffect(() => {
        setElements(generateRandomArray());
    }, []);

    const sort = () => {
        let elem = clone(elements);
        const tree = new BinaryTree();
        const rootNode = new Node(elem);
        elem = mergeSort(elem, rootNode);
        tree.addNode(rootNode);
        setTree(tree);
        setElements(clone(elem));
    };
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
            {tree && (
                <RenderTree left={tree.root.left} right={tree.root.right} />
            )}
        </div>
    );
};

const Block = ({ elem }) => {
    return (
        <div className="w-10 h-10 bg-gray-200 rounded border border-solid border-gray-400 border-collapse flex justify-center items-center">
            <span className="font-medium">{elem}</span>
        </div>
    );
};

const RenderTree = ({ data, left, right }) => {
    return (
        <div className="w-full mt-4">
            <div className="w-full flex justify-center">
                {map(data, (elem, idx) => (
                    <Block key={idx} elem={elem} />
                ))}
            </div>
            <div className="w-full flex justify-between">
                <div className="w-1/2 left-block">
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

export default MergeSortVisualizer;
