const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};


const render = (container, component, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN: container.prepand(component.getElement());
      break;
    case RenderPosition.BEFOREEND: container.append(component.getElement());
      break;
  }
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

const replace = (parent, newElement, oldElement) => {
  parent.replaceChild(newElement, oldElement);
};

export {createElement, remove, render, replace, RenderPosition};

