

export function getInitials(inputString: string): string  {
  if (!inputString) {
    return '';
  }

  const newStrings = inputString.split(' ')

  if (newStrings.length > 1) {
    return newStrings[0].slice(0, 1) + newStrings[1].slice(0, 1);
  }
  return newStrings[0][0];
}