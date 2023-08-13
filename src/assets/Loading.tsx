const Loading = () => {
  return (
    <div className="absolute top-[50%] left-[50%] -translate-x-center -translate-y-center">
      <svg width="1000" height="300" viewBox="0 0 50 50">
        <path
          opacity="0.2"
          d="M25,2.784C12.73,2.784,2.783,12.73,2.783,25S12.73,47.217,25,47.217S47.217,37.27,47.217,25
	S37.27,2.784,25,2.784z M25,45.161C13.866,45.161,4.839,36.135,4.839,25C4.839,13.866,13.866,4.839,25,4.839
	c11.134,0,20.161,9.026,20.161,20.161C45.161,36.135,36.134,45.161,25,45.161z"
        />
        <path
          fill="#3AB4F2"
          d="M25.029,4.841c1.532,0.002,3.018,0.189,4.452,0.516l0.456-2.015c-1.579-0.359-3.22-0.555-4.908-0.557V4.841z"
        >
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  );
};

export default Loading;
