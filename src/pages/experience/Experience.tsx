import { useState } from "react";
import CaretLeft from "../../assets/svgs/CaretLeft";
import CaretRight from "../../assets/svgs/CaretRight";
import Divider from "../../components/Divider";
import BlockLayout from "../../layouts/BlockLayout";
import Hashtag from "../../components/Hashtag";

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
    <BlockLayout className="col-span-1 lg:col-span-4 flex flex-col items-end min-h-[650px] sm:min-h-[500px] lg:min-h-[700px] xl:min-h-[650px] bg-cream">
      <div className="flex justify-end items-center gap-[0.5px] border-frame w-fit mr-[calc(var(--my-border)-8px)] -mt-[calc(var(--my-border)+4px)] lg:-mr-[calc(var(--my-border)+20px)] lg:-mt-[calc(var(--my-border)+20px)] lg:w-[calc(100%+44px)] lg:justify-center">
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
          <a href={currentExp.company.href}>
            <p className="text-sm text-gray-600 border-b border-plum">@{currentExp.company.title}</p>
          </a>
        </div>
        <div className="text-sm mb-4">
          {typeof currentExp.content === "string" ? (
            <p>{currentExp.content}</p>
          ) : (
            currentExp.content
          )}
        </div>

        {/* 專案區塊 */}
        {Array.isArray(currentExp.projects) &&
          currentExp.projects.length > 0 && (
            <div className="mb-3">
              <p className="text-sm font-medium mb-1">Project:</p>
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
        {Array.isArray(currentExp.tags) && currentExp.tags.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-1">Tech Stack:</p>
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
    title: "Frontend Developer",
    company: {
      title: "SysJust",
      href: "https://www.sysjust.com.tw/",
    },
    content: (
      <div>
        <p className="mb-2">
          Frontend engineer focusing on internal UI library development and the
          mobile version of MoneyDJ. Refactored a key quant module, reducing
          build time by over 50% and significantly improving performance.
        </p>
        <p className="mb-2">
          Built a mock server to enable parallel frontend-backend workflows and
          cross-device testing. Introduced panda-css and design tokens to create
          a scalable, consistent design system for responsive layouts.
        </p>
        <p className="mb-2">
          Collaborated closely with backend teams to structure API integration,
          optimized loading speed, and improved data accuracy and system
          responsiveness for a smoother user experience.
        </p>
      </div>
    ),
    projects: [],
    tags: [
      "Astro.js",
      "React",
      "Express",
      "TypeScript",
      "panda-css",
      "MSW",
      "RWD",
      "Webpack",
      "Vite",
    ],
  },
  {
    order: 1,
    duration: "09.2023 - 09.2024",
    title: "Frontend Developer",
    company: {
      title: "PGL",
      href: "https://www.2pgl.com/",
    },
    content: (
      <div>
        <p className="mb-2">
          Handled frontend development and UI/UX design for a quantitative
          trading platform, building everything from layout to logic from the
          ground up.
        </p>
        <p className="mb-2">
          Developed core features like backtesting tools, strategy management,
          and real-time dashboards with Socket.io. Ensured seamless interaction
          between components through optimized async data loading and
          progressive rendering.
        </p>
        <p className="mb-2">
          Designed a custom Tailwind-based responsive system for clean,
          consistent layouts. Used Echarts for data visualization and React Hook
          Form to streamline user input workflows. Integrated broker APIs in
          collaboration with backend teams.
        </p>
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
  {
    order: 2,
    duration: "07.2020 - 05.2023",
    title: "Pharmacist",
    company: {
      title: "FEMH",
      href: "https://www.femh.org.tw/mainpage/index.aspx",
    },
    content: (
      <div>
        <p className="mb-2">
          Handled prescription review, dispensing, and medication management in
          hospitals, clinics, and pharmacies. Ensured accuracy, safety, and
          compliance in all pharmaceutical operations.
        </p>
        <p className="mb-2">
          Provided medication counseling, managed inventory systems, and
          supported process improvements at the front desk. Built strong habits
          in precision, teamwork, and problem-solving under pressure—skills that
          carried over into my engineering journey.
        </p>
      </div>
    ),
  },
];
