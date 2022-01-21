export default class TaskStatusHandler {
    static parseStatus(statusId) {
        switch (statusId) {
            case 0:
                return 'Новое';
            case 1:
                return 'В работе';
            case 2:
                return 'Завершено';
            case 3:
                return 'Отклонено';
            default:
                return 'не присвоен';
        }
    }

    static getStatusPicURL(statusId){
        switch (statusId) {
            case 0:
                return "url('https://cdn-icons-png.flaticon.com/512/628/628586.png')";
            case 1:
                return "url('https://cdn-icons.flaticon.com/png/512/2989/premium/2989113.png?token=exp=1642760552~hmac=53b95f97a4b7756491747e1d3d06eaab')";
            case 2:
                return "url('https://cdn-icons-png.flaticon.com/512/1442/1442912.png')";
            case 3:
                return "url('https://cdn-icons.flaticon.com/png/512/4303/premium/4303922.png?token=exp=1642758088~hmac=8c9b0b5a009d6f673f9825c91479b105')";
            default:
                return "url('https://cdn-icons.flaticon.com/png/512/3112/premium/3112993.png?token=exp=1642760594~hmac=41e3e23023bde683ede4f2eee28ff9b7')";
        }
    }
}
