import { useState } from "react";
import CaretLeft from "../assets/svgs/CaretLeft";
import CaretRight from "../assets/svgs/CaretRight";
import Divider from "../components/Divider";
import BlockLayout from "../layouts/BlockLayout";
import Hashtag from "../components/Hashtag";

const Experience = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentExp = EXPERIENCE[currentIndex];

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(EXPERIENCE.length - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < EXPERIENCE.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <BlockLayout className="col-span-1 lg:col-span-4 flex flex-col items-end min-h-[650px] sm:min-h-[500px] lg:min-h-[700px] xl:min-h-[650px]">
      <div className="flex justify-end items-center gap-[0.5px] border-(length:--my-border) w-fit mr-[calc(var(--my-border)-8px)] -mt-[calc(var(--my-border)+4px)] lg:-mr-[calc(var(--my-border)+20px)] lg:-mt-[calc(var(--my-border)+20px)] lg:w-[calc(100%+44px)] lg:justify-center">
        <button
          type="button"
          className="cursor-pointer hover:opacity-70 transition-opacity lg:order-3"
          onClick={handlePrev}
        >
          <CaretLeft width={28} height={28} />
        </button>
        <Divider className="h-7 lg:order-2" />
        <p className="text-sm px-2 text-center lg:flex-1 lg:order-1">
          {currentExp.duration}
        </p>
        <Divider className="h-7 lg:order-4" />
        <button
          type="button"
          className="cursor-pointer hover:opacity-70 transition-opacity lg:order-5"
          onClick={handleNext}
        >
          <CaretRight width={28} height={28} />
        </button>
      </div>
      <div className="flex flex-col w-full mt-4">
        <div className="flex items-baseline gap-2 mb-2">
          <h2 className="text-xl font-semibold">{currentExp.title}</h2>
          <p className="text-sm text-gray-600">@{currentExp.company}</p>
        </div>
        <div className="text-sm mb-4">
          {typeof currentExp.content === "string" ? (
            <p>{currentExp.content}</p>
          ) : (
            currentExp.content
          )}
        </div>

        {/* 專案區塊 */}
        {currentExp.projects.length > 0 && (
          <div className="mb-3">
            <p className="text-sm font-medium mb-1">專案:</p>
            <div className="flex flex-wrap gap-2">
              {currentExp.projects.map((project, index) => (
                <a
                  key={index}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs transition-colors"
                >
                  {project.name}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1 h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* 標籤區塊 */}
        {currentExp.tags.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-1">技術:</p>
            <div className="flex flex-wrap gap-1">
              {currentExp.tags.map((tag, index) => (
                <Hashtag key={index} tag={tag} />
              ))}
            </div>
          </div>
        )}
      </div>
    </BlockLayout>
  );
};

export default Experience;

// 更新 EXPERIENCE 陣列中的第一個項目
const EXPERIENCE = [
  {
    order: 0,
    duration: "09.2024 - now",
    title: "前端工程師",
    company: "SysJust",
    content: (
      <div>
        <p className="mb-2">
          開發內部元件庫與 moneydj
          手機版官網，打造高效能且直覺的使用者介面，確保資訊介面的穩定性與即時性。
        </p>
        <ul className="list-disc pl-5 mt-3 space-y-2 text-sm">
          <li>
            採用 <strong>Astro.js</strong> 作為前端框架，結合{" "}
            <strong>TypeScript</strong>{" "}
            嚴格規範型別，提升代碼品質與團隊協作效率。
          </li>
          <li>
            實現基於 <strong>Socket.io</strong>{" "}
            的實時績效儀表板，精確呈現交易數據與市場變化，優化資料傳輸流程，提升用戶體驗與系統回應速度約
            50%。
          </li>
          <li>
            導入 <strong>panda-css</strong>{" "}
            構建模組化與可擴展的樣式系統，建立設計令牌(Design
            Tokens)與統一風格指南，使 RWD
            響應式設計更加一致且易於維護，提升開發效率達 35%。
          </li>
          <li>
            運用 <strong>MSW (Mock Service Worker)</strong>{" "}
            攔截網路請求並提供模擬資料，實現前後端平行開發策略，有效縮短30%專案交付時間，同時提升單元測試覆蓋率至
            85%。
          </li>
          <li>
            優化應用程式初始載入時間，通過代碼分割、資源優先級設定和靜態資源緩存策略。
          </li>
          <li>製作公司內部元件庫，提供跨團隊的元件管理方案。</li>
          <li>
            與後端團隊緊密協作，設計並實現高效的 API
            整合方案，確保數據一致性與系統穩定性。
          </li>
        </ul>
      </div>
    ),
    projects: [],
    tags: [
      "Astro.js",
      "TypeScript",
      "panda-css",
      "MSW",
      "RWD",
      "React",
      "Vite",
    ],
  },
  {
    order: 1,
    duration: "09.2023 - 09.2024",
    title: "前端工程師",
    company: "Pergolas investing",
    content: (
      <div>
        <p>
          釐清需求、從零到一設計 UIUX、規劃前端架構，並開發線上量化交易介面
          <a
            href="http://ai.2pgl.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            (網站連結)
          </a>
          ，使用回測系統建立、儲存單一策略與多策略，透過交易機器人做量化交易下單，以
          Socket.io 呈現 real-time 績效儀表板。
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
          <li>透過 Next.js 作為前端框架，使用 TypeScript 規範型別。</li>
          <li>
            使用 Socket.io 做 real-time 績效儀表板，提升用戶體驗與回應速度約
            50%。
          </li>
          <li>
            Tailwind 規劃 RWD 響應式網頁，自定義參數提升程式碼可維護性與整潔度。
          </li>
          <li>
            處理儀表板中非同步 API
            數據加載，在不同時間點逐步顯示數據，提升用戶界面體驗，確保用戶無需等待所有
            API 數據回傳即可看到畫面更新。
          </li>
          <li>
            使用 Echarts.js
            呈現回測數據，如長條圖與折線圖，加強數據可視化與互動性。
          </li>
          <li>
            設計並實現可新增與輸入的表格，利用 React hook form
            提升表單處理效率與用戶輸入體驗。
          </li>
          <li>與後端協作串接證券商 API。</li>
        </ul>
      </div>
    ),
    projects: [
      {
        name: "PGL",
        link: "http://ai.2pgl.com",
      },
    ],
    tags: [
      "NextJS",
      "React",
      "TypeScript",
      "Socket.io",
      "Tailwind",
      "Echarts.js",
      "React Hook Form",
    ],
  },
];
