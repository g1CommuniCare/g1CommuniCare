import React from "react";

import ModalOverlay from "@/app/utils/admin/ModalOverlay";
import ConfirmationPopup from "../../ConfirmationPupUp";

const EditResourceModal = ({
  isEditing,
  editedName,
  setEditedName,
  editedAddress,
  setEditedAddress,
  editedContact,
  setEditedContact,
  editedLatitude,
  setEditedLatitude,
  editedLongitude,
  setEditedLongitude,
  setIsEditing,
  setConfirmUpdate,
  confirmUpdate,
  handleEdit,
}) => {
  return (
    isEditing && (
      <ModalOverlay>
        <div
          className="w-4/12 rounded-3xl border border-emerald-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8 transform scale-100 transition-transform ease-in-out duration-300"
          role="alert"
        >
          <div className="flex items-center gap-4">
            <p className="font-bold text-xl sm:text-3xl mb-4">
              Edit Local Resource
            </p>
          </div>

          <div className="mt-4 w-full">
            <div className="flex flex-col gap-y-5 w-full">
              <div>
                <label
                  htmlFor="editedName"
                  className="block text-sm font-bold text-gray-700"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="editedName"
                  name="editedName"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="peer relative w-full h-[58px] py-1 mt-0.5 shadow-lg rounded-lg border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:text-pink-500 -500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                />
              </div>
              <div>
                <label
                  htmlFor="editedAddress"
                  className="block text-sm font-bold text-gray-700"
                >
                  Address:
                </label>
                <input
                  type="text"
                  id="editedAddress"
                  name="editedAddress"
                  value={editedAddress}
                  onChange={(e) => setEditedAddress(e.target.value)}
                  className="peer relative w-full h-[58px] py-1 mt-0.5 shadow-lg rounded-lg border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:text-pink-500 -500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                />
              </div>
              <div>
                <label
                  htmlFor="editedContact"
                  className="block text-sm font-bold text-gray-700"
                >
                  Contact Information:
                </label>
                <input
                  type="text"
                  id="editedContact"
                  name="editedContact"
                  value={editedContact}
                  onChange={(e) => setEditedContact(e.target.value)}
                  className="peer relative w-full h-[58px] py-1 mt-0.5 shadow-lg rounded-lg border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:text-pink-500 -500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                />
              </div>
              <div className="flex flex-row gap-x-3 w-full">
                <div className="w-1/2">
                  <label
                    htmlFor="editedLatitude"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Latitude:
                  </label>
                  <input
                    type="text"
                    id="editedLatitude"
                    name="editedLatitude"
                    value={editedLatitude}
                    onChange={(e) => setEditedLatitude(e.target.value)}
                    className="peer relative w-full h-[58px] py-1 mt-0.5 shadow-lg rounded-lg border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:text-pink-500 -500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                  />
                </div>
                <div className="w-1/2">
                  <label
                    htmlFor="editedLongitude"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Longitude:
                  </label>
                  <input
                    type="text"
                    id="editedLongitude"
                    name="editedLongitude"
                    value={editedLongitude}
                    onChange={(e) => setEditedLongitude(e.target.value)}
                    className="peer relative w-full h-[58px] py-1 mt-0.5 shadow-lg rounded-lg border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:text-pink-500 -500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="mt-2 inline-block w-full rounded-lg bg-gray-50 px-5 py-3 text-center text-sm font-semibold text-gray-500 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setConfirmUpdate(true)}
                className="inline-block w-full rounded-lg bg-emerald-500 px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto"
              >
                Save
              </button>
            </div>
          </div>
        </div>

        {confirmUpdate && (
          <ConfirmationPopup
            message="Are you sure you want to push through this action?"
            onConfirm={handleEdit}
            onCancel={() => setConfirmUpdate(false)}
          />
        )}
      </ModalOverlay>
    )
  );
};

export default EditResourceModal;
