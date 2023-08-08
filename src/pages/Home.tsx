import CorrectModal from '../components/shared/CorrectModal';
import InCorrectModal from '../components/shared/InCorrectModal';
import { modalStateStore } from '../store';

export const Home = () => {
  const isCorrectModalOpen = modalStateStore(state => state.isCorrectModalOpen);
  const toggleCorrectModal = modalStateStore(state => state.toggleCorrectModal);
  const isInCorrectModalOpen = modalStateStore(state => state.isInCorrectModalOpen);
  const toggleInCorrectModal = modalStateStore(state => state.toggleInCorrectModal);

  return (
    <>
      <div className="text-hoverGreen">Home</div>
      <button onClick={toggleCorrectModal}>correct 모달 띄우기</button>
      {isCorrectModalOpen && <CorrectModal toggleModal={toggleCorrectModal} />}
      <button onClick={toggleInCorrectModal}>Incorrect 모달 띄우기</button>
      {isInCorrectModalOpen && <InCorrectModal toggleModal={toggleInCorrectModal} />}
    </>
  );
};
