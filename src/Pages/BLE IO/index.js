import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView, TextInput} from 'react-native';
import {Button} from 'react-native-elements';

import {
  discoverCharacteristics,
  useManager,
  useConnectedDeviceInfo,
  Write,
  Base64,
} from '../../BLE';

import {styles} from './styles';

const BLEIO = () => {
  const {manager} = useManager();
  const {connectedDeviceInfo, setConnectedDeviceInfo} =
    useConnectedDeviceInfo();

  const [readMonitor, setReadMonitor] = useState([]);
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
          try {
            const messageDecoded = Base64.decoder(data['value']);

            console.log(messageDecoded);

            return oldState.concat(messageDecoded);
          } catch (error) {
            return;
          }
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
        <ScrollView>
          <Button
            title={`${'{"cmd":"hello"}'}`}
            buttonStyle={styles.CMDButton}
            onPress={() =>
              Write(manager, connectedDeviceInfo, '{"cmd":"hello"}')
            }
          />
          <Button
            title={`${'{"displayNro":2345}'}`}
            buttonStyle={styles.CMDButton}
            onPress={() =>
              Write(manager, connectedDeviceInfo, '{"displayNro":2345}')
            }
          />
          <Button
            title={`${'{"pswd":0, "cmd":"tare"}'}`}
            buttonStyle={styles.CMDButton}
            onPress={() =>
              Write(manager, connectedDeviceInfo, '{"pswd":0, "cmd":"tare"}')
            }
          />
          <Button
            title={`${'{"pswd":0, "cmd":"weight"}'}`}
            buttonStyle={styles.CMDButton}
            onPress={() =>
              Write(manager, connectedDeviceInfo, '{"pswd":0, "cmd":"weight"}')
            }
          />
          <Button
            title={`${'{"pswd":0, "targetAbsWeight":1234.5}'}`}
            buttonStyle={styles.CMDButton}
            onPress={() =>
              Write(
                manager,
                connectedDeviceInfo,
                '{"pswd":0, "targetAbsWeight":1234.5}',
              )
            }
          />
          <Button
            title={`${'{"pswd":0, "targetRelWeight":123}'}`}
            buttonStyle={styles.CMDButton}
            onPress={() =>
              Write(
                manager,
                connectedDeviceInfo,
                '{"pswd":0, "targetRelWeight":123}',
              )
            }
          />
          <Button
            title={`${'{"pswd":0, "beep":50}'}`}
            buttonStyle={styles.CMDButton}
            onPress={() =>
              Write(manager, connectedDeviceInfo, '{"pswd":0, "beep":50}')
            }
          />
          <Button
            title={`${'{"pswd":0, "sound":1}'}`}
            buttonStyle={styles.CMDButton}
            onPress={() =>
              Write(manager, connectedDeviceInfo, '{"pswd":0, "sound":1}')
            }
          />
          <Button
            title={`${'{"pswd":0, "timer":600}'}`}
            buttonStyle={styles.CMDButton}
            onPress={() =>
              Write(manager, connectedDeviceInfo, '{"pswd":0, "timer":600}')
            }
          />
          <Button
            title={`${'{"pswd":0, "timerSound":3, "timerNum":2, "timer":300}'}`}
            buttonStyle={styles.CMDButton}
            onPress={() =>
              Write(
                manager,
                connectedDeviceInfo,
                '{"pswd":0, "timerSound":3, "timerNum":2, "timer":300}',
              )
            }
          />
          <Button
            title={`${'{"pswd":0, "cmd":"timerList"}'}`}
            buttonStyle={styles.CMDButton}
            onPress={() =>
              Write(
                manager,
                connectedDeviceInfo,
                '{"pswd":0, "cmd":"timerList"}',
              )
            }
          />
          <Button
            title={`${'{"pswd":0, "newName":"confeitaria 1"}'}`}
            buttonStyle={styles.CMDButton}
            onPress={() =>
              Write(
                manager,
                connectedDeviceInfo,
                '{"pswd":0, "newName":"confeitaria 1"}',
              )
            }
          />
        </ScrollView>
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
