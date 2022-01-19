export default class RequestSender {
    //baseUrl = 'https://netology-http.herokuapp.com/';
    baseUrl = 'http://localhost:8888/'

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

    async saveTask(task) {
        const endpoint = '?method=createTicket';
        let response = await fetch(this.baseUrl + endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(task)
        });

        if (response.ok) {
            let result = await response.json();
            console.log(result);
            return result;
        } else {
            return null;
        }
    }
}
