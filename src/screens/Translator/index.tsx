import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {styles} from './index.styles';

const TranslatorScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TRANSLATOR</Text>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Select Language</Text>
        <Picker style={styles.picker}>
          {/* Add language options here */}
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Spanish" value="es" />
          <Picker.Item label="French" value="fr" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.micButton}>
        <View style={styles.micCircle}>
          <MaterialIcon name="mic-none" size={60} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.translateButton}>
        <Text style={styles.translateButtonText}>Translate</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TranslatorScreen;
