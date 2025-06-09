import { useState } from "react";
import Intro from "./Intro";
import Experience from "./Experience";

const MainPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--my-border)]">
      <Intro currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
      <Experience
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </div>
  );
};

export default MainPage;
