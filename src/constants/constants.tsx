import {CalendarEvent} from '../components/Calendar';
import {
  WaveycheckIcon,
  Leaficon,
  BagIcon,
  BicycleIcon,
  Bulb,
  HutIcon,
  ListLightIcon,
  ListDarkIcon,
  CalendarLightIcon,
  CalendarDarkIcon,
} from '../images/icons';
import {TAppTask} from '../types';

export const ClimateManifesto = {
  whatBeBelieve: {
    title: 'What We Believe',
    items: [
      {
        icon: <WaveycheckIcon />,
        title: 'Every Action Counts',
      },
      {
        icon: <WaveycheckIcon />,
        title: 'Small wins matter',
      },
      {
        icon: <WaveycheckIcon />,
        title: "we're stronger together",
      },
      {
        icon: <WaveycheckIcon />,
        title: 'Transparency build trust',
      },
    ],
  },
  OurCommitments: {
    title: 'Our Commitments',
    items: [
      {
        icon: <Leaficon />,
        title: 'Promote sustainable living through small, Consistant changes',
      },
      {
        icon: <BagIcon />,
        title: 'Encourage conscious consumption and mindful choices',
      },
      {
        icon: <BicycleIcon />,
        title: 'Support low-carbon mobility and cleaner transport options',
      },
      {
        icon: <Bulb />,
        title: 'Inspier responsible use of energy and natural resources',
      },
      {
        icon: <HutIcon />,
        title: 'Empower smarter, climate-conscious homes and lifestyles',
      },
    ],
  },
  yourRole: {
    title: 'Your Role',
    items: [
      {
        title: '_Making thoughtful, eco-friendly choices',
      },
      {
        title: '_Tracking your actions and learning from your impact',
      },
      {
        title: 'Support low-carbon mobility and cleaner transport options',
      },
      {
        title: '_Inspiring other by walking the talk',
      },
    ],
  },
};

export const Categories = [
  {
    id: 1,
    label: 'Nutrition',
    heaaderLabel: 'What did you eat?',
    icon: require('../images/icons/tap_icon.png'),
  },
  {
    id: 2,
    label: 'Housing',
    heaaderLabel: 'Housing Data',
    icon: require('../images/icons/tap_icon.png'),
  },
  {
    id: 3,
    label: 'Mobility',
    heaaderLabel: 'Track Your Mobility',
    icon: require('../images/icons/boy_with_bicycle.png'),
  },
  {
    id: 4,
    label: 'Goods',
    heaaderLabel: 'Your Goods Usage',
    icon: require('../images/icons/tap_icon.png'),
  },
  {
    id: 5,
    label: 'Leisure',
    heaaderLabel: 'Your Leisure Activities',
    icon: require('../images/icons/tap_icon.png'),
  },
];

export const FoodData = [
  {
    name: 'Tofu Stir Fry',
    points: 15,
  },
  {
    name: 'Quinoa Salad',
    points: 12,
  },
  {
    name: 'Mixed Veg Curry',
    points: 10,
  },
  {
    name: 'Oats & Almond Milk',
    points: 14,
  },
  {
    name: 'Boiled Eggs',
    points: 10,
  },
  {
    name: 'Paneer Wrap',
    points: 12,
  },
  {
    name: 'Coconut Milk Smoothie',
    points: 13,
  },
  {
    name: 'Hummus & Pita',
    points: 11,
  },
  {
    name: 'Dal Khichdi',
    points: 15,
  },
  {
    name: 'Fresh Fruit Bowl',
    points: 10,
  },
  {
    name: 'Chia Pudding',
    points: 13,
  },
  {
    name: 'Avocado Toast',
    points: 14,
  },
];

// data/familyData.ts
export const familyData = [
  {
    id: '1',
    name: 'Sanjana Dutta',
    relation: 'You',
    points: '180 points',
    co2Value: '29.4 kg',
    co2Status: 'High',
    statusColor: '#FFA500',
  },
  {
    id: '2',
    name: 'Dinesh Mehta',
    relation: 'Father',
    points: '140 points',
    co2Value: '37.2 kg',
    co2Status: 'Very High',
    statusColor: '#FF4D4D',
  },
  {
    id: '3',
    name: 'Kavya Mehta',
    relation: 'Daughter',
    points: '115 points',
    co2Value: '10.5 kg',
    co2Status: 'Normal',
    statusColor: '#28A745',
  },
  {
    id: '4',
    name: 'Akshay Swami',
    relation: 'Sibling',
    points: '120 points',
    co2Value: '0 kg',
    co2Status: '-',
    statusColor: '#999',
  },
  {
    id: '5',
    name: 'Aarav Mehta',
    relation: 'Son',
    points: '55 points',
    co2Value: '—',
    co2Status: '-',
    statusColor: '#999',
  },
];

export const introSteps = [
  {
    id: 1,
    title: 'Track & Reduce Your \nCarbon Footprint',
    description:
      'Join, choose challenges, track impact, and earn rewards for sustainability.',
    image: require('../images/icons/save_earth.png'),
    backgroundColor: '#024064',
    dimension: {width: 300, height: 232},
  },
  {
    id: 2,
    title: 'Select Challenges & Take Eco-friendly Actions',
    description:
      'Pick daily, weekly, monthly, or yearly tasks for sustainability.',
    image: require('../images/icons/earth_day.png'),
    backgroundColor: '#024064',
    dimension: {width: 300, height: 281},
  },
  {
    id: 3,
    title: 'Upload Bills \n & Earn Reward Points',
    description:
      'Submit bills, save progress, complete tasks, and get rewarded.',
    image: require('../images/icons/receipt_and_checkout.png'),
    backgroundColor: '#024064',
    dimension: {width: 300, height: 296},
  },
];

