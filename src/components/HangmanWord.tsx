import React from 'react'

interface Props {
  wordToGuess: string[]
  guessedLetters: string[]
  reveal: boolean
}

const HangmanWord = ({ wordToGuess, guessedLetters, reveal }: Props) => {
  return (
    <div
      style={{
        display: 'grid',
        // gridTemplateColumns: 'repeat(auto-fit, minmax(10px, 40px))',
        // only 40px keeps?
        // gridTemplateColumns: 'repeat(auto-fit, minmax(10px, 30px))',
        gridTemplateColumns: 'repeat(auto-fit, minmax(10px, 25px))',
        // gap: '1rem',
        gap: '1.5rem',
        justifyContent: 'center'
      }}
    >
      {wordToGuess.map((letter, index) => {
        return (
          <div
            key={index}
            style={{
              borderBottom: '4px solid black',
              // borderBottom: '3px solid black',
              height: '40px',
              // width: '20px',
              // width: '30px',
              // width: '25px',
              // ! fix? manual for more spacing between? or more gap?
              textTransform: 'uppercase',
              fontSize: '2rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span
              style={{
                visibility: `${guessedLetters.includes(letter) || reveal ? 'visible' : 'hidden'}`,
                color: `${
                  !guessedLetters.includes(letter) && reveal
                    ? 'rgb(236, 24, 24)'
                    : 'rgb(94, 94, 231)'
                }`
              }}
            >
              {letter}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default HangmanWord
