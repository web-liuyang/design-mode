import type { BaseRendererOptions } from "../../basic/base-renderer";
import type { BaseBuilder } from "../../basic/base-builder";
import { BasePage } from "../../basic/base-page";
import { SingletonRenderer } from "./renderer";
import { addClass } from "../../utils/style";
import { Random } from "./mode";

import "./singleton.css";

export interface SingletonPageOptions extends BaseRendererOptions {}

export class SingletonPage extends BasePage<SingletonPageOptions, SingletonRenderer> implements BaseBuilder {
  private randomContainerNode = document.createElement("div");

  constructor(options: SingletonPageOptions, renderer: SingletonRenderer) {
    super(options, renderer);
  }

  private createButton(text: string, onClick: () => void) {
    const node = document.createElement("button");
    node.textContent = text;
    node.addEventListener("click", onClick, false);
    return node;
  }

  private createRandom(single: boolean) {
    let random: Random;
    if (single) {
      random = Random.create(Math.random());
    } else {
      random = new Random(Math.random());
    }

    const oRandom = document.createElement("p");
    oRandom.textContent = random.id.toString();
    this.randomContainerNode.appendChild(oRandom);
  }

  private createRandomButtonNode(): HTMLElement {
    const node = document.createElement("div");

    const randomNode = this.createButton("创建随机数(单例)", () => this.createRandom(true));
    const randomNode2 = this.createButton("创建随机数(非单例)", () => this.createRandom(false));
    node.append(randomNode, randomNode2);

    return node;
  }

  public build(): HTMLElement {
    const node = document.createElement("div");
    const randomButtonNode = this.createRandomButtonNode();
    node.appendChild(randomButtonNode);
    node.appendChild(this.randomContainerNode);

    addClass(node, "singleton");

    return node;
  }
}
