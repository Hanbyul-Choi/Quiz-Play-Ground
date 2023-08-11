import { useEffect, useState } from 'react';

import { modalStateStore } from 'store';

import InCorrectModal from './modal/InCorrectModal';

type animateType = Record<number, string>;

const ProgressBar = ({ time }: { time: number }) => {
  const [sec, setSec] = useState(time);
  const [color, setColor] = useState('bg-green');
  const animateTime: animateType = {
    3000: 'animate-progress3',
    5000: 'animate-progress5',
    7000: 'animate-progress7'
  };

  const isInCorrectModalOpen = modalStateStore(state => state.isInCorrectModalOpen);
  const toggleInCorrectModal = modalStateStore(state => state.toggleInCorrectModal);
  console.log(sec);
  useEffect(() => {
    const INTERVAL_ID = setInterval(() => {
      setSec(sec => sec - 1000);
    }, 1000);

    setTimeout(() => {
      setColor('bg-red');
    }, time * 0.8);

    setTimeout(() => {
      clearInterval(INTERVAL_ID);
      toggleInCorrectModal();
    }, time);
  }, []);

  return (
    <>
      {isInCorrectModalOpen && <InCorrectModal toggleModal={toggleInCorrectModal} />}
      <div className="w-[1000px] overflow-hidden h-7 rounded-xl bg-gray1">
        <div className={`h-7  w-full ${animateTime[time]} ${color}`}></div>
      </div>
    </>
  );
};

export default ProgressBar;
