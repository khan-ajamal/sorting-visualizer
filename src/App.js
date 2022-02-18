import React from "react";

import Visualizer from "visualizer";

import { ReactComponent as HomeIcon } from "icons/home.svg";
import { ReactComponent as GitHubIcon } from "icons/github.svg";

const App = () => {
    return (
        <div className="container mx-auto">
            <header className="px-8 h-12 flex justify-between items-center mb-4">
                <div className="h-full flex items-center">
                    <a href="https://khan-ajamal.github.io/sorting-visualizer">
                        <h1 className="text-2xl font-medium">
                            Sorting Visualizer
                        </h1>
                    </a>
                </div>
                <div className="h-full flex items-center space-x-4">
                    <a
                        href="https://ajamalkhan.com/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <HomeIcon className="h-8" />
                    </a>
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
            </main>
        </div>
    );
};

export default App;
