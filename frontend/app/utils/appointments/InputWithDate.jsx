const InputWithDate = ({
  firstTitle = "",
  meetingFormat = "",
  handleSelectMeetingFormat = () => {},
  meetingTypes = [],
  secondTitle = "",
  date = "",
  handleDate = () => {},
  thirdTitle = "",
  time = "",
  handleTime = () => {},
}) => {
  return (
    <div className="flex gap-8 mt-12">
      <div className="h-[58px] w-5/12 ">
        <div className="flex flex-col flex-1">
          <label htmlFor="contactInformation">{firstTitle}</label>
          <div className="flex gap-2">
            <select
              value={meetingFormat}
              onChange={handleSelectMeetingFormat}
              placeholder="Select Meeting Format"
              className="peer w-full h-[58px] py-5 px-5 mt-2 shadow-lg rounded-lg border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              name="meeting-type"
            >
              {meetingTypes.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="w-5/12 h-[89px] gap-3 flex flex-row">
        {/* Date */}
        <div className=" w-1/2 flex flex-col">
          <label htmlFor="purpose">{secondTitle}</label>
          <input
            type="date"
            value={date}
            onChange={handleDate}
            name="date"
            className="peer relative w-full h-[58px] py-1 mt-2 shadow-lg rounded-lg border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          />
        </div>

        {/* Time */}
        <div className="w-1/2 flex flex-col">
          <label htmlFor="purpose">{thirdTitle}</label>
          <input
            type="time"
            value={time}
            onChange={handleTime}
            name="time"
            className="peer relative w-full h-[58px] py-1 mt-2 shadow-lg rounded-lg border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          />
        </div>
      </div>
      <div className="w-2/12 h-[89px]"></div>
    </div>
  );
};

export default InputWithDate;
