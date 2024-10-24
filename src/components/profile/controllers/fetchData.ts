import { faker } from '@faker-js/faker'

export type Profile = {
  id: number
  date: string,
  information: string,
  summ: number,
  balance: number,
}

const range = (len: number) => {
  const arr: number[] = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

export const newPerson = (): Profile => {
  return {
    id:  faker.number.int(40),
    date: faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z' }).toString().slice(0, 15),
    information: faker.lorem.words(5),
    summ:  faker.number.int({ min: -1000, max: 1000}),
    balance: faker.number.int({ min: -1000, max: 1000}),
  }
}

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Profile[] => {
    const len = lens[depth]!
    return range(len).map((_d): {
      id: number
      date: string,
      information: string,
      summ: number,
      balance: number,
      subRows: Profile[] | undefined;
    } => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}


const data = makeData(10000);
export async function fetchDataProfile(options: {
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
