import React from "react";

const Home = () => {
  return (
    <div className="w-full p-10 bg-gray-100">
      <div className="text-5xl font-bold mt-5">Dashboard</div>

      <div className="container mx-auto mt-8 w-full">
        <div className="flex space-x-5 h-[110px]">
          <div className="flex items-center justify-left bg-white h-full w-1/4 p-10 pl-15 border border-DDE1E6">
            <img
              src="images/admin/people-people.png"
              alt="People"
              className="w-16"
            />
            <div className="flex flex-col ml-6">
              <span className="text-xl leading-5 bg-697077">Total Users</span>
              <span className="text-3xl font-bold">12,230</span>
            </div>
          </div>

          <div className="flex items-center justify-left bg-white h-full w-1/4 p-10 pl-15 border border-DDE1E6">
            <img
              src="images/admin/checked-user-male.png"
              alt="Verified"
              className="w-16"
            />
            <div className="flex flex-col ml-6">
              <span className="text-xl leading-5 bg-697077">
                Verified Users
              </span>
              <span className="text-3xl font-bold">10,250</span>
            </div>
          </div>

          <div className="flex items-center justify-left bg-white h-full w-1/4 p-10 pl-15 border border-DDE1E6">
            <img
              src="images/admin/delete-user.png"
              alt="Pending"
              className="w-16"
            />
            <div className="flex flex-col ml-6">
              <span className="text-xl leading-5 bg-697077">Pending Users</span>
              <span className="text-3xl font-bold">2,028</span>
            </div>
          </div>

          <div className="flex items-center justify-left bg-white h-full w-1/4 p-10 pl-15 border border-DDE1E6">
            <img src="images/admin/admin.png" alt="Admin" className="w-16" />
            <div className="flex flex-col ml-6">
              <span className="text-xl leading-5 bg-697077">Admins</span>
              <span className="text-3xl font-bold">6</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-8 w-full">
        <div className="flex space-x-5">
          <div className="bg-white h-[350px] w-1/2 border border-DDE1E6"></div>
          <div className="bg-white h-[350px] w-1/2 border border-DDE1E6"></div>
        </div>
      </div>

      <div className="container mx-auto mt-8 w-full">
        <div className="flex space-x-5">
          <div className="bg-white h-[550px] w-1/2 p-8 border border-DDE1E6">
            <span className="font-medium text-xl mb-2">
              Community Bulletin Engagement
            </span>

            <div className="container mt-5 mx-auto h-[90px] w-full p-3 pt-4 bg-gray-100 flex">
              <div className="flex flex-col h-full w-2/4 pl-4 ">
                <span className="font-semibold text-2xl">
                  Barangay Clean-Up Day
                </span>
                <span className="italic leading-5">Bianca Jessa Carabio</span>
              </div>
              <div className="h-full w-1/4 border border-pink flex items-center">
                <img
                  src="images/admin/up-green.png"
                  alt="Up"
                  className="w-12"
                />
                <span className="font-semibold text-3xl">156</span>
              </div>
              <div className="h-full w-1/4 bg-amber-700"></div>
            </div>

            <div className="containeer mt-5 mx-auto h-[90px] w-full bg-gray-100"></div>
            <div className="containeer mt-5 mx-auto h-[90px] w-full bg-gray-100"></div>
            <div className="containeer mt-5 mx-auto h-[90px] w-full bg-gray-100"></div>
          </div>
          <div className="flex flex-col w-1/2 ">
            <div className="bg-white h-[300px] w-full border border-DDE1E6 mb-auto"></div>
            <div className="flex justify-center h-[230px] w-full p-4">
              <img
                src="images/communicare-logo-tagline.png"
                alt="CommuniCare"
                className="w-4/5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
