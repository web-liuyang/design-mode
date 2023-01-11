import type { LayoutPageOptions } from "./page";
import { BaseRenderer } from "../basic/base-renderer";
import { LayoutPage } from "./page";

interface LayoutRendererOptions extends LayoutPageOptions {}

export class LayoutRenderer extends BaseRenderer<LayoutRendererOptions, LayoutPage> {
  constructor(options: LayoutRendererOptions) {
    super(options, LayoutPage);
  }
}
