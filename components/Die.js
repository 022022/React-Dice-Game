import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceOne, faDiceTwo, 
        faDiceThree, faDiceFour, 
        faDiceFive, faDiceSix } from "@fortawesome/free-solid-svg-icons";

export default function Die(props) {

    let iconColor = '#570063';
    if (props.isHeld) iconColor = '#006326';

    let icon;
    switch(props.value){
        case 1:
            icon = faDiceOne; 
            break;
        case 2:
            icon = faDiceTwo; 
            break;
        case 3:
            icon = faDiceThree; 
            break;
        case 4:
            icon = faDiceFour; 
            break;
        case 5:
            icon = faDiceFive; 
            break;
        case 6:
            icon = faDiceSix; 
            break;
    }

    return (
        <div 
            onClick = { props.holdDie } 
            className = "die" >
            <FontAwesomeIcon 
                icon = { icon } 
                color = { iconColor } />

        </div>
    )
}