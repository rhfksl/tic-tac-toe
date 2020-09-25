import React, { useEffect, useState, useMemo, useCallback } from 'react';

export const Sample: React.FunctionComponent = (props: any)=>{

    const { size } = props;
    const [testSize, setTestSize] = useState(size);


    const plus = () => {
        setTestSize(testSize + 10);
    }
    const minus = () => {
        setTestSize(testSize - 10);
    }

    const parentSize: any = useCallback(setTestSize, [size]);

    useEffect(()=>{
        parentSize(size)
    }, [parentSize]);
 
    return (
        <div
            style={{
                backgroundColor: 'red',
                width: testSize,
                height: testSize,
            }}
        >
            <button onClick={plus}>increase</button>
            <button onClick={minus}>decrease</button>
        </div>
    )
}