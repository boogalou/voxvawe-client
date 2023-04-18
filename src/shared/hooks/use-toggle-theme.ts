import {useEffect, useState} from "react";
import styles from '@/pages/im/im.module.scss'


export const useToggleTheme = (initialState: string) => {

  const [theme, setTheme] = useState(initialState);

  const handleToggleTheme = () => {
    setTheme(theme === 'light-theme' ? 'dark-theme' : 'light-theme');
  }

  useEffect(() => {
    const body = document.querySelector('.im')!
    if (body) {
      body.classList.toggle(styles['light-theme'], theme === 'light-theme');
      body.classList.toggle(styles['dark-theme'], theme === 'dark-theme');
    }
  }, [theme]);

  console.log(theme)

  return [handleToggleTheme];
}