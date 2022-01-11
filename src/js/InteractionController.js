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


    setEditButtons() {
        const editBtns = Array.from(document.getElementsByClassName('edit'));
        editBtns.forEach(btn => InteractionController.setEdit(btn));
    }

    setDeleteButtons() {

    }

    setCloseTaskFunction() {

    }
}
