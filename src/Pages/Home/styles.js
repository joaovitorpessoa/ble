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
  Button: {
    padding: 20,
    backgroundColor: '#00A1CF',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: 'normal',
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
  ButtonConnect: {
    margin: 10,
    padding: 20,
    backgroundColor: '#a1bed7',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 100,
  },
});

export {styles};
