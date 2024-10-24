import { faker } from '@faker-js/faker'

export type BankDetailsStatusTypes = 'active' | 'disable' | 'block';

export type BankDetails = {
  id: number
  name: string,
  phone: string,
  countNumber: number,
  status: BankDetailsStatusTypes,
  balance: number,
  limitCount: number,
  dellCount: number,
}

export  const defaultData: BankDetails = {
  id: 1,
  name:  faker.name.fullName(),
  phone: faker.phone.number(),
  countNumber: faker.number.int({ min: 0, max: 100 }),
  status: "active",
  balance: faker.number.int({ min: 0, max: 1000 }),
  limitCount: faker.number.int({ min: 0, max: 1000 }),
  dellCount: faker.number.int({ min: 0, max: 100 }),
}

const range = (len: number) => {
  const arr: number[] = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

export const newData = (): BankDetails => {
  return {
    id:  faker.number.int(40),
    name: faker.person.fullName(),
    phone: faker.phone.number(),
    countNumber: faker.number.int(1000),
    status: faker.helpers.shuffle<BankDetailsStatusTypes>([
      'active',
      'disable',
      'block',
    ])[0]!,
    balance: faker.number.int({ min: 0, max: 100000}),
    limitCount:  faker.number.int({ min: 0, max: 100000}),
    dellCount: faker.number.int({ min: 0, max: 100 }),
  }
}

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): BankDetails[] => {
    const len = lens[depth]!
    return range(len).map((_d): {
      id: number
      name: string,
      phone: string,
      countNumber: number,
      status: BankDetailsStatusTypes,
      balance: number,
      limitCount: number,
      dellCount: number,
      subRows: BankDetails[] | undefined;
    } => {
      return {
        ...newData(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}


const data = makeData(10000);
export async function fetchDataDetails_list(options: {
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
