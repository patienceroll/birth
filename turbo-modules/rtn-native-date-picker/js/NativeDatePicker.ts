import {TurboModuleRegistry, TurboModule} from 'react-native';

export interface Spec extends TurboModule {
  show: (options: {
    themeResId?: number;
    year?: number;
    month?: number;
    day?: number;
  }) => Promise<{
    year: number;
    month: number;
    day: number;
  }>;
}

export default TurboModuleRegistry.get<Spec>('RTNNativeDatePicker');
