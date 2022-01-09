export default class RequestSender {
    baseUrl = 'https://netology-http.herokuapp.com/';

    async getTaskById(id) {
        const endpoint = '?method=ticketById&id=';
        let response = await fetch(this.baseUrl + endpoint + id);
        if (response.ok) {
            return await response.json();
        } else {
            return null;
        }
    }

    async getAllTasks() {
        const endpoint = '?method=allTickets';
        let response = await fetch(this.baseUrl + endpoint);
        if (response.ok) {
            return await response.json();
        } else {
            return null;
        }
    }
}
