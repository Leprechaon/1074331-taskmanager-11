const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};


const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN: container.prepand(element);
      break;
    case RenderPosition.BEFOREEND: container.append(element);
      break;
  }
};

const replace = (parent, newElement, oldElement) => {
  parent.replaceChild(newElement, oldElement);
};

export {createElement, render, replace, RenderPosition};

