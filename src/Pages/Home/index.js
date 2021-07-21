import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {useManager} from '../../BLE/Context/Manager';
import {useConnectedDeviceInfo} from '../../BLE/Context/ConnectedDeviceInfo';
import {styles} from './styles';

const Home = ({navigation}) => {
  const {setConnectedDeviceInfo} = useConnectedDeviceInfo();
  const [scannedDevices, setScannedDevices] = useState([
    {deviceId: '1d:sd:ab:3c', name: 'Exemplo'},
    {deviceId: '1d:sd:ab:3c', name: 'Exemplo 2'},
  ]);
  const {manager, setManager} = useManager();

  return (
    <View style={styles.Container}>
      <View style={styles.ButtonWrapper}>
        <TouchableOpacity style={styles.Button}>
          <Text style={styles.ButtonText}>Scan for BLE devices</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.TextWrapper}>
        {scannedDevices.length > 0 ? (
          <Text style={styles.ConnectedTitle}>
            Select device to try connection
          </Text>
        ) : (
          <Text style={styles.ConnectedTitle}>No devices found</Text>
        )}
      </View>
      <View style={styles.ScannedDevices}>
        <ScrollView>
          {scannedDevices.map(({name, deviceId}, index) => (
            <TouchableOpacity style={styles.ButtonConnect} key={index}>
              <Text
                style={styles.ButtonText}
                onPress={() => {
                  setConnectedDeviceInfo(deviceId);
                  navigation.navigate('BLEIO');
                }}>{`${name}`}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;
