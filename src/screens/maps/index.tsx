import React, {useEffect, useRef, useState} from 'react';
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

type MarkerDetail = {
  start: LocationDetail;
  end: LocationDetail;
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
  setOrigin?: (location: LocationDetail) => void;
  setDestination?: (location: LocationDetail) => void;
  markers?: MarkerDetail[];
  clearTrigger?: boolean;
}

const Maps: React.FC<MapProps> = ({
  isAutoSelection,
  setOrigin,
  setDestination,
  markers,
  clearTrigger = false,
}) => {
  const [origin, localSetOrigin] = useState<LocationDetail>();
  const [destination, localSetDestination] = useState<LocationDetail>();
  const [permissionGranted, setPermissionGranted] = useState(false);
  const originInputRef = useRef<any>(null);
  const destinationInputRef = useRef<any>(null);

  useEffect(() => {
    requestLocationPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('Clear trigger:', clearTrigger);
    if (clearTrigger) {
      clearMap();
    }
  }, [clearTrigger]);

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
        if (setOrigin) {
          setOrigin({
            latitude: location.latitude,
            longitude: location.longitude,
          });
        }
      })
      .catch(error => {
        console.error('Error fetching current location:', error);
      });
  };

  // Clear map details
  const clearMap = () => {
    localSetOrigin(undefined); // Clear origin
    localSetDestination(undefined); // Clear destination
    if (originInputRef.current) {
      originInputRef.current.clear();
    }
    if (destinationInputRef.current) {
      destinationInputRef.current.clear();
    }
  };

  if (!permissionGranted) {
    return (
      <View>
        <Text>You have not granted location permission</Text>
      </View>
    );
  }

  const validateCoordinates = (lat: number, long: number) => {
    // Ensure latitude is between -90 and +90
    if (lat < -90 || lat > 90) {
      console.warn(`Swapping coordinates: (${lat}, ${long})`);
      return {latitude: long, longitude: lat}; // Swap
    }
    return {latitude: lat, longitude: long};
  };

  return (
    <View style={styles.container}>
      {isAutoSelection && (
        <View style={styles.txtSearchContainer}>
          <View style={styles.txtSearch}>
            <GooglePlacesAutocomplete
              ref={originInputRef}
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
                  if (setOrigin) {
                    setOrigin(newOrigin); // Update parent state
                  }
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
              ref={destinationInputRef}
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
                  if (setDestination) {
                    setDestination(newDestination); // Update parent state
                  }
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
          latitude: origin?.latitude || 6.9271,
          longitude: origin?.longitude || 79.8612,
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
        {markers &&
          markers.map((marker, index) => {
            const start = validateCoordinates(
              marker.start.latitude,
              marker.start.longitude,
            );
            const end = validateCoordinates(
              marker.end.latitude,
              marker.end.longitude,
            );

            return (
              <React.Fragment key={index}>
                <Marker coordinate={start} title="Start" pinColor="green" />
                <Marker coordinate={end} title="End" pinColor="red" />
              </React.Fragment>
            );
          })}
      </MapView>
    </View>
  );
};

export default Maps;
