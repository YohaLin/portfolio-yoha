import { useEffect, useRef } from "react";
import BlockLayout from "../../layouts/BlockLayout";
import YohaStorySvg from "../../components/YohaStorySvg";
import StoryOneSvg from "../../components/StoryOneSvg";
import StoryTwoSvg from "../../components/StoryTwoSvg";
import StoryThreeSvg from "../../components/StoryThreeSvg";

type Props_Intro = {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
};

const Intro = ({ currentIndex, setCurrentIndex }: Props_Intro) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  // 當 currentIndex 變化時，滾動到對應區塊
  useEffect(() => {
    if (!containerRef.current) return;

    // === 1. 上鎖，避免 handleScroll 在程式化捲動中執行 ===
    isScrollingRef.current = true;

    const target = currentIndex * window.innerHeight;
    containerRef.current.scrollTo({ top: target, behavior: "smooth" });

    // === 2. 在捲動大約結束後解鎖 ===
    const unlock = setTimeout(() => {
      isScrollingRef.current = false;
    }, 700); // 時間略大於 smooth scroll 時間

    return () => clearTimeout(unlock);
  }, [currentIndex]);

  // 監聽滾動事件，更新 currentIndex
  // Intro.tsx — handleScroll
  const handleScroll = () => {
    if (!containerRef.current || isScrollingRef.current) return; // ← 現在真的擋掉了

    const pos = containerRef.current.scrollTop;
    const newIdx = Math.round(pos / window.innerHeight);

    if (newIdx !== currentIndex) setCurrentIndex(newIdx);
  };

  return (
    <BlockLayout className="col-span-1 lg:col-span-8 h-[calc(100vh-60px)] overflow-y-auto relative">
      <div
        ref={containerRef}
        className="h-full overflow-y-auto snap-y snap-mandatory no-scrollbar"
        onScroll={handleScroll}
      >
        <div className="h-[calc(100vh-102px)] flex flex-col justify-center snap-start relative">
          <YohaStorySvg className="w-1/2" />
          <p className="mb-4 text-gray-700 leading-relaxed">
            I'm Yoha, and I love turning abstract ideas into websites that make
            people go, “Wow!” when they land on them.
          </p>
          <p className="text-gray-700 leading-relaxed">
            To me, building a website is like brewing a magic potion—mix in a
            bit of design, add a splash of animation, then pour in some logic.
          </p>
          <StoryOneSvg />

          {/* 下滑箭頭提示 - 只在第一個區塊且電腦版顯示 */}
          {currentIndex === 0 && (
            <div className="hidden lg:block absolute bottom-8 right-8">
              <div className="flex flex-col items-center animate-bounce">
                <span className="text-sm text-gray-500 mb-2">Scroll down</span>
                <svg
                  className="w-6 h-6 text-gray-400 animate-pulse"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>

        <div className="h-[calc(100vh-102px)] flex flex-col justify-center snap-start">
          <p className="mb-4 text-gray-700 leading-relaxed">
            I'm a visual thinker. When I first joined a startup, I used both my
            frontend skills and my way of thinking in pictures to help turn the
            complex, abstract world of quantitative trading into something
            tangible—designing the flow and then building it into a real
            product.
          </p>
          <StoryTwoSvg />
        </div>

        <div className="h-[calc(100vh-102px)] flex flex-col justify-center snap-start">
          <p className="mb-4 text-gray-700 leading-relaxed">
            Let’s rewind to when I was still a pharmacist. Outside of work, I
            learned how to code by myself. The first time I build a static
            webpage, it felt like a personal highlight reel moment.
          </p>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Back then, I had no idea how tough switching careers would be—but I
            knew that if I didn’t try, I’d always be stuck wondering, “What if?”
          </p>
          <StoryThreeSvg />
        </div>
      </div>
    </BlockLayout>
  );
};

export default Intro;
