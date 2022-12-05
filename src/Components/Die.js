import React from "react";

export default function Die(props){

    const styles = {
        backgroundColor : props.isHeld ? "#59E391" : "#fffff"
    }
    
    return(
        <div className="die" style={styles} onClick={ props.dieHold } >
            <div className="die-num">{props.value}</div>
        </div>
    )
}