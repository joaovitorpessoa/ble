import React, {useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';

import {discoverCharacteristics} from '../../BLE/DiscoverCharacteristics';
import {useManager} from '../../BLE/Context/Manager';
import {useConnectedDeviceInfo} from '../../BLE/Context/ConnectedDeviceInfo';
import {useReadMonitor} from '../../BLE/Context/ReadMonitor';
import {} from '../../BLE/Write';
import {Base64} from '../../BLE/Base64';
import {styles} from './styles';

const BLEIO = () => {
  const {connectedDeviceInfo} = useConnectedDeviceInfo();
  const {readMonitor, setReadMonitor} = useReadMonitor();
  const {manager} = useManager();

  useEffect(async () => {
    const deviceConnected = await manager.connectToDevice(
      connectedDeviceInfo.deviceId,
    );

    const deviceScannedInfo = await discoverCharacteristics(deviceConnected);

    console.log(deviceScannedInfo);

    const [{service: serviceForRead, uuid: characteristicForRead}] =
      deviceScannedInfo.characteristics.filter(
        characteristic => characteristic.allowed.isNotifiable,
      );

    manager.monitorCharacteristicForDevice(
      deviceScannedInfo.deviceId,
      serviceForRead,
      characteristicForRead,
      (error, data) =>
        // setReadMonitor(readMonitor =>
        // readMonitor.concat(Base64.decoder(data.value)),
        // ),
        data && console.log(Base64.decoder(data.value)),
    );

    // setReadListeners(deviceConnected, deviceScannedInfo);

    console.log('Tudo belezinha!');
  }, []);

  return (
    <View style={styles.Container}>
      <View style={styles.InputWrapper}>
        <Text style={styles.Title}>Send command</Text>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            style={styles.Input}
            placeholder="Enter a custom command here"
          />
          <TouchableOpacity style={styles.SendButton}>
            <Text style={styles.SendButtonText}>{`${'>'}`}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.CMDWrapper}>
        <TouchableOpacity style={styles.CMDButton}>
          <Text style={styles.CMDButtonText}>{`${'{"cmd":"hello"}'}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.CMDButton}>
          <Text style={styles.CMDButtonText}>{`${'{"displayNro":2345}'}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.CMDButton}>
          <Text
            style={
              styles.CMDButtonText
            }>{`${'{"pswd":12323445, "cmd":"tare"}'}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.CMDButton}>
          <Text
            style={
              styles.CMDButtonText
            }>{`${'{"pswd":12323445, "cmd":"weight"}'}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.CMDButton}>
          <Text
            style={
              styles.CMDButtonText
            }>{`${'{"pswd":12323445, "targetAbsWeight":1234.5}'}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.CMDButton}>
          <Text
            style={
              styles.CMDButtonText
            }>{`${'{"pswd":12323445, "targetRelWeight":123}'}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.CMDButton}>
          <Text
            style={
              styles.CMDButtonText
            }>{`${'{"pswd":12323445, "beep":50}'}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.CMDButton}>
          <Text
            style={
              styles.CMDButtonText
            }>{`${'{"pswd":12323445, "sound":1}'}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.CMDButton}>
          <Text
            style={
              styles.CMDButtonText
            }>{`${'{"pswd":12323445, "timer":600}'}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.CMDButton}>
          <Text
            style={
              styles.CMDButtonText
            }>{`${'{"pswd":12323445, "timerSound":3, "timerNum":2, "timer":300}'}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.CMDButton}>
          <Text
            style={
              styles.CMDButtonText
            }>{`${'{"pswd":12323445, "cmd":"timerList"}'}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.CMDButton}>
          <Text
            style={
              styles.CMDButtonText
            }>{`${'{"pswd":12323445, "newName":"confeitaria 1"}'}`}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.ReadMonitorWrapper}>
        <ScrollView>
          {readMonitor.length > 0 ? (
            readMonitor.map((item, index) => {
              return (
                <View style={styles.ReadMonitorTextWrapper} key={index}>
                  <Text style={styles.ReadMonitorText}>{`${item}`}</Text>
                </View>
              );
            })
          ) : (
            <Text style={styles.CMDEmptyText}>Nothing read</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default BLEIO;
