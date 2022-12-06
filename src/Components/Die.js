import React from "react";

export default function Die(props){

    const styles = {
        backgroundColor : props.isHeld ? "#59E391" : "#ffffff"
    }
    
    return(
        <div className="die" style={styles} onClick={() => props.dieHold(props.id) } >
            <div className="die-num">{props.value}</div>
        </div>
    )
}