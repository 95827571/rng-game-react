import React, { useEffect, useState, useRef } from "react";
import NumberButton from "./NumberButton";
import './RngMain.css'

export default function RngMain() {
    // clamps the numbers
    const Clamp = (num, min, max) => Math.min(Math.max(num, min), max);
    const numbersInGame = [];
    const buttonsToDisplay = [];
    let lastNumber = 0;

    const [hasLost, setHasLost] = useState(false);
    const [hasWon, setHasWon] = useState(false);

    const genNumbers = (max) => {
        for (let i = 1; i <= max; i++) {
            numbersInGame.splice(Math.floor(Math.random()*numbersInGame.length)+1, 0, i)
        }
    }

    const clickHandle = (num) => {
        const difference = num - lastNumber
        if (difference !== 1) {
            setHasLost(true);
            return;
        }
        lastNumber = num
        if(lastNumber == numbersInGame.length) {
            setHasWon(true);
        }
    }

    const amountOfButtons = Clamp(Math.floor(Math.random()*10) + 1, 3, 10);
    genNumbers(amountOfButtons);
    console.log(numbersInGame);
    
    
    for (let i = 0; i < numbersInGame.length; i++) {
        buttonsToDisplay.push(<NumberButton num={numbersInGame[i]} onClickHandle={clickHandle} />);
    }
    
    return (
        <div>
            {(!hasLost && !hasWon) && (
            <div id="button-holder">
                {buttonsToDisplay}
            </div>
            )}
            {hasLost && (
                <div id="lose-screen">
                    <div id="restart-btn">RESTART</div>
                </div>
            )}
            {hasWon && (
            <div id="win-screen">
                <div id="restart-btn">YOU WIN!</div>
            </div>
            )}
        </div>
    );
}

