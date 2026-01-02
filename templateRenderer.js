
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
