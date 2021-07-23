import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView, TextInput} from 'react-native';

import {Button} from 'react-native-elements';
import {discoverCharacteristics} from '../../BLE/DiscoverCharacteristics';
import {useManager} from '../../BLE/Context/Manager';
import {useConnectedDeviceInfo} from '../../BLE/Context/ConnectedDeviceInfo';
import {Write} from '../../BLE/Write';
import {Base64} from '../../BLE/Base64';
import {styles} from './styles';

const BLEIO = () => {
  const {connectedDeviceInfo, setConnectedDeviceInfo} =
    useConnectedDeviceInfo();
  const [readMonitor, setReadMonitor] = useState([]);
  const {manager} = useManager();
  const [inputText, setInputText] = useState('');

  useEffect(async () => {
    console.log('Finalizando scan...');
    manager.stopDeviceScan();

    const deviceConnected = await manager.connectToDevice(
      connectedDeviceInfo.deviceId,
    );

    const deviceScannedInfo = await discoverCharacteristics(deviceConnected);

    console.log('Características descobertas!');

    setConnectedDeviceInfo(deviceScannedInfo);

    const [{service: serviceForRead, uuid: characteristicForRead}] =
      deviceScannedInfo.characteristics.filter(
        characteristic => characteristic.allowed.isNotifiable,
      );

    manager.monitorCharacteristicForDevice(
      deviceScannedInfo.deviceId,
      serviceForRead,
      characteristicForRead,
      (error, data) =>
        setReadMonitor(oldState => {
          if (!data['value']) {
            throw new Error('ble device is not connected to manager');
          }

          console.log(Base64.decoder(data['value']));

          return oldState.concat(Base64.decoder(data['value']));
        }),
    );
  }, []);

  return (
    <View style={styles.Container}>
      <View style={styles.InputWrapper}>
        <Text style={styles.Title}>Send command</Text>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            style={styles.Input}
            placeholder="Enter a custom command here"
            onChangeText={text => setInputText(text)}
            defaultValue={inputText}
          />
          <Button
            title={`${'>'}`}
            buttonStyle={styles.SendButton}
            onPress={() => Write(manager, connectedDeviceInfo, inputText)}
          />
        </View>
      </View>
      <View style={styles.CMDWrapper}>
        <Button title={`${'{"cmd":"hello"}'}`} buttonStyle={styles.CMDButton} />
        <Button
          title={`${'{"displayNro":2345}'}`}
          buttonStyle={styles.CMDButton}
        />
        <Button
          title={`${'{"pswd":12323445, "cmd":"tare"}'}`}
          buttonStyle={styles.CMDButton}
        />
        <Button
          title={`${'{"pswd":12323445, "cmd":"weight"}'}`}
          buttonStyle={styles.CMDButton}
        />
        <Button
          title={`${'{"pswd":12323445, "targetAbsWeight":1234.5}'}`}
          buttonStyle={styles.CMDButton}
        />
        <Button
          title={`${'{"pswd":12323445, "targetRelWeight":123}'}`}
          buttonStyle={styles.CMDButton}
        />
        <Button
          title={`${'{"pswd":12323445, "beep":50}'}`}
          buttonStyle={styles.CMDButton}
        />
        <Button
          title={`${'{"pswd":12323445, "sound":1}'}`}
          buttonStyle={styles.CMDButton}
        />
        <Button
          title={`${'{"pswd":12323445, "timer":600}'}`}
          buttonStyle={styles.CMDButton}
        />
        <Button
          title={`${'{"pswd":12323445, "timerSound":3, "timerNum":2, "timer":300}'}`}
          buttonStyle={styles.CMDButton}
        />
        <Button
          title={`${'{"pswd":12323445, "cmd":"timerList"}'}`}
          buttonStyle={styles.CMDButton}
        />
        <Button
          title={`${'{"pswd":12323445, "newName":"confeitaria 1"}'}`}
          buttonStyle={styles.CMDButton}
        />
      </View>
      <View style={styles.ReadMonitorWrapper}>
        <ScrollView>
          {readMonitor && readMonitor.length > 0 ? (
            readMonitor.map((item, index) => (
              <View style={styles.ReadMonitorTextWrapper} key={index}>
                <Text style={styles.ReadMonitorText}>{`${item}`}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.CMDEmptyText}>Nothing read</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default BLEIO;
