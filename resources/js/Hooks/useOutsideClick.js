import {useEffect, useState} from "react";

/**
 * Hook that alerts clicks outside of the passed refs
 */
export default function useOutsideClick( refs, cb ) {
    useEffect(() => {
        function handleClickOutside(event) {
            let hasClickedInAnyRef = false;

            for ( const ref of refs ) {
                if ( ref.current && ref.current.contains( event.target ) && ! hasClickedInAnyRef ) {
                    hasClickedInAnyRef = true;
                }
            }

            if ( ! hasClickedInAnyRef ) {
                return cb();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ refs ]);
}
