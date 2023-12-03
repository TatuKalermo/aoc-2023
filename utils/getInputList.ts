import { BunFile } from 'bun';

export const getInputList = async (file: BunFile) => {
  return (await file.text()).split('\n');
};
