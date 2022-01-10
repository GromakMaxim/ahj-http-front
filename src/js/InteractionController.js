export default class InteractionController {
    constructor() {
        this.setEditButtons();
        this.setDeleteButtons();
        this.setOpenTaskFunction();
    }

    static setEdit(btn) {
        btn.addEventListener('click', (event) => {
            event.preventDefault();


        })
    }

    static setShowFullTask(task){
        task.addEventListener('click', (event) => {
            event.preventDefault();

            console.log('clicked! ' + task.id)
        })
    }

    setEditButtons() {
        const editBtns = Array.from(document.getElementsByClassName('edit'));
        editBtns.forEach(btn => InteractionController.setEdit(btn));
    }

    setDeleteButtons() {

    }

    setOpenTaskFunction() {
        const clickableAreas = Array.from(document.getElementsByClassName('task'));
        clickableAreas.forEach(elem=>InteractionController.setShowFullTask(elem));
    }

    setCloseTaskFunction() {

    }
}
