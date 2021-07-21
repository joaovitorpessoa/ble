import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  InputWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Title: {
    fontSize: 20,
    color: '#aaa',
    fontWeight: 'bold',
    margin: 50,
  },
  Input: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 20,
    padding: 15,
    width: 300,
  },
  SendButton: {
    paddingHorizontal: 20,
    backgroundColor: '#6b96be',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  SendButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'normal',
  },

  ReadMonitorWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  ReadMonitorTextWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  ReadMonitorText: {
    fontSize: 16,
    color: '#636363',
    marginHorizontal: 100,
  },
  CMDWrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  CMDButton: {
    margin: 10,
    padding: 10,
    backgroundColor: '#a1bed7',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CMDButtonText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: 'normal',
  },
  CMDEmptyText: {
    fontSize: 20,
    color: '#aaa',
    fontWeight: 'bold',
    margin: 50,
  },
});

export {styles};
