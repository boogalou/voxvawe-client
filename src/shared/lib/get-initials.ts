export function getInitials(inputString: string): string {
  return (
    inputString
      ?.split(' ')
      .map(word => word[0].toUpperCase())
      .join('') || ''
  ).toUpperCase();
}
