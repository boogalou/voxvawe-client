import { Howl } from "howler";

const sound = new Howl({
  src: ['public/sounds/pull_out.ogg']
})

export function playSoundOnNewMessage() {
  sound.play();
}