import RequestSender from "./RequestSender";
import TaskStatusHandler from "./TaskStatusHandler";
import DateHandler from "./DateHandler";
import InteractionController from "./InteractionController";

export default class UIController {

    constructor() {
        this.interaction = new InteractionController();
        this.api = new RequestSender();
        this.api.getAllTasks()
            .then(
                result => {
                    this.showAllTickets(result);
                    this.interaction.setOpenTaskFunction();
                }
            )
    }


    showAllTickets(tasks) {
        console.log(tasks)
        const widget = document.getElementsByClassName('widget')[0];
        for (let taskData of tasks) {
            const elem = this.buildTask(taskData);
            widget.append(elem);
        }
    }

    buildTask(taskData) {
        let wrapper = document.createElement('div');
        wrapper.classList.add('task-wrapper');

        let task = document.createElement('div');
        task.classList.add('task');
        task.id = taskData.id;


        let short = document.createElement('span');
        short.classList.add('shortDescr');
        short.textContent = taskData.shortDescription;

        task.append(short);

        let date = document.createElement('date');
        date.classList.add('date');

        let status = document.createElement('div');
        status.classList.add('status');
        status.textContent = 'Статус: ' + TaskStatusHandler.parseStatus(taskData.status);

        let opened = document.createElement('div');
        opened.classList.add('opened');
        opened.textContent = 'Открыт: ' + DateHandler.getBeautifulDate(taskData.creationDate);

        let estimate = document.createElement('div');
        estimate.classList.add('estimate');
        estimate.textContent = 'Срок, до: ' + DateHandler.getBeautifulDate(taskData.closingDate);

        date.append(status);
        date.append(opened);
        date.append(estimate);

        let buttons = document.createElement('div');
        buttons.classList.add('buttons');

        let edit = document.createElement('div');
        edit.classList.add('button');
        edit.classList.add('edit');

        let deleteElement = document.createElement('div');
        deleteElement.classList.add('delete');

        buttons.append(edit);
        buttons.append(deleteElement);

        wrapper.append(task);
        wrapper.append(date);
        wrapper.append(buttons);

        return wrapper;
    }
}
