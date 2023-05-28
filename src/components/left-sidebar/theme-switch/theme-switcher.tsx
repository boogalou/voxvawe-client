import React from 'react';
import { Toggle } from "shared/ui";
import { useToggleTheme } from './hooks/use-toggle-theme';


export const ThemeSwitcher = () => {

  const handleToggleSwitch = ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
    handleToggleTheme()
  }

  const [handleToggleTheme] = useToggleTheme('light-theme');

  return (
      <>
        <Toggle
            name={'theme'}
            onChange={handleToggleSwitch}/>
      </>
  );
};

