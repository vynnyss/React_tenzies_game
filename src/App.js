import './App.css';
import Dado from './components/Dado';
import React, { useEffect } from 'react'
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'


function App() {

  const[diceArray, setDiceArray] = React.useState(allNewDice())
  const[tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allHeld = diceArray.every(die => die.isHeld)
    const allValue = diceArray.every(dice => dice.value === diceArray[0].value)
    if(allHeld && allValue){
      setTenzies(true)
    }
  },[diceArray])


  function playAgain(){
    setTenzies(false)
    setDiceArray(allNewDice())
  }

  const diceElements = diceArray.map(dice => {
    return(
      <Dado key={dice.id} value={dice.value} isHeld={dice.isHeld} hold={() => holdDice(dice.id)}/>
    )
  })

  function holdDice(id){
    setDiceArray(oldDiceArray =>oldDiceArray.map(oldDice => {
      return oldDice.id === id ?
        {...oldDice , isHeld: !oldDice.isHeld } :
        oldDice
    }))
  }

  function rollDices(){
    setDiceArray(oldDiceArray => oldDiceArray.map(oldDice =>{
      return oldDice.isHeld ? oldDice : {...oldDice, value: getRandomNumber()}
    }))
  }

  function getRandomNumber (){
    return Math.ceil(Math.random() * 6)
  }
  function allNewDice() {
    let newDice = []
    for (let i = 0; i<10 ; i++){
      newDice.push({
        value:getRandomNumber(),
        isHeld:false,
        id: nanoid()
      })
    }
    return newDice
  }

  return (
    
    <main className="App">
      {tenzies && <Confetti/>}
      <h1 className='app--title'>Tenzies</h1>
      
      <p className='app--instructions'>Rode até todos que todos os dados sejam iguais. clique para "congelar" o valor atual do dado!</p>
      <div className='app--dados'>
        {diceElements}
      </div>

    <button className='app--button' onClick={tenzies? playAgain : rollDices}>{tenzies ? "Jogar Novamente" : "Rodar Dados" }</button>
      
    </main>
  );
}

export default App;
