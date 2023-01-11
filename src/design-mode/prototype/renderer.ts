import type { PrototypePageOptions } from "./page";
import { BaseRenderer } from "../../basic/base-renderer";
import { PrototypePage } from "./page";

export interface PrototypeRendererOptions extends PrototypePageOptions {}

export class PrototypeRenderer extends BaseRenderer<PrototypeRendererOptions, PrototypePage> {
  constructor(options: PrototypeRendererOptions) {
    super(options, PrototypePage);
  }
}
