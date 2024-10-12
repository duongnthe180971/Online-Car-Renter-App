import { formatDate } from 'date-fns';
export function formatPrice(number) {
    return new Intl.NumberFormat('de-DE').format(number);
}
export function formatDate_vn(date) {
    return formatDate(date, "dd/MM/yyyy");
}
export function getNumOfDay(startDate, endDate) {
    const timeDis = endDate - startDate;
    const numOfDay = Math.round(timeDis / (1000 * 3600 * 24));
    return numOfDay;
}
