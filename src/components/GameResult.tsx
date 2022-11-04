import React from 'react'

interface Props {
  isLost?: boolean
  isWinner?: boolean
  resetGame: () => void
}

const GameResult = ({ isLost, isWinner, resetGame }: Props) => {
  return (
    <div className='game-result'>
      {isLost && <p style={{ color: 'rgb(236, 24, 24)' }}>Sorry you lost, try again.</p>}
      {isWinner && <p style={{ color: '#38e513' }}>Congratulations, you won!</p>}
      {(isLost || isWinner) && (
        <div className='game-result__btn-container'>
          <div className='game-result__btn--border'>
            <button className='version--one' onClick={resetGame}>
              Start New Game
            </button>
          </div>
          <button className='version--two' onClick={resetGame}>
            Start New Game
          </button>
        </div>
      )}
    </div>
  )
}

export default GameResult
