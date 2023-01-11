import type { BaseRendererOptions } from "../../basic/base-renderer";
import type { BaseBuilder } from "../../basic/base-builder";
import { BasePage } from "../../basic/base-page";
import { FactoryRenderer } from "./renderer";
import { addClass } from "../../utils/style";
import { ButtonFactory } from "./mode";
import "./factory.css";

export interface FactoryPageOptions extends BaseRendererOptions {}

export class FactoryPage extends BasePage<FactoryPageOptions, FactoryRenderer> implements BaseBuilder {
  private buttonsNode: HTMLDivElement = document.createElement("div");
  private buttonFactory = new ButtonFactory();

  constructor(options: FactoryPageOptions, renderer: FactoryRenderer) {
    super(options, renderer);
    addClass(this.buttonsNode, "buttons");
  }

  private createButtonBuilderNode(): HTMLButtonElement {
    const buttonNode = this.buttonFactory.createButtonNode("生成按钮", () => {
      const id = this.buttonsNode.childElementCount + 1;
      const btnNode = this.buttonFactory.createButtonNode(`${id} 按钮`, () => alert(`click ${id} 按钮`));
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

  private createButtonsNode(): HTMLDivElement {
    return this.buttonsNode;
  }

  public build(): HTMLElement {
    const node = document.createElement("div");
    const actionNode = this.createActionNode();
    addClass(node, "factory");
    node.append(actionNode, this.buttonsNode);

    return node;
  }
}
