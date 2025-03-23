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

      // 創建水平滾動動畫
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "-56 top",
          end: () => `+=${scrollWidth}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          markers: false, // 開發時可設為 true 以查看觸發點
        },
      });

      // 添加水平滾動動畫
      tl.to(section, {
        x: () => -(scrollWidth - container.offsetWidth),
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
      <div ref={triggerRef} className="h-fit overflow-hidden">
        <h2>作品</h2>

        <div
          ref={containerRef}
          className="relative w-full h-[65vh] overflow-hidden"
        >
          <div
            ref={sectionRef}
            className="absolute top-0 left-0 flex gap-2 h-full"
          >
            {/* 映射作品項目 */}
            {works.map((work) => (
              <div
                key={work.id}
                className="w-[calc(100vw-3.5rem)] h-full bg-gray-100 rounded-lg flex flex-col items-center"
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
