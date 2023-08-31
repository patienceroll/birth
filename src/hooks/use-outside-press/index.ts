import {useContext, useState, useEffect, useCallback} from 'react';

import OutSideContext from 'src/context/outside-press';

export default function (callback: () => void) {
  const outSideContext = useContext(OutSideContext);

  const [key] = useState(() => outSideContext.creatKey());
  const [disabled, setDisable] = useState(false);

  const onTouchStart = useCallback(() => {
    if (!outSideContext.skipIds.has(key)) {
      outSideContext.skipIds.add(key);
    }
  }, [key, outSideContext.skipIds]);

  const onTouchEnd = useCallback(() => {
    outSideContext.skipIds.delete(key);
  }, [key, outSideContext.skipIds]);

  useEffect(() => {
    outSideContext.eventStore.set(key, {
      id: key,
      onOutsidePress: callback,
      disabled,
    });

    return () => {
      outSideContext.eventStore.delete(key);
      outSideContext.skipIds.delete(key);
    };
  }, [
    callback,
    disabled,
    key,
    outSideContext.eventStore,
    outSideContext.skipIds,
  ]);

  return {
    setDisable,
    onTouchStart,
    onTouchEnd
  };
}
