// All factual data for Sri Guru Raghavendra Pattina Souharda Sahakari Sangha Niyamita, Manvi.
// Bilingual labels are handled in the i18n layer; this file holds raw facts.

export const society = {
  name: {
    en: 'Sri Guru Raghavendra Pattina Souharda Sahakari Sangha Niyamita',
    kn: 'ಶ್ರೀ ಗುರು ರಾಘವೇಂದ್ರ ಪತ್ತಿನ ಸೌಹಾರ್ದ ಸಹಕಾರಿ ಸಂಘ ನಿಯಮಿತ',
  },
  shortName: { en: 'SGR Sahakari Sangha', kn: 'ಎಸ್‌ಜಿಆರ್ ಸಹಕಾರಿ ಸಂಘ' },
  place: { en: 'Manvi', kn: 'ಮಾನ್ವಿ' },
  established: '07 January 2016',
  establishedYear: 2016,
  registration: {
    en: 'Registered under the Karnataka State Souharda Sahakari Act, 1997',
    kn: 'ಕರ್ನಾಟಕ ರಾಜ್ಯ ಸೌಹಾರ್ದ ಸಹಕಾರಿ ಕಾಯ್ದೆ, 1997 ರ ಅಡಿಯಲ್ಲಿ ನೋಂದಾಯಿಸಲಾಗಿದೆ',
  },
}

export const officeHours = {
  days:     { en: 'Mon – Sat',                              kn: 'ಸೋಮ – ಶನಿ'                               },
  morning:  { en: '10:30 AM – 2:30 PM',                    kn: 'ಬೆಳಿಗ್ಗೆ 10:30 – ಮಧ್ಯಾಹ್ನ 2:30'          },
  evening:  { en: '4:30 PM – 7:00 PM',                     kn: 'ಸಂಜೆ 4:30 – 7:00'                        },
  holiday:  { en: '2nd & 4th Saturday: Closed',            kn: '2ನೇ & 4ನೇ ಶನಿವಾರ: ರಜಾ'                  },
}

export const offices = [
  {
    id: 'head',
    type: { en: 'Head Office', kn: 'ಮುಖ್ಯ ಕಚೇರಿ' },
    city: { en: 'Manvi', kn: 'ಮಾನ್ವಿ' },
    address: {
      en: '#Baygwat Complex, Near MTM Talkies, Sindhanur Road, Manvi – 584123, Karnataka, India',
      kn: '#ಬೈಗ್ವಾತ್ ಕಾಂಪ್ಲೆಕ್ಸ್, ಎಂಟಿಎಂ ಟಾಕೀಸ್ ಹತ್ತಿರ, ಸಿಂಧನೂರು ರಸ್ತೆ, ಮಾನ್ವಿ – 584123, ಕರ್ನಾಟಕ, ಭಾರತ',
    },
    email: 'sgr900manvi@gmail.com',
    phone: '08538 220900',
    mapQuery: 'Manvi, Karnataka 584123',
    coords: { lat: 15.9993385, lng: 77.0464002 },
  },
  {
    id: 'lingasugur',
    type: { en: 'Branch Office', kn: 'ಶಾಖಾ ಕಚೇರಿ' },
    city: { en: 'Lingasugur', kn: 'ಲಿಂಗಸುಗೂರು' },
    address: {
      en: '#Near Dattatraya Temple, Bus Stand Backside, Venkateswara Colony, Lingasugur – 584122, Karnataka, India',
      kn: '#ದತ್ತಾತ್ರೇಯ ದೇವಸ್ಥಾನದ ಹತ್ತಿರ, ಬಸ್ ನಿಲ್ದಾಣದ ಹಿಂಭಾಗ, ವೆಂಕಟೇಶ್ವರ ಕಾಲೋನಿ, ಲಿಂಗಸುಗೂರು – 584122, ಕರ್ನಾಟಕ, ಭಾರತ',
    },
    email: 'sgr900lingasugur@gmail.com',
    phone: '',
    mapQuery: 'Lingasugur, Karnataka 584122',
    coords: { lat: 16.1581180, lng: 76.5262930 },
  },
]

