const InputWithDate = ({
  firstTitle = "",
  selectDocumentType = "",
  handleSelectDocumentType = () => {},
  documentTypes = [],
  secondTitle = "",
  date = "",
  handleDate = () => {},
  thirdTitle = "",
  time = "",
  handleTime = () => {},
}) => {
  return (
    <div className="flex gap-8 w-[688px] mt-5">
      {/* 50% width */}
      <div className="flex flex-col" style={{ width: "60%" }}>
        <label htmlFor="contactInformation">{firstTitle}</label>
        <div className="flex gap-2">
          <select
            value={selectDocumentType}
            onChange={handleSelectDocumentType}
            className="px-2.5 py-1 text-lg rounded-md w-full mt-2"
            name="document-type"
          >
            {documentTypes.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 25% width */}
      <div className="flex flex-col" style={{ width: "25%" }}>
        <label htmlFor="purpose">{secondTitle}</label>
        <input
          type="date"
          value={date}
          onChange={handleDate}
          name="date"
          className="px-2.5 py-1 rounded-md text-md mt-2"
        />
      </div>

      {/* 25% width */}
      <div className="flex flex-col" style={{ width: "25%" }}>
        <label htmlFor="purpose">{thirdTitle}</label>
        <input
          type="time"
          value={time}
          onChange={handleTime}
          name="time"
          className="px-2.5 py-1 rounded-md text-md mt-2"
        />
      </div>
    </div>
  );
};

export default InputWithDate;
