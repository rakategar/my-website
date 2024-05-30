import React, { useRef, useState, useEffect, useContext } from "react";
import Logo from "./Headercomp/Logo";
import DesktopMenu from "./Headercomp/DesktopMenu";
import IconMenu from "./Headercomp/IconMenu";
import MobileMenu from "./Headercomp/MobileMenu";
import { motion } from "framer-motion";
import AppContext from "../AppContextFolder/AppContext";

const Header = (props) => {
  const RefNavBar = useRef<HTMLDivElement>(null);
  const [ShowElement, setShowElement] = useState(false);
  const [rotate, setRotate] = useState<boolean>(false);
  const context = useContext(AppContext);
  const scrollSizeY = useRef<number>(0);

  // Define the EventListener for the NavBar
  useEffect(() => {
    if (context.sharedState.portfolio.NavBar.IntervalEvent == null) {
      context.sharedState.portfolio.NavBar.IntervalEvent = () => {
        if (scrollSizeY.current === 0) {
          scrollSizeY.current = window.scrollY;
        } else {
          if (window.scrollY > 50) {
            if (window.scrollY > scrollSizeY.current) {
              if (RefNavBar) {
                RefNavBar.current?.classList.remove("translate-y-0");
                RefNavBar.current?.classList.add("-translate-y-full");
              }
            } else {
              RefNavBar.current?.classList.add("translate-y-0");
              RefNavBar.current?.classList.remove("-translate-y-full");
            }
            scrollSizeY.current = window.scrollY;
          }
        }
        console.log("Scrolling checking for NavBar ", scrollSizeY.current);
      };
    }
  }, [context.sharedState.portfolio.NavBar, context.sharedState.portfolio.NavBar.IntervalEvent]);

  //Adding the EventListener for the NavBar
  useEffect(() => {
    if (context.sharedState.portfolio.NavBar.scrolling == null) {
      context.sharedState.portfolio.NavBar.scrolling = true;
      scrollSizeY.current = 0;
      //Hide when scroll down & show when scroll up
      if (typeof window !== "undefined") {
        window.addEventListener("scroll", context.sharedState.portfolio.NavBar.IntervalEvent);
      }
    }
  }, [context.sharedState.portfolio.NavBar, context.sharedState.portfolio.NavBar.scrolling]);

  useEffect(() => {
    setTimeout(() => {
      setShowElement(true);
    }, 10400);
  }, []);

  console.log("rotate from header : ", rotate);
  // Verify document for server-side rendering
  if (typeof document !== "undefined") {
    rotate ? (document.body.style.overflow = "hidden") : (document.body.style.overflow = "auto");
  }

  return (
    <>
      {/* Mobile visible Navbar component, controlling ShowElement state to hide itself and rotate itself */}
      <MobileMenu rotate={rotate} setRotate={setRotate} setShowElement={setShowElement} ShowElement={ShowElement} />
      {/* This parent element for Menu */}
      <motion.div
        ref={RefNavBar}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        // changed from 10.4 to 1
        transition={{ opacity: { delay: props.finishedLoading ? 0 : 9.4, duration: 0 } }}
        className={`w-full fixed ${ShowElement ? `bg-opacity-70 shadow-xl` : `bg-opacity-0 `} bg-AAprimary flex 
        justify-between px-6 sm:px-12 py-2 sm:py-8 transition duration-4000 translate-y-0 z-20`}
      >
        {/* Logo A */}
        <div className="flex items-center">
          <Logo finishedLoading={props.finishedLoading} />
        </div>
        {/* Hide icon Designed by me and Desktop Menu by Titof */}
        <div className="flex items-center">
          <IconMenu
            rotate={rotate}
            setRotate={setRotate}
            setShowElement={setShowElement}
            ShowElement={ShowElement}
            finishedLoading={props.finishedLoading}
          />
          <DesktopMenu finishedLoading={props.finishedLoading} />
        </div>
      </motion.div>
    </>
  );
};

export default Header;
