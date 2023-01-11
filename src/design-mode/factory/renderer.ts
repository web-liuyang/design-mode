import type { FactoryPageOptions } from "./page";
import { BaseRenderer } from "../../basic/base-renderer";
import { FactoryPage } from "./page";

export interface FactoryRendererOptions extends FactoryPageOptions {}

export class FactoryRenderer extends BaseRenderer<FactoryRendererOptions, FactoryPage> {
  constructor(options: FactoryRendererOptions) {
    super(options, FactoryPage);
  }
}
