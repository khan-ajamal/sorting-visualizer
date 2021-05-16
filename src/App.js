import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { BubbleSort } from "./algorithms/bubble-sort";

import styles from "./App.module.css";
import { delay, generateRandomArray } from "./utils";

const App = () => {
  const [array, setArray] = useState([]);
  const [barOne, setBarOne] = useState(null);
  const [barTwo, setBarTwo] = useState(null);
  const [isSwapping, setIsSwapping] = useState(false);

  const { comparators, done } = useSelector((state) => state.comparing);

  const startBubbleSort = () => {
    BubbleSort(array);
  };

  const changeBarColor = async (elem) => {
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
        for (let index = 0; index < comparators.length; index++) {
          const element = comparators[index];
          changeBarColor(element);
          await delay(500);
        }
      }
    };
    update();
  }, [done, comparators]);

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

  return (
    <div className="container bg-green-300 p-8">
      <div>
        <div className="bg-purple-500 flex justify-start items-end p-4 my-3.5">
          {array.map((item, index) => (
            <div
              key={index}
              className={`${styles.bar} ${getBarColor(index)} ${getSwapping(
                index
              )}`}
              style={{ height: `${item + 100}px` }}
            >
              <span>{item}</span>
            </div>
          ))}
        </div>
        <button
          className="h-10 px-4 bg-red-400 flex justify-center items-center text-lg text-white rounded-md"
          onClick={() => startBubbleSort()}
        >
          Start Bubble Sort
        </button>
      </div>
    </div>
  );
};

export default App;
