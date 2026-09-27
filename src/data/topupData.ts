import { GameItem, FaqItem } from '../types/topup';

// Using local generated assets with fallback
import heroBannerImg from '../assets/images/lewra_topup_hero_banner_1790497342944.jpg';
import diamondBadgeImg from '../assets/images/free_fire_diamonds_badge_1790497359356.jpg';
import membershipBadgeImg from '../assets/images/ff_membership_card_1790497374066.jpg';
import efootballBadgeImg from '../assets/images/efootball_coins_badge_1790497390074.jpg';

export const HERO_BANNER = heroBannerImg;

export const GAME_ITEMS: GameItem[] = [
  // Top Up Offer
  {
    id: 'free-diamonds',
    title: 'Free Diamonds',
    subtitle: 'ফ্রি ডায়মন্ড অফার',
    category: 'offer',
    image: diamondBadgeImg,
    badge: 'Special',
    requirePlayerId: true,
    placeholderText: 'Free Fire Player ID (UID)',
    description: 'দৈনিক ফ্রি স্পিন ও ডায়মন্ড বোনাস অফার। শুধুমাত্র প্লেয়ার আইডি দিয়ে ফ্রিতে ডায়মন্ড জিতে নিন!',
    packages: [
      { id: 'fd-1', name: '5 Diamonds Bonus (Free)', diamonds: 5, price: 0, originalPrice: 10, bonus: 'Daily Free' },
      { id: 'fd-2', name: '25 + 5 Free Diamonds', diamonds: 30, price: 20, originalPrice: 28, bonus: '+5 Bonus' },
      { id: 'fd-3', name: '50 + 10 Free Diamonds', diamonds: 60, price: 40, originalPrice: 55, bonus: '+10 Bonus' },
      { id: 'fd-4', name: '100 + 25 Free Diamonds', diamonds: 125, price: 79, originalPrice: 110, bonus: '+25 Bonus' },
    ]
  },
  {
    id: 'topup-offer',
    title: 'Top Up OFFER',
    subtitle: 'স্পেশাল অফার',
    category: 'offer',
    image: diamondBadgeImg,
    badge: 'Hot Deal',
    requirePlayerId: true,
    placeholderText: 'Free Fire Player ID (UID)',
    description: 'সীমিত সময়ের জন্য অবিশ্বাস্য ডিসকাউন্টে স্পেশাল ডায়মন্ড প্যাক।',
    packages: [
      { id: 'to-1', name: '115 Diamonds Special', diamonds: 115, price: 78, originalPrice: 95, tag: 'Best Value' },
      { id: 'to-2', name: '240 Diamonds Special', diamonds: 240, price: 160, originalPrice: 190, tag: 'Popular' },
      { id: 'to-3', name: '610 Diamonds Flash Sale', diamonds: 610, price: 400, originalPrice: 470, tag: 'Mega Save' },
      { id: 'to-4', name: '1240 Diamonds Mega Pack', diamonds: 1240, price: 790, originalPrice: 940, tag: 'Exclusive' },
    ]
  },

  // Free Fire Diamond Top Up
  {
    id: 'ff-topup-bd',
    title: 'Free Fire Top Up Bangladesh',
    subtitle: 'ইনস্ট্যান্ট প্লেয়ার আইডি টপ আপ',
    category: 'freefire',
    image: diamondBadgeImg,
    badge: 'Instant 0-5s',
    requirePlayerId: true,
    placeholderText: 'Enter Free Fire Player ID (e.g. 1928374650)',
    description: 'বাংলাদেশ সার্ভারে সবচেয়ে কম মূল্যে মাত্র ৫ সেকেন্ডে ফ্রি ফায়ার ডায়মন্ড টপ আপ করুন। পাসওয়ার্ড লাগবে না, শুধু প্লেয়ার আইডি যথেষ্ট।',
    packages: [
      { id: 'ff-25', name: '25 Diamonds', diamonds: 25, price: 22, originalPrice: 25 },
      { id: 'ff-50', name: '50 Diamonds', diamonds: 50, price: 42, originalPrice: 48 },
      { id: 'ff-115', name: '115 Diamonds', diamonds: 115, price: 85, originalPrice: 95, tag: 'Most Popular' },
      { id: 'ff-240', name: '240 Diamonds', diamonds: 240, price: 170, originalPrice: 190 },
      { id: 'ff-355', name: '355 Diamonds', diamonds: 355, price: 250, originalPrice: 280 },
      { id: 'ff-505', name: '505 Diamonds', diamonds: 505, price: 350, originalPrice: 390 },
      { id: 'ff-610', name: '610 Diamonds', diamonds: 610, price: 425, originalPrice: 470, tag: 'Recommended' },
      { id: 'ff-1240', name: '1240 Diamonds', diamonds: 1240, price: 840, originalPrice: 930 },
      { id: 'ff-2530', name: '2530 Diamonds', diamonds: 2530, price: 1690, originalPrice: 1850 },
      { id: 'ff-5060', name: '5060 Diamonds', diamonds: 5060, price: 3350, originalPrice: 3700, tag: 'VIP Pack' },
    ]
  },
  {
    id: 'weekly-lite',
    title: 'Weekly LITE',
    subtitle: 'সাপ্তাহিক লাইট পাস',
    category: 'freefire',
    image: membershipBadgeImg,
    requirePlayerId: true,
    placeholderText: 'Free Fire Player ID (UID)',
    description: 'Weekly Lite পাস নিয়ে নিন এক ক্লিকেই। প্রতিদিন নিশ্চিত ডায়মন্ড ক্লেইম করুন।',
    packages: [
      { id: 'wl-1', name: 'Weekly LITE (7 Days)', diamonds: 150, price: 45, originalPrice: 55, tag: 'Fast Claim' },
      { id: 'wl-2', name: 'Weekly LITE 2x Bundle', diamonds: 300, price: 88, originalPrice: 110 },
      { id: 'wl-3', name: 'Weekly LITE 4x Bundle (1 Month)', diamonds: 600, price: 175, originalPrice: 210 },
    ]
  },
  {
    id: 'ff-membership',
    title: 'Free Fire Membership',
    subtitle: 'উইকলি ও মান্থলি মেম্বারশিপ',
    category: 'freefire',
    image: membershipBadgeImg,
    badge: 'VIP Membership',
    requirePlayerId: true,
    placeholderText: 'Free Fire Player ID (UID)',
    description: 'Weekly Membership এবং Monthly Membership দিয়ে ডায়মন্ড সাশ্রয় করুন। প্রতি সপ্তাহে ৪৫০ এবং প্রতি মাসে ২৬০০ ডায়মন্ড পাওয়ার সুযোগ!',
    packages: [
      { id: 'ff-m-weekly', name: 'Weekly Membership (450 💎)', diamonds: 450, price: 165, originalPrice: 185, tag: 'Hot' },
      { id: 'ff-m-monthly', name: 'Monthly Membership (2600 💎)', diamonds: 2600, price: 840, originalPrice: 920, tag: 'Huge Save' },
      { id: 'ff-m-combo', name: 'Super Combo (Weekly + Monthly)', diamonds: 3050, price: 990, originalPrice: 1100, tag: 'Best Deal' },
    ]
  },
  {
    id: 'level-up-pass',
    title: 'Level Up Pass Bangladesh',
    subtitle: 'লেভেল আপ পাস',
    category: 'freefire',
    image: membershipBadgeImg,
    requirePlayerId: true,
    placeholderText: 'Free Fire Player ID (UID)',
    description: 'লেভেল আপ পাস নিলে পাবেন ১০০০ ডায়মন্ড পর্যন্ত বিশেষ রিওয়ার্ড। আপনার অ্যাকাউন্টে লেভেল ৩০ হলে পুরো রিওয়ার্ড আনলক হবে।',
    packages: [
      { id: 'lup-bd', name: 'Level Up Pass (Up to 1000 💎)', diamonds: 1000, price: 399, originalPrice: 450, tag: 'One Time Deal' },
      { id: 'lup-bd-adv', name: 'Level Up Pass + 115 Diamonds', diamonds: 1115, price: 475, originalPrice: 535 },
    ]
  },
  {
    id: 'ff-like',
    title: 'Free Fire Like',
    subtitle: 'প্রোফাইল লাইক সার্ভিস',
    category: 'freefire',
    image: diamondBadgeImg,
    requirePlayerId: true,
    placeholderText: 'Free Fire Player ID (UID)',
    description: 'আপনার ফ্রি ফায়ার প্রোফাইলে রিয়েল প্লেয়ার লাইক বাড়িয়ে নিন খুব দ্রুত। কোনো আইডি ব্যান হওয়ার ঝুঁকি নেই।',
    packages: [
      { id: 'like-100', name: '100 Profile Likes', price: 25, originalPrice: 35 },
      { id: 'like-500', name: '500 Profile Likes', price: 99, originalPrice: 140, tag: 'Popular' },
      { id: 'like-1000', name: '1000 Profile Likes', price: 180, originalPrice: 250 },
      { id: 'like-5000', name: '5000 Profile Likes', price: 799, originalPrice: 1100, tag: 'King Pack' },
    ]
  },
  {
    id: 'indo-topup',
    title: 'ইন্দোনেশিয়া টপ আপ',
    subtitle: 'Indonesia Server Top Up',
    category: 'freefire',
    image: diamondBadgeImg,
    requirePlayerId: true,
    placeholderText: 'Indonesia Server Player ID (UID)',
    description: 'ইন্দোনেশিয়া সার্ভার আইডি টপ আপ। বিশেষ ইভেন্ট ও বান্ডেল আইটেম আনলক করতে ডায়মন্ড রিচার্জ করুন।',
    packages: [
      { id: 'indo-70', name: '70 Diamonds (Indonesia)', diamonds: 70, price: 65, originalPrice: 75 },
      { id: 'indo-140', name: '140 Diamonds (Indonesia)', diamonds: 140, price: 125, originalPrice: 145 },
      { id: 'indo-355', name: '355 Diamonds (Indonesia)', diamonds: 355, price: 295, originalPrice: 340 },
      { id: 'indo-720', name: '720 Diamonds (Indonesia)', diamonds: 720, price: 580, originalPrice: 650 },
    ]
  },

  // E-Football
  {
    id: 'suarez-casillas',
    title: 'Luis Suárez & Iker Casillas',
    subtitle: 'লুইস সুয়ারেজ ও ইকার ক্যাসিয়াস',
    category: 'efootball',
    image: efootballBadgeImg,
    badge: 'Epic Player',
    requirePlayerId: true,
    placeholderText: 'Konami ID / eFootball Username',
    description: 'লিজেন্ডারি ফুটবলার লুইস সুয়ারেজ এবং গোলকিপার ইকার ক্যাসিয়াস স্পেশাল ইভেন্ট টোকেন।',
    packages: [
      { id: 'epic-1', name: '500 eFootball Coins + Scout Token', price: 420, originalPrice: 480 },
      { id: 'epic-2', name: '1050 eFootball Coins Pack', price: 830, originalPrice: 920, tag: 'Recommended' },
      { id: 'epic-3', name: '2130 eFootball Coins Mega Pack', price: 1650, originalPrice: 1800 },
    ]
  },
  {
    id: 'efootball-event',
    title: 'E-Football Event Top Up',
    subtitle: 'ইভেন্ট প্যাক রিচার্জ',
    category: 'efootball',
    image: efootballBadgeImg,
    requirePlayerId: true,
    placeholderText: 'Konami ID or User ID',
    description: 'চলমান eFootball বিশেষ টুর্নামেন্ট ও ইভেন্টের জন্য দ্রুত কয়েন ও পয়েন্ট টপ আপ।',
    packages: [
      { id: 'ef-ev-1', name: '300 eFootball Coins', price: 260, originalPrice: 290 },
      { id: 'ef-ev-2', name: '700 eFootball Coins', price: 560, originalPrice: 620 },
      { id: 'ef-ev-3', name: '1500 eFootball Coins', price: 1190, originalPrice: 1320, tag: 'Event Special' },
    ]
  },
  {
    id: 'efootball-coin',
    title: 'E Football Coin',
    subtitle: 'অফিসিয়াল ই-ফুটবল কয়েন',
    category: 'efootball',
    image: efootballBadgeImg,
    requirePlayerId: true,
    placeholderText: 'Konami ID or Player UID',
    description: 'খেলোয়াড় ড্র ও স্কিল আপগ্রেডের জন্য সবচেয়ে কম দামে সরাসরি কয়েন কিনুন।',
    packages: [
      { id: 'ef-c-130', name: '130 Coins', price: 115, originalPrice: 130 },
      { id: 'ef-c-320', name: '320 Coins', price: 270, originalPrice: 300 },
      { id: 'ef-c-550', name: '550 Coins', price: 450, originalPrice: 495 },
      { id: 'ef-c-1040', name: '1040 Coins', price: 840, originalPrice: 930, tag: 'Most Popular' },
      { id: 'ef-c-2130', name: '2130 Coins', price: 1680, originalPrice: 1850 },
      { id: 'ef-c-3250', name: '3250 Coins', price: 2520, originalPrice: 2790 },
    ]
  },

  // Social Media Service
  {
    id: 'tiktok-followers',
    title: 'TikTok Account Followers',
    subtitle: 'টিকটক ফলোয়ার সার্ভিস',
    category: 'social',
    image: diamondBadgeImg,
    requirePlayerId: false,
    placeholderText: 'TikTok Profile Link (@username)',
    description: 'অরগানিক ও অ্যাক্টিভ টিকটক ফলোয়ার সার্ভিস। কোনো পাসওয়ার্ড দরকার নেই, শুধু প্রোফাইল লিংক দিন।',
    packages: [
      { id: 'tt-100', name: '100 Active Followers', price: 40, originalPrice: 60 },
      { id: 'tt-500', name: '500 Active Followers', price: 160, originalPrice: 220, tag: 'Best Starter' },
      { id: 'tt-1000', name: '1000 Active Followers', price: 290, originalPrice: 390, tag: 'Creator Pack' },
      { id: 'tt-5000', name: '5000 Active Followers', price: 1250, originalPrice: 1650 },
    ]
  },
  {
    id: 'facebook-reaction',
    title: 'Facebook Post Reaction',
    subtitle: 'ফেসবুক পোস্ট রিঅ্যাকশন',
    category: 'social',
    image: diamondBadgeImg,
    requirePlayerId: false,
    placeholderText: 'Facebook Public Post URL',
    description: 'ফেসবুক পোস্টে Love, Like, Care বা অন্যান্য রিঅ্যাকশন ইনস্ট্যান্ট ডেলিভারি।',
    packages: [
      { id: 'fb-100', name: '100 Reactions (Like / Love)', price: 30, originalPrice: 45 },
      { id: 'fb-500', name: '500 Reactions (Mixed / Custom)', price: 120, originalPrice: 170, tag: 'High Boost' },
      { id: 'fb-1000', name: '1000 Reactions Premium', price: 220, originalPrice: 310 },
      { id: 'fb-3000', name: '3000 Reactions Viral Pack', price: 590, originalPrice: 850 },
    ]
  }
];

