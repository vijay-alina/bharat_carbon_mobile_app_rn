import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactElement,
} from 'react';

export interface IAppContext {
  hasCompletedIntro: boolean;
  hasCompletedOnboarding: boolean;
  hasCompletedProfile: boolean;
  hasCompletedSubscription: boolean;
  isLoading: boolean;
  completeIntro: () => void;
  completeOnboarding: () => void;
  completeProfile: () => void;
  completeSubscription: () => void;
  completeNotesViewed: () => void;
  completeTouchTour: () => void;
  isNotesViewed: boolean;
  isTouchTourComplete: boolean;
  handleLogout: () => void;
}

const AppContext = createContext<IAppContext>({
  hasCompletedIntro: false,
  hasCompletedOnboarding: false,
  hasCompletedProfile: false,
  hasCompletedSubscription: false,
  isLoading: true,
  completeIntro: () => {},
  completeOnboarding: () => {},
  completeProfile: () => {},
  completeSubscription: () => {},
  completeNotesViewed: () => {},
  completeTouchTour: () => {},
  isNotesViewed: false,
  isTouchTourComplete: false,
  handleLogout: () => {},
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{children: ReactElement}> = ({children}) => {
  const [appState, setAppState] = useState({
    hasCompletedIntro: false,
    hasCompletedOnboarding: false,
    hasCompletedProfile: false,
    hasCompletedSubscription: false,
    isLoading: true,
    isNotesViewed: false,
    isTouchTourComplete: false,
  });

  // Simulate loading saved state (in real app, load from AsyncStorage)
  useEffect(() => {
    const loadAppState = async () => {
      try {
        const savedState = await AsyncStorage.getItem('appState');
        if (savedState) {
          setAppState({...JSON.parse(savedState), isLoading: false});
        } else {
          setAppState(prev => ({...prev, isLoading: false}));
        }
      } catch (error) {
        console.error('Error loading app state:', error);
        setAppState(prev => ({...prev, isLoading: false}));
      }
    };

    loadAppState();
  }, []);

  const completeIntro = async () => {
    const newState = {...appState, hasCompletedIntro: true};
    setAppState(newState);
    await AsyncStorage.setItem('appState', JSON.stringify(newState));
  };

  const completeOnboarding = async () => {
    const newState = {...appState, hasCompletedOnboarding: true};
    setAppState(newState);
    await AsyncStorage.setItem('appState', JSON.stringify(newState));
  };

  const completeProfile = async () => {
    const newState = {...appState, hasCompletedProfile: true};
    setAppState(newState);
    await AsyncStorage.setItem('appState', JSON.stringify(newState));
  };

  const completeSubscription = async () => {
    const newState = {...appState, hasCompletedSubscription: true};
    setAppState(newState);
    await AsyncStorage.setItem('appState', JSON.stringify(newState));
  };

  const handleLogout = async () => {
    const newState = {...appState, hasCompletedOnboarding: false};
    setAppState(newState);
    await AsyncStorage.setItem('appState', JSON.stringify(newState));
  };

  const completeNotesViewed = async () => {
    const newState = {...appState, isNotesViewed: true};
    setAppState(newState);
    await AsyncStorage.setItem('appState', JSON.stringify(newState));
  };

  const completeTouchTour = async () => {
    const newState = {...appState, isTouchTourComplete: true};
    setAppState(newState);
  };

  const resetApp = async () => {
    const newState = {
      hasCompletedIntro: false,
      hasCompletedOnboarding: false,
      hasCompletedProfile: false,
      hasCompletedSubscription: false,
      isLoading: false,
      isNotesViewed: false,
      isTouchTourComplete: false,
    };
    setAppState(newState);
    // In real app: await AsyncStorage.removeItem('appState');
  };

  const value = {
    ...appState,
    completeIntro,
    completeOnboarding,
    completeProfile,
    completeSubscription,
    completeNotesViewed,
    completeTouchTour,
    resetApp,
    handleLogout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
