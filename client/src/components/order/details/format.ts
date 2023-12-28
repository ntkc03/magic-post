//************************************
// Description: Hàm định dạng lại thời gian theo format "yyyy/mm/dd hh:mm:ss"
//************************************

export function formatDate(date: Date) {
    date = new Date(date);
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('/') +
      ' ' +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  }

function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
}
