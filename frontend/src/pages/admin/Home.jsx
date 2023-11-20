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
          <div className="bg-white h-[350px] w-1/2 border border-DDE1E6 p-8">
            <span className="font-medium text-xl">Document Request</span>
            <div className="flex">
              <div className="w-3/5 h-60 mt-4 p-2 flex justify-center">
                <img
                  src="/images/admin/chart-docu-request.svg"
                  alt="Chart"
                  className="w-56"
                />
              </div>
              <div className="w-2/5 h-60 mt-4 flex flex-col space-y-7">
                <div>
                  <span>Approved Requests</span>
                  <div className="flex items-center">
                    <img src="/images/admin/green-circle.svg" alt="bullet" />
                    <span className="font-semibold text-2xl pl-2">2,230</span>
                  </div>
                </div>

                <div>
                  <span>Pending Requests</span>
                  <div className="flex items-center">
                    <img src="/images/admin/orange-circle.svg" alt="bullet" />
                    <span className="font-semibold text-2xl pl-2">1,130</span>
                  </div>
                </div>

                <div>
                  <span>Denied Requests</span>
                  <div className="flex items-center">
                    <img src="/images/admin/red-circle.svg" alt="bullet" />
                    <span className="font-semibold text-2xl pl-2">112</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white h-[350px] w-1/2 border border-DDE1E6 p-8">
            <span className="font-medium text-xl">Report Filing</span>
            <div className="flex">
              <div className="w-3/5 h-60 mt-4 p-2 flex justify-center">
                <img
                  src="/images/admin/chart-docu-request.svg"
                  alt="Chart"
                  className="w-56"
                />
              </div>
              <div className="w-2/5 h-60 mt-4 flex flex-col space-y-7">
                <div>
                  <span>Total Reports Files</span>
                  <div className="flex items-center">
                    <img src="/images/admin/gray-circle.svg" alt="bullet" />
                    <span className="font-semibold text-2xl pl-2">4,755</span>
                  </div>
                </div>

                <div>
                  <span>Resolved Reports</span>
                  <div className="flex items-center">
                    <img src="/images/admin/green-circle.svg" alt="bullet" />
                    <span className="font-semibold text-2xl pl-2">3,530</span>
                  </div>
                </div>

                <div>
                  <span>Pending Reports</span>
                  <div className="flex items-center">
                    <img src="/images/admin/orange-circle.svg" alt="bullet" />
                    <span className="font-semibold text-2xl pl-2">1,122</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-8 w-full">
        <div className="flex space-x-5">
          <div className="bg-white h-[550px] w-1/2 p-8 border border-DDE1E6">
            <span className="font-medium text-xl mb-2">
              Community Bulletin Engagement
            </span>

            <div className="container mt-5 mx-auto h-[90px] w-full p-3 bg-gray-100 flex">
              <div className="flex flex-col h-full w-3/5 m-1 pl-3">
                <span className="font-semibold text-2xl">
                  Barangay Clean-Up Day
                </span>
                <span className="italic">Bianca Jessa Carabio</span>
              </div>

              <div className="h-full w-2/5 flex items-center">
                <img
                  src="images/admin/up-green.png"
                  alt="Up"
                  className="w-12 m-1"
                />
                <span className="font-semibold text-3xl">156</span>

                <img
                  src="images/admin/down-red.png"
                  alt="Down"
                  className="w-12 ml-5"
                />
                <span className="font-semibold text-3xl">03</span>
              </div>
            </div>

            <div className="container mt-5 mx-auto h-[90px] w-full p-3 bg-gray-100 flex">
              <div className="flex flex-col h-full w-3/5 m-1 pl-3">
                <span className="font-semibold text-2xl">
                  Road Maintenance Notice
                </span>
                <span className="italic">Joshua Jhonn B. Borres</span>
              </div>

              <div className="h-full w-2/5 flex items-center">
                <img
                  src="images/admin/up-green.png"
                  alt="Up"
                  className="w-12 m-1"
                />
                <span className="font-semibold text-3xl">213</span>

                <img
                  src="images/admin/down-red.png"
                  alt="Down"
                  className="w-12 ml-5"
                />
                <span className="font-semibold text-3xl">109</span>
              </div>
            </div>

            <div className="container mt-5 mx-auto h-[90px] w-full p-3 bg-gray-100 flex">
              <div className="flex flex-col h-full w-3/5 m-1 pl-3">
                <span className="font-semibold text-2xl">
                  Fire Safety Awareness
                </span>
                <span className="italic">France Gieb S. Mier</span>
              </div>

              <div className="h-full w-2/5 flex items-center">
                <img
                  src="images/admin/up-green.png"
                  alt="Up"
                  className="w-12 m-1"
                />
                <span className="font-semibold text-3xl">312</span>

                <img
                  src="images/admin/down-red.png"
                  alt="Down"
                  className="w-12 ml-5"
                />
                <span className="font-semibold text-3xl">01</span>
              </div>
            </div>

            <div className="container mt-5 mx-auto h-[90px] w-full p-3 bg-gray-100 flex">
              <div className="flex flex-col h-full w-3/5 m-1 pl-3">
                <span className="font-semibold text-2xl">
                  Monthly Barangay Meeting
                </span>
                <span className="italic">Bermar Villarazo Jr.</span>
              </div>

              <div className="h-full w-2/5 flex items-center">
                <img
                  src="images/admin/up-green.png"
                  alt="Up"
                  className="w-12 m-1"
                />
                <span className="font-semibold text-3xl">134</span>

                <img
                  src="images/admin/down-red.png"
                  alt="Down"
                  className="w-12 ml-5"
                />
                <span className="font-semibold text-3xl">00</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-1/2 ">
            <div className="bg-white h-[300px] w-full border border-DDE1E6 mb-auto p-5">
              <span className="font-medium text-xl">Appointment Request</span>
              <div className="flex">
                <div className="w-3/5 h-60 flex justify-center">
                  <img
                    src="/images/admin/chart-docu-request.svg"
                    alt="Chart"
                    className="w-52"
                  />
                </div>

                <div className="w-2/5 h-60 mt-4 flex flex-col space-y-3">
                  <div>
                    <span>Approved Requests</span>
                    <div className="flex items-center">
                      <img src="/images/admin/green-circle.svg" alt="bullet" />
                      <span className="font-semibold text-2xl pl-2">1,025</span>
                    </div>
                  </div>

                  <div>
                    <span>Pending Requests</span>
                    <div className="flex items-center">
                      <img src="/images/admin/orange-circle.svg" alt="bullet" />
                      <span className="font-semibold text-2xl pl-2">604</span>
                    </div>
                  </div>

                  <div>
                    <span>Denied Requests</span>
                    <div className="flex items-center">
                      <img src="/images/admin/red-circle.svg" alt="bullet" />
                      <span className="font-semibold text-2xl pl-2">34</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
