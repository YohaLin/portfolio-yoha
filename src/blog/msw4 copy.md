---
title: "藉由 Astro 快速學習\_MSW"
subtitle: '別等後端了！自己先做假資料吧～ '
pubDate: 2025-03-04T16:00:00.000Z
author: Yoha
description: ''
image:
  url: /images/msw/3.png
  alt: The Astro logo on a dark background with a pink glow.
tags:
  - blogging-2
  - astro
  - blogging
  - learning in public
---

### 前言

在現代軟體開發流程中，前後端團隊常常面臨一個普遍的挑戰：當接到新需求時，後端 API 的開發可能無法及時滿足前端的串接需求，但 PM 卻急需看到功能 Demo。這種情況下，若堅持傳統的瀑布式開發模式，將導致前端開發被迫等待，被發現是薪水小偷（？）

為了解決這一痛點，採用平行開發策略成為現代開發團隊的必然選擇。其中，前端開發人員可以主動採取的關鍵措施就是實現 Mock API。

透過 Mock API，前端開發人員能夠：

1. 模擬後端接口的行為與數據結構
2. 獨立於後端進度進行界面開發與功能實現
3. 快速提供可演示的產品原型給 PM 評估

### 先備知識 

1. CSR, SSR 有基礎認識
2. React , TypeScript。

### 無縫切換至真實 API

1. 避免程式碼修改
   如果我們只是撰寫靜態假資料，而非模擬真實的請求行為，前端團隊就可能需要面臨額外的程式碼調整，依據環境變數決定是從靜態資料讀取還是發送實際網路請求，例如在 Dev 環境拿的是靜態資料，而在 Production 環境則要發送請求行為。
2. 提供 Node.js 環境的模擬
   在現在前端中，能夠支援 Server Side Rendering(SSR) 的資料以及為 Unit Test 提供一致的 API 模擬都是很常見的做法，因此在挑選 Mock API 套件時除了 Browser 環境，更要同時支援 Node.js，以確保在兩者間行為的一致。
3. 擬 API 時，不會阻擋主執行緒
   某些 Mock API 套件，可能是啟動專案時跟著 JavaScript 主執行緒一起啟動，並且要等套件初始化之後，才能夠有資料，在開發上會有卡頓，我們都知道真實串接後端 API 時是非同步的，不該會有這樣的行為。

### Mock Service Worker(MSW)

> an API mocking library for Browser and Node.js.

在官網說明上，我們可以看到這是一個可以同時模擬 Browser 與 Node.js 環境的套件，而我大概做了一下同類套件的比較，很清楚看到可以同時支援的套件不多，又因為 MSW 使用上比 Json Server 較為靈活，所以勝出～

![](/images/msw/1.png)

而在進入這個套件之前，我想先介紹一下 Service Worker。

