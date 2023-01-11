import type { AbstractPageOptions } from "./page";
import { BaseRenderer } from "../../basic/base-renderer";
import { AbstractPage } from "./page";

interface AbstractRendererOptions extends AbstractPageOptions {}

export class AbstractRenderer extends BaseRenderer<AbstractRendererOptions, AbstractPage> {
  constructor(options: AbstractRendererOptions) {
    super(options, AbstractPage);
  }
}
