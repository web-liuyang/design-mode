import { BaseBuilder } from "./base-builder";

export interface BaseRendererOptions {
  element: HTMLElement;
}

export abstract class BaseRenderer<T extends BaseRendererOptions, K extends BaseBuilder> {
  protected options: T;
  protected page: K;
  public node?: HTMLElement;

  constructor(options: T, Page: new (options: T, renderer: BaseRenderer<T, K>) => K) {
    this.options = options;
    this.page = new Page(options, this);
  }

  public update(options: Partial<T>) {
    this.options = Object.assign({}, this.options, options);
    this.options.element.removeChild(this.node!);
    this.render();
  }

  public render() {
    this.node = this.page.build();
    this.options.element.appendChild(this.node);

    return this.node;
  }

  public destroy(): void {
    if (this.node) {
      this.options.element.removeChild(this.node);
      this.node = undefined;
    }
  }
}
