# 第2次隨堂題目-隨堂-QZ2
>
>學號：111111216   (學號和姓名都要寫)
><br />
>姓名：唐滋翊
>

```
更多markdown方法可參閱[https://ithelp.ithome.com.tw/articles/10203758](https://ithelp.ithome.com.tw/articles/10203758)

請在撰寫"說明程式與內容"該塊內容，請把原該塊內上述敘述刪除，該塊上述內容只是用來指引該怎麼撰寫內容。

1. a.

Ans: 
const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.ejs': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

export function getContentType(extname) {
    return contentTypes[extname] || 'text/plain';
}

1. b.

Ans:
import ejs from 'ejs';
import fs from 'fs';
import path from 'path';

/

 @param {object} res 
 @param {string} filePath 
 @param {object} data 
 
export function renderTemplate(res, filePath, data = {}) {
  const fullPath = path.resolve(filePath);

  
  fs.readFile(fullPath, 'utf-8', (err, templateStr) => {
    if (err) {
      console.error('模板讀取失敗:', err);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('500 伺服器錯誤');
      return;
    }

    try {
      const html = ejs.render(templateStr, data);
      res.setHeader('Content-Type', 'text/html');
      res.end(html);
    } catch (renderErr) {
      console.error('模板渲染失敗:', renderErr);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('500 伺服器錯誤');
    }
  });
}


  @param {object} res 
 
export function render404(res) {
  const filePath = path.resolve('views/404.ejs'); 

  fs.readFile(filePath, 'utf-8', (err, templateStr) => {
    if (err) {
      console.error('404 模板讀取失敗:', err);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('500 伺服器錯誤');
      return;
    }

    try {
      const html = ejs.render(templateStr);
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.end(html);
    } catch (renderErr) {
      console.error('404 模板渲染失敗:', renderErr);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('500 伺服器錯誤');
    }
  });
}


<!-- 請撰寫時，最後一句話再寫一次 -->


1. c.

Ans:
import fs from 'fs';
import path from 'path';
import { getContentType } from './mimeTypes.js';
import { render404 } from './templateRenderer.js';

export function handleStaticFile(res, filePath) {
  const fullPath = path.resolve(filePath);

  fs.readFile(fullPath, (err, fileContent) => {
    if (err) {
      console.error('靜態文件讀取失敗:', err);
      render404(res);
      return;
    }

    const extname = path.extname(fullPath);
    const contentType = getContentType(extname);

    res.statusCode = 200;
    res.setHeader('Content-Type', contentType);
    res.end(fileContent);
  });
}

<!--  請撰寫時，第一句話再寫一次  -->
1.d

Ans:
import http from 'http';
import { renderTemplate } from './utils/templateRenderer.js';
import { handleStaticFile } from './utils/staticFileHandler.js';

const PORT = 3000;

http.createServer((req, res) => {
  const url = req.url;

  switch (true) {
    case url === '/':
      renderTemplate(res, './views/index.ejs', { title: '首頁' });
      break;

    case url === '/calculator':
      renderTemplate(res, './views/index2.ejs', { title: '計算機' });
      break;

    default:
      handleStaticFile(res, `.${url}`);
      break;
  }
}).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

2. a.

Ans:

這段程式碼的意思是：程式先建立一個對照表 contentTypes，把常見檔案副檔名（例如 .html、.js、.css、圖片檔等）對應到瀏覽器能識別的 MIME 類型，再寫一個函數 getContentType(extname)，只要給它副檔名，它就回傳對應的 MIME 類型，如果找不到就回傳普通文字 text/plain，這樣瀏覽器就能正確知道這個檔案要怎麼讀取和顯示。

2. b.

Ans:

這段程式碼的意思是：程式先引入 ejs、fs 和 path，然後寫了兩個函數，renderTemplate(res, filePath, data) 用來讀取指定的 EJS 模板並把資料 data 填進去渲染成 HTML，最後回傳給瀏覽器，如果讀取或渲染失敗就回傳 500 錯誤；render404(res) 專門處理找不到頁面的情況，它讀取 views/404.ejs 模板並渲染成 404 頁面，同樣遇到讀取或渲染錯誤會回傳 500，整個模組就是把模板渲染的流程包起來，讓主程式只需要呼叫函數就可以顯示頁面。

2. c.

Ans:
這段程式碼的意思是：程式引入 fs、path、自己寫的 getContentType 和 render404 模組，寫了一個函數 handleStaticFile(res, filePath)，用來讀取靜態檔案（像 CSS、JS、圖片等），先用 fs.readFile 嘗試讀檔，如果失敗就呼叫 render404(res) 顯示 404 頁面，讀到檔案後會用 getContentType 依副檔名設定正確的 Content-Type，最後把檔案內容傳給瀏覽器，這樣瀏覽器就能正確顯示靜態資源。

<!--  請撰寫時，第一句話和最後一句再寫一次  -->

2. d.

Ans:
這段程式碼的意思是：主程式引入 http、模板渲染模組 renderTemplate 和靜態檔案模組 handleStaticFile，然後用 http.createServer 建立伺服器，針對不同路徑做路由判斷，根路徑 / 呼叫 renderTemplate 渲染 index.ejs，/calculator 渲染 index2.ejs，其他路徑就交給 handleStaticFile 處理靜態檔案，最後伺服器監聽 3000 埠口，這樣整個主檔案只專注於路由邏輯。

```
