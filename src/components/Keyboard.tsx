import React from 'react'
import styles from './Keyboard.module.css'

const ABC_KEYS = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
]

const QWERTY_KEYS = [
  'q',
  'w',
  'e',
  'r',
  't',
  'y',
  'u',
  'i',
  'o',
  'p',
  'a',
  's',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
  'z',
  'x',
  'c',
  'v',
  'b',
  'n',
  'm'
]

interface Props {
  addGuessedLetter: (letter: string) => void
  guessedLetters: string[]
  incorrectLetters: string[]
  disabled: boolean
}

const Keyboard = ({ addGuessedLetter, guessedLetters, incorrectLetters, disabled }: Props) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(50px, 1fr))',
        gap: '0.5rem'
      }}
    >
      {ABC_KEYS.map((letter) => {
        // randomWord =  tree
        // guessedLetters:  (2) ['e', 'd']
        // incorrectLetters:  ['d']
        return (
          <button
            key={letter}
            disabled={
              disabled || guessedLetters.includes(letter) || incorrectLetters.includes(letter)
            }
            className={`${styles.btn} ${
              incorrectLetters.includes(letter)
                ? styles.wrong
                : guessedLetters.includes(letter)
                ? styles.active
                : ''
            }`}
            onClick={() => addGuessedLetter(letter)}
          >
            {letter}
          </button>
        )
      })}
    </div>
  )
}

export default Keyboard
