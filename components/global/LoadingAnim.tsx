type LoadingAnimProps = {
  width?: string;
};

const LoadingAnim = ({ width }: LoadingAnimProps) => {
  return (
    <div
      className={`flex flex-col justify-center items-center bg-light-bg dark:bg-dark-bg ${
        width !== null ? `w-[${width}]` : "w-[100vw]"
      } h-screen`}
    >
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-black dark:text-white"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default LoadingAnim;
