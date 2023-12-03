import React from "react";

const ConfirmationPopup = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 overflow-y-auto flex items-center justify-center w-full">
      <div className="flex items-center justify-center w-full pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity backdrop-filter backdrop-blur-sm"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gray-500 opacity-70"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-xl w-3/12">
          <div className="bg-white p-8  w-full max-w-3xl">
            <div className="sm:flex sm:justify-center items-center">
              <div className="mt-4 text-center sm:mt-0 sm:text-left w-10/12">
                <img className="mx-auto mb-5" src="/images/logo.png" alt="logo" />
                <h3 className="text-3xl leading-6 font-bold text-gray-900 mb-8 text-center">
                  Confirm Action
                </h3>
                <div className="mt-2 text-center">
                  <p>{message}</p>

                  {/* Yes and No buttons */}
                  <div className="flex justify-center mt-8">
                    <button
                      type="button"
                      onClick={onCancel}
                      className="mr-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200"
                    >
                      No
                    </button>
                    <button
                      type="button"
                      onClick={onConfirm}
                      className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#3F948B] hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;