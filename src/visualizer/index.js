import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import Portal from "../components/portal";
import { BubbleSort } from "../algorithms/bubble-sort";
import MergeSortVisualizer from "../components/mergeSort";
import { delay, generateRandomArray, NUMBER_OF_BARS } from "../utils";

import styles from "./visualizer.module.css";

const Visualizer = () => {
    const [array, setArray] = useState([]);
    const [sorted, setSorted] = useState([]);
    const [sorting, setSorting] = useState(null);
    const [barOne, setBarOne] = useState(null);
    const [barTwo, setBarTwo] = useState(null);

    const [viewMergeSort, setViewMergeSort] = useState(true);

    const [isSwapping, setIsSwapping] = useState(false);

    const { comparators, done } = useSelector((state) => state.comparing);

    const startBubbleSort = () => {
        BubbleSort(array);
    };

    const changeBarColor = async (elem, sortedIndex) => {
        if (sortedIndex !== null) {
            setSorting(sortedIndex);
            return;
        }

        setIsSwapping(false);

        setBarOne(elem.barOne);
        setBarTwo(elem.barTwo);

        await delay(250);

        if (elem.swapping) {
            setIsSwapping(true);
            setArray([...elem.intermediateArray]);
        }
    };

    // OnMount
    useEffect(() => {
        setArray(generateRandomArray());
    }, []);

    useEffect(() => {
        const update = async () => {
            if (done) {
                let i = 0;
                for (let index = 0; index < comparators.length; index++) {
                    const element = comparators[index];
                    changeBarColor(element, null);
                    if (index > 0 && element.barOne === 0) {
                        changeBarColor(element, NUMBER_OF_BARS - i - 1);
                        i++;
                    }
                    await delay(500);
                }
                changeBarColor(null, 1);
                await delay(250);
                changeBarColor(null, 0);
            }
        };
        update();
    }, [done, comparators]);

    const prevSortingRef = useRef();

    useEffect(() => {
        if (sorting !== prevSortingRef.current) {
            setSorted([...sorted, sorting]);
            prevSortingRef.current = sorting;
        }
    }, [sorting, sorted]);

    const getBarColor = (index) => {
        if (barOne === index || barTwo === index) {
            return styles.comparing;
        }
        return "";
    };

    const getSwapping = (index) => {
        if (barOne === index || barTwo === index) {
            return isSwapping ? styles.swapping : "";
        }
        return "";
    };

    const isSorted = (index) => {
        return sorted.includes(index);
    };

    return (
        <div className="container px-8">
            <div className="flex justify-start items-center flex-wrap">
                <div className="w-96 border border-gray-300 p-3">
                    <h3 className="mb-4">Bubble Sort</h3>
                    <div className="w-full flex justify-center items-end mb-4">
                        {array.map((item, index) => (
                            <div
                                key={index}
                                className={`${styles.bar} ${getBarColor(
                                    index
                                )} ${getSwapping(index)} ${
                                    isSorted(index) ? styles.sorted : ""
                                }`}
                                style={{ height: `${item + 100}px` }}
                            ></div>
                        ))}
                    </div>
                    <button
                        className="h-8 px-4 bg-red-400 flex justify-center items-center text-md text-white rounded-sm"
                        onClick={() => startBubbleSort()}
                    >
                        Start Sorting
                    </button>
                </div>
                <div className="h-80 w-96 border border-gray-300 p-3 ml-4">
                    <h3 className="mb-4">Merge Sort</h3>
                    <button onClick={() => setViewMergeSort(true)}>
                        View Merge Sort
                    </button>
                    {viewMergeSort && (
                        <Portal
                            onClose={() => setViewMergeSort(false)}
                            title="Merge Sort"
                        >
                            <MergeSortVisualizer />
                        </Portal>
                    )}
                </div>
                <div className="h-80 w-96 border border-gray-300 p-3 ml-4">
                    <h3 className="mb-4">Quick Sort</h3>
                    <p>Coming Soon</p>
                </div>
            </div>
        </div>
    );
};

export default Visualizer;
