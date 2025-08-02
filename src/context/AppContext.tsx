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
  completeFamilyMemberNotesViewed: () => void;
  completeTouchTour: () => void;
  isNotesViewed: boolean;
  isFamilyNotesViewed: boolean;
  isTouchTourComplete: boolean;
  handleLogout: () => void;
  user: null | any;
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
  completeFamilyMemberNotesViewed: () => {},
  completeTouchTour: () => {},
  isNotesViewed: false,
  isFamilyNotesViewed: false,
  isTouchTourComplete: false,
  handleLogout: () => {},
  user: null,
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
    isFamilyNotesViewed: false,
    isTouchTourComplete: false,
    user: null,
  });

  // Simulate loading saved state (in real app, load from AsyncStorage)
  useEffect(() => {
    const loadAppState = async () => {
      try {
        const savedState = await AsyncStorage.getItem('appState');
        if (savedState) {
          setAppState({
            ...JSON.parse(savedState),
            isLoading: false,
          });
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
    const user = await AsyncStorage.getItem('user');
    setAppState(prev => {
      const newState = {
        ...prev,
        hasCompletedOnboarding: true,
        user: user ? JSON.parse(user) : null,
      };
      AsyncStorage.setItem('appState', JSON.stringify(newState));
      return newState;
    });
  };

  const completeProfile = async () => {
    setAppState(prev => {
      const newState = {...prev, hasCompletedProfile: true};
      AsyncStorage.setItem('appState', JSON.stringify(newState));
      return newState;
    });
  };

  const completeSubscription = async () => {
    setAppState(prev => {
      const newState = {...prev, hasCompletedSubscription: true};
      AsyncStorage.setItem('appState', JSON.stringify(newState));
      return newState;
    });
  };

  const handleLogout = async () => {
    const newState = {...appState, hasCompletedOnboarding: false, user: null};
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('accessToken');
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
    await AsyncStorage.setItem('appState', JSON.stringify(newState));
  };

  const completeFamilyMemberNotesViewed = async () => {
    const newState = {...appState, isFamilyNotesViewed: true};
    setAppState(newState);
    await AsyncStorage.setItem('appState', JSON.stringify(newState));
  };

  const resetApp = async () => {
    const newState = {
      hasCompletedIntro: false,
      hasCompletedOnboarding: false,
      hasCompletedProfile: false,
      hasCompletedSubscription: false,
      isLoading: false,
      isNotesViewed: false,
      isFamilyNotesViewed: false,
      isTouchTourComplete: false,
      user: null,
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
    completeFamilyMemberNotesViewed,
    completeTouchTour,
    resetApp,
    handleLogout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
