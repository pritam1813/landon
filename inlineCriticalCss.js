import { readFileSync } from "fs";
import { resolve } from "path";
import { minify } from "csso";

export default function inlineCriticalCss() {
  return {
    name: "inline-critical-css",
    enforce: "post",
    apply: "build",
    transformIndexHtml(html) {
      const cssPath = resolve(__dirname, "src/App.css");
      const css = readFileSync(cssPath, "utf-8");
      const minifiedCss = minify(css).css;
      const styleTag = `<style>${minifiedCss}</style>`;
      return html.replace("</head>", `${styleTag}</head>`);
    },
  };
}
