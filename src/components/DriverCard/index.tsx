import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './index.styles';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Driver {
  name: string;
  rating: number;
  carModel: string;
  color: string;
  maxPassengers: string;
  rideStart: string;
  rideEnd: string;
  date: string;
  startTime: string;
  endTime: string;
  carImage: string;
  price: string;
}

interface DriverCardProps {
  driver: Driver;
  onPress: Function;
}

const DriverCard: React.FC<DriverCardProps> = ({driver, onPress}) => {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View style={styles.card}>
        <View style={styles.details}>
          <Text style={styles.driverName}>{driver.name}</Text>
          <View style={styles.carDetails}>
            <MaterialIcon
              style={styles.commonIcon}
              name="directions-car"
              size={15}
            />
            <Text style={styles.carModel}>{driver.carModel}</Text>
            <Text style={styles.carDetail}> - {driver.color} </Text>
            <MaterialIcon style={styles.commonIcon} name="groups" size={18} />
            <Text style={styles.carDetail}> - {driver.maxPassengers}</Text>
          </View>
          {/* <View style={styles.carDetails}>
          <MaterialIcon
            style={styles.commonIcon}
            name="location-pin"
            size={15}
          />
          <Text style={styles.locationValue}>
            {driver.rideStart} - {driver.rideEnd}
          </Text>
        </View> */}
          <View style={styles.locationTime}>
            <MaterialIcon
              style={styles.commonIcon}
              name="date-range"
              size={15}
            />
            <Text style={styles.timeValue}>{driver.date}</Text>
            <MaterialComIcon
              style={styles.commonIcon}
              name="clock-time-three"
              size={15}
            />
            <Text style={styles.timeValue}>
              {driver.startTime} - {driver.endTime}
            </Text>
          </View>
        </View>
        <View style={styles.priceSection}>
          <MaterialIcon name="directions-car" size={30} />
          <Text style={styles.priceText}>{driver.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DriverCard;
