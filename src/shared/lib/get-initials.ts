

export function getInitials(inputString: string): string[]  {
  if (!inputString) {
    return [];
  }

  const newStrings = inputString.toUpperCase().split(' ')

  if (newStrings.length > 1) {
    return [newStrings[0][0], inputString[1][0]];
  }
  return [newStrings[0][0]];
}