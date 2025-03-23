import BlockLayout from "../layouts/BlockLayout";

const Intro = () => {
  return (
    <BlockLayout className="col-span-1 md:col-span-8">
      <h1 className="font-mono">YOHA</h1>
      <h3>一位從藥學轉職的前端工程師。</h3>
      <img src="/images/website/herb.png" alt="herb" />
      <p>
        前端對我來說就像是魔藥學，能將抽象的想法轉化為用戶可以互動的具體介面。就如同將藥物配方調製成治療方案一樣，每一行代碼都是精心配置的成分，每一個元件都是為了提供最佳用戶體驗的精準計量。
      </p>
      <p>
        從藥學的精確計算，到前端的細緻雕琢，這段旅程不只是職涯轉變，更是一場跨領域的探索與挑戰。我期待運用這份獨特的背景，在科技與人之間架起更直覺、更友善的橋樑。
      </p>
    </BlockLayout>
  );
};

export default Intro;
