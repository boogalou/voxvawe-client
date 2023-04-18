import React from 'react';
import {Toggle} from "@/shared";
import {useToggleTheme} from "@/features/theme-switch/hooks/use-toggle-theme";

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

