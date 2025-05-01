import BlockLayout from "../layouts/BlockLayout";

const Contact = () => {
  return (
    <BlockLayout className="col-span-1 lg:col-span-4 md:p-2">
      <div className="p-2 md:p-4 flex flex-col items-center h-full text-center border-(length:--my-border) border-dotted">
        {/* 文案部分 */}
        <div className="">
          <p className="text-lg md:text-xl">拿藥，沒有</p>
          <p className="text-lg md:text-xl font-bold">做網站，有</p>
        </div>

        <img src="/images/website/phone.jpg" alt="herb" />

        {/* 聯絡資訊 */}
        <div className="mb-2 md:mb-4">
          <p className="text-md md:text-lg font-mono">yohalin0613@gmail.com</p>
        </div>

        {/* 行動呼籲按鈕 */}
        <a
          href="mailto:yohalin0613@gmail.com"
          className="inline-block bg-black text-white py-3 px-6 rounded hover:bg-gray-800 transition-colors duration-300 text-center"
        >
          <span className="block">聯絡 Yoha</span>
        </a>
      </div>
    </BlockLayout>
  );
};

export default Contact;
