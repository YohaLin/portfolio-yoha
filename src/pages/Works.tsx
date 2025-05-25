import React, { useEffect, useRef, type FC } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlockLayout from "../layouts/BlockLayout";
import Hashtag from "../components/Hashtag";
import EyeSvg from "../components/EyeSvg";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Define work item type
interface WorkItem {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  tags: string[];
  websiteUrl?: string;
}

// Component props type
type Props_Works = {
  works?: WorkItem[];
};

const Works: FC<Props_Works> = ({ works = defaultWorks }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  // 使用 useRef 而不是 useState 來避免閉包問題
  const isMouseInWorkAreaRef = useRef<boolean>(false);

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

  // Mouse follower effect
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const updateCursor = () => {
      // 使用 .current 來獲取最新的值
      if (isMouseInWorkAreaRef.current) {
        cursorX += (mouseX - cursorX) * 0.35;
        cursorY += (mouseY - cursorY) * 0.35;
        cursor.style.transform = `translate(${cursorX - 30}px, ${cursorY - 30}px)`;
      }
      requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      mouseX = mouseEvent.clientX;
      mouseY = mouseEvent.clientY;
    };

    const handleMouseEnter = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      mouseX = mouseEvent.clientX;
      mouseY = mouseEvent.clientY;
      cursorX = mouseX;
      cursorY = mouseY;

      cursor.style.transform = `translate(${cursorX - 30}px, ${cursorY - 30}px)`;

      // 更新 ref 的值
      isMouseInWorkAreaRef.current = true;

      gsap.to(cursor, {
        opacity: 1,
        ease: "back.out(1.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      });
    };

    const handleMouseLeave = () => {
      // 更新 ref 的值
      isMouseInWorkAreaRef.current = false;

      gsap.to(cursor, {
        opacity: 0,
        display: "none",
      });
    };

    const workLinks = document.querySelectorAll(".work-item-link");

    workLinks.forEach((link) => {
      link.addEventListener("mouseenter", handleMouseEnter);
      link.addEventListener("mouseleave", handleMouseLeave);
      link.addEventListener("mousemove", handleMouseMove);
    });

    updateCursor();

    return () => {
      workLinks.forEach((link) => {
        link.removeEventListener("mouseenter", handleMouseEnter);
        link.removeEventListener("mouseleave", handleMouseLeave);
        link.removeEventListener("mousemove", handleMouseMove);
      });
    };
  }, []); // 空的依賴性陣列

  return (
    <BlockLayout className="col-span-1 lg:col-span-12">
      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-50 opacity-0 pointer-events-none flex-col"
        style={{
          mixBlendMode: "difference",
          transform: "translate(-50%, -50%)",
        }}
      >
        <p className="text-white text-xl">CHECK</p>
        <div className="w-fit h-16 p-2 bg-aqua rounded-full">
          <EyeSvg className="w-12 h-12" />
        </div>
      </div>

      <div
        ref={triggerRef}
        className="flex flex-col gap-1 h-fit overflow-hidden pb-2"
      >
        <h2 className="pl-2">Portfolio</h2>

        <div
          ref={containerRef}
          className="relative w-full h-[calc(100vh-4.5rem)] overflow-hidden"
        >
          <div
            ref={sectionRef}
            className="absolute top-0 left-0 flex gap-4 md:gap-6 h-full px-2"
          >
            {works.map((work) => (
              <div
                key={work.id}
                className="group flex-shrink-0 max-w-[calc(100vw-4.5rem)] overflow-hidden rounded-lg"
              >
                <a
                  href={work.websiteUrl}
                  target="_blank"
                  className="work-item-link w-[calc(100vw-4.5rem)] h-full bg-cream rounded-lg flex flex-col justify-start lg:flex-row lg:items-center lg:justify-between lg:w-[calc(1200px-3.5rem)] p-6 cursor-none transition-transform duration-300 hover:scale-[1.02]"
                >
                  <img
                    src={work.imageSrc}
                    alt={work.title}
                    className="w-[85%] max-w-80 mx-auto object-cover aspect-square lg:w-[45%] lg:max-w-none lg:order-2"
                  />

                  <div className="flex flex-col w-[90%] mx-auto lg:w-[45%] lg:ml-12 lg:mr-0 lg:order-1">
                    <p className="text-2xl mb-2 md:mb-4 font-istok font-extrabold text-plum group-hover:text-teal">
                      {work.title}
                    </p>
                    <p className="mb-6 leading-relaxed md:text-lg text-plum font-extrabold font-tenor group-hover:text-teal">
                      {work.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {work.tags.map((tag, index) => (
                        <Hashtag
                          key={index}
                          tag={tag}
                          className="bg-rose/40 text-plum group-hover:bg-aqua/30 group-hover:text-teal"
                        />
                      ))}
                    </div>
                  </div>
                </a>
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
    title: "Clinic Appointment System",
    description:
      "A comprehensive appointment management system designed specifically for clinics, providing appointment scheduling for patients. It offers a simple and intuitive user interface that allows patients to enjoy clinic services more quickly and smoothly.",
    imageSrc: "/images/website/clinic.png",
    tags: [
      "React.js",
      "Typescript",
      "Tailwind",
      "i18next",
      "Vercel",
      "LottieFiles",
    ],
    websiteUrl: "https://clinic-yoha.vercel.app/zh-TW/",
  },
  {
    id: 2,
    title: "Thea Daily",
    description:
      "A personal website developed using Next.js and Tailwind CSS with responsive design. The website showcases my freelance illustration work and brand image.",
    imageSrc: "/images/website/theaDaily.png",
    tags: [
      "Next.js",
      "Typescript",
      "Styled-components",
      "Responsive Design",
      "Vercel",
    ],
    websiteUrl: "https://thea-daily.vercel.app/",
  },
];

export default Works;
