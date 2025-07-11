// import {CalendarEvent} from '../components/Calendar';
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
  TapIcon,
  WasteIcon,
  ElectricityIcon,
  CyclingIcon,
  PublicTransportIcon,
  CarpoolIcon,
  EleticScotterIcon,
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

export const chooseChallengePeriod = [
  {
    id: '1',
    title: '3-Day Challenge',
    description: 'A quick kickstart to plant-based living.',
    reward: '30 Points',
    day: 3,
    point: 30,
  },
  {
    id: '2',
    title: '7-Day Challenge',
    description: 'Commit to a week of conscious water convervation.',
    reward: '100 Points',
    day: 7,
    point: 100,
  },
  {
    id: '3',
    title: 'Monthly Challenge',
    description: 'Make lasting changes for a month of water efficiency.',
    reward: '500 Points',
    day: 30,
    point: 500,
  },
];

export const winnerTypeFilters = ['today', 'weekly', 'monthly', 'allTime'];

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
  {
    id: '4',
    title: 'Quiona Salad',
    timestamp: 'Tue, 8 Apr 2025',
    name: 'Akshay',
    activityType: 'Nutrition',
  },
  {
    id: '5',
    title: 'Cycled 4 km',
    timestamp: 'Wed, 9 Apr 2025',
    name: 'Aarav',
    activityType: 'Mobility',
  },
  {
    id: '6',
    title: 'Reduced AC usage',
    timestamp: 'Wed, 9 Apr 2025',
    name: 'Kavya',
    activityType: 'Housing',
  },
  {
    id: '7',
    title: 'Quiona Salad',
    timestamp: 'Tue, 8 Apr 2025',
    name: 'Akshay',
    activityType: 'Nutrition',
  },
  {
    id: '8',
    title: 'Cycled 4 km',
    timestamp: 'Wed, 9 Apr 2025',
    name: 'Aarav',
    activityType: 'Mobility',
  },
  {
    id: '9',
    title: 'Reduced AC usage',
    timestamp: 'Wed, 9 Apr 2025',
    name: 'Kavya',
    activityType: 'Housing',
  },
  {
    id: '10',
    title: 'Quiona Salad',
    timestamp: 'Tue, 8 Apr 2025',
    name: 'Akshay',
    activityType: 'Nutrition',
  },
  {
    id: '11',
    title: 'Cycled 4 km',
    timestamp: 'Wed, 9 Apr 2025',
    name: 'Aarav',
    activityType: 'Mobility',
  },
  {
    id: '12',
    title: 'Reduced AC usage',
    timestamp: 'Wed, 9 Apr 2025',
    name: 'Kavya',
    activityType: 'Housing',
  },
  {
    id: '13',
    title: 'Quiona Salad',
    timestamp: 'Tue, 8 Apr 2025',
    name: 'Akshay',
    activityType: 'Nutrition',
  },
  {
    id: '14',
    title: 'Cycled 4 km',
    timestamp: 'Wed, 9 Apr 2025',
    name: 'Aarav',
    activityType: 'Mobility',
  },
  {
    id: '15',
    title: 'Reduced AC usage',
    timestamp: 'Wed, 9 Apr 2025',
    name: 'Kavya',
    activityType: 'Housing',
  },
  {
    id: '16',
    title: 'Quiona Salad',
    timestamp: 'Tue, 8 Apr 2025',
    name: 'Akshay',
    activityType: 'Nutrition',
  },
  {
    id: '17',
    title: 'Cycled 4 km',
    timestamp: 'Wed, 9 Apr 2025',
    name: 'Aarav',
    activityType: 'Mobility',
  },
  {
    id: '18',
    title: 'Reduced AC usage',
    timestamp: 'Wed, 9 Apr 2025',
    name: 'Kavya',
    activityType: 'Housing',
  },
  {
    id: '19',
    title: 'Quiona Salad',
    timestamp: 'Tue, 8 Apr 2025',
    name: 'Akshay',
    activityType: 'Nutrition',
  },
  {
    id: '20',
    title: 'Cycled 4 km',
    timestamp: 'Wed, 9 Apr 2025',
    name: 'Aarav',
    activityType: 'Mobility',
  },
];

