import React, {createContext, useState, useContext} from 'react';

const ReadMonitorContext = createContext();

export default function ReadMonitorProvider({children}) {
  const [readMonitor, setReadMonitor] = useState([]);

  return (
    <ReadMonitorContext.Provider value={{readMonitor, setReadMonitor}}>
      {children}
    </ReadMonitorContext.Provider>
  );
}

export function useReadMonitor() {
  const context = useContext(ReadMonitorContext);
  if (!context)
    throw new Error('useReadMonitor must be used within ReadMonitorProvider');
  const {readMonitor, setReadMonitor} = context;

  return {readMonitor, setReadMonitor};
}
