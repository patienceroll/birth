import {TurboModuleRegistry, TurboModule} from 'react-native';

export interface Spec extends TurboModule {
  show: (options: {themeResId?: number}) => void;
}

export default TurboModuleRegistry.get<Spec>('RTNNativeDatePicker');
