import {Date} from 'protocol';

class DateManipulator {
  private twoDigits(value: number): string {
    return (value < 10) ? ('0' + value) : value.toString();
  }

  dateToISOString(date: Date): string {
    const {year} = date;
    const month = this.twoDigits(date.month);
    const day = this.twoDigits(date.day);
    return year + '-' + month + '-' + day + ' 00:00:00';
  }

  isoStringToDate(str: string): Date {
    const [year, month, day] = str
      .substring(0, str.indexOf(' '))
      .trim()
      .split('-')
      .map(Number);
    return { day, month, year };
  }
}

export default new DateManipulator();