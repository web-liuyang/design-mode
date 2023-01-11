import type { BaseRendererOptions } from "../../basic/base-renderer";
import type { BaseBuilder } from "../../basic/base-builder";
import { BasePage } from "../../basic/base-page";
import { PrototypeRenderer } from "./renderer";
import { addClass } from "../../utils/style";
import { Userinfo } from "./mode";

import "./prototype.css";

export interface PrototypePageOptions extends BaseRendererOptions {}

export class PrototypePage extends BasePage<PrototypePageOptions, PrototypeRenderer> implements BaseBuilder {
  private readonly userinfo: Userinfo = new Userinfo();
  private readonly userinfos: Userinfo[] = [];
  private readonly previewUserinfoNode = document.createElement("div");
  private readonly previewUserinfosNode = document.createElement("div");

  constructor(options: PrototypePageOptions, renderer: PrototypeRenderer) {
    super(options, renderer);
    this.updatePreview();
  }

  private composePreviewText(userinfo: Userinfo): string {
    const text = `
    名称: ${userinfo.name}
    年龄: ${userinfo.age}
    农行存款: ${userinfo.capital.back.ABC}
    建行存款: ${userinfo.capital.back.CCB}
    是否有房子: ${userinfo.capital.house ? "有" : "无"}
    是否有车子: ${userinfo.capital.car ? "有" : "无"}
    `;

    return text;
  }

  private createBuilderNode(): HTMLElement {
    const node = document.createElement("div");
    const from = document.createElement("form");
    const submitButton = document.createElement("button");
    submitButton.textContent = "生成";
    submitButton.setAttribute("type", "submit");
    addClass(node, "builder-node");
    from.addEventListener("submit", e => {
      e.preventDefault();
      e.stopPropagation();
      this.userinfos.push(this.userinfo.deepClone());
      this.updateUserinfosNode();
    });

    from.append(
      this.createInputNode("名称", "name", "text", e => {
        const target = e.target as HTMLInputElement;
        this.userinfo.setName(target.value);
      }),
      this.createInputNode("年龄", "age", "number", e => {
        const target = e.target as HTMLInputElement;
        const age = Number.isNaN(parseInt(target.value)) ? 0 : parseInt(target.value);
        this.userinfo.setAge(age);
      }),
      this.createInputNode("农行存款", "abc", "number", e => {
        const target = e.target as HTMLInputElement;
        const abc = Number.isNaN(parseInt(target.value)) ? 0 : parseInt(target.value);
        this.userinfo.capital.back.setABC(abc);
      }),
      this.createInputNode("建行存款", "ccb", "number", e => {
        const target = e.target as HTMLInputElement;
        const ccb = Number.isNaN(parseInt(target.value)) ? 0 : parseInt(target.value);
        this.userinfo.capital.back.setCCB(ccb);
      }),
      this.createInputNode("是否有房子", "house", "checkbox", e => {
        const target = e.target as HTMLInputElement;
        this.userinfo.capital.setHouse(target.checked);
      }),
      this.createInputNode("是否有车子", "car", "checkbox", e => {
        const target = e.target as HTMLInputElement;
        this.userinfo.capital.setCar(target.checked);
      }),
      this.previewUserinfoNode,
      submitButton
    );

    node.appendChild(from);

    return node;
  }

  private updatePreview() {
    this.previewUserinfoNode.textContent = `预览: ${this.composePreviewText(this.userinfo)}`;
  }

  private createInputNode(
    label: string,
    inputname: string,
    inputtype: string,
    onInput: (e: Event) => any
  ): HTMLDivElement {
    const node = document.createElement("div");
    const labelNode = document.createElement("label");
    const inputNode = document.createElement("input");
    inputNode.name = inputname;
    inputNode.type = inputtype;
    labelNode.textContent = label + ":";
    node.append(labelNode, inputNode);

    inputNode.addEventListener(
      "input",
      e => {
        onInput(e);
        this.updatePreview();
      },
      false
    );

    return node;
  }

  private updateUserinfosNode() {
    const node = this.previewUserinfosNode;
    node.innerHTML = "";
    this.userinfos.forEach(userinfo => {
      const oUserinfoPreviewNode = document.createElement("div");
      oUserinfoPreviewNode.textContent = this.composePreviewText(userinfo);
      node.appendChild(oUserinfoPreviewNode);
    });
  }

  public build(): HTMLElement {
    const node = document.createElement("div");
    const builderNode = this.createBuilderNode();
    addClass(node, "prototype");
    node.append(builderNode, this.previewUserinfosNode);
    return node;
  }
}
