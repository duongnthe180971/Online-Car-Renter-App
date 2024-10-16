import { formatDate } from 'date-fns';
export function formatPrice(number) {
    return new Intl.NumberFormat('de-DE').format(number);
}
export function formatDate_vn(date) {
    return formatDate(date, "dd/MM/yyyy");
}
export function formatDate_String(dateString) {
    const date = new Date(dateString); // Convert the string into a Date object
    const day = String(date.getDate()).padStart(2, '0'); // Get the day and pad with 0 if necessary
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
    const year = date.getFullYear(); // Get the full year
    return `${day}/${month}/${year}`;
}
export function getNumOfDay(startDate, endDate) {
    const timeDis = endDate - startDate;
    const numOfDay = Math.round(timeDis / (1000 * 3600 * 24));
    return numOfDay;
}
