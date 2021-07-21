import React, {useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';

import {useReadMonitor} from '../../BLE/Context/ReadMonitor';
import {useManager} from '../../BLE/Context/Manager';
import {styles} from './styles';

const BLEIO = () => {
  const {readMonitor, setReadMonitor} = useReadMonitor();
  // const {manager} = useManager();

  // useEffect(() => {
  //   discoverCharacteristics(manager)
  // });

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
          {false ? (
            ['teste', 'teste1', 'teste2', 'teste3'].map((item, index) => {
              return (
                <View style={styles.ReadMonitorTextWrapper} key={index}>
                  <Text style={styles.ReadMonitorText}>teste</Text>
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
