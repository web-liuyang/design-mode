import type { HomePageOption } from "./page";
import { BaseRenderer } from "../basic/base-renderer";
import { HomePage } from "./page";

interface HomeRendererOptions extends HomePageOption {}

export class HomeRenderer extends BaseRenderer<HomeRendererOptions, HomePage> {
  constructor(options: HomeRendererOptions) {
    super(options, HomePage);
  }
}
