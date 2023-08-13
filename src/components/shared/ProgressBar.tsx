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
  // useEffect(() => {
  //   if (time > 0) {
  //     const INTERVAL_ID = setInterval(() => {
  //       setSec(sec => sec - 1000);
  //     }, 1000);

  //     setTimeout(() => {
  //       setColor('bg-red');
  //     }, time * 0.8);

  //     setTimeout(() => {
  //       clearInterval(INTERVAL_ID);
  //       toggleInCorrectModal();
  //       timeOut();
  //     }, time);
  //   }
  // }, []);

  return (
    <>
      <div className="w-[1000px] overflow-hidden h-7 rounded-xl bg-gray1">
        <div className={`h-7  w-full ${animateTime[time]} ${color}`}></div>
      </div>
    </>
  );
};

export default ProgressBar;
