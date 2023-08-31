import {createContext} from 'react';

export interface OutSideEvent {
  id: string;
  onOutsidePress: () => void;
  disabled: boolean;
}

export type OutSideContext = {
  eventStore: Map<string, OutSideEvent>;
  creatKey: () => string;
  skipIds: Set<OutSideEvent['id']>;
};

export default createContext<OutSideContext>({
  eventStore: new Map(),
  creatKey() {
    return `${Math.random()}-${+new Date()}`;
  },
  skipIds: new Set(),
});
