/**
 * ViewHelper - PointLab Universal SPA View Renderer
 * Menyajikan file index.html dari public/, dist/, atau views/ dengan aman tanpa error 500.
 */

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const renderSpaView = (req, res) => {
  const candidatePaths = [
    path.resolve(__dirname, '../public/index.html'),
    path.resolve(__dirname, '../dist/index.html'),
    path.resolve(__dirname, '../views/index.html')
  ];

  for (const p of candidatePaths) {
    if (fs.existsSync(p)) {
      return res.sendFile(p);
    }
  }

  return res.status(200).send('<!doctype html><html><body><div id="root">PointLab</div></body></html>');
};

export default renderSpaView;
