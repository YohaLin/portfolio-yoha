import React from "react";
import BlockLayout from "../layouts/BlockLayout";

// 處方箋組件 Props
interface PrescriptionProps {
  title?: string;
  symptom?: string;
  description?: React.ReactNode;
  subDescription?: string;
  patientComplaint?: string;
  className?: string;
}

const Prescription: React.FC<PrescriptionProps> = ({
  title = "前端處方箋",
  symptom = "適應症",
  description = "藉由 Astro 快速學習 MSW",
  subDescription = "別等後端了！自己先做假資料吧～",
  patientComplaint = "在現代軟體開發流程中，前後端團隊常常面臨一個普遍的挑戰：當接到新需求時，後端 API 的開發可能無法及時滿足前端的串接需求，但 PM 卻急需看到功能 Demo...",
  className = "",
}) => {
  return (
    <BlockLayout className={`col-span-1 md:col-span-8 ${className}`}>
      <div className="relative overflow-hidden h-full border-2 border-black p-4 md:p-6 bg-white">
        {/* 圓點邊框裝飾 */}
        <div className="absolute top-0 left-0 w-full h-full">
          {/* 左側圓點 */}
          {[...Array(20)].map((_, i) => (
            <div
              key={`left-${i}`}
              className="absolute left-4 w-3 h-3 rounded-full bg-black"
              style={{ top: `${i * 5 + 3}%` }}
            ></div>
          ))}

          {/* 右側圓點 */}
          {[...Array(20)].map((_, i) => (
            <div
              key={`right-${i}`}
              className="absolute right-4 w-3 h-3 rounded-full bg-black"
              style={{ top: `${i * 5 + 3}%` }}
            ></div>
          ))}
        </div>

        <div className="relative z-10 flex flex-col p-5 md:p-8 min-h-[70vh]">
          {/* 主標題 */}
          <div className="mb-10 text-center">
            <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
          </div>

          {/* 適應症 */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold">{symptom}</h2>
          </div>

          {/* 處方說明 - 藍色文字部分 */}
          <div className="mb-2">
            <p className="text-xl md:text-2xl text-[#0E9EC2] font-medium">
              {description}
            </p>
          </div>

          {/* 處方副說明 - 藍色文字部分 */}
          <div className="mb-8">
            <p className="text-lg text-[#0E9EC2]">{subDescription}</p>
          </div>

          {/* 病人主訴 */}
          <div className="mb-2">
            <h2 className="text-xl font-semibold">病人主訴</h2>
          </div>

          <div className="mb-10">
            <p className="text-base md:text-lg leading-relaxed">
              {patientComplaint}
            </p>
          </div>

          <a
            href="/posts/msw/"
            className="inline-block bg-black text-white py-3 px-6 rounded hover:bg-gray-800 transition-colors duration-300 text-center"
          >
            <span className="block">快去找治療方案！</span>
          </a>

          {/* 配藥工程師簽名 - 右下角傾斜效果 */}
          <div className="mt-auto self-end">
            <div className="border-2 border-black p-2 transform rotate-6 bg-white inline-block">
              <p className="font-semibold text-sm md:text-base mb-0">
                配藥工程師
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
