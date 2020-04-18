import BoardComponent from "./components/board.js";
import FilterComponent from "./components/filter.js";
import LoadMoreButtonComponent from "./components/load-more-button.js";
import SiteMenuComponent from "./components/site-menu.js";
import SortComponent from "./components/sort.js";
import TaskComponent from "./components/task.js";
import TaskEditComponent from "./components/task-edit.js";
import TasksComponent from "./components/tasks.js";
import {generateFilters} from "./mock/filter.js";
import {generateTasks} from "./mock/task.js";
import {render, RenderPosition} from "./utils.js";


const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (taskListElement, task) => {
  const onEditButtonClick = () => {
    taskListElement.replaceChild(TaskEditComponent.getElement(), TaskComponent.getElement());
  };

  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    taskListElement.replaceChild(TaskComponent.getElement(), TaskEditComponent.getElement());
  };

  const taskComponent = new TaskComponent(task);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, onEditButtonClick);

  const taskEditComponent = new TaskEditComponent(task);
  const editForm = taskEditComponent.getElement().querySelector('form');
  editForm.addEventListener(`submit`, onEditFormSubmit);

  render(taskListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderBoard = (boardComponent, tasks) => {
  render(boardComponent.getElement(), new SortComponent().getElement(), RenderPosition.BEFOREEND);
  render(boardComponent.getElement(), new TasksComponent().getElement(). RenderPosition.BEFOREEND);

  const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);

  let showingTaskCount = SHOWING_TASKS_COUNT_ON_START;
  tasks.slice(0, showingTaskCount)
    .foreach((task) => renderTask(taskListElement, task));

  const loadMoreButtonComponent = new LoadMoreButtonComponent().getElement();
  render(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevTaskCount = showingTaskCount;
    showingTaskCount = showingTaskCount + SHOWING_TASKS_COUNT_BY_BUTTON;

    tasks.slice(prevTaskCount, showingTaskCount)
      .foreach((task) => renderTask(taskListElement, task));

    if (showingTaskCount >= tasks.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.remoeElement();
    }
  });


};


const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

render(siteHeaderElement, new SiteMenuComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);
