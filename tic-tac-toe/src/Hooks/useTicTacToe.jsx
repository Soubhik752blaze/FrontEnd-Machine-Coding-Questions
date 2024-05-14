/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";


const useTicTacToe = (size) => {
    const initialBoard = (size) => Array(size * size).fill(null);
    const [board, setBoard] = useState(initialBoard(size));
    const [isPlayer1, setIsPlayer1] = useState(true);

    useEffect(() => {
        setBoard(initialBoard(size));
        setIsPlayer1(true);
    }, [size]);

    const generateWinningPatterns = () => {

        const patterns = [];
        
        for (let i = 0; i < size; i++) {
            const horizontalPatterns = [];
            const verticalPatterns = [];
            for (let j = 0; j < size; j++) {
                //calculating horizontal and vertical winning patterns
                horizontalPatterns.push(i * size + j);
                verticalPatterns.push(j * size + i);
            }
            patterns.push(horizontalPatterns, verticalPatterns);

        }

        const diagonal1 = [];
        const diagonal2 = [];
        for (let i = 0; i < size; i++) {
            //calculating diagonal winning patterns
            diagonal1.push(i * (size + 1));
            diagonal2.push((i + 1) * (size - 1));

        }
        patterns.push(diagonal1, diagonal2);

        return patterns;
    }

    const winningPatterns = generateWinningPatterns();

    const calculateWinner = (board) => {
        for (let i = 0; i < winningPatterns.length; i++) {
            const pattern = winningPatterns[i];

            let countX = 0;
            let countO = 0;
            for (let j = 0; j < size; j++) {
                let cell = board[pattern[j]];
                if (cell === 'X')
                    countX++;
                else if (cell === 'O')
                    countO++;
            }

            if (countX === size)
                return 'X';
            else if (countO === size)
                return 'O';
        }

        return null;
    }

    const statusMessage = () => {
        const winner = calculateWinner(board);
        if (winner) {
            return `Player ${winner === 'X' ? '1' : '2'} wins!`
        }
        else if (!board.includes(null))
            return `The Game is a draw!`
        else return `Player ${isPlayer1 ? "1's" : "2's"} turn`

    }



    const handleClick = (index) => {
        const winner = calculateWinner(board);
        if (winner || board[index])
            return;

        const newBoard = board;
        newBoard[index] = isPlayer1 ? "X" : "O";
        setBoard(newBoard);
        setIsPlayer1(!isPlayer1);

    }

    const resetGame = () => {
        setBoard(initialBoard(size));
        setIsPlayer1(true)
    }

    return { board, statusMessage, resetGame, handleClick }

}

export default useTicTacToe 