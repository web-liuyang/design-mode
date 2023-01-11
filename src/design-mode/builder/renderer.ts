import type { BuilderPageOptions } from "./page";
import { BaseRenderer } from "../../basic/base-renderer";
import { BuilderPage } from "./page";

export interface BuilderRendererOptions extends BuilderPageOptions {}

export class BuilderRenderer extends BaseRenderer<BuilderRendererOptions, BuilderPage> {
  constructor(options: BuilderRendererOptions) {
    super(options, BuilderPage);
  }
}