Service Worker 是 client 端與 server 端的中間層，像是 middleware 的角色，會監聽 JavaScript 所發出的 fetch 事件（還會監聽其他事件：[參考文章](https://ithelp.ithome.com.tw/m/articles/10216819)），如下圖，當接收到請求之後會快速處理回應及請求，決定下一步要去 server 或是 cache 抓資料。

![](/images/msw/2.png)

Service Worker 在執行上其實是透過額外的執行緒來運作，所以不會阻擋本來我們前端的主執行緒，MSW 人如其名就是去模擬這個 Service Worker， 讓整體開發上更像是真實的請求。

(murmur)要不是這次套件是模擬 Service Worker，不然真的很少會聽到這個東西，如果有開發到 PWA 好像比較常碰到，這方面我就沒有研究ㄌ～

![](/images/msw/3.png)

MSW 會根據我們程式碼中的 fetch 事件路徑去做比對，一旦路徑與事先定義好的模擬路由相同，就會自動幫我們攔截起來，回傳這筆模擬資料給前端，讓我們在不同開發環境下，都不需要額外的程式碼去做切換，後面會詳述。

解釋這麼多，其實就是希望我們從模擬到真實上線時，可以無痛且改動更少，MSW 算是一個滿理想的套件，底下我們就來介紹一下怎麼使用吧（居然才剛開始嗎？？？……）

這次公司開發是透過新的框架 [Astro.build](http://astro.build) 來做開發，這是一個以內容為主的框架，就像前面所提到的 SSR 就非常適合用 Astro，但這次文章不會細談，有興趣可以去他的官網走走逛逛～

### mocks 資料夾結構

![](/images/msw/4.png "我們主動在 src 下新增 mocks 資料夾；public 底下的檔案則是透過指令生成，下方文章會解釋")

我們主動在 src 下新增 mocks 資料夾；public 底下的檔案則是透過指令生成，下方文章會解釋

### Handlers

handler 決定我們 request API 的路徑、回傳邏輯與資料，底下是一般 Express 對於 handler 的寫法：

```typescript
import express from "express";
const app = express();
app.get("/user", (req, res) => {
  res.json({ name: "John" });
});
```

以下則是 MSW 提供給我們的 handler 寫法，其實跟 Express 不會相距太多，應該很好理解！

![](/images/msw/5.png "handler 會有兩個參數，第一個 predicate 是路徑，第二個 resolver 是處理回傳")

handler 會有兩個參數，第一個 predicate 是路徑，第二個 resolver 是處理回傳import { http, HttpResponse } from 'msw'

```typescript
export const handlers = [
  http.get("/user", ({ request }) => {
    return HttpResponse.json({ name: "John" });
  }),
];
```

### Browser Integration（[參考文件](https://mswjs.io/docs/integrations/browser)）

### 1. 初始化設定

由於我們的 astro 專案使用了自定義的基礎路徑 /m （附上 astro 的[設定文件](https://docs.astro.build/en/guides/configuring-astro/#add-your-deployment-domain)），需要在初始化 MSW 時指定這個路徑：

```javascript
$ npx msw init public / --base / m--save
// 如果沒有基礎路徑，使用以下的指令就可以了
$ npx msw init public / --save
```

為了方便後續使用，也可以將此命令添加到 package.json 的 scripts 中：

```javascript
// src/packag.json
{
  "scripts": {
    "init-msw": "npx msw init public/ --base /m --save"
  },
}
```

執行後，MSW 會在 package.json 中添加這段指令，msw 會知道在哪可以找到 service worker 的執行程式碼：

```javascript
// src/packag.json
{
  "scripts": {
    "init-msw": "npx msw init public/ --base /m --save"
  },
  "msw": {
    "workerDirectory": [
      "public"
    ]
  }
}
```

並輸入以下網址（記得加入你設定的前綴字），可以看到 service worker 的 script，代表在 browser 中設定完成！

```javascript
http://localhost:5001/m/mockServiceWorker.js
// 如果沒有基礎路徑，輸入以下網址
<http://localhost:5001/mockServiceWorker.js>

```

### 2. 創建基礎配置文件

首先，創建處理請求的基礎配置，這部分跟文件上基本上是一樣的：

```javascript
// src/mocks/browser.js
import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";
export const worker = setupWorker(...handlers);
```

### 3. 創建初始化文件

跟文件不同的地方是我們需要再多新增一個檔案 mswInitializer.js，除了處理只在 Dev 環境使用之外（因為我們不希望在 Production 環境中使用），還要處理前綴字的部分。

值得注意的地方是要加上 await，但初始化 server 就不用喔～

```typescript
// src/mocks/mswInitializer.js
const isDev = import.meta.env.MODE === "development";
export async function setupMSW() {
  if (isDev) {
    try {
      const { worker } = await import("./browser");
      // 指定包含 base 路徑的 service worker URL
      await worker.start({
        serviceWorker: {
          url: `${import.meta.env.BASE_PATH}/mockServiceWorker.js`,
        },
        onUnhandledRequest: "bypass",
      });
      console.log("[MSW] Started successfully");
    } catch (error) {
      console.error("[MSW] Failed to start:", error);
    }
  }
}
```

### 4. 整合到專案中

接著就可以到 Astro 的 Layout 加入初始化的程式碼：

```typescript
// src/layouts/Layout.astro
---
  // Frontmatter
  ---
  <html lang="zh">
    <head>
      <script>
// 攔截 CSR API fetch
        import {setupMSW} from '../mocks/mswInitializer';
        setupMSW();
      </script>
    </head>
    <body>
      ...
    </body>
  </html>
```

在頁面中加入 Layout 和 React 元件，因為 Astro 預設頁面都是 SSR 執行，所以我們在引入 React 元件時，需要告訴 Astro 這個元件是在 client 端執行，可以想像成我們在 Next.js 中會寫 “use client” 一樣，只是 Astro 會把客戶端的行為拆更細，可以參考 [Astro 文件：client Directives](https://docs.astro.build/en/reference/directives-reference/#client-directives)。

```typescript
// src/pages/index.astro
---
import Layout from '../layouts/Layout.astro';
---
  <Layout>
    <Test client:load />
  </Layout>
```

當我們 fetch 時路由對應到 [http://localhost:5001/api/avatar](http://localhost:5001/api/avatar) ，MSW 就會自動幫我們攔截 API，回傳在 handlers 中預期回傳的假資料。

```typescript
// src/components/Test.tsx
import React from 'react'
type DataType = {
  name: string
}
const Test = () => {
  const [data, setData] = useState < DataType | null > (null);
  useEffect(() => {
    const getData = async () => {
      try {
        const result = (await fetch(`http://localhost:5001/api/avatar`)
          .then((res) =>
            res.json(),
          )) as DataType;
        setData(result);
      } catch (error) {
        console.error('API 錯誤:', error);
      }
    };
    getData();
  }, []);
  return (
    <div>{data}</div>
  )
}
export default Test

