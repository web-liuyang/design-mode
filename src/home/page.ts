import type { Constructor } from "type-fest";
import type { BaseRenderer, BaseRendererOptions } from "../basic/base-renderer";
import type { BaseBuilder } from "../basic/base-builder";
import { addClass } from "../utils/style";
import { BasePage } from "../basic/base-page";
import { HomeRenderer } from "./renderer";
import { FactoryRenderer } from "../design-mode/factory/renderer";
import { AbstractRenderer } from "../design-mode/abstract/renderer";

import "./home.css";
import { BuilderRenderer } from "../design-mode/builder/renderer";

export interface HomeOptionTab {
  title: string;
  children: DesignMode[];
}

export enum DESIGN_MODE {
  factory,
  abstract,
  builder,
  prototype,
  singleton,
  adapter,
  bridge,
  composite,
  decorator,
  facade,
  flyweight,
  proxy,
  chain,
  command,
  iterator,
  mediator,
  memento,
  observer,
  state,
  strategy,
  template,
  visitor,
}

type DesignModeKey = keyof typeof DESIGN_MODE;

export type DesignMode = {
  id: DESIGN_MODE;
  key: DesignModeKey;
  text: string;
  renderer: Constructor<BaseRenderer<any, any>, [BaseRendererOptions]>;
};

const designModes: Record<DesignModeKey, DesignMode> = {
  factory: {
    id: DESIGN_MODE.factory,
    key: "factory",
    text: "工厂模式",
    renderer: FactoryRenderer,
  },
  abstract: {
    id: DESIGN_MODE.abstract,
    key: "abstract",
    text: "抽象工厂模式",
    renderer: AbstractRenderer,
  },
  builder: {
    id: DESIGN_MODE.builder,
    key: "builder",
    text: "生成器模式",
    renderer: BuilderRenderer,
  },
  prototype: {
    id: DESIGN_MODE.prototype,
    key: "prototype",
    text: "原型模式",
    renderer: FactoryRenderer,
  },
  singleton: {
    id: DESIGN_MODE.singleton,
    key: "singleton",
    text: "单例模式",
    renderer: FactoryRenderer,
  },
  adapter: {
    id: DESIGN_MODE.adapter,
    key: "adapter",
    text: "适配器模式",
    renderer: FactoryRenderer,
  },
  bridge: {
    id: DESIGN_MODE.bridge,
    key: "bridge",
    text: "桥接模式",
    renderer: FactoryRenderer,
  },
  composite: {
    id: DESIGN_MODE.composite,
    key: "composite",
    text: "组合模式",
    renderer: FactoryRenderer,
  },
  decorator: {
    id: DESIGN_MODE.decorator,
    key: "decorator",
    text: "装饰模式",
    renderer: FactoryRenderer,
  },
  facade: {
    id: DESIGN_MODE.facade,
    key: "facade",
    text: "外观模式",
    renderer: FactoryRenderer,
  },
  flyweight: {
    id: DESIGN_MODE.flyweight,
    key: "flyweight",
    text: "享元模式",
    renderer: FactoryRenderer,
  },
  proxy: {
    id: DESIGN_MODE.proxy,
    key: "proxy",
    text: "代理模式",
    renderer: FactoryRenderer,
  },
  chain: {
    id: DESIGN_MODE.chain,
    key: "chain",
    text: "责任链模式",
    renderer: FactoryRenderer,
  },
  command: {
    id: DESIGN_MODE.command,
    key: "command",
    text: "命令模式",
    renderer: FactoryRenderer,
  },
  iterator: {
    id: DESIGN_MODE.iterator,
    key: "iterator",
    text: "迭代器模式",
    renderer: FactoryRenderer,
  },
  mediator: {
    id: DESIGN_MODE.mediator,
    key: "mediator",
    text: "中介者模式",
    renderer: FactoryRenderer,
  },
  memento: {
    id: DESIGN_MODE.memento,
    key: "memento",
    text: "备忘录模式",
    renderer: FactoryRenderer,
  },
  observer: {
    id: DESIGN_MODE.observer,
    key: "observer",
    text: "观察者模式",
    renderer: FactoryRenderer,
  },
  state: {
    id: DESIGN_MODE.state,
    key: "state",
    text: "状态模式",
    renderer: FactoryRenderer,
  },
  strategy: {
    id: DESIGN_MODE.strategy,
    key: "strategy",
    text: "策略模式",
    renderer: FactoryRenderer,
  },
  template: {
    id: DESIGN_MODE.template,
    key: "template",
    text: "模板方法模式",
    renderer: FactoryRenderer,
  },
  visitor: {
    id: DESIGN_MODE.visitor,
    key: "visitor",
    text: "访问者模式",
    renderer: FactoryRenderer,
  },
};

const tabs: HomeOptionTab[] = [
  {
    title: "创造型模式",
    children: [
      designModes.factory,
      designModes.abstract,
      designModes.builder,
      designModes.prototype,
      designModes.singleton,
    ],
  },
  {
    title: "结构型模式",
    children: [
      designModes.adapter,
      designModes.bridge,
      designModes.composite,
      designModes.decorator,
      designModes.facade,
      designModes.flyweight,
      designModes.proxy,
    ],
  },
  {
    title: "行为模式",
    children: [
      designModes.chain,
      designModes.command,
      designModes.iterator,
      designModes.mediator,
      designModes.memento,
      designModes.observer,
      designModes.state,
      designModes.strategy,
      designModes.template,
      designModes.visitor,
    ],
  },
];

export interface HomePageOption extends BaseRendererOptions {
  onClickDesignMode: (designMode: DesignMode) => void;
}

export class HomePage extends BasePage<HomePageOption, HomeRenderer> implements BaseBuilder {
  constructor(options: HomePageOption, renderer: HomeRenderer) {
    super(options, renderer);
  }

  private createTabTitleNode(text: string) {
    const node = document.createElement("div");
    addClass(node, "tab-item__title");
    node.textContent = text;
    return node;
  }

  private createTabViewNode(tabViews: DesignMode[]): HTMLDivElement {
    const node = document.createElement("div");
    addClass(node, "tabview");

    for (const tabView of tabViews) {
      const tabViewItemNode = this.createTabViewItemNode(tabView);
      node.appendChild(tabViewItemNode);
    }

    return node;
  }

  private createTabViewItemNode(designMode: DesignMode) {
    const node = document.createElement("div");
    addClass(node, "tabview-item");
    node.textContent = designMode.text;
    node.addEventListener("click", () => this.options.onClickDesignMode(designMode), false);

    return node;
  }

  public build(): HTMLDivElement {
    const node = document.createElement("div");
    addClass(node, "home");
    for (const tab of tabs) {
      const tabNode = document.createElement("div");
      addClass(tabNode, "tab-item");
      const tabTitleNode = this.createTabTitleNode(tab.title);
      const tabViewNode = this.createTabViewNode(tab.children);
      tabNode.append(tabTitleNode, tabViewNode);
      node.appendChild(tabNode);
    }
    return node;
  }
}
