import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";

import HomeSvg from "@assets/home.svg";
import ProfileSvg from "@assets/profile.svg";

import { Home } from "@screens/Home";
import { Profile } from "@screens/Profile";

type AppRoutes = {
  home: undefined;
  exercise: {
    exerciseId: string;
  };
  profile: undefined;
  history: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const { tokens } = gluestackUIConfig;
  const iconSize = tokens.space["6"];

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: tokens.colors.orangeBase,
        tabBarInactiveTintColor: tokens.colors.gray100,
        tabBarStyle: {
          backgroundColor: tokens.colors.background,
          borderTopWidth: 0,
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg fill={color} width={iconSize} height={iconSize} />
          ),
          tabBarLabel: "PRODUTOS",
          tabBarLabelStyle: {
            fontSize: tokens.fontSizes.xs,
          },
        }}
      />
      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg fill={color} width={iconSize} height={iconSize} />
          ),
          tabBarLabel: "PERFIL",
          tabBarLabelStyle: {
            fontSize: tokens.fontSizes.xs,
          },
        }}
      />
    </Navigator>
  );
}
