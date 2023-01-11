import { addClass } from "./style";

export const codicon = (name: string) => {
  const node = document.createElement("span");
  addClass(node, "codicon", "codicon-" + name);
  return node;
};
