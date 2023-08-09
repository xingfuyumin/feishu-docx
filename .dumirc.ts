import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: '@tant/feishu-docx',
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/feishu-docx/docs-dist/' : '',
  define: {
    NODE_ENV: process.env.NODE_ENV,
  },
  history: {
    type: 'hash',
  }
});
