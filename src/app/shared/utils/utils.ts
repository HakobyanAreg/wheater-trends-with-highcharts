import {IRegion} from "../../app.component";

//Region mocked data
export const regions: IRegion[] = [
  {
    id: 1,
    name: 'Berlin',
    location: {
      longitude: 52.5244,
      latitude: 13.4105
    }
  },
  {
    id: 2,
    name: 'Munich',
    location: {
      longitude: 48.1374,
      latitude: 11.5755
    }
  },
  {
    id: 3,
    name: 'Dortmund',
    location: {
      longitude: 51.5149,
      latitude: 7.466
    }
  },
  {
    id: 4,
    name: 'Stuttgart',
    location: {
      longitude: 48.7823,
      latitude: 9.177
    }
  },
];

export function getRandomChartType(): string {
  const types = ['bar', 'line'];
  return types[Math.floor(Math.random() * types.length)];
}

export function getRandomColor(): string {
  const colors = ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c'];
  return colors[Math.floor(Math.random() * colors.length)];
}

export function generateDaysRange(startDate: string, endDate: string): string[] {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const daysArray: string[] = [];

  for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
    daysArray.push(`${date.getDate()} day`);
  }

  return daysArray;
};
