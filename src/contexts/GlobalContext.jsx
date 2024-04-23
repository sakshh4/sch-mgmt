import React from "react";

export const GlobalContext = React.createContext({});

const GlobalProvider = ({ children }) => {
  const [selectedTab, setSelectedTab] = React.useState("Home");
  const [isAuth, setIsAuth] = React.useState(false);
  const contextValue = {
    selectedTab,
    setSelectedTab,
    isAuth,
    setIsAuth,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
