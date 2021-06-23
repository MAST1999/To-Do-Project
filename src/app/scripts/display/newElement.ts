export const newElement = (
  elementString: string,
  newClass?: string
): HTMLElement => {
  const element = document.createElement(elementString);
  if (newClass) {
    element.className = newClass;
  }
  return element;
};
