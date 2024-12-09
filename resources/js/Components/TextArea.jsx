import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import {Textarea as TextAreaHUI} from "@headlessui/react";

export default forwardRef(function TextArea(
    { className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <TextAreaHUI
            {...props}
            className={
                'rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 ' +
                className
            }
            ref={localRef}
        />
    );
});
