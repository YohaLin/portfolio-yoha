import { useEffect, useRef } from "react";
import BottleSvg from "../components/BottleSvg";
import DescriptionSvg from "../components/DescriptionSvg";
import PotionSvg from "../components/PotionSvg";
import WebSvg from "../components/WebSvg";
import YohaSvg from "../components/YohaSvg";
import gsap from "gsap";

const Hero = () => {
  const circleOneRef = useRef<HTMLDivElement>(null);
  const circleTwoRef = useRef<HTMLDivElement>(null);
  const circleThreeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const circlesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const circleOne = circleOneRef.current;
    const circleTwo = circleTwoRef.current;
    const circleThree = circleThreeRef.current;
    const content = contentRef.current;
    const circlesContainer = circlesContainerRef.current;

    if (circleOne && circleTwo && circleThree && content && circlesContainer) {
      gsap.set(content, { autoAlpha: 0 });

      const tl = gsap.timeline();

      tl.fromTo(
        circleOne,
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 50,
          opacity: 0.8,
          duration: 1.5,
          ease: "power3.inOut",
        }
      )
        .fromTo(
          circleTwo,
          {
            scale: 0,
            opacity: 0,
          },
          {
            scale: 50,
            opacity: 0.8,
            duration: 2,
            ease: "power3.inOut",
          },
          "-=1.5"
        )
        .fromTo(
          circleThree,
          {
            scale: 0,
            opacity: 0,
          },
          {
            scale: 50,
            opacity: 0.8,
            duration: 2,
            ease: "power3.inOut",
          },
          "-=1.5"
        )
        // 顯示內容
        .to(
          content,
          {
            autoAlpha: 1,
            duration: 0.5,
          },
          "-=1"
        )
        .to(
          circlesContainer,
          {
            autoAlpha: 0,
            duration: 0.8,
            ease: "power2.inOut",
          },
          "-=1"
        );
    }
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 內容區塊 */}
      <div ref={contentRef} className="relative z-20 w-full h-full">
        <div className="absolute flex flex-col justify-between pl-6 pb-10 w-full h-full md:w-[90%] mx-auto">
          <div className="flex flex-col">
            <YohaSvg className="w-[100px] h-[50px] lg:w-[160px] lg:h-[80px] fill-gray-600" />
            <DescriptionSvg className="-mt-4 w-[200px] md:w-[300px] fill-gray-500" />
          </div>
          <div className="flex flex-col items-start md:items-end md:flex-row md:gap-6 lg:gap-10">
            <WebSvg className="w-[120px] lg:w-[200px]" />
            <PotionSvg className="w-[340px] lg:w-[560px] -mt-2 md:mt-0" />
          </div>
        </div>

        <BottleSvg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-1/2 max-w-[380px]" />
        <div className="hidden absolute md:flex flex-col top-1/2 right-20 md:right-2 lg:left-[65%] w-1/2 max-w-[380px] text-sm font-istok text-gray-700">
          <p>I am Yoha Lin, a web developer.</p>
          <p>
            I am good at bridging technical complexity and user needs, code and
            design, efficiency and elegance, and crafting robust digital
            solutions that balance performance with exceptional user experience.
          </p>
        </div>
      </div>

      {/* 圓圈容器 - 用於一起淡出所有圓圈 */}
      <div ref={circlesContainerRef} className="absolute inset-0 z-0">
        {/* 圓圈 - 注意 z-index 順序與引用 */}
        <div
          className="absolute z-12 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-10 h-10 bg-white transform-origin-center"
          ref={circleThreeRef}
        />
        <div
          className="absolute z-11 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-10 h-10 bg-blue-900 transform-origin-center"
          ref={circleTwoRef}
        />
        <div
          className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-10 h-10 bg-amber-900 transform-origin-center"
          ref={circleOneRef}
        />
      </div>
    </div>
  );
};

export default Hero;
