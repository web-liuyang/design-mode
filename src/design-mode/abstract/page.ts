import type { BaseRendererOptions } from "../../basic/base-renderer";
import type { BaseBuilder } from "../../basic/base-builder";
import { BasePage } from "../../basic/base-page";
import { AbstractRenderer } from "./renderer";
import { addClass } from "../../utils/style";
import { ButtonFactory, ButtonFactory2 } from "./mode";
import "./abstract.css";

export interface AbstractPageOptions extends BaseRendererOptions {}

export class AbstractPage extends BasePage<AbstractPageOptions, AbstractRenderer> implements BaseBuilder {
  private buttonsNode: HTMLDivElement = document.createElement("div");
  private buttonFactory = new ButtonFactory();
  private buttonFactory2 = new ButtonFactory2();

  constructor(options: AbstractPageOptions, renderer: AbstractRenderer) {
    super(options, renderer);
    addClass(this.buttonsNode, "buttons");
  }

  private createButtonBuilderNode(): HTMLButtonElement {
    const buttonNode = this.buttonFactory.createButtonNode("生成按钮", () => {
      const id = this.buttonsNode.childElementCount + 1;
      let btnNode: HTMLButtonElement;
      if (id % 2 === 0) {
        btnNode = this.buttonFactory.createButtonNode(`${id} 按钮`, () => alert(`click ${id} 按钮`));
      } else {
        btnNode = this.buttonFactory2.createButtonNode(`${id} 按钮`, () => alert(`click abstract ${id} 按钮`));
      }

      this.buttonsNode.appendChild(btnNode);
    });

    return buttonNode;
  }

  private createButtonRemoverNode(): HTMLButtonElement {
    const buttonNode = this.buttonFactory.createButtonNode("删除按钮", () => {
      const lastButtonNode = this.buttonsNode.lastChild;
      if (lastButtonNode) this.buttonsNode.removeChild(lastButtonNode);
    });

    return buttonNode;
  }

  private createActionNode(): HTMLDivElement {
    const actionsNode = document.createElement("div");
    const builderNode = this.createButtonBuilderNode();
    const removerNode = this.createButtonRemoverNode();
    actionsNode.append(builderNode, removerNode);
    addClass(actionsNode, "actions");

    return actionsNode;
  }

  public build(): HTMLElement {
    const node = document.createElement("div");
    const actionNode = this.createActionNode();
    addClass(node, "abstract");
    node.append(actionNode, this.buttonsNode);

    return node;
  }
}
