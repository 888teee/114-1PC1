
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

