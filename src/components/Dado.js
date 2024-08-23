import React from 'react'
import "./css/Dado.css"

export default function Dado(props) {

    const styles ={
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }


  return (
    <div className="dado" style={styles} onClick={e => props.hold(props.key)}>
        <h2>{props.value}</h2>
    </div>
  )
}
