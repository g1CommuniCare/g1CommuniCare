const ModalOverlay = ({ children }) => (
    <div className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-sm bg-gray-200 bg-opacity-40" style={{ zIndex: 1001 }}>
      {children}
    </div>
  );
  
  const SuccessPopup = ({ title, message, onConfirm, btnMessage}) => {
    return (
      <ModalOverlay>
        <div
          className="max-w-md rounded-3xl border border-emerald-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8 transform scale-100 transition-transform ease-in-out duration-300"
          role="alert"
        >
          <div className="flex items-center gap-4">
            {/* <span className="shrink-0 rounded-full p-2 text-white">
              <img src="/images/logo.png" alt="CommuniCare Logo" className="w-12 h-12" />
            </span> */}
  
            <p className="font-bold text-xl sm:text-3xl ">{title}</p>
          </div>
  
          <p className="mt-4 text-gray-500">{message}</p>
  
          <div className="mt-6 sm:flex sm:gap-4 flex-col">
            <button
              type="button"
              onClick={onConfirm}
              className="inline-block w-full rounded-lg bg-emerald-500 px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto"
              href=""
            >
              {btnMessage}
            </button>
          </div>
        </div>
      </ModalOverlay>
    );
  };
  
  export default SuccessPopup;
  