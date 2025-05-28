import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import InsSvg from "../components/InsSvg";
import LinkedInSvg from "../components/LinkedInSvg";
import MailSvg from "../components/MailSvg";
import OwlSvg from "../components/OwlSvg";
import BlockLayout from "../layouts/BlockLayout";

const Contact = () => {
  const buttonsRef = useRef<HTMLDivElement>(null);
  const owlRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLSpanElement>(null);
  const [visibleIconsCount, setVisibleIconsCount] = useState(0); // 追蹤顯示的圖標數量

  useEffect(() => {
    // 初始化：隱藏所有按鈕和 email
    if (buttonsRef.current && emailRef.current) {
      // 隱藏按鈕容器
      gsap.set(buttonsRef.current, {
        opacity: 1, // 容器保持可見
        visibility: "visible",
      });

      // 隱藏所有個別按鈕
      gsap.set(buttonsRef.current.children, {
        scale: 0,
        opacity: 0,
        rotation: 180,
      });

      // 隱藏 email
      gsap.set(emailRef.current, {
        opacity: 0,
        y: 10,
        visibility: "hidden",
      });
    }
  }, []);

  const handleOwlClick = () => {
    if (!buttonsRef.current || !emailRef.current || !owlRef.current) return;

    // 貓頭鷹點擊反饋動畫
    const clickFeedback = gsap.timeline();
    clickFeedback
      .to(owlRef.current, {
        scale: 0.95,
        duration: 0.1,
        ease: "power2.out",
      })
      .to(owlRef.current, {
        scale: 1,
        duration: 0.2,
        ease: "back.out(1.7)",
      });

    if (visibleIconsCount < 3) {
      // 顯示下一個圖標
      const nextIconIndex = visibleIconsCount;
      const nextIcon = buttonsRef.current.children[
        nextIconIndex
      ] as HTMLElement;

      if (nextIcon) {
        gsap.to(nextIcon, {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
          delay: 0.2, // 等待點擊反饋完成
        });

        setVisibleIconsCount(visibleIconsCount + 1);

        // 如果是最後一個圖標，顯示 email
        if (visibleIconsCount === 2) {
          gsap.set(emailRef.current, { visibility: "visible" });
          gsap.to(emailRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
            delay: 0.7, // 等待圖標動畫完成
          });
        }
      }
    }
    // 當所有圖標都顯示後，點擊沒有效果
  };

  // 貓頭鷹懸停效果
  const handleOwlHover = () => {
    if (owlRef.current) {
      gsap.to(owlRef.current, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleOwlLeave = () => {
    if (owlRef.current) {
      gsap.to(owlRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  // 獲取提示文字
  const getHintText = () => {
    if (visibleIconsCount === 0) return "Click Me!";
    if (visibleIconsCount === 1) return "Hoot Hoot!";
    if (visibleIconsCount === 2) return "Hoot Hoot Hoot!";
    return "CONTACT ME!"; // 當所有圖標都顯示後
  };

  return (
    <BlockLayout className="col-span-1 lg:col-span-4 md:p-2">
      <div className="p-2 md:p-4 flex flex-col items-center h-full text-center border-frame-dashed">
        <div className="flex flex-col my-auto">
          {/* 文案部分 */}
          <div className="font-tenor">
            <p className="text-lg md:text-md">Drugs, Nah</p>
            <p className="text-lg md:text-xl">Web, Hoot Hoot</p>
          </div>

          {/* 可點擊的貓頭鷹 */}
          <div
            ref={owlRef}
            onClick={handleOwlClick}
            onMouseEnter={handleOwlHover}
            onMouseLeave={handleOwlLeave}
            className={`relative ${visibleIconsCount < 3 ? "cursor-pointer" : "cursor-default"}`}
          >
            <OwlSvg className="w-72" />

            {/* 動態點擊提示 */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className={`px-4 py-2 rounded-full text-md font-semibold transition-colors duration-300 ${
                  visibleIconsCount < 3
                    ? "bg-plum/70 text-white animate-pulse"
                    : "bg-aqua/90 text-plum animate-bounce"
                }`}
              >
                {getHintText()}
              </div>
            </div>
          </div>

          {/* 按鈕組 */}
          <div
            ref={buttonsRef}
            className="flex justify-center gap-2 w-full mt-4"
          >
            <a
              href="mailto:yohalin0613@gmail.com"
              className="transition-colors duration-200"
              style={{
                pointerEvents: visibleIconsCount >= 1 ? "auto" : "none",
              }}
            >
              <MailSvg className="w-12 fill-plum hover:fill-teal" />
            </a>
            <a
              href="https://www.instagram.com/thea_daily/"
              target="_blank"
              className="transition-colors duration-200"
              style={{
                pointerEvents: visibleIconsCount >= 2 ? "auto" : "none",
              }}
            >
              <InsSvg className="w-12 fill-plum hover:fill-teal" />
            </a>
            <a
              href="https://www.linkedin.com/in/yoha-lin-007b48253/"
              target="_blank"
              className="transition-colors duration-200"
              style={{
                pointerEvents: visibleIconsCount >= 3 ? "auto" : "none",
              }}
            >
              <LinkedInSvg className="w-12 fill-plum hover:fill-teal" />
            </a>
          </div>

          {/* Email 地址 - 在所有圖標顯示後出現 */}
          <span ref={emailRef} className="text-md md:text-lg mt-2">
            yohalin0613@gmail.com
          </span>
        </div>
      </div>
    </BlockLayout>
  );
};

export default Contact;
