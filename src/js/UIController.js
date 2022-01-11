import RequestSender from "./RequestSender";
import TaskStatusHandler from "./TaskStatusHandler";
import DateHandler from "./DateHandler";

export default class UIController {
    static map = new Map();
    constructor() {
        this.api = new RequestSender();
        this.api.getAllTasks()
            .then(
                result => {
                    this.showAllTickets(result);
                    this.fillMap(result);
                    this.setOpenTaskFunction();
                    this.setCancelModal();
                }
            )
    }

    setOpenTaskFunction() {
        const clickableAreas = Array.from(document.getElementsByClassName('task'));
        clickableAreas.forEach(elem => UIController.setShowFullTask(elem));
    }

    fillMap(tasks) {
        tasks.forEach(task => UIController.map.set(task.id, task));
    }

    static setShowFullTask(task) {
        task.addEventListener('click', (event) => {
            event.preventDefault();
            let index = +task.id;

            const contentModalWindowShortDescr = document.getElementsByClassName('task-short-content')[0];
            contentModalWindowShortDescr.value = UIController.map.get(index).shortDescription;

            const contentModalWindowFullDescr = document.getElementsByClassName('task-content')[0];
            contentModalWindowFullDescr.value = UIController.map.get(index).description;


            const elemTask = document.getElementById('edit-window');
            elemTask.style.display = 'flex';

            const statusElem = document.getElementsByClassName('status-dd ')[0].firstChild;
            const respondedStatus = UIController.map.get(index).status
            statusElem.textContent = TaskStatusHandler.parseStatus(respondedStatus);

        })
    }

    showAllTickets(tasks) {
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

    setCancelModal(){
        const cancel = document.getElementById('exit');
        cancel.addEventListener('click', (event)=>{
            event.preventDefault();

            const elemTask = document.getElementById('edit-window');
            elemTask.style.display = 'none';

        })
    }
}
