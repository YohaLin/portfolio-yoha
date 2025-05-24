import { useEffect, useRef } from "react";
import BottleSvg from "../components/BottleSvg";
import DescriptionSvg from "../components/DescriptionSvg";
import PotionSvg from "../components/PotionSvg";
import WebSvg from "../components/WebSvg";
import YohaSvg from "../components/YohaSvg";
import gsap from "gsap";
import BottleAfterSvg from "../components/BottleAfterSvg";
import StarAfterSvg from "../components/StarAfterSvg";

const Hero = () => {
  const circleOneRef = useRef<HTMLDivElement>(null);
  const circleTwoRef = useRef<HTMLDivElement>(null);
  const circleThreeRef = useRef<HTMLDivElement>(null);
  const circlesContainerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);
  const bottleAfterRef = useRef<HTMLDivElement>(null);
  const starAfterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const circleOne = circleOneRef.current;
    const circleTwo = circleTwoRef.current;
    const circleThree = circleThreeRef.current;
    const circlesContainer = circlesContainerRef.current;
    const name = nameRef.current;
    const title = titleRef.current;
    const description = descriptionRef.current;
    const bottle = bottleRef.current;
    const bottleAfter = bottleAfterRef.current;
    const starAfter = starAfterRef.current;

    if (
      circleOne &&
      circleTwo &&
      circleThree &&
      circlesContainer &&
      name &&
      title &&
      description &&
      bottle &&
      bottleAfter &&
      starAfter
    ) {
      // 設置所有內容元素初始狀態為隱藏
      gsap.set([name, description], {
        opacity: 0,
        y: 10,
      });

      // 設置瓶子和標題的初始狀態
      gsap.set([bottle, bottleAfter, starAfter], {
        opacity: 0,
      });

      gsap.set(title, {
        opacity: 0,
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
              opacity: 0,
              duration: 0.5,
              ease: "power2.inOut",
            },
            "-=0.6"
          );

        // 標題動畫 - 與第一個圓圈同時開始
        gsap.to(title, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0, // 無延遲，立即開始
        });
      }, 0);

      // 其他元素在2秒後開始淡入
      mainTl.add(() => {
        const contentTl = gsap.timeline();

        // 瓶子淡入
        contentTl
          .to(bottle, {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          })
          // 然後是名稱
          .to(
            name,
            {
              opacity: 1,
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
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: "power2.out",
            },
            "-=0.2"
          )
          .to(
            [bottleAfter, starAfter],
            {
              opacity: 1,
              duration: 1,
              ease: "power2.out",
            },
            "-=0.2"
          )
          .to(bottle, {
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
          });
      }, 2);

      // 添加上下抖動動畫
      const floatAnimation = () => {
        // 創建抖動時間線
        const floatTl = gsap.timeline({
          repeat: -1, // 無限重複
          yoyo: true, // 來回運動
        });

        // 為 bottleAfter 添加上下抖動
        floatTl.to([bottleAfter, bottle], {
          y: "+=10", // 向下移動 10px
          duration: 2,
          ease: "sine.inOut",
        });

        // 為 starAfter 添加略微不同的上下抖動效果
        gsap.to(starAfter, {
          y: "+=12", // 向下移動 12px
          duration: 2.3, // 稍微慢一點
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        return floatTl;
      };

      // 在所有元素顯示後開始抖動動畫
      mainTl.add(floatAnimation(), "+=0.5");
    }
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 直接放置所有內容，不再使用 contentRef 包裹 */}
      <div className="relative z-20 w-full h-full">
        <div className="absolute flex flex-col justify-between pl-6 pb-10 w-full h-full md:w-[90%] mx-auto">
          {/* 名稱區塊 */}
          <div ref={nameRef} className="flex flex-col opacity-0">
            <YohaSvg className="w-[100px] h-[50px] lg:w-[160px] lg:h-[80px] fill-plum" />
            <DescriptionSvg className="-mt-4 w-[200px] md:w-[300px] fill-rose" />
          </div>

          {/* 標題區塊 */}
          <div
            ref={titleRef}
            className="flex flex-col items-start md:items-end md:flex-row md:gap-6 lg:gap-10 opacity-0"
          >
            <WebSvg className="w-[120px] lg:w-[200px]" />
            <PotionSvg className="w-[340px] lg:w-[560px] -mt-2 md:mt-0" />
          </div>
        </div>

        {/* 瓶子 SVG 添加外層 div 並將 ref 綁定到 div */}
        <div
          ref={bottleRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-1/2 max-w-[380px] opacity-0"
        >
          <BottleSvg className="w-full h-full" />
        </div>
        <div
          ref={bottleAfterRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-1/2 max-w-[380px] opacity-0"
        >
          <BottleAfterSvg className="w-full h-full" />
        </div>
        <div
          ref={starAfterRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-1/2 max-w-[380px] opacity-0"
        >
          <StarAfterSvg className="w-full h-full" />
        </div>

        {/* 描述區塊 */}
        <div
          ref={descriptionRef}
          className="hidden absolute md:flex flex-col top-1/2 right-20 md:right-2 lg:left-[65%] w-1/2 max-w-[380px] text-sm font-istok text-plum font-bold opacity-0"
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
          className="absolute z-12 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-10 h-10 bg-blush transform-origin-center"
          ref={circleThreeRef}
        />
        <div
          className="absolute z-11 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-10 h-10 bg-rose transform-origin-center"
          ref={circleTwoRef}
        />
        <div
          className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-10 h-10 bg-plum transform-origin-center"
          ref={circleOneRef}
        />
      </div>
    </div>
  );
};

export default Hero;
