import { useEffect, useState } from 'react';

type animateType = {
  [key: number]: string;
};

const ProgressBar = ({ time }: { time: number }) => {
  const [sec, setSec] = useState(time);
  const [color, setColor] = useState('bg-green');
  const animateTime: animateType = {
    3000: 'animate-progress3',
    5000: 'animate-progress5',
    7000: 'animate-progress7'
  };

  useEffect(() => {
    const interval_id = setInterval(() => {
      setSec(sec => sec - 1000);
    }, 1000);

    setTimeout(() => {
      setColor('bg-red');
    }, time * 0.8);

    setTimeout(() => {
      clearInterval(interval_id);
    }, time);
  }, []);

  return (
    <>
      <div className="w-[1000px] overflow-hidden h-7 rounded-xl bg-gray1">
        <div className={`h-7  w-full ${animateTime[time]} ${color}`}></div>
      </div>
    </>
  );
};

export default ProgressBar;

//사용방법
{
  /* <ProgressBar time={3000} /> */
  /* <ProgressBar time={5000} /> */
  /* <ProgressBar time={7000} /> */
}
