import {
  Modal,
  ModalProps,
  View,
  StyleSheet,
  Vibration,
  Touchable,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import {forwardRef, useImperativeHandle, useRef} from 'react';

import useWhether from 'src/hooks/use-whether';

export type Ref = Pick<ReturnType<typeof useWhether>, 'setTrue' | 'setFalse'>;

const style = StyleSheet.create({
  touchableWithoutFeedback: {
    flex: 1,
  },
  overlayBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});

export default forwardRef<
  Ref,
  Omit<ModalProps, 'visible'> & {onOvlayClose?: () => void}
>(function (props, ref) {
  const visible = useWhether();

  useImperativeHandle(ref, () => ({
    setFalse: visible.setFalse,
    setTrue: visible.setTrue,
  }));

  return (
    <Modal
      visible={visible.whether}
      transparent
      animationType="fade"
      {...props}>
      <TouchableWithoutFeedback
        style={style.touchableWithoutFeedback}
        onPress={() => {
          if (props.onOvlayClose) {
            props.onOvlayClose();
          } else {
            visible.setFalse();
          }
        }}>
        <View style={style.overlayBg}>
          <TouchableWithoutFeedback>{props.children}</TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
});
