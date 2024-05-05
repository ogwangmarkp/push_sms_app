import React, {useState, useEffect} from 'react';

const DisplayFlashNumber = () =>{
    const [flash, setFlash] = useState(false);
    const [number, setNumber] = useState(0);


    useEffect(() => {
        const flashNumber = (ev) => {
            if (ev.target.type === 'number') {
                const value = parseInt(ev.target.value, 10);
                if (value > 0) {
                    setNumber(value);
                } else {
                    setNumber(0);
                }
            } else {
                setFlash(false);
            }
        };
        window.addEventListener("keyup", flashNumber, false);

        const initialiseFlash = (ev) => {
            if (ev.target.type !== 'number') {
                setFlash(false);
            }else{
                const value = parseInt(ev.target.value, 10);
                if (value > 0) {
                    setNumber(value);
                } else {
                    setNumber(0);
                }
                setFlash(true);
            }
        };
        window.addEventListener("mouseup", initialiseFlash, false);
    }, []);

    return (
        <div>
            {flash &&
                <div className='flash-number'>
                    {number.toLocaleString()}
                </div>
            }
        </div>
    )

}

export default DisplayFlashNumber;