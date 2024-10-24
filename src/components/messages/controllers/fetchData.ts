import { faker } from '@faker-js/faker'

export type MessageTypes = 'no_matches' | 'definite' | 'not_recognized';

export type Message = {
  id: number
  from: number,
  status: MessageTypes,
  message: string,
  user: string,
  random?: string,
  dateCreated?: string,
  dateRead?: string,
}

const range = (len: number) => {
  const arr: number[] = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

export const newPerson = (): Message => {
  return {
    id:  faker.number.int(40),
    from:  faker.number.int(1000),
    status: status = faker.helpers.shuffle<MessageTypes>([
      'no_matches',
      'definite',
      'not_recognized',
    ])[0]!,
    message: faker.lorem.words(5),
    user:  faker.person.firstName(),
    random: "",
    dateCreated: faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z' }).toString().slice(0, 15),
    dateRead: faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z' }).toString().slice(0, 15),
  }
}

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Message[] => {
    const len = lens[depth]!
    return range(len).map((_d): {
      random?: string;
      dateCreated?: string;
      subRows: Message[] | undefined;
      from: number;
      id: number;
      message: string;
      user: string;
      dateRead?: string;
      status:  MessageTypes,
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
export async function fetchData(options: {
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
