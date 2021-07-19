import React, {createContext, useState, useContext} from 'react';

const ManagerContext = createContext();

export default function ManagerProvider({children}) {
  const [manager, setManager] = useState();

  return (
    <ManagerContext.Provider value={{manager, setManager}}>
      {children}
    </ManagerContext.Provider>
  );
}

export function useManager() {
  const context = useContext(ManagerContext);
  if (!context)
    throw new Error('useManager must be used within ManagerProvider');
  const {manager, setManager} = context;

  return {manager, setManager};
}
