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
    zIndex: -1,
  },
  txtSearchContainer: {
    position: 'absolute',
    top: 10,
    width: '100%',
    flexDirection: 'row',
    zIndex: 1,
  },
  txtSearch: {
    flex: 1,
    marginHorizontal: 10,
  },
});

const Maps = () => {
  const [origin, setOrigin] = useState<LocationDetail>();
  const [destination, setDestination] = useState<LocationDetail>();
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [_, setCurrentLocation] = useState<LocationDetail>();

  useEffect(() => {
    requestLocationPermission();
  });

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
      })
      .catch(error => {
        console.log('ERROR : ', error);
        // const {code, message} = error;
        // console.warn(code, message);
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
      <View style={styles.txtSearchContainer}>
        <View style={styles.txtSearch}>
          <GooglePlacesAutocomplete
            fetchDetails={true}
            placeholder="From"
            onPress={(_, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log('Origin : ', details?.geometry.location);
              const originLoc = details?.geometry.location;
              if (originLoc && originLoc.lat && originLoc.lng) {
                setOrigin({
                  latitude: originLoc.lat,
                  longitude: originLoc.lng,
                });
              }
            }}
            query={{
              key: GOOGLE_MAP_API_KEY,
              language: 'en',
            }}
          />
        </View>
        <View style={styles.txtSearch}>
          <GooglePlacesAutocomplete
            fetchDetails={true}
            placeholder="To"
            onPress={(_, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log('Desination : ', details?.geometry.location);
              const originLoc = details?.geometry.location;
              if (originLoc && originLoc.lat && originLoc.lng) {
                setDestination({
                  latitude: originLoc.lat,
                  longitude: originLoc.lng,
                });
              }
            }}
            query={{
              key: GOOGLE_MAP_API_KEY,
              language: 'en',
            }}
          />
        </View>
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
