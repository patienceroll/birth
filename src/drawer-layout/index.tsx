import {
  DrawerToggleButton,
  DrawerNavigationOptions,
  DrawerContentScrollView,
  DrawerContentComponentProps,
  DrawerItem,
} from '@react-navigation/drawer';
import {useContext} from 'react';
import {Image, ImageSourcePropType} from 'react-native';
import {
  CommonActions,
  DrawerActions,
  useLinkBuilder,
} from '@react-navigation/native';

import Theme from 'src/context/theme';
import assets from 'src/assets';
import {RouteName} from 'src/route';

export function HeaderLeft(
  ...arg: Parameters<NonNullable<DrawerNavigationOptions['headerLeft']>>
) {
  const [props] = arg;
  const theme = useContext(Theme);
  if (typeof props.tintColor === 'undefined') {
    props.tintColor = theme.color.color?.toString();
  }
  return <DrawerToggleButton {...props} />;
}

export function DrawerIcon(type: Exclude<RouteName, 'birthModify'>) {
  return function (
    props: Parameters<NonNullable<DrawerNavigationOptions['drawerIcon']>>[0],
  ) {
    const store: Record<
      Exclude<RouteName, 'birthModify'>,
      ImageSourcePropType
    > = {
      birth: assets[1],
      sets: assets[2],
    };

    return (
      <Image
        style={{width: props.size, height: props.size}}
        source={store[type]}
      />
    );
  };
}

export function DrawerContent(props: DrawerContentComponentProps) {
  const {descriptors, state, navigation, ...rest} = props;
  const buildLink = useLinkBuilder();

  const focusedRoute = state.routes[state.index];
  const focusedDescriptor = descriptors[focusedRoute.key];
  const focusedOptions = focusedDescriptor.options;

  const {drawerContentStyle, drawerContentContainerStyle} = focusedOptions;
  const {
    drawerActiveTintColor,
    drawerInactiveTintColor,
    drawerActiveBackgroundColor,
    drawerInactiveBackgroundColor,
  } = focusedOptions;

  return (
    <DrawerContentScrollView
      {...rest}
      contentContainerStyle={drawerContentContainerStyle}
      style={drawerContentStyle}>
      {state.routes.map((route, i) => {
        if (['birthModify'].includes(route.name)) {
          return null;
        }
        const focused = i === state.index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'drawerItemPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!event.defaultPrevented) {
            navigation.dispatch({
              ...(focused
                ? DrawerActions.closeDrawer()
                : CommonActions.navigate({name: route.name, merge: true})),
              target: state.key,
            });
          }
        };

        const {
          title,
          drawerLabel,
          drawerIcon,
          drawerLabelStyle,
          drawerItemStyle,
          drawerAllowFontScaling,
        } = descriptors[route.key].options;

        return (
          <DrawerItem
            key={route.key}
            label={
              drawerLabel !== undefined
                ? drawerLabel
                : title !== undefined
                ? title
                : route.name
            }
            icon={drawerIcon}
            focused={focused}
            activeTintColor={drawerActiveTintColor}
            inactiveTintColor={drawerInactiveTintColor}
            activeBackgroundColor={drawerActiveBackgroundColor}
            inactiveBackgroundColor={drawerInactiveBackgroundColor}
            allowFontScaling={drawerAllowFontScaling}
            labelStyle={drawerLabelStyle}
            style={drawerItemStyle}
            to={buildLink(route.name, route.params)}
            onPress={onPress}
          />
        );
      })}
    </DrawerContentScrollView>
  );
}
