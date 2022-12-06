import React, { useEffect } from "react";
import Die from "./Components/Die";
import { nanoid } from "nanoid";
import {useWindowSize} from 'react-use';
import Confetti from 'react-confetti'

export default function App(){
    const [dices, setDices] = React.useState(allNewDice());
    const [tenzies, setTenzeies] = React.useState(false);
    const { width, height } = useWindowSize()

    useEffect(() => {
        let checker = dices[0].value;
        let countValue = 0 , countIsHeld = 0;
        for(let i = 0 ; i < 10 ; i++){
            if(dices[i].value === checker) countValue++;
            if(dices[i].isHeld === true) countIsHeld++;
        }
        if(countIsHeld === 10 && countValue === 10) {
            setTenzeies(true);
        }

    },[dices]);

    function allNewDice(){
        let arr = [];
    
        for(let i = 0 ; i < 10 ; i++){
            let obj = {
                value : Math.floor(Math.random() * 6) + 1,
                isHeld : false,
                id : nanoid()
            };
            arr.push(obj);
        }
        return arr;
    }

    function dieHold(id){
        setDices(preDice => {
            return preDice.map( die => (die.id === id) ? {...die, isHeld : !die.isHeld} : die );
        } )
    }

    function rollHandle(){
        setDices(prevDice => prevDice.map(
            die => (die.isHeld === false) ? {...die, value : Math.floor(Math.random() * 6) + 1 } : die)
        );
    }
    
    const all10Diecs = dices.map(
        die => <Die key={die.id} value={die.value} isHeld={die.isHeld} id = {die.id} dieHold={dieHold}  />
    )

    function reloadGame(){
        window.location.reload(false);
    }

    return(
        <main>
            { tenzies && <Confetti
                    width={width}
                    height={height}
                    />  } 
            <header className="header">
            <p className="title">Tenzies</p>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            </header>
            <div className="die-container">
                {all10Diecs}
            </div>   
            <button 
                className="roll-button"
                onClick={tenzies ? reloadGame : rollHandle  }
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}

