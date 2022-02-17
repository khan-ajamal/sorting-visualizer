import { useState, useEffect, useRef, useCallback } from "react";

import { AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";

import Portal from "components/portal";
import { bubbleSort } from "algorithms/bubble-sort";
import { resetSlice } from "features/animationSlice";
import { generateRandomArray, delay, NUMBER_OF_BARS } from "utils";

import styles from "visualizer/visualizer.module.css";
import SampleCode from "./codeBlocks";

export const BubbleSort = () => {
    const [view, setView] = useState(false);
    return (
        <>
            <button
                id="mergeSort"
                className="h-10 px-4 rounded bg-teal-600 font-medium text-white"
                onClick={() => setView(true)}
            >
                Visualise Bubble Sort
            </button>

            <AnimatePresence>
                {view && (
                    <Portal onClose={() => setView(false)} title="Bubble Sort">
                        <BubbleSortVisualizer />
                    </Portal>
                )}
            </AnimatePresence>
        </>
    );
};

const BubbleSortVisualizer = () => {
    const [elements, setElements] = useState([]);
    const [isSorting, setIsSorting] = useState(false);
    const [speed, setSpeed] = useState(250);

    const [sorted, setSorted] = useState([]);
    const [sorting, setSorting] = useState(null);
    const [barOne, setBarOne] = useState(null);
    const [barTwo, setBarTwo] = useState(null);

    const [isSwapping, setIsSwapping] = useState(false);

    const { comparators, done } = useSelector((state) => state.comparing);
    const dispatch = useDispatch();

    const sort = () => {
        setIsSorting(true);
        bubbleSort(elements);
    };

    const reset = () => {
        setIsSorting(false);
        dispatch(resetSlice());
        setElements(generateRandomArray());
        setSorted([]);
        setSorting(null);
        setBarOne(null);
        setBarTwo(null);
        setIsSwapping(false);
        setSpeed(250);
    };

    useEffect(() => {
        const elem = generateRandomArray();
        setElements(elem);
        return () => {
            setIsSorting(false);
            dispatch(resetSlice());
            setElements(generateRandomArray());
            setSorted([]);
            setSorting(null);
            setBarOne(null);
            setBarTwo(null);
            setIsSwapping(false);
            dispatch(resetSlice());
            setSpeed(250);
        };
    }, [dispatch]);

    const changeBarColor = useCallback(
        async (elem, sortedIndex) => {
            if (sortedIndex !== null) {
                setSorting(sortedIndex);
                return;
            }

            setIsSwapping(false);

            setBarOne(elem.barOne);
            setBarTwo(elem.barTwo);

            await delay(speed);

            if (elem.swapping) {
                setIsSwapping(true);
                setElements([...elem.intermediateArray]);
            }
        },
        [speed]
    );

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
                    await delay(speed * 2);
                }
                changeBarColor(null, 1);
                await delay(speed);
                changeBarColor(null, 0);
                setIsSorting(false);
            }
        };
        update();
    }, [done, comparators, speed, changeBarColor]);

    const prevSortingRef = useRef();

    useEffect(() => {
        if (sorting !== prevSortingRef.current) {
            setSorted([...sorted, sorting]);
            prevSortingRef.current = sorting;
        }
    }, [sorting, sorted]);

    return (
        <div className="w-full">
            <div className="w-full flex justify-end">
                <div className="w-1/2">
                    <div className="w-full flex justify-center items-end mt-16">
                        {elements.map((item, index) => (
                            <div
                                key={index}
                                className={`${styles.bar} ${getBarColor(
                                    index
                                )} ${getSwapping(index)} ${
                                    isSorted(index) ? styles.sorted : ""
                                }`}
                                style={{ height: `${item + 100}px` }}
                            >
                                <span className={styles.barLabel}>{item}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 w-full flex justify-center">
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
                </div>
                <div className="w-1/2">
                    <div>
                        <h1 className="text-xl font-medium mb-2">Color Code</h1>
                        <div>
                            <div className="flex justify-start items-center space-x-2">
                                <div className="h-4 w-4 bg-red-500 rounded"></div>
                                <div>Comparing elements</div>
                            </div>
                            <div className="flex justify-start items-center space-x-2">
                                <div className="h-4 w-4 bg-yellow-500 rounded"></div>
                                <div>Swapping elements</div>
                            </div>
                            <div className="flex justify-start items-center space-x-2">
                                <div className="h-4 w-4 bg-green-500 rounded"></div>
                                <div>Sorted elements</div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <h1 className="text-xl font-medium mb-2">Speed</h1>
                        <div className="flex justify-start items-center">
                            <input
                                className="w-1/2"
                                type="range"
                                min="150"
                                max="1000"
                                step="10"
                                value={speed}
                                onChange={(e) =>
                                    setSpeed(Number(e.target.value))
                                }
                                disabled={isSorting}
                            />
                            <div className="ml-4 h-8 flex justify-center items-center px-2 border border-gray-800 rounded bg-green-50">
                                {speed}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-10 w-1/2 p-4">
                <h1 className="text-xl font-medium mb-2">Explaination</h1>
                <div className="text-justify mb-8">
                    <p>
                        Bubble Sort is the simplest sorting algorithm that works
                        by repeatedly swapping the adjacent elements if they are
                        in wrong order.
                    </p>
                    <p>
                        In this algorithm after each iteration of the array the
                        smaller/larger element is moved to the end of the array.
                    </p>
                    <p>
                        The algorithm is named for the way smaller or larger
                        elements "bubble" to the top of the list.
                    </p>
                </div>
                <h1 className="text-xl font-medium mb-2">Algorithm</h1>
                <div className="mb-4">
                    <SampleCode algorithm="bubble" />
                </div>
                <h1 className="text-xl font-medium mb-2">
                    Space and Time Complexity
                </h1>
                <div className="text-justify mb-4">
                    <div className="flex items-center mb-2">
                        <span className="block font-medium w-32">Time</span>
                        <span className="font-mono italic">
                            O(n<sup>2</sup>)
                        </span>
                    </div>
                    <div className="flex items-center">
                        <span className="block font-medium w-32">Space</span>
                        <span className="font-mono italic">O(1)</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