export const PAYMENT_METHODS = [
  {
    id: 'bkash',
    name: 'bKash',
    badge: 'Send Money',
    number: '01828861788',
    type: 'Personal',
    color: '#D12053',
    instruction: 'bKash App অথবা *247# ডায়াল করে Send Money অপশনে যান এবং নিচের নাম্বারে নির্ধারিত টাকা পাঠান। তারপর ট্রানজেকশন আইডি (TrxID) দিন।'
  },
  {
    id: 'nagad',
    name: 'Nagad',
    badge: 'Send Money',
    number: '01828861788',
    type: 'Personal',
    color: '#F7941D',
    instruction: 'Nagad App অথবা *167# ডায়াল করে Send Money অপশনে যান এবং নিচের নাম্বারে নির্ধারিত টাকা পাঠান। তারপর ৮ ডিজিটের TrxID দিন।'
  },
  {
    id: 'rocket',
    name: 'Rocket',
    badge: 'Send Money',
    number: '018288617887',
    type: 'Personal',
    color: '#8C3494',
    instruction: 'Rocket App বা ডায়াল করে Send Money অপশনে যান এবং ১২ ডিজিটের একাউন্ট নাম্বারে টাকা পাঠিয়ে TrxID লিখুন।'
  },
  {
    id: 'upay',
    name: 'Upay',
    badge: 'Send Money',
    number: '01828861788',
    type: 'Personal',
    color: '#005CA9',
    instruction: 'Upay App থেকে Send Money করুন এবং প্রাপ্ত Transaction ID টি ফর্মে লিখে অর্ডার কনফার্ম করুন।'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Free Fire ডায়মন্ড টপ আপ করতে কী কী লাগে?',
    answer: 'Free Fire ডায়মন্ড টপ আপ করতে আপনার অ্যাকাউন্টের কোনো পাসওয়ার্ড, ইমেইল বা ফেসবুক লগইন লাগে না। শুধুমাত্র আপনার সঠিক Player ID (UID) দিলেই হবে। আমাদের স্বয়ংক্রিয় সিস্টেম ০-৫ সেকেন্ডে সরাসরি আপনার আইডিতে ডায়মন্ড পাঠিয়ে দেবে।'
  },
  {
    question: 'bKash দিয়ে কীভাবে টপ আপ করব?',
    answer: '১. প্যাকেজ তালিকা থেকে আপনার পছন্দের ডায়মন্ড প্যাক সিলেক্ট করুন।\n২. আপনার Free Fire Player ID (UID) লিখুন।\n৩. পেমেন্ট মেথড হিসেবে bKash সিলেক্ট করুন এবং আমাদের দেওয়া নম্বরে Send Money করুন।\n৪. আপনি যে নম্বর থেকে টাকা পাঠিয়েছেন সেই নম্বর ও TrxID (Transaction ID) বসিয়ে "অর্ডার কনফার্ম করুন" বাটনে ক্লিক করুন। ০-৫ সেকেন্ডের মধ্যে আপনার আইডিতে ডায়মন্ড যোগ হয়ে যাবে।'
  },
  {
    question: 'ডেলিভারি পেতে কতক্ষণ লাগে?',
    answer: 'Lewra Top Up এ বেশিরভাগ অর্ডার ০ থেকে ৫ সেকেন্ডের মধ্যেই সম্পূর্ণ স্বয়ংক্রিয়ভাবে ডেলিভারি হয়। সার্ভার ব্যস্ত থাকলেও সর্বোচ্চ ১-২ মিনিটের মধ্যে ডেলিভারি সম্পন্ন হয়ে যায়।'
  },
  {
    question: 'Lewra Top Up কি নিরাপদ ও বিশ্বস্ত?',
    answer: 'হ্যাঁ, Lewra Top Up শতভাগ নিরাপদ ও বিশ্বস্ত। আমরা বিগত ৩ বছরেরও বেশি সময় ধরে বাংলাদেশে ফ্রি ফায়ার প্লেয়ারদের সেবা দিয়ে আসছি। আমরা কখনোই আপনার অ্যাকাউন্টের পাসওয়ার্ড চাই না, তাই অ্যাকাউন্ট সম্পূর্ণ নিরাপদ থাকে।'
  },
  {
    question: 'অর্ডার না পেলে কী করব?',
    answer: 'যদি কোনো কারণে ৫ মিনিটের মধ্যে ডেলিভারি না পান, তাহলে আমাদের ২৪/৭ কাস্টমার সাপোর্ট হটলাইন (+8801828861788) অথবা WhatsApp/Messenger এ আপনার Order ID বা Transaction ID পাঠিয়ে যোগাযোগ করুন। আমাদের টিম তাৎক্ষণিক সমাধান প্রদান করবে।'
  },
  {
    question: 'PUBG UC বা অন্য গেম টপ আপ করা যায়?',
    answer: 'হ্যাঁ, আমরা Free Fire ছাড়াও E-Football Coins, PUBG Mobile UC, TikTok Followers এবং অন্যান্য সোশ্যাল মিডিয়া সেবা সাশ্রয়ী মূল্যে প্রদান করে থাকি।'
  },
  {
    question: 'Free Fire Diamond Top Up BD এর দাম কত?',
    answer: 'Lewra Top Up এ আপনি পাচ্ছেন বাংলাদেশের সর্বনিম্ন রেট। যেমন ২৫ ডায়মন্ড মাত্র ২২ টাকা, ১১৫ ডায়মন্ড ৮৫ টাকা, এবং ২৪০ ডায়মন্ড ১৭০ টাকা। বিস্তারিত রেট কার্ড আমাদের প্যাকেজ তালিকায় দেখতে পাবেন।'
  },
  {
    question: 'FF Top Up আর Diamond Top Up কি একই জিনিস?',
    answer: 'হ্যাঁ, গেমারদের মধ্যে FF Top Up এবং Free Fire Diamond Top Up একই অর্থে ব্যবহৃত হয়। গেমের প্রিমিয়াম কারেন্সি হলো ডায়মন্ড, যা দিয়ে এলিট পাস, ক্যারেক্টার ও গান স্কিন কেনা যায়।'
  },
  {
    question: 'বাংলাদেশে সবচেয়ে কম দামে Free Fire Top Up কোথায় পাব?',
    answer: 'Lewra Top Up সরাসরি বাংলাদেশ ও ইন্দোনেশিয়া অফিশিয়াল ডিলার গেটওয়ের মাধ্যমে কম রেটে কোনো এক্সট্রা সার্ভিস চার্জ ছাড়াই ডায়মন্ড সরবরাহ করে। তাই এখানে সবচেয়ে কম খরচে সেরা অফার পাওয়া যায়।'
  },
  {
    question: 'Player ID বা UID কোথায় পাব?',
    answer: 'ফ্রি ফায়ার গেম ওপেন করে উপরের বাম কোণে আপনার প্রোফাইল বা ব্যানারে ক্লিক করুন। প্রোফাইল পেইজের নামের নিচে ৮-১০ সংখ্যার একটি ইউনিক আইডি দেখতে পাবেন (যেমন: 182749281)। সেটি কপি করে আমাদের সাইটে বসিয়ে দিন।'
  }
];
