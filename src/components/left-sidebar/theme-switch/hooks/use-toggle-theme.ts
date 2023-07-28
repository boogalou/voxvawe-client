import { useEffect, useState } from 'react';
import styles from 'pages/im/im.module.scss';

export const useToggleTheme = (initialState: string) => {
  const storedTheme = localStorage.getItem('theme');
  const [theme, setTheme] = useState(storedTheme ? JSON.parse(storedTheme) : initialState);

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);
  
  
  const handleToggleTheme = () => {
    setTheme(theme === 'light-theme' ? 'dark-theme' : 'light-theme');
  };

  useEffect(() => {
    const body = document.querySelector('body')!;
    if (body) {
      body.classList.toggle(styles['light-theme'], theme === 'light-theme');
      body.classList.toggle(styles['dark-theme'], theme === 'dark-theme');
    }
  }, [theme]);

  return [handleToggleTheme];
};
