import { format, compareAsc } from 'date-fns'

export default class DateHandler {
    static getBeautifulDate(str) {
        let date = new Date(str.split(".")[2], str.split(".")[1], str.split(".")[0]);
        return format(date, 'dd.MM.yyyy');
    }

}