export const boardMembers = [
  { name: 'Shri. Chandrakanth Ellur', role: 'President' },
  { name: 'Shri. Shambhlingayya Hiremath', role: 'Vice President' },
  { name: 'Shri. Sudarshan Shetty', role: 'Director' },
  { name: 'Shri. N. Erayya Shetty', role: 'Director' },
  { name: 'Shri. Shrinivas Raju C.H', role: 'Director' },
  { name: 'Shri. Surendra Reddy', role: 'Director' },
  { name: 'Shri. Sayed Maheboob', role: 'Director' },
  { name: 'Smt. Devamma Meti', role: 'Director' },
  { name: 'Shri. Ramanjineyya Shetty', role: 'Director' },
  { name: 'Shri. Veresh P', role: 'Director' },
  { name: 'Shri. G. Santosh', role: 'Director' },
  { name: 'Shri. Basavantha', role: 'Director' },
  { name: 'Shri. Imanna Nayak', role: 'Director' },
  { name: 'Shri. P. Rama Raju', role: 'Director' },
  { name: 'Shri. Mallikarjun', role: 'Director' },
  { name: 'Smt. Vinoda', role: 'Director' },
]

export const headOfficeStaff = [
  { name: 'Venkatesh Ellur', role: 'Chief Executive Officer', qualification: 'BA', phone: '9886102533' },
  { name: 'Satish Ellur', role: 'Manager', qualification: 'B.Com', phone: '9980034300' },
  { name: 'Devaraj', role: 'Officer', qualification: 'BA', phone: '9945228008' },
  { name: 'Mahaboob Khan', role: 'Officer', qualification: 'B.Com', phone: '9036264618' },
  { name: 'Mounesha', role: 'Officer', qualification: 'MBA', phone: '8970698407' },
  { name: 'Ramesh Meti', role: 'Field Officer', qualification: 'BA', phone: '9148103097' },
  { name: 'Vinod Kumar', role: 'Field Officer', qualification: 'M.Com', phone: '7411112420' },
  { name: 'Sadananda', role: 'Attender', qualification: '12th Pass', phone: '9986143030' },
]

export const branchStaff = [
  { name: 'Basavaraj', role: 'Branch Manager' },
  { name: 'Maruthi', role: 'Officer' },
  { name: 'Poornima', role: 'Cashier' },
  { name: 'Lingaraj Meti', role: 'Officer' },
  { name: 'Shivakumar', role: 'Officer' },
  { name: 'Sharanabasava', role: 'Attender' },
]

// Amounts in INR. Source: society progress report 2015-16 to 2024-25.
export const progress = [
  { year: '2015-16', share: 2375700, fd: 20945616, capital: 25315296.5, loans: 15333422, profit: 3667 },
  { year: '2016-17', share: 3419800, fd: 53314359.91, capital: 59327913, loans: 45614232, profit: 1327315.4 },
  { year: '2017-18', share: 4318000, fd: 87231959, capital: 90786180, loans: 75554787, profit: 2922640.86 },
  { year: '2018-19', share: 5120300, fd: 126308428.8, capital: 139913950, loans: 116398202, profit: 4545450.5 },
  { year: '2019-20', share: 5669800, fd: 189885197.84, capital: 217153112.1, loans: 165943909.9, profit: 5150000 },
  { year: '2020-21', share: 6547400, fd: 318715355.47, capital: 338295271.73, loans: 219719615.9, profit: 5600000 },
  { year: '2021-22', share: 8939800, fd: 511467614.01, capital: 539469288.27, loans: 339388442.07, profit: 6827576.45 },
  { year: '2022-23', share: 10419900, fd: 592687159.7, capital: 743488197.41, loans: 571414115.7, profit: 7898261.77 },
  { year: '2023-24', share: 13056500, fd: 604536406, capital: 720400366.4, loans: 607335312.22, profit: 9595999 },
  { year: '2024-25', share: 15618500, fd: 728579157.81, capital: 823855941.55, loans: 696022568.16, profit: 11823868.54 },
]

