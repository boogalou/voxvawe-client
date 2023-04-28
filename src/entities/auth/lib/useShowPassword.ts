import { useState } from "react";

export type UseShowPassword = [boolean, () => void];

export function useShowPasswordToggle(initialState = false): UseShowPassword {

  const [showPassword, setShowPassword] = useState(initialState);

  const togglePassword = () => {
    setShowPassword(prevState => !prevState);
  }
  return [showPassword, togglePassword];
}