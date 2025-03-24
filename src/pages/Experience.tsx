import { useState } from "react";
import CaretLeft from "../assets/svgs/CaretLeft";
import CaretRight from "../assets/svgs/CaretRight";
import Divider from "../components/Divider";
import BlockLayout from "../layouts/BlockLayout";

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
    <BlockLayout className="col-span-1 md:col-span-4 flex flex-col items-end min-h-[50vh]">
      <div className="flex justify-end items-center gap-[0.5px] border-(length:--my-border) w-fit -mr-1.5 -mt-[calc(var(--my-border)+4px)] md:w-[calc(100%+12px)] md:justify-center">
        <button
          type="button"
          className="cursor-pointer hover:opacity-70 transition-opacity lg:order-3"
          onClick={handlePrev}
        >
          <CaretLeft width={28} height={28} />
        </button>
        <Divider className="h-7 lg:order-2" />
        <p className="text-sm px-2 text-center md:flex-1 lg:order-1">
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
        <p className="text-sm mb-4">{currentExp.content}</p>

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
                <span
                  key={index}
                  className="inline-block px-2 py-0.5 bg-gray-200 text-gray-800 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </BlockLayout>
  );
};

export default Experience;


const EXPERIENCE = [
  {
    order: 0,
    duration: "09.2023 - 09.2024",
    title: "前端工程師",
    company: "Pergolas investing",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe officia recusandae architecto quaerat aliquam quisquam provident nemo libero? Eius, voluptates at. Enim odio soluta atque aliquam aspernatur possimus quos. Voluptas.",
    projects: [
      {
        name: "PGL",
        link: "http://www.example.com",
      },
    ],
    tags: ["NextJS", "React"],
  },
  {
    order: 1,
    duration: "03.2022 - 08.2023",
    title: "全端開發工程師",
    company: "DigiTech Solutions",
    content:
      "負責公司核心產品的前後端開發與維護，參與專案規劃與技術選型，建立團隊開發標準與流程，提升產品穩定性與使用者體驗。導入自動化測試與CI/CD流程，有效減少發布錯誤率。",
    projects: [
      {
        name: "企業管理系統",
        link: "http://www.digicrm.com",
      },
      {
        name: "資料分析平台",
        link: "http://www.digianalytics.com",
      },
    ],
    tags: ["Vue.js", "Node.js", "MongoDB", "Docker"],
  },
];
