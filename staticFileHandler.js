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
