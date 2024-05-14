/* eslint-disable no-unused-vars */
import { useState } from 'react'
import './App.css'
import TicTacToe from './Components/TicTacToe'

function App() {

  const [size, setSize] = useState(3);

  return (
    <div className='app'>
      <h2>Tic - Tac - Toe</h2>
      <div>
        <span>Select Size - </span>
        <select value={size} onChange={(e) => setSize(Number(e.target.value))}>
          <option selected>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
        </select>
      </div>
      <TicTacToe size={size} />
    </div>)

}

export default App
