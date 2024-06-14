import React, {  useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import copy from 'copy-to-clipboard';

const CodeBlock = ({ language, code }) => {
    const [txt,setTxt]=useState('Copy')

    const handleCopy = () => {
        copy(code);
        setTxt('Copied')
        setTimeout(()=>{
            setTxt('Copy')
        },500)
    };

    return (
        <div className="code-block-wrap">
            {/* <span>{language}</span> */}
            <span className="copy" onClick={handleCopy}>{txt}</span>
            <SyntaxHighlighter language={language} style={materialLight} showLineNumbers>
                {code}
            </SyntaxHighlighter>
        </div>
    );
};

export default CodeBlock;
