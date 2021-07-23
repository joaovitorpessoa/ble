import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ButtonWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ScannedDevices: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ConnectedTitle: {
    fontSize: 20,
    color: '#aaa',
    fontWeight: 'bold',
    margin: 50,
  },
  ConnectedButtons: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ScanButton: {
    margin: 10,
    padding: 15,
    backgroundColor: '#6b96be',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  DeviceButton: {
    margin: 10,
    padding: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {styles};
