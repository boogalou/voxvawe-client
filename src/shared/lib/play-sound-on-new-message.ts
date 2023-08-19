// import { Howl } from "howler";

// const sound = new Howl({
//   src: ['public/sounds/pull_out.ogg']
// })

export async function  playSoundOnNewMessage() {
  const sound = new Audio('./public/sounds/pull_out.ogg')
 await sound.play();

}