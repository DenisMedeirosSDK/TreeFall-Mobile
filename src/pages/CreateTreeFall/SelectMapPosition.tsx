import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, Alert } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { MapEvent, Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import mapMarkerImg from '../../images/arvore.png';

export default function SelectMapPosition() {
  const navigation = useNavigation();
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [initialRegion, setInitialRegion] = useState([0, 0]);

  if (!initialRegion) {
    return <p style={styles.loadMap}>Carregando...</p>;
  }

  function handleNextStep() {
    navigation.navigate('treeFallData', { position });
  }
  function handleSelectMapPosition(event: MapEvent) {
    setPosition(event.nativeEvent.coordinate);
  }

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Precisamos de sua permissão para obter a localização');
        return;
      }
      const location = await Location.getCurrentPositionAsync({
        accuracy: 4,
      });

      const { latitude, longitude } = location.coords;

      setInitialRegion([latitude, longitude]);
    }
    loadPosition();
  }, [initialRegion]);

  return (
    <View style={styles.container}>
      {initialRegion[0] !== 0 && (
        <MapView
          initialRegion={{
            latitude: initialRegion[0],
            longitude: initialRegion[1],
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }}
          style={styles.mapStyle}
          onPress={handleSelectMapPosition}
        >
          {position.latitude !== 0 && (
            <Marker
              coordinate={{
                latitude: position.latitude,
                longitude: position.longitude,
              }}
            />
          )}
        </MapView>
      )}
      {position.latitude !== 0 && (
        <RectButton style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontSize: 16,
    color: '#FFF',
  },
  loadMap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
