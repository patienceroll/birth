import {TurboModuleRegistry, TurboModule} from 'react-native';

export interface Spec extends TurboModule {
  show: () => void;
}

export default TurboModuleRegistry.get<Spec>('RTNNativeDatePicker');
