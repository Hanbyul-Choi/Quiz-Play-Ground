import { useEffect } from 'react';

import { Howl } from 'howler';

const useSound = (src: any, volume: number, time: number) => {
  let sound: any;
  const soundStop = () => sound.stop();
  const soundPlay = (src: any) => {
    sound = new Howl({ src });
    sound.volume(volume);
    sound.play();
  };

  useEffect(() => {
    soundPlay(src);
    sound.on('play', () => {
      setTimeout(() => sound.stop(), time);
    });
    return soundStop;
  }, []);
};

export default useSound;
