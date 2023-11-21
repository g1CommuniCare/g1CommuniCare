import React from "react";
import { Img } from "../../components/Img";
import { Line } from "../../components/Line";
import { Text } from "../../components/Text";
import "../../styles/color.css";
import "../../styles/font.css";
import "../../styles/index.css";
import "../../styles/tailwind.css";
const Home = () => {
  return (
    <>
      <div className="bg-gray-100 items-center justify-start w-full">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="h-[438px] relative w-full">
            <div className="font-librefranklin h-[438px] w-full">
              <Img
                className="h-[438px] w-[1800px] mr-50px"
                src="images/img_ban32.png"
                alt="banThirtyTwo"
              />
              <Text
                className="absolute inset-x-[0] mx-auto md:text-7xl text-[80px] text-center text-white top-[34%] w-max font-bold"
                size="txtLibreFranklinRomanBold64"
              >
                <span className="text-white font-librefranklin font-bold">
                  Welcome to{" "}
                </span>
                <span
                  style={{ color: "#2e64b0" }}
                  className="text-{indigo-500} font-librefranklin font-bold"
                >
                  Communi
                </span>
                <span
                  style={{ color: "#d2e900" }}
                  className="text-lime font-librefranklin font-bold"
                >
                  Care
                </span>
                <span className="text-white font-librefranklin font-bold">
                  !
                </span>
              </Text>
            </div>
            <Text className="absolute bottom-[44%] inset-x-[0] mx-auto text-center text-white text-xl w-max mt-5 font-robotoserif font-medium">
              Redefining Community Engagement and Support
            </Text>
          </div>
          <Text
            style={{ color: "#1f394a" }}
            className="mt-[116px] sm:text-[40px] text-5xl  text-blue_gray-900 text-center font-librefranklin font-extrabold"
            size="txtLibreFranklinRomanExtraBold44"
          >
            This is the Future of Community Empowerment
          </Text>
          <Text
            className="leading-[30.00px] mt-[26px] text-[30px] text-blue_gray-900 text-justify sm:text-lg md:text-xl tracking-[-0.44px] w-[73%] w-[75%] font-robotoserif font-medium"
            size="txtRobotoSerifRegular22"
          >
            <span className="text-[#1f394a] font-sans font-medium">With </span>
            <span className="text-[#1f394a] font-sans font-medium"> CommuniCare </span>
            <span className="text-[#1f394a] font-sans font-medium">
              , Unlock seamless barangay engagement through streamlined
              services, including document requests, report filing, and a
              hassle-free appointment system.{" "}
            </span>
            <span className="text-[#1f394a] font-sans font-medium">
              Experience
            </span>
            <span className="text-[#1f394a] font-sans font-medium">
              {" "}
              the revolution in local living – where efficiency meets
              empowerment for a stronger, connected community. Elevate your
              experience with Communicare today!
            </span>
          </Text>
          <Text
            className="mt-[110px] text-2xl md:text-[33px] text-[20px] text-[#1f394a] text-center w-[1100px]"
            size="txtLibreFranklinRomanExtraBold40"
          >
            Discover how to get the most out of your community!
          </Text>
          <div className="flex flex-row font-archivo md:gap-10 items-center justify-center mt-[58px] w-[87%] md:w-full">
            <div className="bg-[#1f394a] h-[349px] pl-3 pt-3 relative rounded-[30px] shadow-bs1 w-[300px]">
              <Text
                className="mb-[0] ml-5 mr-[5px] mt-[15px] text-2xl md:text-[22px] text-blue-50 sm:text-xl z-[1]"
              >
                <span className="text-blue-50 font-archivo text-left font-bold">
                  <>
                    Find out how
                    <br />
                    to participate in
                    <br />
                    the com
                  </>
                </span>
                <span className="text-blue-50 font-archivo text-left font-bold">
                  munity
                </span>
              </Text>
              <Img
                className="h-[241px] mx-auto object-cover w-full"
                src="images/img_157.png"
                alt="OneHundredFiftySeven"
              />
            </div>
            <div className="bg-[#1f394a] h-[349px] pl-3 pt-3 relative rounded-[30px] shadow-bs1 w-[300px]">
              <Text
                className="mb-[0] ml-5 mr-[5px] mt-[15px] text-2xl md:text-[22px] text-blue-50 sm:text-xl "
                size="txtArchivoRomanBold24"
              >
                Streamlined document requests and report filing
              </Text>
              <Img
                className="h-[238px] mx-auto object-cover w-full mb-5"
                src="images/img_blueyellowmodern.png"
                alt="blueyellowmoder"
              />
            </div>
            <div className="bg-[#1f394a] h-[349px] pl-3 pt-3 relative rounded-[30px] shadow-bs1 w-[300px]">
              <Text
                className="mb-[0] ml-5 mr-[5px] mt-[15px] text-2xl md:text-[22px] text-blue-50 sm:text-xl z-[1]"
                size="txtArchivoRomanBold24"
              >
                <>
                  Stay on top of
                  <br />
                  the latest <br />
                  community news!
                </>
              </Text>
              <Img
                className="h-[205px] md:h-auto md:ml-[0] ml-[17px] object-cover w-[94%] sm:w-full"
                src="images/img_32.png"
                alt="ThirtyTwo"
              />
            </div>
          </div>
          <div className="flex flex-row font-librefranklin items-center justify-center md:ml-auto ml-auto w-[90%] h-[349px] mx-auto mb-[-100px]">
            <Line className="bg-[#1f394a] h-[3px] sm:mt-0 mt-[33px] w-[35%] mr-[30px]" />
            <Text
              className="ml-6 sm:ml-[0] text-7xl sm:text-[38px] md:text-[44px] text-[#1f394a] mr-[30px]"
              size="txtLibreFranklinRomanBlack48"
            >
              ABOUT US
            </Text>
            <Line className="bg-[#1f394a] h-[3px]  sm:ml-[0] ml-[9px] sm:mt-0 mt-[33px] w-[35%]" />
          </div>
          <div className="relative">
            <Img
              className="h-[500px] w-[4000px]"
              src="./images/aboutheader.png"
              alt="rectangleFortyThree"
            />
            <div className="absolute top-[145px] left-10 right-0 text-center">
              <Text
                className="md:text-7xl text-10xl text-white ml-[200px]"
                size="txtLibreFranklinRomanBold96"
              >
                Simplified
              </Text>
              <Text
                className="mt-[17px] md:text-7xl text-10xl text-white ml-[200px]"
                size="txtLibreFranklinRomanBold96"
              >
                Community
              </Text>
              <Text
                className="mt-4 md:text-7xl text-10xl text-white ml-[200px]"
                size="txtLibreFranklinRomanBold96"
              >
                Engagement.
              </Text>
            </div>
          </div>

          <div className="flex flex-row font-librefranklin items-center justify-start mr-[200px] mt-[50px] w-[100%] md:w-full">
            <Line className="bg-[#1f394a] h-[3px] mb-[27px] mt-[34px] w-[70%] ml-[200px]" />
            <Text
              className="text-5xl sm:text-[38px] md:text-[44px] text-[#1f394a] ml-auto justify-end"
              size="txtLibreFranklinRomanExtraBold48"
            >
              Our Team
            </Text>
          </div>
          <div className="flex flex-col font-sans md:gap-10 gap-[75px] items-center justify-start mt-10 w-[84%] md:w-full">
            <div className="flex flex-row gap-3 items-center justify-start w-full mb-[20px] ml-[100px]">
              <div className="font-librefranklin font-bold">
                <Text className="md:text-8xl text-8x1 text-[111px] text-[#1f394a] tracking-[-2.22px] ml-[95px] mt-5 font-librefranklin font-bold">
                  WE
                </Text>
              </div>
              <Text
                className="leading-[30.00px] mt-[26px] text-[22px] text-[#1f394a] text-justify sm:text-lg md:text-xl tracking-[-0.44px] w-[67%]"
                size="txtRobotoSerifRegular22"
              >
                <span className="text-blue_gray-900 font-sans font-medium">
                  are a passionate team of{" "}
                </span>
                <span className="text-blue_gray-900 font-sans font-bold">
                  3rd-year BSIT students from the Cebu Institute of
                  Technology-University
                </span>
                <span className="text-blue_gray-900 font-sans font-medium">
                  . Our mission is simple but powerful: to bring the residents
                  of our barangay closer together through the convenience of
                  technology.
                </span>
              </Text>
            </div>
            <div className="flex flex-col items-center justify-start w-[93%] md:w-full">
              <div className="flex flex-col gap-5 items-center justify-start w-full">
                <div className="flex flex-row md:gap-5 items-center justify-between items-center w-[1000px]">
                  <Img
                    className="h-[185px] md:h-auto rounded-[50%] w-[185px]"
                    src="images/img_ellipse6.png"
                    alt="ellipseSix"
                  />
                  <Img
                    className="h-[185px] md:h-auto rounded-[50%] w-[185px]" // Add margin-right to reduce space
                    src="images/img_ellipse7.png"
                    alt="ellipseSeven"
                  />
                  <Img
                    className="h-[185px] md:h-auto rounded-[50%] w-[185px]" // Add margin-right to reduce space
                    src="images/img_ellipse8.png"
                    alt="ellipseEight"
                  />
                  <Img
                    className="h-[185px] md:h-auto rounded-[50%] w-[185px]"
                    src="images/img_ellipse9.png"
                    alt="ellipseNine"
                  />
                </div>
                <div className="flex flex-row md:gap-5 items-center justify-between items-center w-[955px]">
                  <Text
                    className="text-base text-[#1f394a] font-sans"
                    size="txtRobotoMedium16Bluegray900"
                  >
                    Bianca Jessa Carabio
                  </Text>
                  <Text
                    className="text-base text-[#1f394a] font-sans mr-7"
                    size="txtRobotoMedium16Bluegray900"
                  >
                    Joshua Jhonn Borres
                  </Text>
                  <Text
                    className="text-base text-[#1f394a] font-sans mr-6"
                    size="txtRobotoMedium16Bluegray900"
                  >
                    France Gieb Mier
                  </Text>
                  <Text
                    className="text-base text-[#1f394a] font-sans"
                    size="txtRobotoMedium16Bluegray900"
                  >
                    Bermar Villarazo Jr.
                  </Text>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col font-librefranklin gap-[47px] items-center justify-start mt-20 w-full">
            <Text
              className="sm:text-4xl md:text-[38px] text-[40px] text-[#1f394a]"
              size="txtLibreFranklinRomanExtraBold40"
            >
              Philosophy
            </Text>
            <div className="font-robotoserif h-[311px] relative w-full">
              <div className="absolute bg-[#2e64b0] flex flex-col h-[311px] inset-y-[0] items-center justify-start mb-auto min-w-[50px] mt-0 p-11 md:px-10 sm:px-5 right-[0] w-1/2">
                <Text className="mb-[194px] text-justify text-white text-xl w-[500px] mt-[35px] font-sans font-medium">
                  We believe in the strength of unity, and this app is our
                  contribution to making our barangay a more connected and
                  informed community. Join us in embracing a new era of
                  community interaction, where updates, engagement, and a sense
                  of togetherness are just a click away.
                </Text>
              </div>
              <div className="absolute h-[311px] inset-y-[0] left-[0] my-auto w-[51%] w-1/2">
                <Img
                  className="absolute h-[311px] m-auto object-cover w-full"
                  src="images/img_rectangle41.png"
                  alt="rectangleFortyOne"
                />
                <Text className="inset-x-[0] mx-auto overflow-y-clip relative text-justify text-white text-xl top-[14%] w-[500px] mt-[35px] font-sans font-medium">
                  Living in a connected world, we recognized the need for a
                  platform that fosters community engagement. With this app, we
                  aim to bridge the gap between residents, providing a space for
                  seamless document requests, efficient report filing,
                  appointment scheduling, and easy access to local resources.
                </Text>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-start mt-[5px] w-[84%] md:w-full">
            <div className="flex md:flex-col flex-row md:gap-5 items-center justify-evenly w-full">
              <div className="flex flex-row font-roboto md:gap-10 gap-[75px] items-center justify-center w-[84%] md:w-full ml-25">
                <div className="flex flex-row font-roboto md:gap-20 gap-[75px] items-center justify-start w-[84%] md:w-full ml-20">
                  <div className="flex flex-col font-roboto md:gap-10 gap-[75px] items-start justify-start w-[84%] md:w-full">
                    <Text
                      className="sm:text-4xl md:text-[38px] text-[40px] text-[#1f394a] mb-2 ml-[87px]"
                      size="txtLibreFranklinRomanExtraBold40"
                    >
                      Our Purpose
                    </Text>
                    <Text className="inset-x-[0] mx-auto overflow-y-clip relative text-justify text-[#1f394a] text-xl top-[14%] w-[450px] mt-[10px] font-sans font-medium">
                      <>
                        As enthusiastic students immersed in technology, we saw
                        an opportunity to leverage connectivity for a greater
                        purpose. Our app is a digital nexus, meticulously
                        designed to simplify and enhance how residents interact.
                        It&#39;s not just about technology; it&#39;s about
                        fostering relationships and building a stronger sense of
                        community.
                      </>
                    </Text>
                  </div>
                  <Img
                    className="h-[389px] sm:h-auto mr-[100px] mt-[118px] object-cover w-[45%]"
                    src="images/img_rectangle45.png"
                    alt="rectangleFortyFive"
                  />
                </div>
              </div>
              <div className="flex flex-row font-roboto-medium md:gap-20 gap-[75px] items-center justify-start mt-13 w-[84%] md:w-full ml-20">
                <Img
                  className="flex h-[389px] sm:h-auto justify-end mb-[22px] ml-[100px] object-cover w-[42%] mt-[-7px]"
                  src="images/img_rectangle44.png"
                  alt="rectangleFortyFour"
                />
                <div className="flex flex-col gap-[30px] items-start justify-start ml-auto md:ml-[0] ml-[100px]">
                  <Text
                    className="md:ml-[0] ml-[100px] sm:text-4xl md:text-[38px] text-[40px] text-[#1f394a] font-librefranklin ]"
                    size="txtLibreFranklinRomanExtraBold40"
                  >
                    Our Values
                  </Text>
                  <Text className="leading-[30.00px] md:ml-[0] ml-[100px] text-[22px] text-[#1f394a] text-justify sm:text-lg md:text-xl tracking-[-0.66px] w-[450px] font-sans font-medium">
                    Our values, rooted in community-centricity, innovation, and
                    transparency, guide us in fostering meaningful relationships
                    and building a stronger sense of community. We prioritize
                    inclusivity, strive for excellence, and commit to
                    environmentally responsible practices. These values are the
                    heartbeat of our mission – to create a positive and lasting
                    impact in the community we serve.
                  </Text>
                </div>
              </div>
            </div>
          </div>
          <Line className="bg-[#1f394a] h-2 mt-[74px] w-[95%]" />
          <div className="flex sm:flex-row flex-row font-librefranklin items-start justify-between mt-[11px] w-[84%] md:w-full">
            <div className="flex flex-col font-roboto items-start justify-start mt-5 w-[84%] md:w-full ml-20">
              <Text
                className="leading-[30.00px] sm:text-2xl md:text-[26px] text-[28px] text-[#1f394a] mr-[90px]"
                size="txtLibreFranklinRomanExtraBold28"
              >
                <>
                  GET IN
                  <br />
                  TOUCH
                  <br />
                  WITH US
                </>
              </Text>
              <div className="flex flex-row md:gap-5 items-center justify-between items-center w-[100px]">
                <Img
                  className="h-[26px] md:h-auto object-cover w-[25px]"
                  src="images/img_facebook.png"
                  alt="facebook"
                />
                <Img
                  className="h-[26px] md:h-auto object-cover w-[25px]"
                  src="images/img_instagram.png"
                  alt="instagram"
                />
                <Img
                  className="h-[26px] md:h-auto object-cover w-[25px]"
                  src="images/img_linkedin.png"
                  alt="linkedin"
                />
                <Img
                  className="h-[26px] md:h-auto object-cover w-[25px]"
                  src="images/img_gmaillogo.png"
                  alt="gmaillogo"
                />
              </div>
            </div>
            <div className="flex flex-row items-center justify-evenly w-[40%] justify-end mr-20">
              <Img
                className="h-[59px] md:h-auto object-cover w-[70px]"
                src="images/img_logo15.png"
                alt="logoFifteen"
              />
              <Img
                className="h-[100px] md:h-auto object-cover w-[77%]"
                src="images/img_communicare3.png"
                alt="communicareThree"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
