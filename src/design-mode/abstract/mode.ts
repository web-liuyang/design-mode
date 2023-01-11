abstract class AbstractButtonFactory {
  public createButtonNode(text: string, onClick: (e: MouseEvent) => void): HTMLButtonElement {
    const buttonNode = document.createElement("button");
    buttonNode.textContent = text + "-Abstract";
    buttonNode.addEventListener("click", onClick, false);

    return buttonNode;
  }
}

export class ButtonFactory extends AbstractButtonFactory {
  public override createButtonNode(text: string, onClick: (e: MouseEvent) => void): HTMLButtonElement {
    const buttonNode = document.createElement("button");
    buttonNode.textContent = text;
    buttonNode.addEventListener("click", onClick, false);

    return buttonNode;
  }
}

export class ButtonFactory2 extends AbstractButtonFactory {}
