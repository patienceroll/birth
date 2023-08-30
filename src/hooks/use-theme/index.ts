import {useContext} from 'react';

import Theme from 'src/context/theme';

export default function () {
  const theme = useContext(Theme);
  return theme;
}