```

### 5. 驗證安裝

可以到 devTool 上看到 \[MSW] Mocking enabled 就代表我們安裝成功囉！

![](/images/msw/6.png)

### Node.js Integration（[參考文件](https://mswjs.io/docs/integrations/browser)）

### 1. 創建基礎配置文件

首先，創建處理請求的基礎配置，這部分跟文件上基本上是一樣的：

```javascript
// src/mocks/node.js
import { setupServer } from "msw/node";
import { handlers } from "./handlers";
export const server = setupServer(...handlers);
```

### 2. 在 middleware 中初始化

![](/images/msw/8.png "Astro 是 MPA 架構，與 React 不同。")

Astro 是 MPA 架構，與 React 不同。

相對於 React 這種 SPA 架構(Single Page Application)，網路上的文章可能會告訴我們在 React 可以透過作為 entry point 的 index.tsx 來初始化 MSW；但 Astro 為 MPA 架構(Multiple Page Application)，沒有 entry point，當時真的困擾我很久，但後來發現我們可以把初始化的程式碼放在 middleware 中，只需要進入這個應用程式時初始化一次就可以了。

React 開發者可以直接參考官網做法：[文件](https://mswjs.io/docs/integrations/node)。

```typescript
// src/middleware.ts
import { APIContext, MiddlewareNext } from "astro";
import { startServer } from "./server";
const isDev = import.meta.env.MODE === "development";
if (isDev) {
  console.log("🎯🎯🎯 MSW server 端初始化[開始]");
  mswPromise = import("./mocks/node")
    .then(({ server }) => {
      server.listen();
      console.log("🎯🎯🎯 MSW server 端初始化[完成]");
    })
    .catch((error) => {
      console.log("🎯🎯🎯 MSW server 端初始化[失敗]：", error);
    });
}
export async function onRequest(context: APIContext, next: MiddlewareNext) {
  return next();
}
```

### 3. 驗證安裝

因為這次是在 Node.js 環境做攔截，所以我們要回到 VS code 看 terminal，如果有資訊就代表成功囉！

![](/images/msw/7.png)

### 到底模擬 Node.js 要做什麼呀？

其實一開始收到這個任務的時候，我一直在想這個問題，一般 Mock API 不是模擬 Browser 環境就好，那為什麼還要模擬 Node.js 環境呢？

其實關鍵有幾個（或是更多，以下提出的是目前遇到的問題）：

* 提供 SSR 環境的資料： 現代前端開發中，許多資料都是透過 Server 回傳 HTML, CSS, JavaScript。在 SSR 架構中，Node.js 環境負責預先渲染頁面，所以我們需要模擬這個環境來確保資料流正確。當我們進行單元測試或本地開發時，模擬 Node.js 環境可以讓我們不依賴實際的服務器就能測試 SSR 邏輯。
* 做 unit Test：JavaScript 在 Node.js 和瀏覽器中執行時可能有細微差異。為了確保我們的代碼在兩種環境中都能正常工作，我們需要模擬 Node.js 環境來執行測試，但我們希望測試的是小單元的部分，不希望串接真實 server 還有例如網路層的問題，目的是降低雜訊，只做我們想測的單元測試。

總結來說，模擬 Node.js 環境是現代前端開發中不可或缺的一部分，尤其對於使用 SSR 架構的項目。它讓我們能夠在本地開發環境中進行更全面的測試，確保代碼在所有目標環境中都能正常運行，最終提高產品的可靠性和開發效率。

### 結語

會有這篇文章是因為進到新公司的第一個專案，需要從頭開始建立架構，不只是第一次使用的 Astro 框架、 MSW 如何與 CSR, SSR 配合使用，都是超大的挑戰～其實這只是這個專案研究的冰山一角，如果未來有機會我再繼續分享如何透過 MSW + Express.js 讓 Mock API 進階到 Mock Server，先記錄下來。

不過應該會先躺平一陣子，但還是寫謝大家的觀看：Ｄ
