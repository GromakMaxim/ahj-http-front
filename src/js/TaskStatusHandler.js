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
                return "url('https://cdn-icons.flaticon.com/png/512/2989/premium/2989113.png?token=exp=1641982834~hmac=7cf1094252eaad18953d1c9949bb5f8d')";
            case 2:
                return "url('https://cdn-icons-png.flaticon.com/512/1442/1442912.png')";
            case 3:
                return "url('https://cdn-icons.flaticon.com/png/512/2767/premium/2767176.png?token=exp=1641983022~hmac=39f4297e7559ab1318c3b80e36ac3a4a')";
            default:
                return "url('https://cdn-icons.flaticon.com/png/512/3112/premium/3112993.png?token=exp=1641983042~hmac=93f94e85e3ae4b1b182dadf835b06b6c')";
        }
    }
}
