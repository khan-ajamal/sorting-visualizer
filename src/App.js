import React from "react";

import Visualizer from "./visualizer";

import { ReactComponent as GitHubIcon } from "./icons/github.svg";

const App = () => {
  return (
    <div className="container mx-auto">
      <header className="px-8 h-12 flex justify-between items-center mb-4">
        <div className="h-full flex items-center">
          <a href="https://khan-ajamal.github.io/sorting-visualizer">
            <h1 className="text-lg">Sorting Visualizer</h1>
          </a>
        </div>
        <div className="h-full flex items-center">
          <a
            href="https://github.com/khan-ajamal/sorting-visualizer"
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon className="h-8" />
          </a>
        </div>
      </header>
      <main>
        <Visualizer />
        <div className="mt-8 px-8">
          <h2>Labels</h2>
          <div>
            <div className="flex justify-start items-center">
              <div className="h-10 w-10 bg-red-500 mr-3"></div>
              <p>Comparing elements</p>
            </div>
            <div className="flex justify-start items-center mt-2">
              <div className="h-10 w-10 bg-pink-300 mr-3"></div>
              <p>Swapping elements</p>
            </div>
            <div className="flex justify-start items-center mt-2">
              <div className="h-10 w-10 bg-yellow-300 mr-3"></div>
              <p>Sorted elements</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