export const fixedDepositRates = [
  { duration: { en: '30 to 60 days', kn: '30 ರಿಂದ 60 ದಿನಗಳು' }, rate: '6.00%' },
  { duration: { en: '60 to 180 days', kn: '60 ರಿಂದ 180 ದಿನಗಳು' }, rate: '7.00%' },
  { duration: { en: '181 days to 1 year', kn: '181 ದಿನಗಳಿಂದ 1 ವರ್ಷ' }, rate: '8.50%' },
  { duration: { en: '1 to 2 years', kn: '1 ರಿಂದ 2 ವರ್ಷ' }, rate: '10.50%' },
  { duration: { en: '2 to 3 years', kn: '2 ರಿಂದ 3 ವರ್ಷ' }, rate: '11.00%' },
]

export const seniorCitizenBonus = { en: 'Senior citizens earn an additional 0.50% interest.', kn: 'ಹಿರಿಯ ನಾಗರಿಕರಿಗೆ ಹೆಚ್ಚುವರಿ 0.50% ಬಡ್ಡಿ.' }

export const recurringPlans = [
  { invest: '₹1,000', duration: { en: '71 months', kn: '71 ತಿಂಗಳು' }, maturity: '₹1,00,000' },
  { invest: '₹2,000', duration: { en: '45 months', kn: '45 ತಿಂಗಳು' }, maturity: '₹1,11,798' },
  { invest: '₹2,500', duration: { en: '36 months', kn: '36 ತಿಂಗಳು' }, maturity: '₹1,07,000' },
  { invest: '₹5,000', duration: { en: '36 months', kn: '36 ತಿಂಗಳು' }, maturity: '₹2,14,060' },
  { invest: '₹25,000', duration: { en: '120 months', kn: '120 ತಿಂಗಳು' }, maturity: '₹54,74,000' },
]

export const specialSchemes = [
  {
    name: { en: 'Double Gain', kn: 'ಡಬಲ್ ಗೇನ್' },
    period: { en: '6 years (72 months)', kn: '6 ವರ್ಷ (72 ತಿಂಗಳು)' },
    note: { en: 'Your deposit doubles on maturity.', kn: 'ನಿಮ್ಮ ಠೇವಣಿ ಮೆಚ್ಯೂರಿಟಿಯಲ್ಲಿ ದ್ವಿಗುಣವಾಗುತ್ತದೆ.' },
  },
  {
    name: { en: 'Triple Gain', kn: 'ಟ್ರಿಪಲ್ ಗೇನ್' },
    period: { en: '9 years (108 months)', kn: '9 ವರ್ಷ (108 ತಿಂಗಳು)' },
    note: { en: 'Your deposit triples on maturity.', kn: 'ನಿಮ್ಮ ಠೇವಣಿ ಮೆಚ್ಯೂರಿಟಿಯಲ್ಲಿ ಮೂರು ಪಟ್ಟಾಗುತ್ತದೆ.' },
  },
]

