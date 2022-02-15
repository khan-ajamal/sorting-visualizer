import { QuickSort } from "components/quickSort";
import { MergeSort } from "components/mergeSort";
import { BubbleSort } from "components/bubbleSort";

const Visualizer = () => {
    return (
        <div className="container px-8">
            <div className="flex justify-start items-center flex-wrap">
                <div className="h-80 w-96 border border-gray-300 p-3 ml-4 flex justify-center items-center">
                    <BubbleSort />
                </div>
                <div className="h-80 w-96 border border-gray-300 p-3 ml-4 flex justify-center items-center">
                    <MergeSort />
                </div>
                <div className="h-80 w-96 border border-gray-300 p-3 ml-4 flex justify-center items-center">
                    <QuickSort />
                </div>
            </div>
        </div>
    );
};

export default Visualizer;
