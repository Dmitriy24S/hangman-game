import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import './App.css'
import GameResult from './components/GameResult'
import HangmanDrawing from './components/HangmanDrawing'
import HangmanWord from './components/HangmanWord'
import Keyboard from './components/Keyboard'
import ThemeToggle from './components/ThemeToggle/ThemeToggle'
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

  // const addGuessedLetter = (letter: string) => {
  //   if (guessedLetters.includes(letter) || isWinner || isLost) return
  //   setGuessedLetters((currentLetters) => [...currentLetters, letter])
  // }

  // (prevent unnececasry reruns? + useEffect key press. Rerun function only when changes to guessedLetters)
  const memoizedSetGuessedLetters = useCallback(
    (letter: string) => {
      //  if already used this letter, won game, lost game - return
      if (guessedLetters.includes(letter) || isWinner || isLost) return
      setGuessedLetters((currentLetters) => [...currentLetters, letter])
    },
    [guessedLetters]
  )

  const isLost = incorrectLetters.length >= 6
  console.log('isLost', isLost)

  const isWinner = wordToGuess.split('').every((letter) => guessedLetters.includes(letter))
  console.log('isWinner', isWinner)

  // New Game
  const resetGame = () => {
    setGuessedLetters([])
    setWordToGuess(getRandomWord())
  }

  // Theme
  const [darkTheme, setDarkTheme] = useState(localStorage.getItem('theme') || 'false')
  console.log('darkTheme', darkTheme)

  // const root = document.getElementById('root') // ! possibly null error
  const root = document.getElementsByTagName('html')[0] // ! no possibly null error?
  console.log('root', root)

  const handleToggleTheme = () => {
    if (darkTheme === 'true') {
      setDarkTheme('false')
    }
    if (darkTheme === 'false') {
      setDarkTheme('true')
    }
  }

  // Theme - Apple app/website theme (light/dark theme)
  const applyTheme = () => {
    // check system preference:
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    console.log({ prefersDark }) // prefersDark: false
    // check saved app/website theme preference:
    const localDarkTheme = localStorage.getItem('theme')
    console.log({ localDarkTheme }) // localTheme: null

    // if system preference dark theme and have not set app/website theme (e.g. first time visit) -> set dark theme
    if (prefersDark && localDarkTheme == null) {
      console.log('run prefersDark && localDarkTheme == null')
      localStorage.setItem('theme', 'true')
      setDarkTheme('true')
    }
  }

  // Theme - Set app/page theme on page load (paints the app before it renders elements)
  useLayoutEffect(() => {
    console.log('LAYOUT EFFECT')
    applyTheme()
  }, [])

  // Theme - Toggle theme on theme state change (toggle button)
  useEffect(() => {
    // if currently on dark theme -> switch to light theme
    if (darkTheme === 'true') {
      console.log('run IF DARKTHEME = TRUE')
      root.classList.add('dark')
      localStorage.setItem('theme', 'true')
    }
    // if currently on light theme -> switch to dark theme
    if (darkTheme === 'false') {
      console.log('run IF DARKTHEME = FALSE')
      root.classList.remove('dark')
      localStorage.setItem('theme', 'false')
    }
  }, [darkTheme])

  // Listen for keyboard presses
  useEffect(() => {
    const keyPress = (e: KeyboardEvent) => {
      const key = e.key
      const regex = /^[A-Za-z]$/
      if (!key.match(regex)) return

      console.log(e.key, 'e.key')
      memoizedSetGuessedLetters(e.key.toLowerCase())

      // if (regex.test(e.key)) - validate key press - (returns a Boolean value that indicates whether or not a pattern exists in a searched string)
    }

    window.addEventListener('keydown', keyPress)

    return () => {
      window.removeEventListener('keydown', keyPress)
    }
    // }, [])
  }, [guessedLetters])
  // (prevent unnececasry runs? + useEffect key press. Rerun function only when changes to guessedLetters)

  return (
    <div className='App'>
      <div>
        <h1 className='title'>Hangman Game</h1>
        <span className='note'>Vite + React</span>
      </div>

      <GameResult isLost={isLost} isWinner={isWinner} resetGame={resetGame} />

      <div className='game'>
        <HangmanDrawing incorrectLettersAmount={incorrectLetters.length} />
        <HangmanWord
          wordToGuess={wordToGuess.split('')}
          guessedLetters={guessedLetters}
          reveal={isLost}
        />
        <Keyboard
          // addGuessedLetter={addGuessedLetter}
          addGuessedLetter={memoizedSetGuessedLetters}
          guessedLetters={guessedLetters}
          incorrectLetters={incorrectLetters}
          disabled={isLost || isWinner}
        />
      </div>
      <ThemeToggle darkTheme={darkTheme} handleToggleTheme={handleToggleTheme} />
    </div>
  )
}

export default App
