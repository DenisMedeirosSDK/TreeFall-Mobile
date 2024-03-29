import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MapSearch from './screens/MapSearch';
import TreeFallData from './screens/CreateTreeFall/TreeFallData';
import SelectMapPosition from './screens/CreateTreeFall/SelectMapPosition';
import TreeFallDetails from './screens/TreeFallDetails';
import Header from './components/Header';

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="mapSearch" component={MapSearch} />
        <Screen
          name="SelectMapPosition"
          component={SelectMapPosition}
          options={{
            headerShown: true,
            header: () => <Header showCancel title="Selecione no mapa" />,
          }}
        />
        <Screen
          name="treeFallData"
          component={TreeFallData}
          options={{ headerShown: true, title: 'Informe os dados' }}
        />
        <Screen
          name="TreeFallDetails"
          component={TreeFallDetails}
          options={{
            headerShown: true,
            header: () => <Header showCancel={false} title="Detalhes" />,
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}
