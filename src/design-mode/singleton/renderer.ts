import type { SingletonPageOptions } from "./page";
import { BaseRenderer } from "../../basic/base-renderer";
import { SingletonPage } from "./page";

export interface SingletonRendererOptions extends SingletonPageOptions {}

export class SingletonRenderer extends BaseRenderer<SingletonRendererOptions, SingletonPage> {
  constructor(options: SingletonRendererOptions) {
    super(options, SingletonPage);
  }
}
