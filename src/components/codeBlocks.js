import { useState } from "react";
import { CodeBlock, solarizedDark } from "react-code-blocks";

import { codeBlock as bubble } from "algorithms/bubble-sort";
import { codeBlock as merge } from "algorithms/merge-sort";

const SampleCode = ({ algorithm }) => {
    const [language, setLanguage] = useState("python");
    let code = bubble;
    if (algorithm === "bubble") {
        code = bubble;
    } else if (algorithm === "merge") {
        code = merge;
    }
    const onLanguageChange = (e) => {
        setLanguage(e.target.value);
    };
    return (
        <div className="w-full">
            <div className="w-full mb-4">
                <h1 className="font-medium text-base mb-2">Language</h1>
                <div className="relative w-full">
                    <select
                        onChange={onLanguageChange}
                        value={language}
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 cursor-pointer"
                    >
                        <option value="python">Python</option>
                        <option value="javascript">JavaScript</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                            class="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="w-full">
                <CodeBlock
                    text={code[language]}
                    language={language}
                    showLineNumbers={false}
                    theme={solarizedDark}
                />
            </div>
        </div>
    );
};

export default SampleCode;
