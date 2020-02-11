export default function formatDate(date: string) {
    const newDate = new Date(date);
    const options = {year: 'numeric', month: 'numeric', day: 'numeric' };
    const formattedDate = {
        date: newDate.toLocaleString('iw-IL', options),
        weekday: newDate.toLocaleString('iw-IL', {weekday: 'long'}),
        hour: newDate.toLocaleString('iw-IL', {hour: '2-digit', minute: '2-digit'})
    }
    return formattedDate;
}