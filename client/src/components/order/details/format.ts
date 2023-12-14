
export function formatDate(date: Date) {
    const formattedDate = new Date(date.toString() ?? "").toLocaleString('en-ID', {
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    return formattedDate

}