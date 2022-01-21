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
                return "url('https://3.downloader.disk.yandex.ru/preview/6a6bd35f14f9e8189d46ec50a5b1a5ff420ef130e3f8a610d9a32c19df40bfd2/inf/A8pHxymjJwACo0UF2OVECKb4dhfJa64PpusHBfuydsb24OX0dKjBZDgcdm-_DqPgWK8XWds6C87K2F4PKVKuBg%3D%3D?uid=592690491&filename=new.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=592690491&tknv=v2&size=1920x880')";
            case 1:
                return "url('https://4.downloader.disk.yandex.ru/preview/61530dd44aeb1f6b8cf72c538378195d2297ede32b3c65fe0c96f75855e33987/inf/r2Br4roYcwatumDY4GNqDhho9Gmo-PrDlbaCQcfkYwNQwMp_AlZxNtYAdR3gGZZiKwHc5pezqAOIfNGaEjCd8A%3D%3D?uid=592690491&filename=worker.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=592690491&tknv=v2&size=1920x880')";
            case 2:
                return "url('https://downloader.disk.yandex.ru/preview/d53dfb2e3a41ab269e484781485c0d50989f11bc9f7ecea33cb01fb64f5d274e/61eabb46/WmssS3gHKhw3xafr8QnK_8IoblAHGCUgReolG_snYbIL6YeX98OHHAZkQaKfeDZmJ7Sd5o18SDB72ij-lqeaRw%3D%3D?uid=0&filename=done.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048')";
            case 3:
                return "url('https://3.downloader.disk.yandex.ru/preview/f9f21918af51a6bd6a23b064d5e30da0fe86d35920bbb6e31f260141e4bddad2/inf/y8MQTr5llNHKNCxD7V3_6tCvjDmBZ2h8hoEumWwRXW2Pm95vTQNl-wHHc4VkIs3KCla_20KhPXMqULN2VVwe8w%3D%3D?uid=592690491&filename=decline.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=592690491&tknv=v2&size=1920x880')";
            default:
                return "url('https://4.downloader.disk.yandex.ru/preview/60a20de41e21c428ed131a3888c1454357d52095e6bb60930a846b054d0b2386/inf/nm5pQw2Tk4guhnpwa6hYuCBTv0wp2HbH-i6AUyQLeWAGkXMLwpE8hd7EKFVmDo_TCuokrmhX4rJhr7S0Er0lWQ%3D%3D?uid=592690491&filename=unknown.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=592690491&tknv=v2&size=1920x880')";
        }
    }
}
