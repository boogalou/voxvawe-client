
interface ColorPalette {
  [key: string]: string;
}

export function generateColor(inputString: string) {

  const hashCode = inputString
    .split('')
    .reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) & 0xffff, 0)

  const gruvboxColors: ColorPalette = {
    red: '#fb4934',
    green: '#b8bb26',
    yellow: '#fabd2f',
    blue: '#83a598',
    purple: '#d3869b',
    aqua: '#8ec07c',
    orange: '#fe8019',
  };

  const colorKeys = Object.keys(gruvboxColors);
  const colorIndex = Math.abs(hashCode) % colorKeys.length;
  const selectedColor = gruvboxColors[colorKeys[colorIndex]];

  return selectedColor;
}



