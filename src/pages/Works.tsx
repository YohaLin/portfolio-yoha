import React, { useEffect, useRef, type FC } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlockLayout from "../layouts/BlockLayout";

// 註冊 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

// 定義作品項目的類型
interface WorkItem {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  tags: string[];
}

// 組件 props 類型
type Props_Works = {
  works?: WorkItem[];
};

const Works: FC<Props_Works> = ({ works = defaultWorks }) => {
  // 使用 TypeScript 的 RefObject 來明確指定 ref 的類型
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 存儲 ScrollTrigger 實例以便清理
    let trigger: ScrollTrigger | undefined;

    // 確保DOM元素已載入
    const container = containerRef.current;
    const section = sectionRef.current;

    if (container && section) {
      // 獲取水平滾動區域的寬度
      const scrollWidth = section.offsetWidth;
      const containerWidth = container.offsetWidth;

      // 計算實際需要滾動的距離
      const scrollDistance = scrollWidth - containerWidth;

      // 創建水平滾動動畫
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "-20 top", // 可以根據需要調整
          end: () => `+=${scrollDistance + 100}`, // 增加一些額外距離確保完全滾動
          scrub: true,
          pin: true,
          anticipatePin: 1,
          pinSpacing: true, // 使用 true 而不是 "margin"
          markers: false, // 生產環境應設為 false
        },
      });

      // 添加水平滾動動畫
      tl.to(section, {
        x: -scrollDistance,
        ease: "none",
      });

      // 儲存以便清理
      const allTriggers = ScrollTrigger.getAll();
      trigger = allTriggers[allTriggers.length - 1];
    }

    // 清理函數
    return () => {
      if (trigger) trigger.kill();
    };
  }, []);

  return (
    <BlockLayout className="col-span-1 md:col-span-12">
      <div ref={triggerRef} className="flex flex-col gap-1 h-fit overflow-hidden pb-2">
        <h2>作品</h2>

        <div
          ref={containerRef}
          className="relative w-full h-[calc(100vh-4.5rem)] overflow-hidden"
        >
          <div
            ref={sectionRef}
            className="absolute top-0 left-0 flex gap-4 h-full px-2"
          >
            {/* 映射作品項目 */}
            {works.map((work) => (
              <div
                key={work.id}
                className="flex-shrink-0 w-[calc(100vw-4.5rem)] h-full bg-gray-100 rounded-lg flex flex-col items-center lg:w-[calc(1200px-1.75rem)]"
              >
                <img
                  src={work.imageSrc}
                  alt={work.title}
                  className="w-[80%] max-w-80 object-cover aspect-square"
                />
                <div className="flex flex-col w-[80%]">
                  <h3 className="text-xl font-semibold mb-2">{work.title}</h3>
                  <p className="text-gray-600 mb-4">{work.description}</p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {work.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BlockLayout>
  );
};

// 默認作品數據
const defaultWorks: WorkItem[] = [
  {
    id: 1,
    title: "茶葉先生",
    description: "使用 React 和 Tailwind CSS 開發的個人網站，具有響應式設計。",
    imageSrc: "/images/website/theaDaily.png",
    tags: ["React", "Tailwind"],
  },
  {
    id: 2,
    title: "診所掛號系統",
    description: "電子商務應用，整合支付系統和會員管理功能。",
    imageSrc: "/images/website/clinic.png",
    tags: ["Next.js", "Prisma"],
  },
];

export default Works;
