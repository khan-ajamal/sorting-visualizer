import { useState, useEffect, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence } from "framer-motion";

import Portal from "components/portal";
import { bubbleSort } from "algorithms/bubble-sort";
import { resetSlice } from "features/animationSlice";
import { generateRandomArray, delay, NUMBER_OF_BARS } from "utils";

import styles from "visualizer/visualizer.module.css";

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
        };
    }, [dispatch]);

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
            setElements([...elem.intermediateArray]);
        }
    };

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
                    await delay(500);
                }
                changeBarColor(null, 1);
                await delay(250);
                changeBarColor(null, 0);
                setIsSorting(false);
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
            <div className="mt-10">
                <h1 className="text-xl font-medium">Color Code</h1>
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
        </div>
    );
};
