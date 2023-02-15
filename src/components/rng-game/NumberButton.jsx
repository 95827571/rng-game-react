import React, {useState} from 'react'


export default function NumberButton({num, onClickHandle}) {
    const [visible, setVisible] = useState(true)
    return (
        <div>
            {visible && (
            <div onClick={() => {setVisible(false); onClickHandle(num)}} className="num-btn">
                <p>{num}</p>
            </div>
            )}
        </div>
    )
}
