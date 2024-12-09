import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { Select as SelectHUI} from "@headlessui/react";

export default forwardRef(function Select(
    { selected = '', options = [],  className = '', isFocused = false, ...props },
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
        <SelectHUI
            {...props}
            className={
                'rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 ' +
                className
            }
            ref={localRef}
        >
            {options.map( option => <option key={option.value} value={option.value}>{ option.label }</option> ) }
        </SelectHUI>
    );
});
