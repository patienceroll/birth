package com.rtntimepicker;

import androidx.annotation.Nullable;
import android.content.Context;
import android.util.AttributeSet;
import android.graphics.Color;



public class RTNTimePicker extends android.widget.TimePicker {

    public RTNTimePicker(Context context) {
        super(context);
        this.configureComponent();
    }

    public RTNTimePicker(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        this.configureComponent();
    }

    public RTNTimePicker(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        this.configureComponent();
    }

    private void configureComponent() {
        this.setBackgroundColor(Color.RED);
    }
}