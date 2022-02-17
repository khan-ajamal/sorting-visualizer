import { useState } from "react";
import { CodeBlock, github } from "react-code-blocks";

import { codeBlock as bubble } from "algorithms/bubble-sort";

const SampleCode = ({ algorithm }) => {
    const [language, setLanguage] = useState("python");
    let code = bubble;
    if (algorithm === "bubble") {
        code = bubble;
    }
    const onLanguageChange = (e) => {
        setLanguage(e.target.value);
    };
    return (
        <div className="w-full flex space-x-4">
            <div className="w-4/5">
                <CodeBlock
                    text={code[language]}
                    language={language}
                    showLineNumbers={false}
                    theme={github}
                />
            </div>
            <div className="w-1/5">
                <h1 className="font-medium text-base">Language</h1>
                <select onChange={onLanguageChange} value={language}>
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript</option>
                </select>
            </div>
        </div>
    );
};

export default SampleCode;
