import React, { useEffect, useState } from 'react';
import {
  Image,
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Feather, FontAwesome } from '@expo/vector-icons';

//import mapMarkerImg from '../images/map-marker.png';
import { RectButton } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import api from '../services/api';

interface ITreeFallDetailsRouteParams {
  id: string;
}

interface ITreeFall {
  id: string;
  street: string;
  latitude: number;
  longitude: number;
  neighborhood: string;
  zipcode: string;
  city: string;
  state: string;
  images: Array<{
    id: string;
    url: string;
  }>;
}

export default function TreeFallDetails() {
  const route = useRoute();
  const params = route.params as ITreeFallDetailsRouteParams;

  const [treeFall, setTreeFall] = useState<ITreeFall>();

  useEffect(() => {
    api.get(`treefall/show/${params.id}`).then(response => {
      setTreeFall(response.data);
    });
  }, [params.id]);

  if (!treeFall) {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>Carregando...</Text>
      </View>
    );
  }

  function handleOpenGoogleMapRoutes() {
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&destination=${treeFall?.latitude},${treeFall?.longitude}`
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagesContainer}>
        <ScrollView horizontal pagingEnabled>
          {treeFall.images.map(image => {
            return (
              <Image
                key={image.id}
                style={styles.image}
                source={{
                  uri: image.url,
                }}
              />
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{treeFall.street}</Text>
        <Text style={styles.description}>
          {treeFall.neighborhood}, {treeFall.city}, {treeFall.state}
        </Text>

        <View style={styles.mapContainer}>
          <MapView
            initialRegion={{
              latitude: treeFall.latitude,
              longitude: treeFall.longitude,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }}
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            style={styles.mapStyle}
          >
            <Marker
              coordinate={{
                latitude: treeFall.latitude,
                longitude: treeFall.longitude,
              }}
            />
          </MapView>

          <TouchableOpacity
            onPress={handleOpenGoogleMapRoutes}
            style={styles.routesContainer}
          >
            <Text style={styles.routesText}>Ver rotas no Google Maps</Text>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.separator} />

        <Text style={styles.title}>Informações de contato</Text>
        <Text style={styles.name}>Osvaldo josé</Text>

        <RectButton style={styles.contactButton} onPress={() => {}}>
          <FontAwesome name="whatsapp" size={24} color="#FFF" />
          <Text style={styles.contactButtonText}>Entrar em contato</Text>
        </RectButton> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imagesContainer: {
    height: 240,
  },

  image: {
    width: Dimensions.get('window').width,
    height: 240,
    resizeMode: 'cover',
  },

  detailsContainer: {
    padding: 24,
  },

  title: {
    color: '#4D6F80',
    fontSize: 30,
  },

  description: {
    color: '#5c8599',
    lineHeight: 24,
    marginTop: 16,
  },

  name: {
    color: '#5c8599',
    lineHeight: 24,
    marginTop: 16,
    fontSize: 18,
  },

  mapContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1.2,
    borderColor: '#B3DAE2',
    marginTop: 40,
    backgroundColor: '#E6F7FB',
  },

  mapStyle: {
    width: '100%',
    height: 150,
  },

  routesContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  routesText: {
    color: '#0089a5',
  },

  separator: {
    height: 0.8,
    width: '100%',
    backgroundColor: '#D3E2E6',
    marginVertical: 40,
  },

  scheduleContainer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  scheduleItem: {
    width: '48%',
    padding: 20,
  },

  scheduleItemBlue: {
    backgroundColor: '#E6F7FB',
    borderWidth: 1,
    borderColor: '#B3DAE2',
    borderRadius: 20,
  },

  scheduleItemGreen: {
    backgroundColor: '#EDFFF6',
    borderWidth: 1,
    borderColor: '#A1E9C5',
    borderRadius: 20,
  },

  scheduleItemRed: {
    backgroundColor: '#EDFFF6',
    borderWidth: 1,
    borderColor: '#FF6690',
    borderRadius: 20,
  },

  scheduleText: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 20,
  },

  scheduleTextBlue: {
    color: '#5C8599',
  },

  scheduleTextGreen: {
    color: '#37C77F',
  },

  scheduleTextRed: {
    color: '#FF6690',
  },

  contactButton: {
    backgroundColor: '#3CDC8C',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 40,
  },

  contactButtonText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 16,
  },
});
