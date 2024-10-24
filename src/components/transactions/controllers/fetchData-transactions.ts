import { faker } from '@faker-js/faker'

export type TransactionStatusType = 'active' | 'successful' | 'error';

export type Transaction = {
  id: number
  date: string,
  status: TransactionStatusType,
  summStart: number,
  summToSend: number,
  exchangeRate: number,
}

const range = (len: number) => {
  const arr: number[] = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

export const newPerson = (): Transaction => {
  return {
    id:  faker.number.int(40),
    summStart:  faker.number.int({ min: 0, max: 1000}),
    status: faker.helpers.shuffle<TransactionStatusType>([
      'active',
      'successful',
      'error'
    ])[0]!,
    date: faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z' }).toString().slice(0, 15),
    summToSend: faker.number.int({ min: 0, max: 1000}),
    exchangeRate: faker.number.float({ min: 0, max: 100, fractionDigits: 2}),
  }
}

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Transaction[] => {
    const len = lens[depth]!
    return range(len).map((_d): {
      id: number
      date: string,
      status: TransactionStatusType,
      summStart: number,
      summToSend: number,
      exchangeRate: number,
      subRows: Transaction[] | undefined;
    } => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}


const data = makeData(500);
export async function fetchDataDevices(options: {
  pageIndex: number
  pageSize: number
}) {
  // Simulate some network latency

  await new Promise(r => setTimeout(r, 1000))

  return {
    allData: data,
    rows: data.slice(
      options.pageIndex * options.pageSize,
      (options.pageIndex + 1) * options.pageSize
    ),
    pageCount: Math.ceil(data.length / options.pageSize),
    rowCount: data.length,
  }
}
