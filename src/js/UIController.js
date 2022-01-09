import RequestSender from "./RequestSender";

export default class UIController {

    constructor() {
        this.api = new RequestSender();
    }

    showAllTasks() {
        this.api.getAllTasks().then(
            result => console.log(result));
    }
}
