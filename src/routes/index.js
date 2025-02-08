// src/pages/routes/index.js

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IoniconsFilled from 'react-native-vector-icons/Ionicons';

import Welcome from '../pages/Welcome';
import SignIn from '../pages/SignIn'
import Register from '../pages/Register'
import ForgotPassword from '../pages/ForgotPassword';
import MinhasEstufas from '../pages/Main/MinhasEstufas';
import Config from '../pages/Main/Config';
import CadastrarEstufas from '../pages/Main/CadastrarEstufas';
import EstufaSelecionada from '../pages/Main/MinhasEstufas/Components/EstufaSelecionada';
import HumidityChartPage from '../pages/Main/MinhasEstufas/Components/Charts/Humidity/HumidityChartPage';
import TemperatureChartPage from '../pages/Main/MinhasEstufas/Components/Charts/Temperature/TemperatureChartPage';
import LuminosityChartPage from '../pages/Main/MinhasEstufas/Components/Charts/Luminosity/LuminosityChartPage';
import SoilTemperatureChartPage from '../pages/Main/MinhasEstufas/Components/Charts/SoilTemperature/SoilTemperatureChartPage';
import SoilMoistureChartPage from '../pages/Main/MinhasEstufas/Components/Charts/SoilMoisture/SoilMoistureChartPage';
import SoilpHChartPage from '../pages/Main/MinhasEstufas/Components/Charts/SoilpH/SoilpHChartPage';
import VentilationChartPage from '../pages/Main/MinhasEstufas/Components/Charts/Ventilation/VentilationChartPage';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="EstufaSelecionada" component={EstufaSelecionada} options={{ headerShown: false }} />
    <Stack.Screen name="HumidityChartPage" component={HumidityChartPage} options={{ headerShown: false }} />
    <Stack.Screen name="TemperatureChartPage" component={TemperatureChartPage} options={{ headerShown: false }} />
    <Stack.Screen name="LuminosityChartPage" component={LuminosityChartPage} options={{ headerShown: false }} />
    <Stack.Screen name="SoilTemperatureChartPage" component={SoilTemperatureChartPage} options={{ headerShown: false }} />
    <Stack.Screen name="SoilMoistureChartPage" component={SoilMoistureChartPage} options={{ headerShown: false }} />
    <Stack.Screen name="SoilpHChartPage" component={SoilpHChartPage} options={{ headerShown: false }} />
    <Stack.Screen name="VentilationChartPage" component={VentilationChartPage} options={{ headerShown: false }} />
  </Stack.Navigator>




);

const MainTabs = () => (
  <Tab.Navigator

    screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle: {
        position: 'absolute',
        backgroundColor: '#000',
        borderTopWidth: 0,
        elevation: 0,
        height: 60
      },
    }}




  >
    <Tab.Screen name="MinhasEstufas"
      component={MinhasEstufas}
      options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          if (focused) { return <IoniconsFilled name="leaf" size={30} color="white" /> }
          return <Ionicons name="leaf-outline" size={30} color="white" />
        }
      }} />

    <Tab.Screen name="cadastrarEstufas"
      component={CadastrarEstufas}
      options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          if (focused) { return <IoniconsFilled name="add-circle" size={35} color="white" /> }
          return <Ionicons name="add-circle-outline" size={35} color="white" />
        }
      }} />

    <Tab.Screen name="Config"
      component={Config}
      options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          if (focused) { return <IoniconsFilled name="settings" size={30} color="white" /> }
          return <Ionicons name="settings-outline" size={30} color="white" />
        }

      }} />


  </Tab.Navigator>


);

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
    <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
    <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
  </Stack.Navigator>
  //      <Stack.Screen name="CadastrarEstufas" component={CadastrarEstufas} options={{ headerShown: false }}  />
);
const Routes = () => {
  return (

    <Stack.Navigator>
      <Stack.Screen name="Auth" component={AuthStack} options={{ headerShown: false }} />
      <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen name="MainStack" component={MainStack} options={{ headerShown: false }} />

    </Stack.Navigator>

  );
};

export default Routes;
