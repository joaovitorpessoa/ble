import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
import {useIsFocused} from '@react-navigation/native';

import {
  useManager,
  requestLocationPermission,
  useConnectedDeviceInfo,
} from '../../BLE';

import {styles} from './styles';

const Home = props => {
  const {manager} = useManager();
  const {connectedDeviceInfo, setConnectedDeviceInfo} =
    useConnectedDeviceInfo();

  const [scannedDevicesState, setScannedDevicesState] = useState([]);

  let scannedDevices = [];

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      if (connectedDeviceInfo.deviceId) {
        console.log(`Desconectando de ${connectedDeviceInfo.deviceId}...`);
        manager.cancelDeviceConnection(connectedDeviceInfo.deviceId);
        scannedDevices = [];
        setConnectedDeviceInfo(undefined);
        setScannedDevicesState([]);
      }
    }
  }, [props, isFocused]);

  const searchBleDevices = async () => {
    const permission = await requestLocationPermission();

    console.log('Iniciando scan...');

    if (permission) {
      if (manager) {
        manager.startDeviceScan(null, null, (error, newDeviceScanned) => {
          if (error) {
            return console.error(error);
          }

          if (newDeviceScanned.name) {
            if (scannedDevices.length === 0) {
              const deviceAlreadyScanned = scannedDevices.find(
                deviceScanned => deviceScanned.name == newDeviceScanned.name,
              );

              if (deviceAlreadyScanned === undefined) {
                scannedDevices.push({
                  name: newDeviceScanned.name,
                  deviceId: newDeviceScanned.id,
                });
              }

              setScannedDevicesState(oldState =>
                oldState.concat({
                  name: newDeviceScanned.name,
                  deviceId: newDeviceScanned.id,
                }),
              );
            } else {
              const deviceAlreadyScanned = scannedDevices.find(
                deviceScanned => deviceScanned.name == newDeviceScanned.name,
              );

              if (deviceAlreadyScanned === undefined) {
                scannedDevices.push({
                  name: newDeviceScanned.name,
                  deviceId: newDeviceScanned.id,
                });

                setScannedDevicesState(oldState =>
                  oldState.concat({
                    name: newDeviceScanned.name,
                    deviceId: newDeviceScanned.id,
                  }),
                );
              }
            }
          }
        });
      }
    }
  };

  return (
    <View style={styles.Container}>
      <View style={styles.ButtonWrapper}>
        <Button
          title="Start scan for BLE devices"
          onPress={searchBleDevices}
          buttonStyle={styles.ScanButton}
        />
      </View>
      <View style={styles.TextWrapper}>
        {scannedDevicesState.length === 0 ? (
          <Text style={styles.ConnectedTitle}>No devices found</Text>
        ) : (
          <Text style={styles.ConnectedTitle}>
            Select device to try connection
          </Text>
        )}
      </View>
      <View style={styles.ScannedDevices}>
        <ScrollView>
          {scannedDevicesState.map(({name, deviceId}, index) => (
            <Button
              title={`${name}`}
              onPress={() => {
                setConnectedDeviceInfo({deviceId});
                props.navigation.navigate('BLEIO');
              }}
              type="outline"
              buttonStyle={styles.DeviceButton}
              key={index}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;
