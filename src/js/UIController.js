import RequestSender from "./RequestSender";
import TaskStatusHandler from "./TaskStatusHandler";
import DateHandler from "./DateHandler";

export default class UIController {
    static map = new Map();
    static api = new RequestSender();

    constructor() {
        UIController.api = new RequestSender();
        UIController.api.getAllTasks()
            .then(
                result => {
                    this.showAllTickets(result);
                    this.fillMap(result);
                    this.setOpenTaskFunction();
                    this.setCancelModal();
                    this.setModalWinPopupInteraction();
                    this.setEditButtons();
                    this.setApplyChangesButton();
                    this.setAddNewTask();
                    this.setDeleteButtons();
                },
            )
    }

    async setDeleteButtons() {
        const deleteBtns = Array.from(document.getElementsByClassName('delete'));
        deleteBtns.forEach(elem => this.setDeleteButton(elem));
    }

    async setDeleteButton(elem) {
        elem.addEventListener('click', async (event) => {
            event.preventDefault();

            const taskId = elem.parentNode.parentNode.firstChild.id;

            const response = await UIController.api.deleteTaskById(taskId);
            if (response !== null) {
                await this.refreshTaskList(response.tasks);
            }
        })
    }

    async refreshTaskList(tasks) {
        let tasksToRemove = Array.from(document.getElementsByClassName('task-wrapper'));
        tasksToRemove.forEach(elem => {
            elem.parentNode.removeChild(elem);
        });

        await this.showAllTickets(tasks);
        this.setEditButtons();
        this.setDeleteButtons();

        this.setOpenTaskFunction();
    }


    setApplyChangesButton() {
        const acceptBtn = document.getElementById('confirm-task-changes');
        acceptBtn.addEventListener('click', async (event) => {
            const short = document.getElementsByClassName('task-short-content')[0].value;
            const long = document.getElementsByClassName('task-content')[0].value;
            let status = document.getElementsByClassName('status-dd')[0].textContent;
            switch (status) {
                case "Новое": {
                    status = 0;
                    break;
                }
                case "В работе": {
                    status = 1;
                    break;
                }
                case "Завершено": {
                    status = 2;
                    break;
                }
                case "Отклонено": {
                    status = 3;
                    break;
                }
            }

            const date1 = DateHandler.setMMDDYYYYFormat(document.getElementsByClassName('input-start-at')[0].value, "-");
            const date2 = DateHandler.setMMDDYYYYFormat(document.getElementsByClassName('input-estimate')[0].value, "-");

            const selectedId = document.getElementsByClassName('task-short-content')[0].id;
            let requestData = {
                "shortDescription": short,
                "description": long,
                "creationDate": date1,
                "status": status,
                "closingDate": date2,
                "isHidden": false,
                "id": parseInt(selectedId)
            }

            console.log(requestData)
            const result = await UIController.api.saveTask(requestData);
            result.tasks.forEach(task => {
                UIController.map.set(parseInt(task.id), task);
            })
            console.log(result)
            await this.refreshTaskList(result);

            const elemTask = document.getElementById('edit-window');
            elemTask.style.display = 'none';
        });
    }

    setEditButtons() {
        const editBtns = Array.from(document.getElementsByClassName('edit'));
        editBtns.forEach(btn => UIController.setEdit(btn));
    }

    static setEdit(btn) {
        btn.addEventListener('click', (event) => {
            event.preventDefault();

            const elem = btn.parentNode.parentNode.firstChild;
            const taskContent = UIController.map.get(parseInt(elem.id));

            let index = parseInt(taskContent.id);
            const contentModalWindowShortDescr = document.getElementsByClassName('task-short-content')[0];
            contentModalWindowShortDescr.value = UIController.map.get(index).shortDescription;
            contentModalWindowShortDescr.id = taskContent.id;

            const contentModalWindowFullDescr = document.getElementsByClassName('task-content')[0];
            contentModalWindowFullDescr.value = UIController.map.get(index).description;


            const elemTask = document.getElementById('edit-window');
            elemTask.style.display = 'flex';

            const statusElem = document.getElementsByClassName('status-dd ')[0].firstChild;
            const respondedStatus = UIController.map.get(index).status;
            statusElem.textContent = TaskStatusHandler.parseStatus(respondedStatus);

            const statusPicElem = document.getElementsByClassName('status-pic')[0];
            statusPicElem.style.backgroundImage = TaskStatusHandler.getStatusPicURL(respondedStatus);

            const dateStartElem = document.getElementsByClassName('input-start-at')[0];
            dateStartElem.value = DateHandler.getDate(UIController.map.get(index).creationDate, "yyyy-MM-dd", ".")

            const dateEstimateElem = document.getElementsByClassName('input-estimate')[0];
            dateEstimateElem.value = DateHandler.getDate(UIController.map.get(index).closingDate, "yyyy-MM-dd", ".");
        })
    }


