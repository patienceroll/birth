import {createContext} from 'react';

export default createContext<{
  list: BirthItem[];
  setList: React.Dispatch<React.SetStateAction<BirthItem[]>>;
}>({
  list: [],
  setList() {},
});
