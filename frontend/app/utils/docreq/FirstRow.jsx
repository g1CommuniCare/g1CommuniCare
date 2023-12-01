const FirstRow = ({
  firstTitle = "",
  firstName = "",
  handleFirstName,
  secondTitle = "",
  lastName = "",
  handleLastName = () => {},
  thirdTitle = "",
  middleInitial = "",
  handleMiddleInitial = () => {},
}) => {
  return (
    <div className="flex gap-8">
      <div className="flex flex-col w-5/12">
        <label htmlFor="firstNameId">{firstTitle}</label>
        <input
          type="text"
          id="firstNameId"
          name="firstName"
          value={firstName}
          onChange={handleFirstName}
          required
          className="peer relative w-full h-[58px] py-1 mt-2 shadow-lg rounded-lg border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
        />
      </div>
      <div className="flex flex-col w-5/12">
        <label htmlFor="lastNameId">{secondTitle}</label>
        <input
          type="text"
          id="lastNameId"
          name="lastName"
          value={lastName}
          onChange={handleLastName}
          required
          className="peer relative w-full h-[58px] py-1 mt-2 shadow-lg rounded-lg border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
        />
      </div>
      <div className="flex flex-col w-2/12">
        <label htmlFor="middleInitialId">{thirdTitle}</label>
        <input
          type="text"
          id="middleInitialId"
          name="middleInitial"
          value={middleInitial}
          onChange={handleMiddleInitial}
          required
          className="py-1 mt-2 peer relative h-[58px] w-full shadow-lg rounded-lg border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
        />
      </div>
    </div>
  );
};

export default FirstRow;
