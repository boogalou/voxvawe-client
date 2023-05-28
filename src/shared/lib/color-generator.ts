// export function generateColor(number: number) {
//   const hex = number.toString(16).padStart(6, '0');
//   const red = parseInt(hex.substring(0, 2), 16);
//   const green = parseInt(hex.substring(2, 4), 16);
//   const blue = parseInt(hex.substring(4, 6), 16);
//
//   const brightness = (red * 299 + green * 587 + blue * 114) / 1000;
//   const threshold = 128;
//
//   if (brightness < threshold) {
//     const increaseAmount = threshold - brightness;
//     const increasedRed = Math.min(255, red + increaseAmount);
//     const increasedGreen = Math.min(255, green + increaseAmount);
//     const increasedBlue = Math.min(255, blue + increaseAmount);
//
//     const updatedColor = (increasedRed * 65536 + increasedGreen * 256 + increasedBlue).toString(16).padStart(6, '0');
//     return '#' + updatedColor;
//   }
//
//   return '#' + hex;
// }

export function generateColor(inputString: string) {

  if (!inputString) {
    return ''
  }

  // Преобразуем строку в числовое значение
  let hash = 0;
  for (let i = 0; i < inputString.length; i++) {
    hash = inputString.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Генерируем компоненты RGB на основе числового значения
  const red = (hash & 0xFF0000) >> 16;
  const green = (hash & 0x00FF00) >> 8;
  const blue = hash & 0x0000FF;

  // Применяем эффект винтажа
  const saturation = Math.floor(Math.random() * 21) + 80; // Насыщенность от 80 до 100
  const lightness = Math.floor(Math.random() * 21) + 30; // Яркость от 30 до 50

  // Преобразуем компоненты RGB в формат HSL
  const hslColor = 'hsl(' + red + ', ' + saturation + '%, ' + lightness + '%)';

  return hslColor;
}



