import React from "react";
import Die from "./Components/Die";
import { nanoid } from "nanoid";

export default function App(){
    const [dices, setDices] = React.useState(allNewDice());

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
            return preDice.map(die => (die.id === id) ? {...die, isHeld : !die.isHeld} : die );
        } )
    }

    function rollHandle(){
        setDices(prevDice => prevDice.map(
            die => (die.isHeld === false) ? {...die, value : Math.floor(Math.random() * 6) + 1 } : {...die})
        );
    }
    
    const all10Diecs = dices.map(
        die => <Die key={die.id} value={die.value} isHeld={die.isHeld} dieHold={() => dieHold(die.id)}  />
        )

    return(
        <main>
            <div className="die-container">
                {all10Diecs}
            </div>   
            <button className="roll-button" onClick={()=>rollHandle()}>Roll</button>
        </main>
    )
}

