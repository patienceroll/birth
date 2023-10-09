package com.rtnnativedatepicker;

import androidx.annotation.NonNull;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;

public class NativeDatePickerModule extends NativeDatePickerSpec {

    public static String NAME = "RTNNativeDatePicker";

    NativeDatePickerModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    @Override
    public void show(ReadableMap options) {
    }
}