import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import BlockLayout from "../layouts/BlockLayout";
import Hashtag from "../components/Hashtag";

// Define skill type
interface Skill {
  id: string;
  name: string;
  category: "frontend" | "other";
}

// Props for infinite scroll tags component
interface InfiniteScrollTagsProps {
  skills: Skill[];
  direction: "left" | "right";
  speed: number;
  tagClassName?: string;
}

// Infinite scroll tags component
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

    // Clone tags to ensure enough content for scrolling
    const originalTags = itemsElement.querySelectorAll(".skill-tag");

    // Clone multiple times to ensure smooth infinite scroll
    for (let i = 0; i < 3; i++) {
      const clonedTags = Array.from(originalTags).map((tag) =>
        tag.cloneNode(true)
      );
      clonedTags.forEach((tag) => itemsElement.appendChild(tag));
    }

    // Calculate total width of the tag sequence
    const totalWidth = itemsElement.scrollWidth;
    const singleSetWidth = totalWidth / 4; // Since we have 4 sets (1 original + 3 clones)

    let startX, endX;

    if (direction === "right") {
      // Moving right to left: start from right side, move to left
      startX = 0;
      endX = -singleSetWidth;
    } else {
      // Moving left to right: start from left side, move to right
      startX = -singleSetWidth;
      endX = 0;
    }

    // Set initial position
    gsap.set(itemsElement, { x: startX });

    // Create infinite scroll effect
    const scrollAnimation = gsap.to(itemsElement, {
      x: endX,
      duration: (singleSetWidth / speed) * 2,
      ease: "none",
      repeat: -1,
      onRepeat: () => {
        // Seamlessly reset to start position
        gsap.set(itemsElement, { x: startX });
      },
    });

    // Pause animation on hover
    const handleMouseEnter = () => scrollAnimation.pause();
    const handleMouseLeave = () => scrollAnimation.play();

    containerElement.addEventListener("mouseenter", handleMouseEnter);
    containerElement.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup function
    return () => {
      containerElement.removeEventListener("mouseenter", handleMouseEnter);
      containerElement.removeEventListener("mouseleave", handleMouseLeave);
      scrollAnimation.kill();
    };
  }, [direction, speed]);

  return (
    <div ref={containerRef} className="overflow-hidden">
      <div ref={itemsRef} className="flex flex-nowrap gap-4">
        {skills.map((skill) => (
          <Hashtag
            key={skill.id}
            tag={skill.name}
            className={`skill-tag ${tagClassName}`}
          />
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
  // Frontend related skills
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

  // Other skills
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
    <BlockLayout className="col-span-1 lg:col-span-12 md:p-2">
      <div className="flex flex-col gap-2">
        {/* Frontend skills - moving left to right */}
        <InfiniteScrollTags
          skills={frontendSkills}
          direction="left"
          speed={100}
          tagClassName="bg-blush/40 text-plum"
        />

        {/* Other skills - moving right to left */}
        <InfiniteScrollTags
          skills={otherSkills}
          direction="right"
          speed={80}
          tagClassName="bg-blush/40 text-plum"
        />
      </div>
    </BlockLayout>
  );
};

export default Skills;
