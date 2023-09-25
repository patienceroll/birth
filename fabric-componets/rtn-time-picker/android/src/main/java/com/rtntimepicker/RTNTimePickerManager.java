package com.rtntimepicker;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;


import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewManagerDelegate;
import com.facebook.react.viewmanagers.RTNTimePickerManagerInterface;
import com.facebook.react.viewmanagers.RTNTimePickerManagerDelegate;


@ReactModule(name = RTNTimePickerManager.NAME)
public class RTNTimePickerManager extends SimpleViewManager<RTNTimePicker>
        implements RTNTimePickerManagerInterface<RTNTimePicker> {

    private final ViewManagerDelegate<RTNTimePicker> mDelegate;

    static final String NAME = "RTNTimePicker";

    public RTNTimePickerManager(ReactApplicationContext context) {
        mDelegate = new RTNTimePickerManagerDelegate<>(this);
    }

    @Nullable
    @Override
    protected ViewManagerDelegate<RTNTimePicker> getDelegate() {
        return mDelegate;
    }

    @NonNull
    @Override
    public String getName() {
        return RTNTimePickerManager.NAME;
    }

    @NonNull
    @Override
    protected RTNTimePicker createViewInstance(@NonNull ThemedReactContext context) {
        return new RTNTimePicker(context);
    }

}