export const activityTwo = [
  {
    id: '21',
    title: 'Reduced AC usage',
    timestamp: 'Wed, 9 Apr 2025',
    name: 'Kavya',
    activityType: 'Housing',
  },
  {
    id: '22',
    title: 'Quiona Salad',
    timestamp: 'Tue, 8 Apr 2025',
    name: 'Akshay',
    activityType: 'Nutrition',
  },
  {
    id: '23',
    title: 'Cycled 4 km',
    timestamp: 'Wed, 9 Apr 2025',
    name: 'Aarav',
    activityType: 'Mobility',
  },
  {
    id: '24',
    title: 'Reduced AC usage',
    timestamp: 'Wed, 9 Apr 2025',
    name: 'Kavya',
    activityType: 'Housing',
  },
  {
    id: '25',
    title: 'Quiona Salad',
    timestamp: 'Tue, 8 Apr 2025',
    name: 'Akshay',
    activityType: 'Nutrition',
  },
  {
    id: '26',
    title: 'Cycled 4 km',
    timestamp: 'Wed, 9 Apr 2025',
    name: 'Aarav',
    activityType: 'Mobility',
  },
  {
    id: '27',
    title: 'Reduced AC usage',
    timestamp: 'Wed, 9 Apr 2025',
    name: 'Kavya',
    activityType: 'Housing',
  },
  {
    id: '28',
    title: 'Quiona Salad',
    timestamp: 'Tue, 8 Apr 2025',
    name: 'Akshay',
    activityType: 'Nutrition',
  },
  {
    id: '29',
    title: 'Cycled 4 km',
    timestamp: 'Wed, 9 Apr 2025',
    name: 'Aarav',
    activityType: 'Mobility',
  },
  {
    id: '30',
    title: 'Reduced AC usage',
    timestamp: 'Wed, 9 Apr 2025',
    name: 'Kavya',
    activityType: 'Housing',
  },
  {
    id: '31',
    title: 'Quiona Salad',
    timestamp: 'Tue, 8 Apr 2025',
    name: 'Akshay',
    activityType: 'Nutrition',
  },
  {
    id: '32',
    title: 'Cycled 4 km',
    timestamp: 'Wed, 9 Apr 2025',
    name: 'Aarav',
    activityType: 'Mobility',
  },
  {
    id: '33',
    title: 'Reduced AC usage',
    timestamp: 'Wed, 9 Apr 2025',
    name: 'Kavya',
    activityType: 'Housing',
  },
  {
    id: '34',
    title: 'Watched documentry on climate',
    timestamp: 'Tue, 8 May 2025',
    name: 'Akshay',
    activityType: 'Nutrition',
  },
  {
    id: '35',
    title: 'Conduct a home energey audit',
    timestamp: 'Wed, 9 May 2025',
    name: 'Aarav',
    activityType: 'Nutrition',
  },
];

export const monthActivities = [
  {
    id: '1',
    title: 'Quiona Salad 111',
    date: 8,
    events: {color: '#FF6B6B', type: 'dot'},
    timestamp: 'Tue, 8 Apr 2025',
    name: 'Akshay',
    activityType: 'Nutrition',
  },
  {
    id: '2',
    title: 'Cycled 4 km 222',
    date: 9,
    events: {color: '#FF6B6B', type: 'dot'},
    timestamp: 'Wed, 9 Apr 2025',
    name: 'Aarav',
    activityType: 'Mobility',
  },
  {
    id: '3',
    title: 'Reduced AC usage 333',
    date: 9,
    events: {color: '#FF6B6B', type: 'dot'},
    timestamp: 'Wed, 9 Apr 2025',
    name: 'Kavya',
    activityType: 'Housing',
  },
];

// export const sampleEvents: CalendarEvent[] = [
//   {
//     date: 1,
//     events: [
//       {color: '#FF6B6B', type: 'dot'},
//       {color: '#4ECDC4', type: 'dot'},
//     ],
//   },
//   {
//     date: 2,
//     events: [
//       {color: '#45B7D1', type: 'dot'},
//       {color: '#96CEB4', type: 'dot'},
//       {color: '#FFEAA7', type: 'dot'},
//     ],
//   },
//   {
//     date: 3,
//     events: [
//       {color: '#FF6B6B', type: 'dot'},
//       {color: '#4ECDC4', type: 'dot'},
//     ],
//   },
//   {
//     date: 5,
//     events: [{color: '#96CEB4', type: 'dot'}],
//   },
//   {
//     date: 6,
//     events: [
//       {color: '#FF6B6B', type: 'dot'},
//       {color: '#4ECDC4', type: 'dot'},
//     ],
//   },
//   {
//     date: 8,
//     events: [{color: '#96CEB4', type: 'dot'}],
//   },
//   {
//     date: 9,
//     events: [
//       {color: '#45B7D1', type: 'dot'},
//       {color: '#96CEB4', type: 'dot'},
//       {color: '#FF6B6B', type: 'dot'},
//     ],
//   },
//   {
//     date: 12,
//     events: [
//       {color: '#45B7D1', type: 'dot'},
//       {color: '#4ECDC4', type: 'dot'},
//     ],
//   },
// ];

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

