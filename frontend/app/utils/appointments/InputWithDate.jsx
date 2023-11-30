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
        <div className="flex gap-8 w-11/12 mt-5">
            {/* 50% width */}
            <div className="flex flex-col flex-1">
                <label htmlFor="contactInformation">{firstTitle}</label>
                <div className="flex gap-2">
                    <select
                        value={meetingFormat}
                        onChange={handleSelectMeetingFormat}
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

            {/* 25% width */}
            <div className="w-59 flex flex-row flex-1 gap-4">
            <div className="flex flex-col">
                <label htmlFor="purpose">{secondTitle}</label>
                <input
                    type="date"
                    value={date}
                    onChange={handleDate}
                    name="date"
                    className="peer relative w-72 h-[58px] py-1 px-4 mt-2 shadow-lg rounded-lg border border-slate-200 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                />
            </div>

            {/* 25% width */}
            <div className="flex flex-col">
                <label htmlFor="purpose">{thirdTitle}</label>
                <input
                    type="time"
                    value={time}
                    onChange={handleTime}
                    name="time"
                    className="peer relative w-72 h-[58px] py-1 px-4 mt-2 shadow-lg rounded-lg border border-slate-200 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                />
            </div>
            </div>
        </div>
    );
};

export default InputWithDate;
