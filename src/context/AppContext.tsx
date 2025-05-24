import React, { createContext, useContext, useState, useEffect, ReactElement } from 'react';

export interface IAppContext {
    hasCompletedIntro: boolean;
    hasCompletedOnboarding: boolean;
    isLoading: boolean;
    completeIntro: () => void;
    completeOnboarding: () => void;
}

const AppContext = createContext<IAppContext>({
    hasCompletedIntro: false,
    hasCompletedOnboarding: false,
    isLoading: true,
    completeIntro: () => {},
    completeOnboarding: () => {},
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider:React.FC<{children: ReactElement}> = ({ children }) => {
  const [appState, setAppState] = useState({
    hasCompletedIntro: true,
    hasCompletedOnboarding: true,
    isLoading: true,
  });

  // Simulate loading saved state (in real app, load from AsyncStorage)
  useEffect(() => {
    const loadAppState = async () => {
      try {
        // In a real app, you would load from AsyncStorage:
        // const savedState = await AsyncStorage.getItem('appState');
        // if (savedState) {
        //   setAppState({ ...JSON.parse(savedState), isLoading: false });
        // } else {
        //   setAppState(prev => ({ ...prev, isLoading: false }));
        // }

        // For demo purposes, simulate loading
        setTimeout(() => {
          setAppState(prev => ({ ...prev, isLoading: false }));
        }, 1000);
      } catch (error) {
        console.error('Error loading app state:', error);
        setAppState(prev => ({ ...prev, isLoading: false }));
      }
    };

    loadAppState();
  }, []);

  const completeIntro = async () => {
    const newState = { ...appState, hasCompletedIntro: true };
    setAppState(newState);
    // In real app: await AsyncStorage.setItem('appState', JSON.stringify(newState));
  };

  const completeOnboarding = async () => {
    const newState = { ...appState, hasCompletedOnboarding: true };
    setAppState(newState);
    // In real app: await AsyncStorage.setItem('appState', JSON.stringify(newState));
  };

  const resetApp = async () => {
    const newState = {
      hasCompletedIntro: false,
      hasCompletedOnboarding: false,
      isLoading: false,
    };
    setAppState(newState);
    // In real app: await AsyncStorage.removeItem('appState');
  };

  const value = {
    ...appState,
    completeIntro,
    completeOnboarding,
    resetApp,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
