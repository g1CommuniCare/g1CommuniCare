"use client";

export default function page() {
  return (
    <div className="w-full h-full">
      {/* FIRST COLUMN */}
      <header
        className="h-96 w-full bg-cover text-white"
        style={{ backgroundImage: 'url("images/landingpage.png")' }}
      >
        <div className="flex justify-center items-center flex-col my-auto h-full">
          <h1 className="font-bold text-6xl">
            Welcome to<span className="text-[#2E64B0]">Communi</span>
            <span className="text-[#D2E900]">Care</span>!
          </h1>
          <span className="font-serif font-medium text-xl">
            Redefining Community Engagement and Support
          </span>
        </div>
      </header>

      {/* SECOND COLUMN */}
      <div
        className="flex flex-col justify-center items-center gap-5 mt-5 py-24 px-16 bg-contain bg-no-repeat bg-left"
        style={{
          backgroundImage: 'url("images/dashboard/dashboard_bgimage.png")',
        }}
      >
        <h1 className=" text-[#1f394a] text-[44px] font-extrabold">
          This is the Future of Community Empowerment
        </h1>
        <p className="text-[#1F394A] w-[1000px] font-serif text-lg text-justify leading-[30px]">
          With CommuniCare, Unlock seamless barangay engagement through
          streamlined services, including document requests, report filing, and
          a hassle-free appointment system. Experience the revolution in local
          living – where efficiency meets empowerment for a stronger, connected
          community. Elevate your experience with Communicare today!
        </p>
        <p className="text-[#1F394A] text-[40px] font-extrabold mt-24">
          Discover how to get the most out of your community!
        </p>
        <div className="flex flex-row w-full justify-center items-center gap-16 mt-12">
          <ReusableArticle
            firstWord="Find out how"
            secondWord="to participate in"
            thirdWord="the community"
            image={"images/dashboard/discussion.png"}
          />
          <ReusableArticle
            firstWord="Streamlined"
            secondWord="document requests"
            thirdWord="and report filing"
            image={"images/dashboard/document.png"}
          />
          <ReusableArticle
            firstWord="Stay on top of"
            secondWord="the latest"
            thirdWord="community news"
            image={"images/dashboard/megaphone.png"}
          />
        </div>
      </div>

      {/* THIRD COLUMN */}
      <div className="flex flex-row items-center justify-center md:ml-auto ml-auto w-[90%] mx-auto pt-10 mb-24">
        <div className="bg-[#1f394a] h-[3px] sm:mt-0 mt-8 w-[35%] mr-8" />
        <h1 className="text-[#1f394a] text-5xl font-librefranklin font-extrabold">
          ABOUT US
        </h1>
        <div className="bg-[#1f394a] h-[3px] sm:mt-0 mt-8 w-[35%] ml-8" />
      </div>

      {/* FOURTH COLUMN */}
      <div
        className="flex justify-start items-center pl-32 bg-cover w-full h-[798px]"
        style={{ backgroundImage: 'url("/images/dashboard/aboutheader.png")' }}
      >
        <h1 className="text-white font-bold text-[80px] leading-tight">
          Simplified
          <br />
          Community
          <br />
          Engagement
        </h1>
      </div>

      {/* FIFTH COLUMN */}
      <div className="flex flex-col font-sans gap-20 items-center justify-start w-full">
        <div className="w-full flex flex-col items-center justify-center gap-16 mt-20">
          <div className="flex justify-center items-center w-[1100px] gap-10">
            <div className="bg-[#1f394a] h-[3px] mb-[27px] mt-[34px] w-8/12 ml-10" />
            <div className="text-5xl text-[#1f394a] font-extrabold mr-10">
              Our Team
            </div>
          </div>
          <div className="w-[1250px] flex justify-center items-center gap-10">
            <div className="font-bold">
              <div className="md:text-8xl text-8x1 text-[111px] text-[#1F394A] tracking-[-2.22px] font-librefranklin font-bold">
                WE
              </div>
            </div>
            <p className="text-[#1F394A] text-xl w-[65%] text-justify font-medium">
              <span className="font-serif font-medium">
                are a passionate team of{" "}
              </span>
              <span className="font-serif font-bold">
                3rd-year BSIT students from the Cebu Institute of
                Technology-University
              </span>
              <span className="font-serif font-medium">
                . Our mission is simple but powerful: to bring the residents of
                our barangay closer together through the convenience of
                technology.
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-start w-[93%] md:w-full">
          <div className="flex flex-col gap-0 items-center justify-start w-full">
            <div className="flex flex-row md:gap-5 items-center justify-between w-[1000px]">
              <ReusableAboutUs
                img={"/images/dashboard/carabio.png"}
                author="Bianca Jessa Carabio"
              />
              <ReusableAboutUs
                img={"/images/dashboard/borres.png"}
                author="Joshua Jhonn Borres"
              />
              <ReusableAboutUs
                img={"/images/dashboard/mier.png"}
                author="France Gieb Mier"
              />
              <ReusableAboutUs
                img={"/images/dashboard/villarazo.png"}
                author="Bermar Villarazo Jr."
              />
            </div>
          </div>
        </div>
      </div>

      {/* SIXTH COLUMN */}
      <div className="flex flex-col gap-10 items-center justify-start mt-20 w-full">
        <div className="text-4xl text-[#1f394a] font-extrabold">Philosophy</div>
        <div className="flex w-full h-[311px]">
          <div
            className="bg-[#2e64b0] flex flex-col justify-center items-center w-1/2 bg-cover"
            style={{
              backgroundImage: 'url("images/dashboard/philosophy.png")',
            }}
          >
            <div className="text-justify text-white text-xl w-[400px] font-sans">
              Living in a connected world, we recognized the need for a platform
              that fosters community engagement. With this app, we aim to bridge
              the gap between residents, providing a space for seamless document
              requests, efficient report filing, appointment scheduling, and
              easy access to local resources.
            </div>
          </div>
          <div className="bg-[#2e64b0] flex flex-col justify-center items-center w-1/2">
            <div className="text-justify text-white text-xl w-[400px] font-sans">
              We believe in the strength of unity, and this app is our
              contribution to making our barangay a more connected and informed
              community. Join us in embracing a new era of community
              interaction, where updates, engagement, and a sense of
              togetherness are just a click away.
            </div>
          </div>
        </div>
      </div>

      {/* SEVENTH COLUMN */}
      <div className="flex flex-col gap-20 mt-24">
        <div className="flex justify-center items-start gap-[75px]">
          <div className="w-[420px] text-[#1F394A]">
            <h1 className="font-extrabold text-4xl">Our Purpose</h1>
            <p className="text-justify font-serif text-xl leading-8 mt-8">
              As enthusiastic students immersed in technology, we saw an
              opportunity to leverage connectivity for a greater purpose. Our
              app is a digital nexus, meticulously designed to simplify and
              enhance how residents interact. It's not just about technology;
              it's about fostering relationships and building a stronger sense
              of community.
            </p>
          </div>
          <img
            src="/images/dashboard/values.png"
            alt=""
            className="w-[495px] h-[389px]"
          />
        </div>
        <div className="flex justify-center items-start gap-[75px]">
          <img
            src="/images/dashboard/purpose.png"
            alt=""
            className="w-[495px] h-[389px]"
          />
          <div className="w-[420px] text-[#1F394A]">
            <h1 className="font-extrabold text-4xl">Our Purpose</h1>
            <p className="text-justify font-serif text-xl leading-8 mt-8">
              As enthusiastic students immersed in technology, we saw an
              opportunity to leverage connectivity for a greater purpose. Our
              app is a digital nexus, meticulously designed to simplify and
              enhance how residents interact. It's not just about technology;
              it's about fostering relationships and building a stronger sense
              of community.
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="w-full h-11/12 flex items-center justify-center bg-[#1F394A] mt-24">
        <div className="md:w-2/3 w-full px-4 text-white">
          <div className="w-full text-7xl font-bold">
            <h1 className="w-full md:w-2/3 mt-12">Get in touch!</h1>
          </div>

          <div className="flex mt-8 flex-col md:flex-row md:justify-between">
            <p className="w-full md:w-2/3 text-gray-400">
              Reach out anytime to start a conversation. We're here to assist
              you with any questions or challenges you may have. Your needs are
              our priority!
            </p>
            <div className="w-50 pt-6 md:pt-0">
              <button className="bg-[#9FBB16] justify-center text-center rounded-lg shadow px-10 py-3 flex items-center w-full text-[#1F394A] font-bold">
                Join Us Today!
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex mt-8 mb-4 flex-row justify-between items-center">
              <div className="flex justify-start">
                <img
                  src="/images/dashboard/img_footer.png"
                  alt=""
                  className="w-72 h-25"
                />
              </div>
              <a className="hidden md:block cursor-pointer text-gray-400 hover:text-white uppercase">
                About
              </a>
              <a className="hidden md:block cursor-pointer text-gray-400 hover:text-white uppercase">
                Services
              </a>
              <a className="hidden md:block cursor-pointer text-gray-400 hover:text-white uppercase">
                Policy
              </a>
              <a className="hidden md:block cursor-pointer text-gray-400 hover:text-white uppercase">
                Contact
              </a>
              <div className="flex flex-row space-x-5 items-center justify-between">
                <a href="https://www.facebook.com/biancarabio">
                  <img
                    src="/images/dashboard/fb.png"
                    alt="facebook"
                    className="w-5 h-5"
                  />
                </a>
                <a href="">
                  <img
                    src="/images/dashboard/gmail.png"
                    alt="gmail"
                    className="w-5 h-5"
                  />
                </a>
                <a href="">
                  <img
                    src="/images/dashboard/github.png"
                    alt="github"
                    className="w-5 h-5"
                  />
                </a>
                <a href="">
                  <img
                    src="/images/dashboard/li.png"
                    alt="linkedin"
                    className="w-5 h-5"
                  />
                </a>
              </div>
            </div>
            <hr className="border-gray-400" />
            <p className="w-full text-center my-6 text-gray-400">
              Copyright © 2023 CommuniCare
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// GI CALL NI SA SECOND COLUMN
function ReusableArticle({ firstWord, secondWord, thirdWord, image }) {
  return (
    <div className="w-[300px] h-[349px] bg-[#1f394a] rounded-[30px] shadow-[4.0px_4.0px_4.0px_rgba(0,0,0,0.5)] overflow-hidden">
      <div className="mx-4 mt-4 text-xl text-blue-50 text-left font-bold ml-5">
        <p>
          {firstWord}
          <br />
          {secondWord}
          <br />
          {thirdWord}
        </p>
      </div>
      <img src={image} className="object-cover w-full ml-2" />
    </div>
  );
}

// GI CALL NI SA FIFTH COLUMN
function ReusableAboutUs({ img, author }) {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <img className="h-[185px] md:h-auto rounded-[50%] w-[185px]" src={img} />
      <p className="text-base text-[#1f394a] font-sans font-bold">{author}</p>
    </div>
  );
}
