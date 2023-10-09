package com.rtnnativedatepicker;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;


import android.app.DatePickerDialog;


import java.util.Calendar;
import java.util.Objects;
import java.util.Optional;

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
    public void show(ReadableMap options, Promise promise){
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.N) {
            Calendar calendar = Calendar.getInstance();

            int themeResId = options.getInt("themeResId");

            int year = calendar.get(Calendar.YEAR);
            int month = calendar.get(Calendar.MONTH);
            int day = calendar.get(Calendar.DAY_OF_MONTH);
            if(options.hasKey("year")) year = options.getInt("year");
            if(options.hasKey("month")) month = options.getInt("month");
            if(options.hasKey("day")) day = options.getInt("day");

            DatePickerDialog dialog = new DatePickerDialog(Objects.requireNonNull(getCurrentActivity()),themeResId,(view, sYear, sMonth, dayOfMonth) -> {
                WritableMap solve = Arguments.createMap();
                solve.putInt("year",sYear);
                solve.putInt("month",sMonth);
                solve.putInt("day",dayOfMonth);
                promise.resolve(solve);
            },year - 20,month,day );


            
            dialog.show();
        }
    }
}