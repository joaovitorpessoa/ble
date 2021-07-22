import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {useManager} from '../../BLE/Context/Manager';
import {useConnectedDeviceInfo} from '../../BLE/Context/ConnectedDeviceInfo';
import {requestLocationPermission} from '../../BLE/RequestPermission';
import {styles} from './styles';

const Home = ({navigation}) => {
  const [scannedDevicesState, setScannedDevicesState] = useState([]);
  const {setConnectedDeviceInfo} = useConnectedDeviceInfo();
  const {manager} = useManager();
  const scannedDevices = [];

  const searchBleDevices = async () => {
    const permission = await requestLocationPermission();

    if (permission) {
      console.log('Iniciando scan...');

      setTimeout(() => {
        console.log('Finalizando scan...');
        manager.stopDeviceScan();
        manager.destroy();
      }, 5000);

      if (manager) {
        manager.startDeviceScan(null, null, (error, newDeviceScanned) => {
          if (error) {
            return console.error(error);
          }

          if (newDeviceScanned.name) {
            if (scannedDevices.length > 0) {
              if (
                !scannedDevices.find(
                  deviceScanned => deviceScanned.name == newDeviceScanned.name,
                )
              ) {
                scannedDevices.push({
                  name: newDeviceScanned.name,
                  deviceId: newDeviceScanned.id,
                });
                setScannedDevicesState(scannedDevices);
              }
            } else {
              scannedDevices.push({
                name: newDeviceScanned.name,
                deviceId: newDeviceScanned.id,
              });
            }
          }
        });
      }
    }
  };

  return (
    <View style={styles.Container}>
      <View style={styles.ButtonWrapper}>
        <TouchableOpacity style={styles.Button} onPress={searchBleDevices}>
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
          {scannedDevicesState.map(({name, deviceId}, index) => (
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
