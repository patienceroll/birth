package com.rtnnativedatepicker;

import androidx.annotation.Nullable;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.model.ReactModuleInfoProvider;
import com.facebook.react.TurboReactPackage;
import com.facebook.react.module.model.ReactModuleInfo;

import java.util.HashMap;
import java.util.Map;

public class NativeDatePickerPackage extends TurboReactPackage {

  @Nullable
  @Override
  public NativeModule getModule(String name, ReactApplicationContext reactContext) {
          if (name.equals(NativeDatePickerModule.NAME)) {
          return new NativeDatePickerModule(reactContext);
      } else {
          return null;
      }
  }

  @Override
  public ReactModuleInfoProvider getReactModuleInfoProvider() {
           return () -> {
          final Map<String, ReactModuleInfo> moduleInfos = new HashMap<>();
          moduleInfos.put(
                  NativeDatePickerModule.NAME,
                  new ReactModuleInfo(
                          NativeDatePickerModule.NAME,
                          NativeDatePickerModule.NAME,
                          false, // canOverrideExistingModule
                          false, // needsEagerInit
                          true, // hasConstants
                          false, // isCxxModule
                          true // isTurboModule
          ));
          return moduleInfos;
      };
  }
}