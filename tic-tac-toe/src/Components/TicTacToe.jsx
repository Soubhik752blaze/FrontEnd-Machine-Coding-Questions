/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import useTicTacToe from "../Hooks/useTicTacToe";

function TicTacToe({size = 3}) {
    const { board, statusMessage, resetGame, handleClick } = useTicTacToe(size);

    return (
        <div className='game' style={{"--board-size": size}}>
            <div className='status'>
                <span className={statusMessage().includes('wins') && 'active'}>{statusMessage()}</span>
                <button className='resetButton' onClick={resetGame}> Reset Game</button>
            </div>


            <div className='board'>
                {
                    board.map((b, index) => {
                        return (
                            <button
                                className='cell'
                                key={index}
                                onClick={() => handleClick(index)}
                                disabled={b !== null}
                            >
                                {b}
                            </button>)
                    })
                }
            </div>
        </div >
    )
}

export default TicTacToe