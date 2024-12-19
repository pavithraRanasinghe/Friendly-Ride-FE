import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAP_API_KEY} from '../../config/constants';
import MapViewDirections from 'react-native-maps-directions';
import GetLocation from 'react-native-get-location';
import {theme} from '../../core/theme';

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

interface MapProps {
  isAutoSelection: boolean;
  setOrigin: (location: LocationDetail) => void; // Callback to update origin
  setDestination: (location: LocationDetail) => void; // Callback to update destination
}

const Maps: React.FC<MapProps> = ({
  isAutoSelection,
  setOrigin,
  setDestination,
}) => {
  const [origin, localSetOrigin] = useState<LocationDetail>();
  const [destination, localSetDestination] = useState<LocationDetail>();
  const [permissionGranted, setPermissionGranted] = useState(false);

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
        localSetOrigin({
          latitude: location.latitude,
          longitude: location.longitude,
        });
        setOrigin({
          latitude: location.latitude,
          longitude: location.longitude,
        });
      })
      .catch(error => {
        console.error('Error fetching current location:', error);
      });
  };

  if (!permissionGranted) {
    return (
      <View>
        <Text>You have not granted location permission</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isAutoSelection && (
        <View style={styles.txtSearchContainer}>
          <View style={styles.txtSearch}>
            <GooglePlacesAutocomplete
              fetchDetails={true}
              placeholder="From"
              onPress={(_, details = null) => {
                const originLoc = details?.geometry.location;
                if (originLoc && originLoc.lat && originLoc.lng) {
                  const newOrigin = {
                    latitude: originLoc.lat,
                    longitude: originLoc.lng,
                  };
                  localSetOrigin(newOrigin);
                  setOrigin(newOrigin); // Update parent state
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
                const destLoc = details?.geometry.location;
                if (destLoc && destLoc.lat && destLoc.lng) {
                  const newDestination = {
                    latitude: destLoc.lat,
                    longitude: destLoc.lng,
                  };
                  localSetDestination(newDestination);
                  setDestination(newDestination); // Update parent state
                }
              }}
              query={{
                key: GOOGLE_MAP_API_KEY,
                language: 'en',
              }}
            />
          </View>
        </View>
      )}

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: origin?.latitude || 6.0329,
          longitude: origin?.longitude || 80.2168,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00421,
        }}>
        {origin && <Marker coordinate={origin} title="Origin" />}
        {destination && <Marker coordinate={destination} title="Destination" />}
        {origin && destination && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            strokeColor={theme.colors.mapDirection}
            strokeWidth={2}
            apikey={GOOGLE_MAP_API_KEY}
          />
        )}
      </MapView>
    </View>
  );
};

export default Maps;
