import {useContext} from 'react';

import Birth from 'src/context/birth';

export default function () {
  const birth = useContext(Birth);
  return birth;
}
