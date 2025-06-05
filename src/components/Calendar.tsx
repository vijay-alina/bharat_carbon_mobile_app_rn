import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Colors } from '../constants/colors';

export interface CalendarEvent {
  date: number;
  events: {
    color: string;
    type: 'dot' | 'bar';
  }[];
}

interface CalendarProps {
  initialMonth?: number;
  initialYear?: number;
  events?: CalendarEvent[];
}

const Calendar: React.FC<CalendarProps> = ({
  initialMonth = 3, // April (0-indexed)
  initialYear = 2025,
  events = [],
}) => {
  const [currentMonth, setCurrentMonth] = useState(initialMonth);
  const [currentYear, setCurrentYear] = useState(initialYear);

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'St'];

  const getDaysInMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number): number => {
    return new Date(year, month, 1).getDay();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const daysInPrevMonth = getDaysInMonth(currentMonth - 1, currentYear);

    const calendarDays = [];

    // Previous month's trailing days
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      calendarDays.push(
        <View key={`prev-${day}`} style={styles.dayContainer}>
          <Text style={[styles.dayText, styles.otherMonthText]}>{day}</Text>
        </View>,
      );
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = events.find(event => event.date === day);

      calendarDays.push(
        <TouchableOpacity key={day} style={styles.dayContainer}>
          <Text style={styles.dayText}>{day}</Text>
          {dayEvents && (
            <View style={styles.eventsContainer}>
              {dayEvents.events.map((event, index) => (
                <View
                  key={index}
                  style={[
                    event.type === 'dot' ? styles.eventDot : styles.eventBar,
                    {backgroundColor: event.color},
                  ]}
                />
              ))}
            </View>
          )}
        </TouchableOpacity>,
      );
    }

    // Next month's leading days
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    const remainingCells = totalCells - (firstDay + daysInMonth);

    for (let day = 1; day <= remainingCells; day++) {
      calendarDays.push(
        <View key={`next-${day}`} style={styles.dayContainer}>
          <Text style={[styles.dayText, styles.otherMonthText]}>{day}</Text>
        </View>,
      );
    }

    return calendarDays;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.calendar}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigateMonth('prev')}
            style={styles.navButton}>
            <Text style={styles.navButtonText}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.monthYear}>
            {monthNames[currentMonth]} {currentYear}
          </Text>

          <TouchableOpacity
            onPress={() => navigateMonth('next')}
            style={styles.navButton}>
            <Text style={styles.navButtonText}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Day names */}
        <View style={styles.dayNamesContainer}>
          {dayNames.map((dayName, index) => (
            <View key={dayName} style={styles.dayNameContainer}>
              <Text
                style={[
                  styles.dayNameText,
                  (index === 0 || index === 6) && styles.weekendDayName,
                ]}>
                {dayName}
              </Text>
            </View>
          ))}
        </View>

        {/* Calendar grid */}
        <View style={styles.calendarGrid}>{renderCalendarDays()}</View>
      </View>
    </SafeAreaView>
  );
};

export default Calendar;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
    //   justifyContent: 'center',
      paddingHorizontal: 20,
      marginTop: 24,
    },
    calendar: {
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      borderWidth: 1,
      borderColor: Colors.CardGray,
      padding: 20,
    //   shadowColor: '#000',
    //   shadowOffset: {
    //     width: 0,
    //     height: 2,
    //   },
    //   shadowOpacity: 0.1,
    //   shadowRadius: 8,
    //   elevation: 4,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    navButton: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    navButtonText: {
      fontSize: 24,
      color: '#333',
      fontWeight: '300',
    },
    monthYear: {
      fontSize: 18,
      fontWeight: '600',
      color: '#333',
    },
    dayNamesContainer: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    dayNameContainer: {
      flex: 1,
      alignItems: 'center',
    },
    dayNameText: {
      fontSize: 14,
      fontWeight: '500',
      color: '#8E8E93',
    },
    weekendDayName: {
      color: '#4ECDC4',
    },
    calendarGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    dayContainer: {
      width: '14.28%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    dayText: {
      fontSize: 16,
      color: '#333',
      fontWeight: '400',
    },
    otherMonthText: {
      color: '#C7C7CC',
    },
    eventsContainer: {
      position: 'absolute',
      bottom: 8,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    eventDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      marginHorizontal: 1,
    },
    eventBar: {
      width: 12,
      height: 3,
      borderRadius: 1.5,
      marginHorizontal: 1,
    },
  });
