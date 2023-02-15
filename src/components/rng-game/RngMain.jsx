import React, { useEffect, useState, useRef } from "react";
import NumberButton from "./NumberButton";
import './RngMain.css'

export default function RngMain() {
    // clamps the numbers
    const Clamp = (num, min, max) => Math.min(Math.max(num, min), max);
    const numbersInGame = [];
    const buttonsToDisplay = [];
    let lastNumber = 0;
    const score = useRef(0);

    const [gameState, setGameState] = useState(0);

    const genNumbers = (max) => {
        for (let i = 1; i <= max; i++) {
            numbersInGame.splice(Math.floor(Math.random()*numbersInGame.length)+1, 0, i)
        }
    }

    const clickHandle = (num) => {
        const difference = num - lastNumber
        if (difference !== 1) {
            score.current -= 2;
            setGameState(1);
            return;
        }
        lastNumber = num
        if(lastNumber == numbersInGame.length) {
            score.current++;
            setGameState(2);
        }
    }

    const amountOfButtons = Clamp(Math.floor(Math.random()*10) + 1, 3, 10);
    genNumbers(amountOfButtons);
    console.log(score);
    
    
    for (let i = 0; i < numbersInGame.length; i++) {
        buttonsToDisplay.push(<NumberButton num={numbersInGame[i]} onClickHandle={clickHandle} />);
    }
    
    return (
        <div>
            {gameState == 0 && (
            <div id="button-holder">
                {buttonsToDisplay}
            </div>
            )}
            {gameState == 1 && (
                <div className="end-screen">
                    <div onClick={() => {setGameState(0)}} className="end-btn" id="lose-btn"><p>YOU LOST, TRY AGAIN!</p></div>
                    <p>Current Score: {score.current}</p>
                </div>
            )}
            {gameState == 2 && (
            <div className="end-screen">
                <div onClick={() => {setGameState(0)}}  className="end-btn" id="win-btn"><p>YOU WIN! PLAY AGAIN</p></div>
                <p>Current Score: {score.current}</p>
            </div>
            )}
        </div>
    );
}

