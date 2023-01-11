import type { BaseRendererOptions } from "../../basic/base-renderer";
import type { BaseBuilder } from "../../basic/base-builder";
import { BasePage } from "../../basic/base-page";
import { BuilderRenderer } from "./renderer";
import { addClass } from "../../utils/style";
import { CarBuilder, CarBuilderDirector } from "./mode";
import { ButtonFactory } from "../factory/mode";

import "./builder.css";

export interface BuilderPageOptions extends BaseRendererOptions {}

export class BuilderPage extends BasePage<BuilderPageOptions, BuilderRenderer> implements BaseBuilder {
  private buttonsNode: HTMLDivElement = document.createElement("div");
  private buttonFactory = new ButtonFactory();
  private resultNode: HTMLDivElement = document.createElement("div");
  private carBuilder: CarBuilder = new CarBuilder();
  private carBuilderDirector: CarBuilderDirector = new CarBuilderDirector();

  constructor(options: BuilderPageOptions, renderer: BuilderRenderer) {
    super(options, renderer);
    addClass(this.buttonsNode, "buttons");
  }

  private createBuilderDirectorNode(): HTMLDivElement {
    const node = document.createElement("div");
    addClass(node, "director-node");
    this.carBuilderDirector.directors.forEach(director => {
      const buttonNode = this.buttonFactory.createButtonNode(`生成${director.text}`, () => {
        this.setResultText(director.builder().toString());
      });

      node.appendChild(buttonNode);
    });

    return node;
  }

  private setResultText(text: string) {
    this.resultNode.textContent = text;
  }

  private createBuilderNode(): HTMLElement {
    const node = document.createElement("div");
    const from = document.createElement("form");

    const submitButton = this.buttonFactory.createButtonNode("生成");
    submitButton.setAttribute("type", "submit");
    addClass(node, "builder-node");
    from.addEventListener("submit", e => {
      e.preventDefault();
      e.stopPropagation();
      const inputs = from.getElementsByTagName("input");
      const brand = inputs.namedItem("brand")?.value;
      const color = inputs.namedItem("color")?.value;
      const tyres = inputs.namedItem("tyres")?.value;
      const seats = inputs.namedItem("seats")?.value;
      if (brand) this.carBuilder.setBrand(brand);
      if (color) this.carBuilder.setColor(color);
      if (tyres) this.carBuilder.setTyres(parseInt(tyres));
      if (seats) this.carBuilder.setSeats(parseInt(seats));
      this.setResultText(this.carBuilder.build().toString());
    });

    from.append(
      this.createInputNode("设置轮胎数量", "tyres"),
      this.createInputNode("设置颜色", "color"),
      this.createInputNode("设置座位数量", "seats"),
      this.createInputNode("设置品牌", "brand"),
      submitButton
    );

    node.appendChild(from);

    return node;
  }

  private createInputNode(label: string, inputname: string): HTMLDivElement {
    const node = document.createElement("div");
    const labelNode = document.createElement("label");
    const inputNode = document.createElement("input");
    inputNode.name = inputname;
    labelNode.textContent = label + ":";
    node.append(labelNode, inputNode);

    return node;
  }

  public build(): HTMLElement {
    const node = document.createElement("div");
    const builderDirectorNode = this.createBuilderDirectorNode();
    const builderNode = this.createBuilderNode();
    addClass(node, "builder");
    node.append(builderDirectorNode, builderNode, this.resultNode);

    return node;
  }
}
