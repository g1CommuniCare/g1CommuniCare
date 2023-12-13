import React from "react";

const ResourceList = ({
  filteredResources,
  handleMarkerChange,
  handleUpdateResource,
  handleDeleteResource,
}) => {
  return (
    <div className="flex flex-col h-[785px] gap-3 mt-4 overflow-auto">
      {filteredResources.length === 0 ? (
        <div className="text-center text-gray-500 font-semibold italic">
          No Resources Found
        </div>
      ) : (
        filteredResources.map((resource) => (
          <div
            key={resource.resourceId}
            className="bg-white h-36 w-full border border-gray-300 flex items-center"
            onClick={() =>
              handleMarkerChange(
                parseFloat(resource.resourceLatitude),
                parseFloat(resource.resourceLongitude)
              )
            }
          >
            <div className="flex flex-col w-full pl-5 pr-3 py-3.5 text-black gap-y-1">
              <div className="flex flex-row w-full">
                <div className="text-slate-600 w-10/12 ">
                  {resource.resourceAddress}
                </div>
                <div className="w-2/12 flex flex-row items-start justify-end">
                  <img
                    src="admin/edit-icon.png"
                    className="w-4 h-4 mx-1 opacity-50 hover:opacity-100 transition-opacity duration-300"
                    onClick={(e) =>
                      handleUpdateResource(e, resource.resourceId)
                    }
                  />

                  <img
                    src="admin/delete-icon.png"
                    className="w-4 h-4 mx-1 opacity-50 hover:opacity-100 transition-opacity duration-300"
                    onClick={(e) =>
                      handleDeleteResource(e, resource.resourceId)
                    }
                  />
                </div>
              </div>
              <div className="text-lg font-medium ">
                {resource.resourceContact}
              </div>
              <div className="text-3xl font-bold pr-2">
                {resource.resourceName}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ResourceList;
