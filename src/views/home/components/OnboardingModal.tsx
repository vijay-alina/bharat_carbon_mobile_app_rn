import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
//   Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';

// const {width, height} = Dimensions.get('window');

const OnboardingModal = ({visible, onClose}: {visible: boolean, onClose: () => void}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Welcome to\nBharat Carbon 🌱',
      description:
        "Join India's largest sustainable lifestyle community. Let's take a quick look at what you can do!",
      buttonText: 'Start Tour',
    },
    {
      title: 'Your Dashboard',
      description:
        'Track your CO₂ savings, view points, and monitor your weekly progress.',
      buttonText: 'Next',
    },
    {
      title: 'Add Data',
      description:
        'Log your daily actions like meals, travel, energy use, and earn points!',
      buttonText: 'Next',
    },
    {
      title: 'Explore Challenges',
      description:
        'Complete eco-friendly challenges to unlock rewards and climb the leaderboard.',
      buttonText: 'Next',
    },
    {
      title: 'Family Impact',
      description:
        "Add family members and track everyone's contributions together.",
      buttonText: 'Next',
    },
    {
      title: 'Your Profile',
      description:
        'Set your badges, stats, and soon redeem your points for rewards!',
      buttonText: 'Next',
    },
    {
      title: 'All Set to Go!',
      description:
        "You're all ready to start logging and making a difference today.",
      buttonText: 'Get Started',
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Last step - close modal and reset
      setCurrentStep(0);
      onClose();
    }
  };

  const handleSkip = () => {
    setCurrentStep(0);
    onClose();
  };

  const renderProgressDots = () => {
    return (
      <View style={styles.progressContainer}>
        {steps.map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressDot,
              index === currentStep ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="formSheet"
      onRequestClose={onClose}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Icon/Illustration Area */}
          <View style={styles.iconContainer}>
            {currentStep === 0 && (
              <View style={styles.welcomeIcon}>
                <Text style={styles.iconEmoji}>🌱</Text>
              </View>
            )}
            {currentStep === 1 && (
              <View style={styles.dashboardIcon}>
                <Text style={styles.iconEmoji}>📊</Text>
              </View>
            )}
            {currentStep === 2 && (
              <View style={styles.dataIcon}>
                <Text style={styles.iconEmoji}>📝</Text>
              </View>
            )}
            {currentStep === 3 && (
              <View style={styles.challengeIcon}>
                <Text style={styles.iconEmoji}>🏆</Text>
              </View>
            )}
            {currentStep === 4 && (
              <View style={styles.familyIcon}>
                <Text style={styles.iconEmoji}>👨‍👩‍👧‍👦</Text>
              </View>
            )}
            {currentStep === 5 && (
              <View style={styles.profileIcon}>
                <Text style={styles.iconEmoji}>👤</Text>
              </View>
            )}
            {currentStep === 6 && (
              <View style={styles.successIcon}>
                <Text style={styles.iconEmoji}>✅</Text>
              </View>
            )}
          </View>

          {/* Title */}
          <Text style={styles.title}>{steps[currentStep].title}</Text>

          {/* Description */}
          <Text style={styles.description}>
            {steps[currentStep].description}
          </Text>

          {/* Progress Dots */}
          {renderProgressDots()}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {steps[currentStep].buttonText}
            </Text>
          </TouchableOpacity>

          {currentStep === steps.length - 1 && (
            <TouchableOpacity
              style={styles.dashboardButton}
              onPress={() => {
                // Handle view dashboard action
                console.log('View Dashboard pressed');
              }}>
              <Text style={styles.dashboardButtonText}>View Dashboard</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default OnboardingModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0, 0.4)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  skipButton: {
    padding: 10,
  },
  skipText: {
    color: '#666',
    fontSize: 16,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  welcomeIcon: {
    backgroundColor: '#e8f5e8',
  },
  dashboardIcon: {
    backgroundColor: '#e8f0ff',
  },
  dataIcon: {
    backgroundColor: '#fff8e8',
  },
  challengeIcon: {
    backgroundColor: '#ffe8f0',
  },
  familyIcon: {
    backgroundColor: '#f0e8ff',
  },
  profileIcon: {
    backgroundColor: '#e8fff0',
  },
  successIcon: {
    backgroundColor: '#e8ffe8',
  },
  iconEmoji: {
    fontSize: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
    lineHeight: 30,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    lineHeight: 22,
    marginBottom: 40,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#007AFF',
  },
  inactiveDot: {
    backgroundColor: '#E0E0E0',
  },
  footer: {
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  nextButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  dashboardButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  dashboardButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  // App container styles
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  openButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  openButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