export const PaymentMethods = [
  {
    id: '1',
    label: 'Phone Pay',
    icon: require('../images/icons/phonepe-icon.png'),
  },
  {
    id: '2',
    label: 'Google Pay',
    icon: require('../images/icons/googlePay.png'),
  },
  {id: '3', label: 'UPI', icon: require('../images/icons/upi.png')},
  {id: '4', label: 'PayPal', icon: require('../images/icons/payPal.png')},
  {id: '5', label: 'Apple Pay', icon: require('../images/icons/applePay.png')},
];

export const challengeData = [
  {
    id: '1',
    title: '3-Day Challenge',
    description: 'A quick kickstart to plant-based living.',
    reward: '30 Points',
  },
  {
    id: '2',
    title: '7-Day Challenge',
    description: 'A full week of vegetarian meals.',
    reward: '100 Points',
  },
  // Add more challenges here if needed
];

export const winnerTypeFilters = ['Today', 'Weekly', 'Monthly', 'All-Time'];

export const activityTabs = [
  {
    id: 1,
    icons: [<ListLightIcon />, <ListDarkIcon />],
    label: 'List',
  },
  {
    id: 1,
    icons: [<CalendarLightIcon />, <CalendarDarkIcon />],
    label: 'Calendar',
  },
];

export const dropdownItems = [
  'All Activities',
  'Nutrition',
  'Mobility',
  'Housing',
  'Leisure',
];

export const activities = [
  {
    title: 'April 2025',
    data: [
      {
        id: '1',
        title: 'Quiona Salad',
        timestamp: 'Tue, 8 Apr 2025',
        name: 'Akshay',
        activityType: 'Nutrition',
      },
      {
        id: '2',
        title: 'Cycled 4 km',
        timestamp: 'Wed, 9 Apr 2025',
        name: 'Aarav',
        activityType: 'Mobility',
      },
      {
        id: '3',
        title: 'Reduced AC usage',
        timestamp: 'Wed, 9 Apr 2025',
        name: 'Kavya',
        activityType: 'Housing',
      },
    ],
  },
  {
    title: 'May 2025',
    data: [
      {
        id: '4',
        title: 'Watched documentry on climate',
        timestamp: 'Tue, 8 May 2025',
        name: 'Akshay',
        activityType: 'Nutrition',
      },
      {
        id: '5',
        title: 'Conduct a home energey audit',
        timestamp: 'Tue, 8 May 2025',
        name: 'Aarav',
        activityType: 'Nutrition',
      },
    ],
  },
];

export const sampleEvents: CalendarEvent[] = [
  {
    date: 1,
    events: [
      {color: '#FF6B6B', type: 'dot'},
      {color: '#4ECDC4', type: 'dot'},
    ],
  },
  {
    date: 2,
    events: [
      {color: '#45B7D1', type: 'dot'},
      {color: '#96CEB4', type: 'dot'},
      {color: '#FFEAA7', type: 'dot'},
    ],
  },
  {
    date: 3,
    events: [
      {color: '#FF6B6B', type: 'dot'},
      {color: '#4ECDC4', type: 'dot'},
    ],
  },
  {
    date: 5,
    events: [{color: '#96CEB4', type: 'dot'}],
  },
  {
    date: 6,
    events: [
      {color: '#FF6B6B', type: 'dot'},
      {color: '#4ECDC4', type: 'dot'},
    ],
  },
  {
    date: 8,
    events: [{color: '#96CEB4', type: 'dot'}],
  },
  {
    date: 9,
    events: [
      {color: '#45B7D1', type: 'dot'},
      {color: '#96CEB4', type: 'dot'},
      {color: '#FF6B6B', type: 'dot'},
    ],
  },
  {
    date: 12,
    events: [
      {color: '#45B7D1', type: 'dot'},
      {color: '#4ECDC4', type: 'dot'},
    ],
  },
];

export const aboutAppTasks: TAppTask[] = [
  {
    title: 'Welcome to\nBharat Carbon 👋',
    description:
      'Start your journey toward a sustainable\nlifestyle. Let’s take a quick tour!',
    buttonText: 'Start Tour',
  },
  {
    title: 'Your Dashboard',
    description:
      'Track your CO₂ savings, view zones\n(Green/Blue/Red), and monitor\nweekly progress.',
    buttonText: 'Next',
  },
  {
    title: 'Add Data',
    description:
      'Log your daily actions like meals,\ntravel, energy use, and earn points!',
    buttonText: 'Next',
  },
  {
    title: 'Explore Challenges',
    description:
      'Complete eco-friendly challenges to\nboost your impact and climb the\nleaderboard!',
    buttonText: 'Next',
  },
  {
    title: 'Family Impact',
    description:
      'Add family members and track\neveryone’s contributions together.',
    buttonText: 'Next',
  },
  {
    title: 'Your Profile',
    description:
      'See your badges, stats, and soon\nredeem your points for rewards!',
    buttonText: 'Next',
  },
  {
    title: 'All Set to Go!',
    description:
      'You’re ready to take climate action.\nStart logging and making a\ndifference today.',
    buttonText: 'Get Started',
    buttonText2: 'View Dashboard',
  },
];
