import {
  View,
  StyleSheet,
  Text,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAP_API_KEY} from '../../config/constants';
import MapViewDirections from 'react-native-maps-directions';
import GetLocation from 'react-native-get-location';

type LocationDetail = {
  latitude: number;
  longitude: number;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    marginTop: 25,
    zIndex: -1,
  },
  txtSearch: {
    zIndex: 1,
    flex: 0.5,
  },
});

const Maps = () => {
  const [origin] = useState<LocationDetail>({
    latitude: 6.03264,
    longitude: 80.21677,
  });
  const [destination] = useState<LocationDetail>({
    latitude: 6.035536,
    longitude: 80.220489,
  });
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<LocationDetail>();

  useEffect(() => {
    requestLocationPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location service permission',
            message: 'Friendly Ride needs access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setPermissionGranted(true);
          getCurrentLocation();
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const getCurrentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        setCurrentLocation({
          latitude: location.latitude,
          longitude: location.longitude,
        });
        // Remove after
        console.log(currentLocation);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  // use draggable marker for select the location
  // use Circle for display search radius

  // TODO
  // Move GooglePlacesAutocomplete to front
  if (!permissionGranted) {
    return (
      <View>
        <Text>You have not location permission</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.txtSearch}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          query={{
            key: GOOGLE_MAP_API_KEY,
            language: 'en',
          }}
        />
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 6.0329,
          longitude: 80.2168,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00421,
        }}>
        {origin && <Marker coordinate={origin} title="Origin" />}
        {destination && <Marker coordinate={destination} title="Destination" />}
        {origin && destination && (
          <MapViewDirections
            origin={origin}
            strokeColor="red"
            strokeWidth={2}
            destination={destination}
            apikey={GOOGLE_MAP_API_KEY}
          />
        )}
      </MapView>
    </View>
  );
};

export default Maps;
