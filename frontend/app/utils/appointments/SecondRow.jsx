const SecondRow = ({
  firstTitle = "",
  contactNumber = "",
  handleContactNumber = () => {},
  secondTitle = "",
  email = "",
  handleEmail = () => {},
}) => {
  return (
    <div className="flex gap-8 w-11/12 mt-5">
      <div className="flex flex-col w-full">
        <label htmlFor="contactInformation">{firstTitle}</label>
        <div className="flex gap-2">
          <input
            placeholder="+63"
            className="px-2.5 py-1 rounded-md text-lg w-[60px] mt-2"
            readOnly
          />
          <input
            type="number"
            value={contactNumber}
            onChange={handleContactNumber}
            id="contactInformation"
            name="contactInformation"
            className={`peer relative w-full h-[58px] py-1 px-4 mt-2 shadow-lg rounded-lg border border-slate-200 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white`}
            style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
          />
        </div>
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="emailAddress">{secondTitle}</label>
        <input
          type="email"
          value={email}
          onChange={handleEmail}
          id="emailAddress"
          name="emailAddress"
          className="peer w-full h-[58px] py-1 mt-2 shadow-lg rounded-lg border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
        />
      </div>
    </div>
  );
};

export default SecondRow;
