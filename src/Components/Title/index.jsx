import { useState } from 'react';

export default function Title() {
    const [text, setText] = useState('Untitled');
    const [textDesc, setTextDesc] = useState('+ Add description...');

    const handleTextChange = (event) => {
        setText(event.target.value);
    };
    const handleDescChange = (event) => {
        setTextDesc(event.target.value);
    };

    return (
        <>
            <section className="m-0 p-0 w-screen h-[60px] px-6 py-6 flex items-center font-inter leading-snug bg-primary_10 border-b border-solid border-neutral_300">
                <div className=' m-0 p-0 flex items-baseline w-screen gap-x-[17px]'>
                    <input
                        type="text"
                        value={text}
                        onChange={handleTextChange}
                        className="cursor-default m-0 p-0 text-base max-w-16 focus:ring-0 font-semibold text-neutral_900"
                    />
                    <input
                        type="text"
                        value={textDesc}
                        onChange={handleDescChange}
                        className="cursor-default m-0 p-0 text-xs w-full focus:ring-0 font-medium text-neutral_500"
                    />
                    {/* <span className="text-xs font-medium text-neutral_500">+ Add description...</span> */}
                </div>
            </section>
        </>
    )
}