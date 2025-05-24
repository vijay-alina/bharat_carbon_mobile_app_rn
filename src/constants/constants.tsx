import { WaveycheckIcon, Leaficon, BagIcon, BicycleIcon, Bulb, HutIcon } from '../images/icons';

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
        id: '1',
        label: 'Nutrition',
        icon: require('../images/icons/tap_icon.png'),
    },
    {
        id: '2',
        label: 'Housing',
        icon: require('../images/icons/tap_icon.png'),
    },
    {
        id: '3',
        label: 'Mobility',
        icon: require('../images/icons/boy_with_bicycle.png'),
    },
    {
        id: '4',
        label: 'Goods',
        icon: require('../images/icons/tap_icon.png'),
    },
    {
        id: '5',
        label: 'Home & Lifestyle',
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
        points: 180,
        co2Value: '29.4 kg',
        co2Status: 'High',
        statusColor: '#FFA500',
    },
    {
        id: '2',
        name: 'Dinesh Mehta',
        relation: 'Father',
        points: 140,
        co2Value: '37.2 kg',
        co2Status: 'Very High',
        statusColor: '#FF4D4D',
    },
    {
        id: '3',
        name: 'Kavya Mehta',
        relation: 'Daughter',
        points: 115,
        co2Value: '10.5 kg',
        co2Status: 'Normal',
        statusColor: '#28A745',
    },
    {
        id: '4',
        name: 'Akshay Swami',
        relation: 'Sibling',
        points: 0,
        co2Value: '0 kg',
        co2Status: '-',
        statusColor: '#999',
    },
    {
        id: '5',
        name: 'Aarav Mehta',
        relation: 'Son',
        points: 55,
        co2Value: '—',
        co2Status: '-',
        statusColor: '#999',
    },
];

export const introSteps = [
    {
        id: 1,
        title: 'Track & Reduce Your \nCarbon Footprint',
        description: 'Join, choose challenges, track impact, and earn rewards for sustainability.',
        image: require('../images/icons/save_earth.png'),
        backgroundColor: '#024064',
        dimension: {width: 300, height: 232},
      },
      {
        id: 2,
        title: 'Select Challenges & Take Eco-friendly Actions',
        description: 'Pick daily, weekly, monthly, or yearly tasks for sustainability.',
        image: require('../images/icons/earth_day.png'),
        backgroundColor: '#024064',
        dimension: {width: 300, height: 281},
      },
      {
        id: 3,
        title: 'Upload Bills \n & Earn Reward Points',
        description: 'Submit bills, save progress, complete tasks, and get rewarded.',
        image: require('../images/icons/receipt_and_checkout.png'),
        backgroundColor: '#024064',
        dimension: {width: 300, height: 296},
      },
];

