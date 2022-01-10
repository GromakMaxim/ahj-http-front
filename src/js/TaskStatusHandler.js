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
}
