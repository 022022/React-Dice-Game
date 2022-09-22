import React from "react";
import Die from './Die';
import Instructions from "./Instructions";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {

    const [dice, setDice] = React.useState(generateDice());
    const [hasWon, setHasWon] = React.useState(false);
    const [rollsCount, setRollsCount] = React.useState(10);

    React.useEffect(() => {
        const examplaryValue = dice[0].value;

        if(dice.every((die) => die.isHeld && die.value === examplaryValue)){
            setHasWon(true);
        };

    }, [dice]);

    React.useEffect(() => {
        if (rollsCount === -1) {
            startNewGame();  
        } 
    }, [rollsCount]);

    function startNewGame(){
        setRollsCount(10);
        setHasWon(false);
        setDice(generateDice());
    }

    function generateDefaultDie(){
        return {
            id: nanoid(),
            value: Math.ceil(Math.random() * 6), 
            isHeld: false
        }
    }

    function generateDice() {
        return Array.from({length: 6})
            .map((item) => generateDefaultDie());
    }

    function rollDice() {
        if (!hasWon) {
            setDice((oldDice) => oldDice.map((die) => {
                if(die.isHeld) {
                    return die;
                } else {
                    return generateDefaultDie();
                }
                }));

            setRollsCount((prevRollsCount) => prevRollsCount - 1)

        } else {
            startNewGame();
        }
    }

    function holdDie(id) {
        setDice((prevDice) => prevDice
            .map((die) => die.id === id ? {...die, isHeld: !die.isHeld} : {...die}))
        if (!rollsCount && !hasWon){
            startNewGame();
        }
    }

    const instructions = `Roll the dice and click to freeze the numbers you want. 
    Roll and freeze until the dice are all the same. 
    You have 10 rolls only!`

    return (    
       <div className="game-container">
            { hasWon && < Confetti wind = '5'/>}

            <h1>Tenzies</h1>

            { hasWon ? 'Congratulations!' : (< Instructions />) }

            <div className="dice-container">
                { dice.map((die) => 
                    < Die 
                        key = {die.id} 
                        value = {die.value} 
                        isHeld = {die.isHeld} 
                        holdDie = {() => holdDie(die.id)}
                    />) 
                }
            </div>

            <button className="button" onClick={ rollDice }> 
                { hasWon ? 'New Game' : `Roll ( ${rollsCount} left)` }
            </button>
       </div>
    )
}

export default App;