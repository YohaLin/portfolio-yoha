import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import BlockLayout from "../layouts/BlockLayout";

// 定義技能類型
interface Skill {
  id: string;
  name: string;
  category: "frontend" | "other";
}

// 無限滾動標籤列組件的 Props
interface InfiniteScrollTagsProps {
  skills: Skill[];
  direction: "left" | "right";
  speed: number;
  tagClassName?: string;
}

// 無限滾動標籤列組件
const InfiniteScrollTags: React.FC<InfiniteScrollTagsProps> = ({
  skills,
  direction,
  speed,
  tagClassName = "px-4 py-2 rounded-full bg-indigo-100 text-indigo-800 whitespace-nowrap",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containerElement = containerRef.current;
    const itemsElement = itemsRef.current;

    if (!containerElement || !itemsElement) return;

    // 克隆標籤以確保足夠的內容進行滾動
    const originalTags = itemsElement.querySelectorAll(".skill-tag");
    const clonedTags = Array.from(originalTags).map((tag) =>
      tag.cloneNode(true)
    );
    clonedTags.forEach((tag) => itemsElement.appendChild(tag));

    // 計算整個標籤序列的寬度
    const totalWidth = itemsElement.scrollWidth;

    // 設置初始位置
    if (direction === "right") {
      gsap.set(itemsElement, { x: 0 });
    } else {
      gsap.set(itemsElement, { x: -totalWidth / 2 });
    }

    // 創建無限滾動效果
    const scrollAnimation = gsap.to(itemsElement, {
      x: direction === "right" ? -totalWidth / 2 : 0,
      duration: totalWidth / speed,
      ease: "none",
      repeat: -1,
      onRepeat: () => {
        if (direction === "right") {
          gsap.set(itemsElement, { x: 0 });
        } else {
          gsap.set(itemsElement, { x: -totalWidth / 2 });
        }
      },
    });

    // 當滑鼠懸停時暫停動畫
    containerElement.addEventListener("mouseenter", () =>
      scrollAnimation.pause()
    );
    containerElement.addEventListener("mouseleave", () =>
      scrollAnimation.play()
    );

    // 清理函數
    return () => {
      scrollAnimation.kill();
    };
  }, [direction, speed]);

  return (
    <div ref={containerRef} className="overflow-hidden">
      <div ref={itemsRef} className="flex flex-nowrap gap-4">
        {skills.map((skill) => (
          <div key={skill.id} className={`skill-tag ${tagClassName}`}>
            {skill.name}
          </div>
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
  // 前端相關技能
  const frontendSkills: Skill[] = [
    { id: "html-css", name: "HTML/CSS", category: "frontend" },
    { id: "tailwind", name: "Tailwind", category: "frontend" },
    { id: "mui", name: "MUI", category: "frontend" },
    { id: "panda-css", name: "Panda-css", category: "frontend" },
    { id: "js-ts", name: "JavaScript/TypeScript", category: "frontend" },
    { id: "es6", name: "ES5+", category: "frontend" },
    { id: "react", name: "React", category: "frontend" },
    { id: "next", name: "Next", category: "frontend" },
    { id: "astro", name: "Astro.js", category: "frontend" },
    { id: "ssr", name: "SSR", category: "frontend" },
    { id: "ssg", name: "SSG", category: "frontend" },
    { id: "seo", name: "SEO", category: "frontend" },
  ];

  // 其他技能
  const otherSkills: Skill[] = [
    { id: "ui-ux", name: "UI/UX Design", category: "other" },
    { id: "wireframe", name: "Wireframe", category: "other" },
    { id: "git", name: "Git", category: "other" },
    { id: "github", name: "GitHub", category: "other" },
    { id: "gitlab", name: "GitLab", category: "other" },
    { id: "aws", name: "AWS", category: "other" },
    { id: "gcp", name: "GCP", category: "other" },
    { id: "openapi", name: "OpenAPI", category: "other" },
    { id: "animation", name: "Animation", category: "other" },
    { id: "gsap", name: "GSAP", category: "other" },
    { id: "lottie", name: "LottieFiles", category: "other" },
    { id: "css-animations", name: "CSS animations", category: "other" },
    { id: "api", name: "API", category: "other" },
    { id: "restful", name: "Restful API", category: "other" },
    { id: "mock-api", name: "Mock API", category: "other" },
    { id: "msw", name: "Mock Service Worker", category: "other" },
  ];

  return (
    <BlockLayout className="col-span-1 md:col-span-12 md:p-2">
      <div className="flex flex-col gap-2">
        {/* 前端技能 - 左到右 */}
        <InfiniteScrollTags
          skills={frontendSkills}
          direction="left"
          speed={100}
          tagClassName="px-4 py-2 rounded-full bg-indigo-100 text-indigo-800 whitespace-nowrap"
        />

        {/* 其他技能 - 右到左 */}
        <InfiniteScrollTags
          skills={otherSkills}
          direction="right"
          speed={80}
          tagClassName="px-4 py-2 rounded-full bg-purple-100 text-purple-800 whitespace-nowrap"
        />
      </div>
    </BlockLayout>
  );
};

export default Skills;
