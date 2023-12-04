const ModalOverlay = ({ children }) => (
    <div className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-md">
      {children}
    </div>
  );
  
  const ConfirmationPopup = ({ message, onConfirm, onCancel }) => {
    return (
      <ModalOverlay>
        <div
          className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8 transform scale-5000 transition-transform ease-in-out duration-300"
          role="alert"
        >
          <div className="flex items-center gap-4">
            <span className="shrink-0 rounded-full p-2 text-white">
              <img src="/images/logo.png" alt="CommuniCare Logo" className="w-12 h-12" />
              {/* Adjust the size by changing the 'w-12' and 'h-12' values */}
            </span>
  
            <p className="font-bold sm:text-lg ">Are you sure?</p>
          </div>
  
          <p className="mt-4 text-gray-500">{message}</p>
  
          <div className="mt-6 sm:flex sm:gap-4">
            <button
              type="button"
              onClick={onConfirm}
              className="inline-block w-full rounded-lg bg-emerald-500 px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto"
              href=""
            >
              Yes, I'm sure
            </button>
  
            <button
              type="button"
              onClick={onCancel}
              className="mt-2 inline-block w-full rounded-lg bg-gray-50 px-5 py-3 text-center text-sm font-semibold text-gray-500 sm:mt-0 sm:w-auto"
              href=""
            >
              No, Go back
            </button>
          </div>
        </div>
      </ModalOverlay>
    );
  };
  
  export default ConfirmationPopup;
  