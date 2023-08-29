import { Howl } from "howler";

export async function  playSoundOnNewMessage() {

  const sound = new Howl(
    { src: ['/sounds/pull_out.ogg'],
      autoplay: true,
    });

  sound.play();

}