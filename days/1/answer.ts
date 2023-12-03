import { getInputList } from '../../utils/getInputList';

const testInput = [
  'two1nine',
  'eightwothree',
  'abcone2threexyz',
  'xtwone3four',
  '4nineightseven2',
  'zoneight234',
  '7pqrstsixteen',
  'fjeightwo9xtxrmfive5three',
  '1fivefive3pvthree',
  'sqrdkpzeight936oneighth',
  'fsdfsdfoneightfsdfsdf',
  'ninempfnhgdfpkxrzl3hzcgxhtcfctwosixkphztwo',
  'xmoneightxkq512pdlpknhrvhonesevensix',
  'treb7uchet',
  'pctwone5one',
  'qone1bssfvxsdd28qhone',
  'oneighthreeightwo1',
  'meightwoeightfournineqjjxfourvkxsvcbn58',
  'xeightworlggcdsdk18five8one47five',
];
const inputFile = Bun.file('./days/1/input.txt');
const realInput = await getInputList(inputFile);

export function firstTask() {
  let finalResult: number = 0;
  realInput.forEach((string) => {
    let tempArray: number[] = [];
    const splitted = string.split('');
    splitted.forEach((c) => {
      if (!isNaN(Number(c))) {
        tempArray.push(Number(c));
      }
    });
    if (tempArray.length === 0) {
      return;
    } else {
      const result = `${tempArray[0]}${tempArray[tempArray.length - 1]}`;
      finalResult = finalResult + parseInt(result);
    }
  });
  console.log(finalResult);
}

function replaceWithNumbers(s: string) {
  interface Position {
    key: string;
    start: number;
    end: number;
  }

  let result: string = s;
  let tempArray: Position[] = [];

  const numbers: Array<string> = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ];
  numbers.forEach((value, index) => {
    let pos = 0;
    let indexes = [];
    while (result.indexOf(value, pos) != -1) {
      indexes.push(result.indexOf(value, pos));
      pos = result.indexOf(value, pos) + 1;
    }
    if (indexes.length === 1) {
      tempArray.push({
        key: value,
        start: indexes[0],
        end: indexes[0] + value.length - 1,
      });
    }
    if (indexes.length > 1) {
      indexes.forEach((i) => {
        tempArray.push({
          key: value,
          start: i,
          end: i + value.length - 1,
        });
      });
    }
  });
  // console.log(tempArray);

  if (tempArray.length > 0) {
    tempArray.sort((a, b) => a.start - b.start);
    if (tempArray[0].end === tempArray[tempArray.length - 1].start) {
      result = result.replace(
        tempArray[0].key,
        `${numbers.indexOf(tempArray[0].key) + 1}${tempArray[0].key.charAt(
          tempArray[0].key.length - 1
        )}`
      );
      result = result.replaceAll(
        tempArray[tempArray.length - 1].key,
        `${numbers.indexOf(tempArray[tempArray.length - 1].key) + 1}`
      );
    } else {
      result = result.replace(
        tempArray[0].key,
        `${numbers.indexOf(tempArray[0].key) + 1}`
      );
      result = result.replaceAll(
        tempArray[tempArray.length - 1].key,
        `${numbers.indexOf(tempArray[tempArray.length - 1].key) + 1}`
      );
    }
  }
  return result;
}

export function secondTask() {
  let finalResult: number = 0;

  realInput.forEach((string) => {
    const newString = replaceWithNumbers(string);
    console.log(newString);
    let tempArray: number[] = [];
    const splitted = newString.split('');
    splitted.forEach((c) => {
      if (!isNaN(Number(c))) {
        tempArray.push(Number(c));
      }
    });
    if (tempArray.length === 0) {
      return;
    } else {
      const result = `${tempArray[0]}${tempArray[tempArray.length - 1]}`;
      console.log(result);
      finalResult = finalResult + Number(result);
    }
  });
  console.log(finalResult);
}
