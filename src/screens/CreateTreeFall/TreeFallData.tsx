import React, { useState } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import api from '../../services/api';

interface IOrphanageDataRouteParams {
  position: {
    latitude: number;
    longitude: number;
  };
}

export default function OrphanageData() {
  const route = useRoute();
  const params = route.params as IOrphanageDataRouteParams;
  const navigation = useNavigation();

  const [street, setStreet] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [images, setImages] = useState<string[]>([]);

  async function handleCreateTreeFall() {
    const { latitude, longitude } = params.position;

    const data = new FormData();

    data.append('street', street);
    data.append('neighborhood', neighborhood);
    data.append('city', city);
    data.append('state', state);
    data.append('country', 'brasil');
    data.append('zipcode', zipcode);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));

    images.forEach((image, index) => {
      data.append('images', {
        name: `name_${index}.jpg`,
        type: 'image/jpg',
        uri: image,
      } as any);
    });

    await api.post('treefall/create', data);

    navigation.navigate('mapSearch');
  }

  async function handleSelectImage() {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        alert('Eita, precisamos de acesso ás suas fotos...');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (result.cancelled === true) {
        return;
      }

      const { uri: image } = result;

      setImages([...images, image]);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 24 }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Fotos</Text>
      <View style={styles.uploadedImagesContainer}>
        {images.map(image => {
          return (
            <Image
              key={image}
              source={{ uri: image }}
              style={styles.uploadedImage}
            />
          );
        })}
      </View>
      <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImage}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.label}>CEP</Text>
      <TextInput
        style={styles.input}
        value={zipcode}
        onChangeText={setZipcode}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Rua</Text>
      <TextInput style={styles.input} value={street} onChangeText={setStreet} />

      <Text style={styles.label}>Bairro</Text>
      <TextInput
        style={styles.input}
        value={neighborhood}
        onChangeText={setNeighborhood}
      />

      <Text style={styles.label}>Cidade</Text>
      <TextInput style={styles.input} value={city} onChangeText={setCity} />

      <Text style={styles.label}>Estado</Text>
      <TextInput style={styles.input} value={state} onChangeText={setState} />

      <RectButton style={styles.nextButton} onPress={handleCreateTreeFall}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6',
  },

  label: {
    color: '#8fa7b3',
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  uploadedImagesContainer: {
    flexDirection: 'row',
  },
  uploadedImage: {
    width: 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 32,
    marginRight: 8,
  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: '#7DC81C',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontSize: 16,
    color: '#FFF',
  },
});
