const MyQuestion = () => {
  return (
    <li>
      <div className="flex">
        <p className="mt-4 pl-1 text-gray4 text-[12px]">익명의 기러기</p>
        <p className="mt-4 pl-1 text-gray4 text-[12px]">|</p>
        <p className="mt-4 pl-1 text-gray4 text-[12px]">2023.08.09</p>
      </div>
      <div className="flex justify-between pb-2 border-b border-gray3">
        <p className="p-1">[이어 말하기] 속담 | 예능 게임 | 20문항 </p>
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <button>
              <img src={'./assets/SmallLikeOutlined.svg'} alt="like" />
            </button>
            <p>115</p>
          </div>
          <div className="flex gap-1">
            <button>
              <img src={'./assets/EditOutlined.svg'} alt="edit" />
            </button>
            <button>
              <img src={'./assets/DeleteOutlined.svg'} alt="delete" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default MyQuestion;
