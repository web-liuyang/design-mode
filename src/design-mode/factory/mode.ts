export class ButtonFactory {
  public createButtonNode(text: string, onClick?: (e: MouseEvent) => void): HTMLButtonElement {
    const buttonNode = document.createElement("button");
    buttonNode.textContent = text;
    if (onClick) buttonNode.addEventListener("click", onClick, false);

    return buttonNode;
  }
}
