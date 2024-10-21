import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Login from '../screens/Login';
import LandingScreen from '../screens/Landing';
import Register from '../screens/Register';
import Ride from '../screens/Ride';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {theme} from '../core/theme';
import Translator from '../screens/Translator';
import Home from '../screens/Home';
import OnGoingRide from '../screens/OnGoingRide';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Ride">
        <Stack.Screen
          name="Landing"
          component={LandingScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Ride"
          component={TabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OnGoingRide"
          component={OnGoingRide}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({focused}) => (
            <MaterialIcon
              style={{
                color: focused ? theme.colors.primary : theme.colors.secondary,
              }}
              name="home"
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Trip"
        component={Ride}
        options={{
          headerShown: false,
          title: 'Ride',
          tabBarIcon: ({focused}) => (
            <MaterialIcon
              style={{
                color: focused ? theme.colors.primary : theme.colors.secondary,
              }}
              name="directions-car"
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Translator"
        component={Translator}
        options={{
          headerShown: false,
          title: 'Translator',
          tabBarIcon: ({focused}) => (
            <MaterialIcon
              style={{
                color: focused ? theme.colors.primary : theme.colors.secondary,
              }}
              name="keyboard-voice"
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          title: 'Logout',
          tabBarIcon: ({focused}) => (
            <MaterialIcon
              style={{
                color: focused ? theme.colors.primary : theme.colors.secondary,
              }}
              name="logout"
              size={25}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default Navigation;
