import type { BaseRendererOptions } from "../basic/base-renderer";
import type { BaseBuilder } from "../basic/base-builder";
import { BasePage } from "../basic/base-page";
import { BaseRenderer } from "../basic/base-renderer";
import { LayoutRenderer } from "./renderer";
import { HomeRenderer } from "../home/home";
import { DesignMode } from "../home/page";
import { addClass } from "../utils/style";
import { codicon } from "../utils/icon";
import "./layout.css";
import { SingletonRenderer } from "../design-mode/singleton/renderer";

export interface LayoutPageOptions extends BaseRendererOptions {}

export class LayoutPage extends BasePage<LayoutPageOptions, LayoutRenderer> implements BaseBuilder {
  private mountNode: HTMLElement = document.createElement("div");
  private initTitle: string = "设计模式";
  // private initRenderer: BaseRenderer<any, any> = new HomeRenderer({
  //   element: this.mountNode,
  //   onClickDesignMode: this.handleClickDesignMode.bind(this),
  // });
  private initRenderer: BaseRenderer<any, any> = new SingletonRenderer({
    element: this.mountNode,
  });

  private currentTitle: string = this.initTitle;
  private currentRenderer: BaseRenderer<any, any> = this.initRenderer;

  constructor(options: LayoutPageOptions, renderer: LayoutRenderer) {
    super(options, renderer);
    addClass(this.mountNode, "mount-node");
    this.currentRenderer.render();
  }

  private handleClickBack() {
    this.currentRenderer.destroy();
    this.currentTitle = this.initTitle;
    this.currentRenderer = this.initRenderer;
    this.currentRenderer.render();
    this.renderer.update({});
  }

  private createBackNode(): HTMLSpanElement {
    const node = codicon("arrow-left");
    node.addEventListener("click", this.handleClickBack.bind(this), false);
    return node;
  }

  private createLayoutTitleNode() {
    const node = document.createElement("div");
    const titleNode = document.createElement("span");
    addClass(node, "layout-title");
    titleNode.textContent = this.currentTitle;

    if (this.initTitle != this.currentTitle) node.appendChild(this.createBackNode());

    node.appendChild(titleNode);

    return node;
  }

  private handleClickDesignMode(designMode: DesignMode): void {
    this.currentRenderer.destroy();
    this.currentTitle = designMode.text;
    this.currentRenderer = new designMode.renderer({ element: this.mountNode });
    this.currentRenderer.render();
    this.renderer.update({});
  }

  private createLayoutContentNode(): HTMLElement {
    const node = document.createElement("div");
    addClass(node, "layout-content");
    node.appendChild(this.mountNode);
    return node;
  }

  public build(): HTMLElement {
    const node = document.createElement("div");
    const titleNode = this.createLayoutTitleNode();
    const contentNode = this.createLayoutContentNode();
    addClass(node, "layout");
    node.append(titleNode, contentNode);
    return node;
  }
}
