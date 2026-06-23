const express = require('express');
const router = express.Router();

const cities = [
  {
    id: 'peshawar',
    name: 'Peshawar',
    highlighted: true,
    address: 'B1, Old Jamrud Road, near Bitani Plaza, University Town, Peshawar',
    hours: '12:00 PM – 1:00 AM',
    phone: '+92-91-1234567',
    mapUrl: ''
  },
  {
    id: 'islamabad',
    name: 'Islamabad',
    highlighted: false,
    address: 'I-8 Markaz, Islamabad',
    hours: '12:00 PM – 1:00 AM',
    phone: '+92-51-1234567',
    mapUrl: ''
  },
  {
    id: 'lahore-model-town',
    name: 'Lahore - Model Town',
    highlighted: false,
    address: 'Model Town Link Road, Lahore',
    hours: '12:00 PM – 1:00 AM',
    phone: '+92-42-1234567',
    mapUrl: ''
  },
  {
    id: 'lahore-garhi-shahu',
    name: 'Lahore - Garhi Shahu',
    highlighted: false,
    address: '84 Allama Iqbal Road, Garhi Shahu, Lahore',
    hours: '12:00 PM – 1:00 AM',
    phone: '+92-42-7654321',
    mapUrl: ''
  },
  {
    id: 'faisalabad',
    name: 'Faisalabad',
    highlighted: false,
    address: 'Pearl City, ChenOne Road, Samanabad, Faisalabad',
    hours: '12:00 PM – 1:00 AM',
    phone: '+92-41-1234567',
    mapUrl: ''
  },
  {
    id: 'multan',
    name: 'Multan',
    highlighted: false,
    address: 'A Block, Opposite Double Cheeze, Gulgasht Colony, Multan',
    hours: '12:00 PM – 1:00 AM',
    phone: '+92-61-1234567',
    mapUrl: ''
  },
  {
    id: 'swat',
    name: 'Swat',
    highlighted: false,
    address: 'Mingora, Swat',
    hours: '12:00 PM – 1:00 AM',
    phone: '+92-943-1234567',
    mapUrl: ''
  },
  {
    id: 'karachi',
    name: 'Karachi',
    highlighted: false,
    address: 'Coming Soon',
    hours: 'Coming Soon',
    phone: '',
    mapUrl: ''
  },
  {
    id: 'chiniot',
    name: 'Chiniot',
    highlighted: false,
    address: 'Coming Soon',
    hours: 'Coming Soon',
    phone: '',
    mapUrl: ''
  },
  {
    id: 'bahawalpur',
    name: 'Bahawalpur',
    highlighted: false,
    address: 'Coming Soon',
    hours: 'Coming Soon',
    phone: '',
    mapUrl: ''
  }
];

router.get('/', (req, res) => {
  res.json(cities);
});

router.get('/:id', (req, res) => {
  const city = cities.find(c => c.id === req.params.id);
  if (!city) return res.status(404).json({ message: 'City not found' });
  res.json(city);
});

module.exports = router;
