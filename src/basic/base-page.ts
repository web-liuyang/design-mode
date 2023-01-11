import { BaseBuilder } from "./base-builder";
import { BaseRenderer, BaseRendererOptions } from "./base-renderer";

export abstract class BasePage<T, K extends BaseRenderer<BaseRendererOptions, BaseBuilder>> {
  protected options: T;
  protected renderer: K;

  constructor(options: T, renderer: K) {
    this.options = options;
    this.renderer = renderer;
  }
}
