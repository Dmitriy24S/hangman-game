import { useState } from 'react'
import './App.css'
import HangmanDrawing from './components/HangmanDrawing'
import HangmanWord from './components/HangmanWord'
import Keyboard from './components/Keyboard'
import words from './wordList.json'

const getRandomWord = () => words[Math.floor(Math.random() * words.length)]

function App() {
  const [wordToGuess, setWordToGuess] = useState(getRandomWord())
  console.log('randomWord = ', wordToGuess)

  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  console.log('guessedLetters: ', guessedLetters)

  const incorrectLetters = guessedLetters.filter((letter) => !wordToGuess.includes(letter))
  console.log('incorrectLetters: ', incorrectLetters)

  // randomWord =  tree
  // guessedLetters:  (2) ['e', 'd']
  // incorrectLetters:  ['d']

  const addGuessedLetter = (letter: string) => {
    //  if already used this letter, won game, lost game - return
    if (guessedLetters.includes(letter) || isWinner || isLost) return
    setGuessedLetters((currentLetters) => [...currentLetters, letter])
  }

  const isLost = incorrectLetters.length >= 6
  console.log('isLost', isLost)

  const isWinner = wordToGuess.split('').every((letter) => guessedLetters.includes(letter))
  console.log('isWinner', isWinner)

  return (
    <div className='App'>
      <div>
        <h1 className='title'>Hangman Game</h1>
        <span className='note'>Vite + React</span>
      </div>

      <div className='game'>
        <HangmanDrawing incorrectLettersAmount={incorrectLetters.length} />
        <HangmanWord
          wordToGuess={wordToGuess.split('')}
          guessedLetters={guessedLetters}
          reveal={isLost}
        />
        <Keyboard
          addGuessedLetter={addGuessedLetter}
          guessedLetters={guessedLetters}
          incorrectLetters={incorrectLetters}
          disabled={isLost || isWinner}
        />
      </div>
    </div>
  )
}

export default App
