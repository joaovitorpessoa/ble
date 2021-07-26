import React, {createContext, useState, useContext} from 'react';

const ConnectedDeviceInfoContext = createContext();

export default function ConnectedDeviceInfoProvider({children}) {
  const [connectedDeviceInfo, setConnectedDeviceInfo] = useState({});

  return (
    <ConnectedDeviceInfoContext.Provider
      value={{connectedDeviceInfo, setConnectedDeviceInfo}}>
      {children}
    </ConnectedDeviceInfoContext.Provider>
  );
}

export function useConnectedDeviceInfo() {
  const context = useContext(ConnectedDeviceInfoContext);
  if (!context)
    throw new Error(
      'useConnectedDeviceInfo must be used within ConnectedDeviceInfoProvider',
    );
  const {connectedDeviceInfo, setConnectedDeviceInfo} = context;

  return {connectedDeviceInfo, setConnectedDeviceInfo};
}
