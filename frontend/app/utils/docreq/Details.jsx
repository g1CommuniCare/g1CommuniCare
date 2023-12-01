import React from "react";

const Details = ({
  firstTitle = "",
  details = "",
  handleDetails = () => {},
}) => {
  return (
    <div className="flex gap-8 w-[688px] mt-5">
      <div className="flex flex-col w-full">
        <label htmlFor="address">{firstTitle}</label>
        <textarea
          type="text"
          value={details}
          onChange={handleDetails}
          placeholder="Write report details..."
          id="address"
          name="address"
          className="px-2.5 py-1 rounded-md text-lg mt-2 italic-placeholder h-32"
          style={{ resize: "none" }}
        />
      </div>
    </div>
  );
};

export default Details;
