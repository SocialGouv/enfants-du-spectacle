import React, { useEffect, useRef } from 'react';

const useDidMountEffect = (func: Function, deps: any) => {
    const [initialRender, setInitialRender] = React.useState<Boolean | null>(null)
    console.log('in did mount')

    useEffect(() => {
        if (initialRender) func();
        else setInitialRender(true);
    }, deps);
}

export default useDidMountEffect;