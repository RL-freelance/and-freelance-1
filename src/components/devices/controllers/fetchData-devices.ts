import { faker } from '@faker-js/faker'

export type DeviceStatusTypes = 'active' | 'disable';
export type Device = {
  id: number
  name: string,
  status: DeviceStatusTypes,
  lastActivity: string,
  battery: number,
  speed: number,
}

const range = (len: number) => {
  const arr: number[] = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

export const newPerson = (): Device => {
  return {
    id:  faker.number.int(40),
    name: faker.person.fullName(),
    status: faker.helpers.shuffle<DeviceStatusTypes>([
      'active',
      'disable',
    ])[0]!,
    lastActivity: faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z' }).toString().slice(0, 15),
    battery: faker.number.int({ min: 0, max: 100}),
    speed: faker.number.int({ min: 0, max: 1000}),
  }
}

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Device[] => {
    const len = lens[depth]!
    return range(len).map((_d): {
      id: number
      name: string,
      status: DeviceStatusTypes,
      lastActivity: string,
      battery: number,
      speed: number,
      subRows: Device[] | undefined;
    } => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}


const data = makeData(1000);
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
