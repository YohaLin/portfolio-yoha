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
  websiteUrl?: string;
}

// 組件 props 類型
type Props_Works = {
  works?: WorkItem[];
};

const Works: FC<Props_Works> = ({ works = defaultWorks }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let trigger: ScrollTrigger | undefined;
    const container = containerRef.current;
    const section = sectionRef.current;

    if (container && section) {
      const scrollWidth = section.offsetWidth;
      const containerWidth = container.offsetWidth;
      const scrollDistance = scrollWidth - containerWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "-20 top",
          end: () => `+=${scrollDistance + 100}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          pinSpacing: true,
          markers: false,
        },
      });

      tl.to(section, {
        x: -scrollDistance,
        ease: "none",
      });

      const allTriggers = ScrollTrigger.getAll();
      trigger = allTriggers[allTriggers.length - 1];
    }

    return () => {
      if (trigger) trigger.kill();
    };
  }, []);

  return (
    <BlockLayout className="col-span-1 lg:col-span-12">
      <div
        ref={triggerRef}
        className="flex flex-col gap-1 h-fit overflow-hidden pb-2"
      >
        <h2>作品</h2>

        <div
          ref={containerRef}
          className="relative w-full h-[calc(100vh-4.5rem)] overflow-hidden"
        >
          <div
            ref={sectionRef}
            className="absolute top-0 left-0 flex gap-4 h-full px-2"
          >
            {works.map((work) => (
              <div
                key={work.id}
                className="flex-shrink-0 w-[calc(100vw-4.5rem)] h-full bg-gray-100 rounded-lg flex flex-col justify-start lg:flex-row lg:items-center lg:justify-between lg:w-[calc(1200px-1.75rem)] p-6"
              >
                {/* 圖片區塊 - 移動版置中顯示 */}
                <img
                  src={work.imageSrc}
                  alt={work.title}
                  className="w-[85%] max-w-80 mx-auto object-cover aspect-square lg:w-[45%] lg:max-w-none lg:order-2"
                />

                {/* 文字內容區塊 - 調整間距與排版 */}
                <div className="flex flex-col w-[90%] mx-auto lg:w-[45%] lg:ml-12 lg:mr-0 lg:order-1">
                  <h3 className="text-2xl font-semibold mb-4">{work.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed  md:text-lg">
                    {work.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {work.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium md:text-base"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {work.websiteUrl && (
                    <a
                      href={work.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 ease-in-out w-fit"
                    >
                      <span>查看網站</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BlockLayout>
  );
};

const defaultWorks: WorkItem[] = [
  {
    id: 1,
    title: "茶葉先森",
    description:
      "使用 Next.js 和 Tailwind CSS 開發的個人網站，具有響應式設計。網站展示了我接案畫畫的作品與形象。",
    imageSrc: "/images/website/theaDaily.png",
    tags: [
      "Next.js",
      "Tailwind",
      "Responsive Design",
      "Landing Page",
      "Vercel",
    ],
    websiteUrl: "https://example.com/tea-site", // 添加網站連結
  },
  {
    id: 2,
    title: "診所掛號系統",
    description:
      "專為診所設計的完整掛號管理系統，提供客人預約排程。提供了簡單直覺的使用者介面，讓客人更快速且流暢享受診所服務。特別設計的線上預約系統減少了客戶等待時間，並優化了診所資源分配，促進業務增長超過25%。",
    imageSrc: "/images/website/clinic.png",
    tags: ["React.js", "Material UI", "Firebase", "Cloud Functions"],
    websiteUrl: "https://example.com/clinic-system", // 添加網站連結
  },
];
export default Works;
