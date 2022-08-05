import React from "react";
import { motion } from "../../../node_modules/framer-motion/dist/framer-motion";
import ArrowIcon from "../../Icons/ArrowIcon";
import GoogleDesc from "./Descriptions/GoogleDesc";
import FacebookDesc from "./Descriptions/FacebookDesc";
export default function WhatIHaveWorked() {
  const barRef = React.useRef<HTMLDivElement>(null);
  // ? INFORMATIONAL control the green position using px,
  // ? INFORMATIONAL the default value of barRef's class should be at the beginning translate-y-[0px]
  const GetDescription = () => {
    switch (DescriptionJob) {
      case "Google":
        return <GoogleDesc />;
      case "Facebook":
        return <FacebookDesc />;
    }
  };
  const [DescriptionJob, setDescriptionJob] = React.useState("Google");
  return (
    <div className="flex flex-col items-center justify-center py-24 space-y-12">
      {/* Title "Where I've Worked" */}
      <section className="flex flex-row space-x-3 items-center px-2 md:px-0">
        <ArrowIcon className={"h-6 w-6 text-AAsecondary"} />
        <span className="text-AAsecondary font-mono text-xl"> 02.</span>
        <span className="text-gray-200 text-xl md:text-2xl">
          Where I&apos;ve Worked
        </span>
        <div className="bg-gray-400 h-[0.2px] w-16 sm:w-44 md:w-80"></div>
      </section>
      {/* Where I've Worked Content */}
      <section
        className="flex flex-col md:flex-row space-y-4 md:space-y-0
      justify-center md:justify-center items-center md:items-start "
      >
        {/* Left side of Where I've Worked, contains the bar and name of companies */}
        <CompaniesBar setDescriptionJob={setDescriptionJob} />
        {/* Description for The job */}
        {GetDescription()}
      </section>
    </div>
  );
}

const CompaniesBar = props => {
  const [barPosition, setBarPosition] = React.useState<Number>(0);
  const [barAbovePosition, setBarAbovePosition] = React.useState<Number>(0);
  const [companyNameBackgroundColorGreen, setCompanyNameBackgroundColorGreen] =
    React.useState<boolean[]>([true, false, false, false]);
  const CompanyButton = (
    props
  ) => {
    return (
      <button
        onClick={() => {
          setBarPosition(props.BarPosition);
          setBarAbovePosition(props.BarAvobePosition);
          props.setDescriptionJob(props.DescriptionJob);
          setCompanyNameBackgroundColorGreen(props.CompanyNameBackgroundColorGreen);
        }}
        className={`flex-none text-sm text-center md:text-left  hover:text-AAsecondary
             hover:bg-ResumeButtonHover rounded  font-mono  
             py-2 md:pl-6 md:px-4 md:w-44 w-32 
             ${
               companyNameBackgroundColorGreen[
                props.ButtonOrderOfcompanyNameBackgroundColorGreen
               ]
                 ? "bg-ResumeButtonHover text-AAsecondary"
                 : "text-gray-400"
             }`}
      >
        {props.CompanyName}
      </button>
    );
  };
  return (
    <>
      <div
        className="flex flex-col md:flex-row w-screen md:w-auto 
      overflow-auto md:overflow-hidden pb-4 md:pb-0 justify-start sm:justify-center items-start sm:items-center"
      >
        {/* left bar Holder */}
        <div className="hidden md:block relative h-0.5 w-34 md:h-36 md:w-0.5  rounded md:order-1 order-2 ">
          {/* animated left bar */}
          <motion.div
            animate={{ y: barPosition }}
            // ref={barRef}
            className={`absolute w-10 h-0.5 md:w-0.5 md:h-10 rounded bg-AAsecondary `}
          ></motion.div>
        </div>
        {/* // ! FIXME transition is off when changing the state */}
        {/* Companies name as buttons */}
        <div className="flex flex-col md:order-2 order-1 space-y-2 pl-8 md:pl-0 ">
          <div className="flex flex-row md:flex-col">
            <CompanyButton
              ButtonOrderOfcompanyNameBackgroundColorGreen={0}
              CompanyName="Google"
              BarPosition={-2}
              BarAvobePosition={1}
              DescriptionJob="Google"
              CompanyNameBackgroundColorGreen={[true, false, false, false]}
              setDescriptionJob={props.setDescriptionJob}
            />
            <CompanyButton
              ButtonOrderOfcompanyNameBackgroundColorGreen={1}
              CompanyName="Facebook"
              BarPosition={34}
              BarAvobePosition={129}
              DescriptionJob="Facebook"
              CompanyNameBackgroundColorGreen={[false, true, false, false]}
              setDescriptionJob={props.setDescriptionJob}
            />
            <CompanyButton
              ButtonOrderOfcompanyNameBackgroundColorGreen={2}
              CompanyName="Twitter"
              BarPosition={70}
              BarAvobePosition={257}
              DescriptionJob="Twitter"
              CompanyNameBackgroundColorGreen={[false, false, true, false]}
              setDescriptionJob={props.setDescriptionJob}
            />
            <CompanyButton
              ButtonOrderOfcompanyNameBackgroundColorGreen={3}
              CompanyName="Discord"
              BarPosition={107}
              BarAvobePosition={385}
              DescriptionJob="Discord"
              CompanyNameBackgroundColorGreen={[false, false, false, true]}
              setDescriptionJob={props.setDescriptionJob}
            />
            
          </div>
          <div className="block md:hidden w-[515px] h-0.5 rounded bg-gray-500">
            <motion.div
              animate={{ x: barAbovePosition }}
              className="w-[128px] h-0.5 rounded bg-AAsecondary"
            ></motion.div>
          </div>
        </div>
      </div>
    </>
  );
};