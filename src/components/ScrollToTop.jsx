import React, { useEffect, useState } from "react";
import { FaAngleUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [scrollToTop, setScrollToTop] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        setScrollToTop(true);
      } else {
        setScrollToTop(false);
      }
    });
  }, []);
  const goTotop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {scrollToTop && (
        <FaAngleUp
          className="fixed bottom-10 right-6 z-20 lg:text-4xl text-5xl cursor-pointer rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
          onClick={goTotop}
        />
      )}
    </div>
  );
};

export default ScrollToTop;
