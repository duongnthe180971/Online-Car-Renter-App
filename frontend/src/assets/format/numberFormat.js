import { parse } from 'date-fns';
export function formatPrice(number) {
    return new Intl.NumberFormat('de-DE').format(number);
}
export function getNumOfDay(date1, date2, format = "dd/MM/yyyy") {
    const startDate = parse(date1, format, new Date());
    const endDate = parse(date2, format, new Date());
    const timeDis = endDate - startDate;
    const numOfDay = timeDis / (1000 * 3600 * 24);
    return numOfDay;
}
