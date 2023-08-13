import timersound from '../../assets/audio/timersound.mp3';
import useSound from '../../hooks/useSound';

type animateType = Record<number, string>;

const ProgressBar = ({ time, color }: { time: number; color: string }) => {
  const animateTime: animateType = {
    3000: 'animate-progress3',
    5000: 'animate-progress5',
    7000: 'animate-progress7',
    10000: 'animate-progress10',
    30000: 'animate-progress30'
  };

  useSound(timersound, 1, time);

  return (
    <>
      <div className="border-[2px] border-black w-[1000px] h-7 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] bg-gray1 mb-16">
        <div className={`h-full ${animateTime[time]} ${color}`}></div>
      </div>
    </>
  );
};

export default ProgressBar;
