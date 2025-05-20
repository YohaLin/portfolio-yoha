import { useEffect, useRef, useState } from "react";
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
  const circlesContainerRef = useRef<HTMLDivElement>(null);

  // 直接引用各個元素
  const nameRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const circleOne = circleOneRef.current;
    const circleTwo = circleTwoRef.current;
    const circleThree = circleThreeRef.current;
    const circlesContainer = circlesContainerRef.current;

    // 獲取新的動畫元素引用
    const name = nameRef.current;
    const title = titleRef.current;
    const description = descriptionRef.current;
    const bottle = bottleRef.current;

    if (
      circleOne &&
      circleTwo &&
      circleThree &&
      circlesContainer &&
      name &&
      title &&
      description &&
      bottle
    ) {
      // 設置所有內容元素初始狀態為隱藏
      gsap.set([name, description], {
        autoAlpha: 0,
        y: 10,
      });

      // 設置瓶子和標題的初始狀態
      gsap.set(bottle, {
        autoAlpha: 0,
      });

      gsap.set(title, {
        autoAlpha: 0,
        y: 10,
      });

      // 主時間線
      const mainTl = gsap.timeline();

      // 創建圓圈動畫和標題動畫的並行執行
      mainTl.add(() => {
        // 第一個圓圈動畫
        const circleTl = gsap.timeline();
        circleTl
          .fromTo(
            circleOne,
            {
              scale: 0,
            },
            {
              scale: 50,
              duration: 2.3,
              ease: "power3.inOut",
            }
          )
          .fromTo(
            circleTwo,
            {
              scale: 0,
            },
            {
              scale: 50,
              duration: 2.3,
              ease: "power3.inOut",
            },
            "-=2"
          )
          .fromTo(
            circleThree,
            {
              scale: 0,
            },
            {
              scale: 50,
              duration: 2.3,
              ease: "power3.inOut",
            },
            "-=2"
          )
          .to(
            circlesContainer,
            {
              autoAlpha: 0,
              duration: 0.5,
              ease: "power2.inOut",
            },
            "-=0.6"
          );

        // 標題動畫 - 與第一個圓圈同時開始
        gsap.to(title, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0, // 無延遲，立即開始
        });
      }, 0);

      // 其他元素在1秒後開始淡入
      mainTl.add(() => {
        const contentTl = gsap.timeline();

        // 瓶子淡入
        contentTl
          .to(bottle, {
            autoAlpha: 1,
            duration: 0.4,
            ease: "power2.out",
          })
          // 然後是名稱
          .to(
            name,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.4,
              ease: "power2.out",
            },
            "-=0.2"
          )
          // 最後是描述
          .to(
            description,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.4,
              ease: "power2.out",
            },
            "-=0.2"
          );
      }, 2); // 在主時間線的1秒後執行
    }
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 直接放置所有內容，不再使用 contentRef 包裹 */}
      <div className="relative z-20 w-full h-full">
        <div className="absolute flex flex-col justify-between pl-6 pb-10 w-full h-full md:w-[90%] mx-auto">
          {/* 名稱區塊 */}
          <div ref={nameRef} className="flex flex-col">
            <YohaSvg className="w-[100px] h-[50px] lg:w-[160px] lg:h-[80px] fill-gray-600" />
            <DescriptionSvg className="-mt-4 w-[200px] md:w-[300px] fill-gray-500" />
          </div>

          {/* 標題區塊 */}
          <div
            ref={titleRef}
            className="flex flex-col items-start md:items-end md:flex-row md:gap-6 lg:gap-10"
          >
            <WebSvg className="w-[120px] lg:w-[200px]" />
            <PotionSvg className="w-[340px] lg:w-[560px] -mt-2 md:mt-0" />
          </div>
        </div>

        {/* 瓶子 SVG 添加外層 div 並將 ref 綁定到 div */}
        <div
          ref={bottleRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-1/2 max-w-[380px]"
        >
          <BottleSvg className="w-full h-full" />
        </div>

        {/* 描述區塊 */}
        <div
          ref={descriptionRef}
          className="hidden absolute md:flex flex-col top-1/2 right-20 md:right-2 lg:left-[65%] w-1/2 max-w-[380px] text-sm font-istok text-gray-700"
        >
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
          className="absolute z-12 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-10 h-10 bg-[#FFF4BE] transform-origin-center"
          ref={circleThreeRef}
        />
        <div
          className="absolute z-11 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-10 h-10 bg-[#E0D391] transform-origin-center"
          ref={circleTwoRef}
        />
        <div
          className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-10 h-10 bg-[#C4B155] transform-origin-center"
          ref={circleOneRef}
        />
      </div>
    </div>
  );
};

export default Hero;
