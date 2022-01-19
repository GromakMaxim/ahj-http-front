import {format} from 'date-fns'

export default class DateHandler {
    static getBeautifulDate(str) {
        if (str === undefined || str.length === 0) return format(new Date(2000, 1, 1), 'dd.MM.yyyy');
        let date = new Date(str.split(".")[2], str.split(".")[1], str.split(".")[0]);
        return format(date, 'dd.MM.yyyy');
    }

    static getDate(str, style, delimiter) {
        let date = DateHandler.splitStr(str, delimiter);
        return format(date, style);
    }

    static splitStr(str, delimiter) {
        return new Date(str.split(delimiter)[2], str.split(delimiter)[1], str.split(delimiter)[0]);
    }

    static setMMDDYYYYFormat(str, delimiter) {
        str = str.split(delimiter)[2]+"."+str.split(delimiter)[1] +"." + str.split(delimiter)[0];
        return str;
    }

}