export const challengesStatus = [
  {
    id: '1',
    icon: TapIcon,
    header: 'Save Water Challenge',
    duration: 7,
    description: 'Keep it up! Every drop counts.',
    color: '#1692DC',
    points: 100,
    completedDays: 3,
  },
  {
    id: '2',
    icon: ElectricityIcon,
    header: 'Energy Saver Challenge',
    duration: 3,
    description: 'Keep it up! Every drop counts.',
    color: '#1692DC',
    points: 100,
    completedDays: 2,
  },
  {
    id: '3',
    icon: WasteIcon,
    header: 'Waste Challenge',
    duration: 30,
    description: 'Keep it up! Every drop counts.',
    color: '#1692DC',
    points: 100,
    completedDays: 20,
  },
  {
    id: '4',
    icon: CyclingIcon,
    header: 'Walk or Cycle Challenge',
    duration: 4,
    description: 'Keep it up! Every drop counts.',
    color: '#EE7926',
    points: 100,
    completedDays: 3,
  },
  {
    id: '5',
    icon: PublicTransportIcon,
    header: 'Use Public Transport',
    duration: 4,
    description: 'Keep it up! Every drop counts.',
    color: '#EE7926',
    points: 100,
    completedDays: 3,
  },
  {
    id: '6',
    icon: CarpoolIcon,
    header: 'Carpool with Others',
    duration: 4,
    description: 'Keep it up! Every drop counts.',
    color: '#EE7926',
    points: 100,
    completedDays: 3,
  },
  {
    id: '7',
    icon: EleticScotterIcon,
    header: 'Low-Emission Vehicle',
    duration: 4,
    description: 'Keep it up! Every drop counts.',
    color: '#EE7926',
    points: 100,
    completedDays: 3,
  },
];

export const termsCondition = `These Terms and Conditions ("Terms") define the access to and use of the Bharat Carbon application (the "App"), developed by Alina softwares ("we," "us," or "our"). By accessing or using the App, you agree to these Terms and the Privacy Policy.

1. Acceptance of terms
By using the App, you agree to all of these Terms. If you do not agree, you must stop using the App immediately. 

2. User representations
When using the App, you confirm that you are at least [Minimum Age]. You also confirm having the legal right to agree to these Terms. Furthermore, you are not in a country under U.S. embargo or considered a "terrorist supporting" country, nor are you on any U.S. prohibited or restricted lists.

3. User registration
You may need to register for the App. You are responsible for keeping your password secure. 

4. Intellectual property rights
The App, its content (including code, designs, and graphics), and trademarks are owned or licensed by the company. They are protected by law. 

5. Prohibited activities
You can only use the App for its intended purpose and not for unauthorized commercial activities. You agree not to: 
Collect data from the App without permission.
Use the App improperly, such as collecting user information for unsolicited emails or creating fake accounts.
Interfere with the App's security features.
Link to or frame the App without authorization.
Upload or transmit viruses or other harmful material.
Use automated tools like scripts or data mining robots. 

6. User generated contributions
You may be able to contribute content ("Contributions") to the App. You grant the company a worldwide, royalty-free license to use your Contributions on the platform. You confirm that you own or have the necessary rights to use your Contributions, that they are accurate and not misleading, and do not violate any third party's privacy or publicity rights. 

7. App management
The company can monitor the App for violations, take legal action against users who break the law or these Terms, and remove or disable content or files at its discretion. 

8. Privacy policy
Your data privacy is important. By using the App, you agree to the Privacy Policy, which is part of these Terms. The App is hosted in [Your Jurisdiction]. 

9. Term and termination
These Terms are valid while you use the App. The company can end your use of the App at any time for any reason without notice. 

10. Modifications and interruptions
The company can change, modify, or remove App content or discontinue the App at any time without notice. 

11. Governing law
These Terms and your use of the App are governed by the laws of India. 
12. Limitation of liability
The company and its representatives are not liable for any damages, including lost profits or data, from your use of the App, even if aware of the possibility. The liability to you is limited to the amount you paid in the [Time Period] before any issue arose. 

13. Contact us
For questions about these Terms, contact us at: [Your Contact Information]. 
Please note: This is a basic template. You may need to add or remove clauses depending on your app. Consulting legal counsel is recommended to ensure your terms are legally sound and specific to your needs.`;
