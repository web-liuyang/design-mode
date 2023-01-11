import "@vscode/codicons/dist/codicon.css";


import { LayoutRenderer } from "./layout/layout";

const renderer = new LayoutRenderer({
  element: document.getElementById("root")!,
});

renderer.render();

// TODO
// 1. 实现 destroy 方法 ， 解除事件，引用等