    setModalWinPopupInteraction() {
        const ddStatus = document.getElementsByClassName('status-dd dropdown')[0].firstChild;
        const ddOptions = document.getElementsByClassName('dropdown-content')[0].childNodes;

        ddOptions.forEach(option => {
            option.addEventListener('click', (event) => {
                event.preventDefault();
                ddStatus.textContent = option.textContent;

                const statusPicElem = document.getElementsByClassName('status-pic')[0];
                switch (ddStatus.textContent) {
                    case "Новое": {
                        statusPicElem.style.backgroundImage = TaskStatusHandler.getStatusPicURL(0);
                        break;
                    }
                    case "В работе": {
                        statusPicElem.style.backgroundImage = TaskStatusHandler.getStatusPicURL(1);
                        break;
                    }
                    case "Завершено": {
                        statusPicElem.style.backgroundImage = TaskStatusHandler.getStatusPicURL(2);
                        break;
                    }
                    case "Отклонено": {
                        statusPicElem.style.backgroundImage = TaskStatusHandler.getStatusPicURL(3);
                        break;
                    }
                }
            })
        });
    }

    static setShowFullTask(task) {
        task.addEventListener('click', (event) => {
            event.preventDefault();
            let index = parseInt(task.id);
            const contentModalWindowShortDescr = document.getElementsByClassName('task-short-content')[0];
            contentModalWindowShortDescr.value = UIController.map.get(index).shortDescription;
            contentModalWindowShortDescr.id = task.id;

            const contentModalWindowFullDescr = document.getElementsByClassName('task-content')[0];
            contentModalWindowFullDescr.value = UIController.map.get(index).description;


            const elemTask = document.getElementById('edit-window');
            elemTask.style.display = 'flex';

            const statusElem = document.getElementsByClassName('status-dd ')[0].firstChild;
            const respondedStatus = UIController.map.get(index).status;
            statusElem.textContent = TaskStatusHandler.parseStatus(respondedStatus);

            const statusPicElem = document.getElementsByClassName('status-pic')[0];
            statusPicElem.style.backgroundImage = TaskStatusHandler.getStatusPicURL(respondedStatus);

            const dateStartElem = document.getElementsByClassName('input-start-at')[0];
            dateStartElem.value = DateHandler.getDate(UIController.map.get(index).creationDate, "yyyy-MM-dd", ".")

            const dateEstimateElem = document.getElementsByClassName('input-estimate')[0];
            dateEstimateElem.value = DateHandler.getDate(UIController.map.get(index).closingDate, "yyyy-MM-dd", ".");
        })
    }

    setOpenTaskFunction() {
        const clickableAreas = Array.from(document.getElementsByClassName('task'));
        clickableAreas.forEach(elem => UIController.setShowFullTask(elem));
    }

    fillMap(array) {
        array.tasks.forEach(task => UIController.map.set(task.id, task));
    }

    async showAllTickets(array) {
        const widget = document.getElementsByClassName('widget')[0];

        if (array.tasks === undefined || array.tasks == null) {
            for (let taskData of array) {
                const elem = this.buildTask(taskData);
                widget.append(elem);
            }
        } else {
            for (let taskData of array.tasks) {
                const elem = this.buildTask(taskData);
                widget.append(elem);
            }
        }


        return true;
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

    setCancelModal() {
        const cancel = document.getElementById('exit');
        cancel.addEventListener('click', (event) => {
            event.preventDefault();

            const elemTask = document.getElementById('edit-window');
            elemTask.style.display = 'none';

        })
    }

    setAddNewTask() {
        const btn = document.getElementsByClassName('add-new-task')[0];
        console.log(btn)
        btn.addEventListener('click', (event) => {
            event.preventDefault();

            const contentModalWindowShortDescr = document.getElementsByClassName('task-short-content')[0];
            console.log(contentModalWindowShortDescr)
            contentModalWindowShortDescr.value = "";

            let max = 0;
            for (let task of UIController.map.values()) {
                if (task.id >= max) max = task.id;
            }
            max++;

            contentModalWindowShortDescr.id = max;

            const contentModalWindowFullDescr = document.getElementsByClassName('task-content')[0];
            console.log(contentModalWindowFullDescr)
            contentModalWindowFullDescr.value = "";

            const statusElem = document.getElementsByClassName('status-dd');
            const respondedStatus = 0;
            statusElem.textContent = TaskStatusHandler.parseStatus(respondedStatus);

            const statusPicElem = document.getElementsByClassName('status-pic')[0];
            console.log(statusPicElem)
            statusPicElem.style.backgroundImage = TaskStatusHandler.getStatusPicURL(respondedStatus);

            const dateStartElem = document.getElementsByClassName('input-start-at')[0];
            console.log(dateStartElem)
            dateStartElem.value = DateHandler.getTodayDateInString();

            const dateEstimateElem = document.getElementsByClassName('input-estimate')[0];
            dateEstimateElem.value = DateHandler.getTodayDateInString()

            const elemTask = document.getElementById('edit-window');
            elemTask.style.display = 'flex';
        })
    }
}
