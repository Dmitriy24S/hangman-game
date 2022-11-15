import React from 'react'
import moonSvg from '../../assets/moon.svg'
import sunSvg from '../../assets/sun.svg'

import styles from './ThemeToggle.module.css'

interface Props {
  darkTheme: string
  handleToggleTheme: () => void
}

const ThemeToggle = ({ darkTheme, handleToggleTheme }: Props) => {
  return (
    <button className={styles.toggle} onClick={handleToggleTheme}>
      {darkTheme === 'true' ? <img src={moonSvg} className={styles.moon} alt='moon (dark mode)' /> : <img src={sunSvg} alt='sun (light mode)' />}
    </button>
  )
}

export default ThemeToggle
