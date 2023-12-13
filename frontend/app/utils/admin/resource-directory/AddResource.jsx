import React, { useState } from "react";

const AddResource = ({
  isAddResourceVisible,
  toggleAddResourceVisibility,
  handleChange,
  handleAddResource,
}) => {
  return (
    <>
      <button
        className="bg-white h-10 w-full border border-gray-300  my-2"
        onClick={toggleAddResourceVisibility}
      >
        <span className="text-sm flex items-start px-5  italic">
          {isAddResourceVisible ? "Hide form" : "Add a resource..."}
        </span>
      </button>

      {isAddResourceVisible && ( // form to create resource
        <div className="bg-white h-60 w-full my-2 border border-gray-300 ">
          <div className="flex flex-col h-full w-full my-1 px-8 py-3 items-center">
            <div className="flex flex-row h-4/6 w-full ">
              <div className=" h-full w-2/12 pl-10 flex items-center text-sm ">
                Name
              </div>
              <input
                id="name"
                name="name"
                placeholder="Name "
                className="h-full w-10/12 flex resize-none px-1 focus:border-transparent outline-none items-center"
                onChange={handleChange}
              ></input>
            </div>

            <div className="flex flex-row h-4/6 w-full">
              <div className=" h-full w-2/12 pl-10 flex items-center text-sm ">
                Address
              </div>
              <input
                id="address"
                name="address"
                placeholder="Address"
                className="h-full w-10/12 flex resize-none px-1 focus:border-transparent outline-none items-center"
                onChange={handleChange}
              ></input>
            </div>
            <div className="flex flex-row h-4/6 w-full">
              <div className=" h-full w-2/12 pl-10 flex items-center text-sm ">
                Contact
              </div>
              <input
                id="contact"
                name="contact"
                placeholder="Contact"
                className="h-full w-10/12 flex resize-none px-1 focus:border-transparent outline-none items-center"
                onChange={handleChange}
              ></input>
            </div>
            <div className="flex flex-row h-4/6 w-full">
              <div className=" h-full w-2/12 pl-10 flex items-center text-sm ">
                Latitude
              </div>
              <input
                id="latitude"
                name="latitude"
                type="number"
                placeholder="Latitude"
                className="h-full w-10/12 flex resize-none px-1 focus:border-transparent outline-none items-center"
                onChange={handleChange}
              ></input>
            </div>
            <div className="flex flex-row h-4/6 w-full">
              <div className=" h-full w-2/12 pl-10 flex items-center text-sm ">
                Longitude
              </div>
              <input
                id="longitude"
                name="longitude"
                type="number"
                placeholder="Longitude"
                className="h-full w-10/12 flex resize-none px-1 focus:border-transparent outline-none items-center"
                onChange={handleChange}
              ></input>
            </div>

            <div className="flex flex-row justify-end items-end h-4/6 w-full pr-10">
              <button
                className="h-full w-2/12 bg-green-600 text-white rounded-3xl my-1"
                onClick={handleAddResource}
              >
                <span className="text-sm">Add Resource</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddResource;
