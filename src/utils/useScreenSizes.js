import { useState, useEffect } from "react";

function getScreenSizes() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

const useScreenSizes = () => {
  const [screenSizes, setScreenSizes] = useState(getScreenSizes());

  useEffect(() => {
    function handleResize() {
      setScreenSizes(getScreenSizes());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSizes;
};

export default useScreenSizes;
