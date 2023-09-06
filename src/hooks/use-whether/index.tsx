import {useCallback, useState} from 'react';

export default function (defaultValue?: boolean) {
  const [whether, setWhether] = useState(
    typeof defaultValue === 'boolean' ? defaultValue : false,
  );

  return {
    whether,
    setTrue: useCallback(() => {
      setWhether(true);
    }, []),
    setFalse: useCallback(() => {
      setWhether(false);
    }, []),
  };
}
