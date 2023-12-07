export default function ResourceDirectory() {
  return (
    <div className="w-full h-full bg-slate-100">
      {/* Header */}
      <div className="h-96 w-full">
        <div className="flex justify-center flex-col my-auto ml-12 mr-96 h-full">
          <h1 className="font-bold text-6xl">Resource Directory</h1>
          <span className="flex justify-center font-small text-lg mt-2 mr-96">
            Discover a centralized hub for essential resources in our barangay.
            From emergency contacts to local businesses, educational
            institutions, and healthcare services, access a comprehensive guide
            to everything our community has to offer. Your go-to resource for
            local information.
          </span>
        </div>
      </div>

      <div className="flex flex-row  h-full w-full mx-auto mb-5 gap-x-9 px-9">
        {/* right column */}
        <div className="w-2/5">
          <div className="bg-white h-12 w-full rounded-3xl flex items-center border border-black">
            <span className="px-5">Search</span>
          </div>
          <div className="flex flex-col gap-3 mt-4">
            <div className=" bg-white h-36 w-full border border-gray-300"></div>
            <div className=" bg-white h-36 w-full border border-gray-300"></div>
            <div className=" bg-white h-36 w-full border border-gray-300"></div>
            <div className=" bg-white h-36 w-full border border-gray-300"></div>
            <div className=" bg-white h-36 w-full border border-gray-300"></div>
          </div>
        </div>
        {/* left column */}
        <div className="bg-white w-3/5 border border-slate-300"></div>
      </div>
    </div>
  );
}
