import React from "react";
import BlockLayout from "../layouts/BlockLayout";
import RodSvg from "../components/RodSvg";

// 處方箋組件 Props
interface PrescriptionProps {
  symptom?: string;
  description?: React.ReactNode;
  subDescription?: string;
  patientComplaint?: string;
  className?: string;
}

const Prescription: React.FC<PrescriptionProps> = ({
  symptom = "Clinical Uses",
  description = "藉由 Astro 快速學習 MSW",
  subDescription = "別等後端了！自己先做假資料吧～",
  patientComplaint = "在現代軟體開發流程中，前後端團隊常常面臨一個普遍的挑戰：當接到新需求時，後端 API 的開發可能無法及時滿足前端的串接需求，但 PM 卻急需看到功能 Demo...",
  className = "",
}) => {
  return (
    <BlockLayout className={className}>
      <div className="relative overflow-hidden h-full border-2 border-plum p-4">
        <RodSvg className="absolute opacity-15 left-1/2 top-1/2 -translate-1/2" />
        {/* 圓點邊框裝飾 */}
        <div className="absolute top-0 left-0 w-full h-full">
          {/* 左側圓點 */}
          {[...Array(20)].map((_, i) => (
            <div
              key={`left-${i}`}
              className="absolute left-4 w-3 h-3 rounded-full bg-teal"
              style={{ top: `${i * 5 + 3}%` }}
            ></div>
          ))}

          {/* 右側圓點 */}
          {[...Array(20)].map((_, i) => (
            <div
              key={`right-${i}`}
              className="absolute right-4 w-3 h-3 rounded-full bg-teal"
              style={{ top: `${i * 5 + 3}%` }}
            ></div>
          ))}
        </div>

        <div className="relative z-10 flex flex-col p-5 md:p-8 h-full">
          {/* 主標題 */}
          <div className="mb-10 text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-teal font-italiana">
              Frontend Prescription
            </h1>
          </div>

          {/* 適應症 */}
          <div className="mb-2">
            <h2 className="text-xl font-semibold text-teal font-italiana">
              {symptom}
            </h2>
          </div>

          {/* 處方說明 - 藍色文字部分 */}
          <div className="mb-1">
            <p className="text-xl text-plum font-medium font-tenor">
              {description}
            </p>
          </div>

          {/* 處方副說明 - 藍色文字部分 */}
          <div className="mb-8">
            <p className="text-plum font-tenor">{subDescription}</p>
          </div>

          {/* 病人主訴 */}
          <div className="mb-2">
            <h2 className="text-xl font-semibold text-teal font-italiana">
              Chief complaint
            </h2>
          </div>

          <div className="mb-10">
            <p className="leading-relaxed text-plum font-tenor">
              {patientComplaint}
            </p>
          </div>

          <div className="flex-1 flex w-full h-fit items-end">
            <a
              href="/posts/msw/"
              className="inline-block bg-plum text-cream py-3 px-6 rounded hover:bg-teal transition-colors duration-300 w-full h-fit text-center "
            >
              <span className="block text-lg">Start Treatment!</span>
            </a>
          </div>

          {/* 配藥工程師簽名 - 右下角傾斜效果 */}
          <div className="absolute right-10 bottom-10 mt-auto self-end">
            <div className="border-3 border-rose p-2 text-rose transform rotate-10 bg-cream inline-block">
              <p className="font-semibold text-sm md:text-base mb-0">
                Engineer
              </p>
              <p className="font-semibold text-right text-lg md:text-xl">
                Yoha
              </p>
            </div>
          </div>
        </div>
      </div>
    </BlockLayout>
  );
};

export default Prescription;