export const newsAndNotices = [
  {
    id: 1,
    type: 'notice',
    date: '2025-06-10',
    title: { en: 'Annual General Meeting – FY 2024–25', kn: 'ವಾರ್ಷಿಕ ಸಾಧಾರಣ ಸಭೆ – ಆರ್ಥಿಕ ವರ್ಷ 2024–25' },
    body:  { en: 'All members are hereby notified that the Annual General Meeting of Sri Guru Raghavendra Pattina Souharda Sahakari Sangha Niyamita will be held on 15 July 2025 at the Head Office, Manvi. Attendance of all members is requested.', kn: 'ಶ್ರೀ ಗುರು ರಾಘವೇಂದ್ರ ಪತ್ತಿನ ಸೌಹಾರ್ದ ಸಹಕಾರಿ ಸಂಘ ನಿಯಮಿತದ ವಾರ್ಷಿಕ ಸಾಧಾರಣ ಸಭೆಯು 15 ಜುಲೈ 2025 ರಂದು ಮುಖ್ಯ ಕಚೇರಿ, ಮಾನ್ವಿಯಲ್ಲಿ ನಡೆಯಲಿದೆ. ಎಲ್ಲಾ ಸದಸ್ಯರ ಉಪಸ್ಥಿತಿ ಕೋರಲಾಗಿದೆ.' },
  },
  {
    id: 2,
    type: 'news',
    date: '2025-05-01',
    title: { en: 'FD Interest Rates Revised – Effective May 2025', kn: 'ಎಫ್‌ಡಿ ಬಡ್ಡಿ ದರ ಪರಿಷ್ಕರಣೆ – ಮೇ 2025 ರಿಂದ ಜಾರಿ' },
    body:  { en: 'We are pleased to announce revised Fixed Deposit interest rates effective 1 May 2025. Deposits of 1–2 years now earn 10.50% p.a. and 2–3 years earn 11.00% p.a. Senior citizens receive an additional 0.50%.', kn: '1 ಮೇ 2025 ರಿಂದ ನಿಶ್ಚಿತ ಠೇವಣಿ ಬಡ್ಡಿ ದರಗಳನ್ನು ಪರಿಷ್ಕರಿಸಲಾಗಿದೆ. 1–2 ವರ್ಷ ಠೇವಣಿಗೆ 10.50% ಮತ್ತು 2–3 ವರ್ಷಕ್ಕೆ 11.00% ವಾರ್ಷಿಕ ಬಡ್ಡಿ ದೊರೆಯುತ್ತದೆ. ಹಿರಿಯ ನಾಗರಿಕರಿಗೆ ಹೆಚ್ಚುವರಿ 0.50%.' },
  },
  {
    id: 3,
    type: 'news',
    date: '2025-04-07',
    title: { en: 'Society Completes 9 Years of Service', kn: 'ಸಂಘವು 9 ವರ್ಷಗಳ ಸೇವೆ ಪೂರ್ಣಗೊಳಿಸಿದೆ' },
    body:  { en: 'On 7 January 2025, our society proudly completed 9 years of dedicated service to the communities of Manvi and Lingasugur. With a working capital of over ₹8 Cr and thousands of trusted members, we thank you for your continued support.', kn: '7 ಜನವರಿ 2025 ರಂದು ನಮ್ಮ ಸಂಘವು ಮಾನ್ವಿ ಮತ್ತು ಲಿಂಗಸುಗೂರು ಸಮುದಾಯಗಳಿಗೆ 9 ವರ್ಷಗಳ ಸೇವೆ ಪೂರ್ಣಗೊಳಿಸಿದೆ. ₹8 ಕೋಟಿಗೂ ಹೆಚ್ಚಿನ ದುಡಿಯುವ ಬಂಡವಾಳ ಮತ್ತು ಸಾವಿರಾರು ನಂಬಿಕಸ್ತ ಸದಸ್ಯರೊಂದಿಗೆ ನಿಮ್ಮ ಬೆಂಬಲಕ್ಕೆ ಧನ್ಯವಾದಗಳು.' },
  },
  {
    id: 4,
    type: 'notice',
    date: '2025-03-20',
    title: { en: 'Lingasugur Branch – Extended Hours (Temporary)', kn: 'ಲಿಂಗಸುಗೂರು ಶಾಖೆ – ತಾತ್ಕಾಲಿಕ ವಿಸ್ತರಿತ ಸಮಯ' },
    body:  { en: 'The Lingasugur branch will operate with extended hours (9:00 AM – 7:00 PM) from 25 March to 31 March 2025 to assist members with year-end account settlements.', kn: 'ಆರ್ಥಿಕ ವರ್ಷಾಂತ್ಯದ ಖಾತೆ ಇತ್ಯರ್ಥಕ್ಕಾಗಿ 25 ರಿಂದ 31 ಮಾರ್ಚ್ 2025 ರವರೆಗೆ ಲಿಂಗಸುಗೂರು ಶಾಖೆ ವಿಸ್ತರಿತ ಸಮಯ (ಬೆಳಿಗ್ಗೆ 9:00 – ಸಂಜೆ 7:00) ಕಾರ್ಯನಿರ್ವಹಿಸಲಿದೆ.' },
  },
  {
    id: 5,
    type: 'news',
    date: '2025-01-15',
    title: { en: 'New Loan Schemes Launched for FY 2025–26', kn: 'ಆರ್ಥಿಕ ವರ್ಷ 2025–26 ಕ್ಕಾಗಿ ಹೊಸ ಸಾಲ ಯೋಜನೆಗಳು' },
    body:  { en: 'We are delighted to introduce new personal and business loan schemes for FY 2025–26 with competitive interest rates and flexible repayment options. Visit our office or contact us to know more.', kn: 'ಆರ್ಥಿಕ ವರ್ಷ 2025–26 ಕ್ಕಾಗಿ ಸ್ಪರ್ಧಾತ್ಮಕ ಬಡ್ಡಿ ದರ ಮತ್ತು ಹೊಂದಿಕೊಳ್ಳಬಲ್ಲ ಮರುಪಾವತಿ ಆಯ್ಕೆಗಳೊಂದಿಗೆ ಹೊಸ ವೈಯಕ್ತಿಕ ಮತ್ತು ವ್ಯಾಪಾರ ಸಾಲ ಯೋಜನೆಗಳನ್ನು ಪರಿಚಯಿಸಲಾಗುತ್ತಿದೆ.' },
  },
  {
    id: 6,
    type: 'notice',
    date: '2024-12-01',
    title: { en: 'Office Closed – Public Holidays Dec 2024', kn: 'ಕಚೇರಿ ಮುಚ್ಚಿರುತ್ತದೆ – ಡಿಸೆಂಬರ್ 2024 ಸಾರ್ವಜನಿಕ ರಜಾದಿನಗಳು' },
    body:  { en: 'Both offices will remain closed on 25 December 2024 (Christmas) and 1 January 2025 (New Year). We wish all our members a joyous festive season.', kn: '25 ಡಿಸೆಂಬರ್ 2024 (ಕ್ರಿಸ್‌ಮಸ್) ಮತ್ತು 1 ಜನವರಿ 2025 (ಹೊಸ ವರ್ಷ) ಎರಡೂ ಕಚೇರಿಗಳು ಮುಚ್ಚಿರುತ್ತವೆ. ಎಲ್ಲಾ ಸದಸ್ಯರಿಗೆ ಶುಭಾಶಯಗಳು.' },
  },
]

// Paste your deployed Apps Script Web App URLs here after setup.
export const galleryApiUrl = 'https://script.google.com/macros/s/AKfycbzug76zC_1FtNSmpVglsGcBXg41J_b-8grWV56KlpKNt1bRlKPw7a5USkNxZDVMie4sIQ/exec'
export const newsApiUrl    = 'https://script.google.com/macros/s/AKfycbyi84J6AS2nnNY0-_ooXQADyqAqHE8d2flXj6UjkzT6JVooGGRIEunwNPV4k80Sa74P3Q/exec'

// Derived headline stats for the proof section (latest year = 2024-25).
const latest = progress[progress.length - 1]
export const headlineStats = {
  workingCapital: latest.capital,
  fixedDeposit: latest.fd,
  loans: latest.loans,
  profit: latest.profit,
  branches: offices.length,
  yearsServing: 2026 - society.establishedYear,
}
