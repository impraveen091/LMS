import images from '../assets/images';
import {
  Art_Icon,
  Fashion_Icon,
  Graphic_Icon,
  Marketing_Icon,
  MasterCard,
  Photography_Icon,
  Software_Icon,
  Uiux_Icon,
} from '../assets/svgs';
import strings from '../i18n/strings';

const OnBoardingSlide = [
  {
    title: strings.onBoardingDesc1,
    subtitle: strings.onBoardingSubtitle1,
    image: images.onBordingImg1,
  },
  {
    title: strings.onBoardingDesc2,
    subtitle: strings.onBoardingSubtitle2,
    image: images.onBordingImg2,
  },
  {
    title: strings.onBoardingDesc3,
    subtitle: strings.onBoardingSubtitle3,
    image: images.onBordingImg3,
  },
];

const LearningPaths = [
  {
    title: 'illustration',
    id: 1,
  },
  {
    title: 'Graphic design',
    id: 2,
  },
  {
    title: 'UI/UX',
    id: 3,
  },
  {
    title: 'Web design',
    id: 4,
  },
  {
    title: 'Motion design',
    id: 5,
  },
  {
    title: '3D design',
    id: 6,
  },
];

const Categories = [
  {
    id: 1,
    title: 'IT & Software',
    icon: <Software_Icon />,
  },
  {
    id: 2,
    title: 'UIUX DESIGN',
    icon: <Uiux_Icon />,
  },
  {
    id: 3,
    title: 'Graphic',
    icon: <Graphic_Icon />,
  },
  {
    id: 4,
    title: 'Marketing',
    icon: <Marketing_Icon />,
  },
  {
    id: 5,
    title: 'photography',
    icon: <Photography_Icon />,
  },
  {
    id: 6,
    title: 'Fashion',
    icon: <Fashion_Icon />,
  },
  {
    id: 7,
    title: 'Art',
    icon: <Art_Icon />,
  },
];

const Recommended = [
  {
    id: 1,
    title: 'Sketching: Transform Your Doodles into Art',
    image: images.course1,
  },
  {
    id: 2,
    title: 'Illustration Techniques to Unlock your Creativity',
    image: images.course2,
  },
  {
    id: 3,
    title: 'Creativity',
    image: images.course3,
  },
  {
    id: 4,
    title: 'Inside a Creative Notebook: Explore Your Illustration Process',
    image: images.course4,
  },
  {
    id: 5,
    title: 'Daniel Wallet',
    image: images.course5,
  },
];
const Popular = [
  {
    id: 1,
    title: 'Sketching: Transform Your Doodles into Art',
    image: images.course5,
  },
  {
    id: 2,
    title: 'Illustration Techniques to Unlock your Creativity',
    image: images.course4,
  },
  {
    id: 3,
    title: 'Creativity',
    image: images.course3,
  },
  {
    id: 4,
    title: 'Inside a Creative Notebook: Explore Your Illustration Process',
    image: images.course4,
  },
  {
    id: 5,
    title: 'Daniel Wallet',
    image: images.course5,
  },
];
const Featured = [
  {
    id: 1,
    title: 'Sketching: Transform Your Doodles into Art',
    image: images.course2,
  },
  {
    id: 2,
    title: 'Illustration Techniques to Unlock your Creativity',
    image: images.course3,
  },
  {
    id: 3,
    title: 'Creativity',
    image: images.course4,
  },
  {
    id: 4,
    title: 'Inside a Creative Notebook: Explore Your Illustration Process',
    image: images.course1,
  },
  {
    id: 5,
    title: 'Daniel Wallet',
    image: images.course5,
  },
];

const NotificationData = [
  {
    title: 'Today',
    data: [
      {
        id: 1,
        image: images.course1,
        title: '30% Special Discount!',
        description: 'Special promotion only valid today',
      },
    ],
  },
  {
    title: 'Yesterday',
    data: [
      {
        id: 1,
        image: images.course2,
        title: 'Sketching: Transform Your Doodl...',
        description: 'You have to top up your e-wallet',
      },
      {
        id: 1,
        image: images.course3,
        title: 'New Services Available!',
        description: 'Now you can track orders in real time',
      },
    ],
  },
  {
    title: 'December 22, 2024',
    data: [
      {
        id: 1,
        image: images.course4,
        title: 'Sketching: Transform Your Doodl...',
        description: 'Credit Card has been linked!',
      },
      {
        id: 1,
        image: images.course5,
        title: 'Sketching: Transform Your Doodl...',
        description: 'Your account has been created!',
      },
    ],
  },
];

const topSearch = [
  {
    id: 1,
    title: 'Python',
  },
  {
    id: 2,
    title: 'Javascript',
  },
  {
    id: 3,
    title: 'Java',
  },
  {
    id: 4,
    title: 'Excel',
  },
  {
    id: 5,
    title: 'Illustration',
  },
  {
    id: 6,
    title: 'Watercolor',
  },
  {
    id: 7,
    title: 'Procreate',
  },
];

const level = [
  {
    id: 1,
    title: 'All',
    is_Selected: false,
    category: 'level',
  },
  {
    id: 2,
    title: 'Foundation',
    is_Selected: false,
    category: 'level',
  },
  {
    id: 3,
    title: 'Beginner',
    is_Selected: false,
    category: 'level',
  },
  {
    id: 4,
    title: 'Intermediate',
    is_Selected: false,
    category: 'level',
  },
  {
    id: 5,
    title: 'Expert',
    is_Selected: false,
    category: 'level',
  },
];

const prices = [
  {
    id: 1,
    title: 'Free',
    is_Selected: false,
    category: 'prices',
  },
  {
    id: 2,
    title: '1$ - 20$',
    is_Selected: false,
    category: 'prices',
  },
  {
    id: 3,
    title: '20$ - 40$',
    is_Selected: false,
    category: 'prices',
  },
  {
    id: 4,
    title: '40$ - 60$',
    is_Selected: false,
    category: 'prices',
  },
  {
    id: 5,
    title: '> 60$',
    is_Selected: false,
    category: 'prices',
  },
];

const ratings = [
  {
    id: 1,
    title: '4.0 - 5.0',
    is_Selected: false,
    category: 'ratings',
  },
  {
    id: 2,
    title: '3.0 - 4.0',
    is_Selected: false,
    category: 'ratings',
  },
  {
    id: 3,
    title: '2.0 - 3.0',
    is_Selected: false,
    category: 'ratings',
  },
  {
    id: 4,
    title: '1.0 - 2.0',
    is_Selected: false,
    category: 'ratings',
  },
  {
    id: 5,
    title: '0 - 1.0',
    is_Selected: false,
    category: 'ratings',
  },
];

const subtitles = [
  {
    id: 1,
    title: 'English',
    is_Selected: false,
    category: 'subtitles',
  },
  {
    id: 2,
    title: 'None',
    is_Selected: false,
    category: 'subtitles',
  },
];

const lessonArray = [
  {
    lesson_no: 'D1',
    lesson_id: 1,
    lesson_title: 'Introduction',
    videos: [
      {
        video_id: 1,
        video_title: 'About Me',
        video_length: '05:05',
        video_status: 'unwatched',
        video_completed_length: '100',
        video_thumbnail: images.course5,
      },
      {
        video_id: 2,
        video_title: 'Influences',
        video_length: '05:05',
        video_status: 'unwatched',
        video_completed_length: '50',
        video_thumbnail: images.course1,
      },
    ],
  },
  {
    lesson_no: 'D2',
    lesson_id: 2,
    lesson_title: 'Tools for a Creator',
    videos: [
      {
        video_id: 1,
        video_title: 'Materials and Tools',
        video_length: '07:30',
        video_status: 'unwatched',
        video_completed_length: '10',
        video_thumbnail: images.course5,
      },
      {
        video_id: 2,
        video_title: 'Elements of Portfolio',
        video_length: '10:15',
        video_status: 'unwatched',
        video_completed_length: '0',
        video_thumbnail: images.course4,
      },
      {
        video_id: 3,
        video_title: 'Characters, Setting, and Storytelling',
        video_length: '10:15',
        video_status: 'unwatched',
        video_completed_length: '0',
        video_thumbnail: images.course2,
      },
    ],
  },
  {
    lesson_no: 'D3',
    lesson_id: 3,
    lesson_title: 'Final Project',
    videos: [
      {
        video_id: 1,
        video_title: 'Last exercise',
        video_length: '09:20',
        video_status: 'unwatched',
        video_completed_length: '0',
        video_thumbnail: images.course5,
      },
      {
        video_id: 2,
        video_title: 'Evaluate exercise',
        video_length: '12:05',
        video_status: 'unwatched',
        video_completed_length: '0',
        video_thumbnail: images.course1,
      },
    ],
  },
];

const reviewArray = [
  {
    review_id: 1,
    reviewer_name: 'John Doe',
    review_date: 'December 20, 2022',
    review_rating: 4,
    review_comment:
      "Great product! I'm loving it!Great product! I'm loving it!Great product! I'm loving it!Great product! I'm loving it!Great product! I'm loving it!",
    reviewer_image: images.profile1,
  },
  {
    review_id: 2,
    reviewer_name: 'Jane Smith',
    review_date: 'December 20, 2022',
    review_rating: 5,
    review_comment: "The best service I've ever experienced!",
    reviewer_image: images.profile2,
  },
  {
    review_id: 3,
    reviewer_name: 'Michael Johnson',
    review_date: 'December 20, 2022',
    review_rating: 3,
    review_comment: 'Decent, but could be improved.',
    reviewer_image: images.profile1,
  },
  {
    review_id: 4,
    reviewer_name: 'Emily Brown',
    review_date: 'December 20, 2022',
    review_rating: 4,
    review_comment: 'Excellent customer support!',
    reviewer_image: images.profile2,
  },
  {
    review_id: 5,
    reviewer_name: 'David Lee',
    review_date: 'December 20, 2022',
    review_rating: 2,
    review_comment: 'Not satisfied with the product quality.',
    reviewer_image: images.profile1,
  },
];

const creditCardArray = [
  {
    card_id: 1,
    card_number_last4: '5678',
    card_holder: 'Duong Khanh',
    expiration_date: '12/24',
    card_type: 'Visa',
    card_icon: <MasterCard />,
    is_default: true,
    card_number: '1234567812345678',
  },
  {
    card_id: 2,
    card_number_last4: '5678',
    card_holder: 'Duong Khanh',
    expiration_date: '06/25',
    card_type: 'MasterCard',
    card_icon: <MasterCard />,
    is_default: false,
    card_number: '1234567812345678',
  },
  {
    card_id: 3,
    card_number_last4: '5678',
    card_holder: 'Duong Khanh',
    expiration_date: '09/23',
    card_type: 'American Express',
    card_icon: <MasterCard />,
    is_default: false,
    card_number: '1234567812345678',
  },
];

const MyProfile = {
  full_name: 'Khanh Duong',
  bio_description:
    'I’m interested in what I do, trying to make the world better& more beautiful.',
  followers: '1.4M',
  likes: '25M',
  following: '9K',
  profile_image: images.profile1,
  cover_image: images.course5,
};

const ProjectArray = [
  {
    project_title: 'Illustration: Find your Art Style',
    likes: 1.0,
    image: images.course1,
  },
  {
    project_title: 'Another Project',
    likes: 2.0,
    image: images.course2,
  },
  {
    project_title: 'Art Workshop',
    likes: 3.0,
    image: images.course4,
  },
  {
    project_title: 'Creative Journey',
    likes: 4.0,
    image: images.course5,
  },
];

const MyLearningCourse = [
  {
    id: 1,
    title: 'Sketching: Transform Your Doodles into Art',
    image: images.course1,
    progress: 50,
  },
  {
    id: 2,
    title: 'Illustration Techniques to Unlock your Creativity',
    image: images.course2,
    progress: 0,
  },
  {
    id: 3,
    title: 'Creativity',
    image: images.course3,
    progress: 70,
  },
  {
    id: 4,
    title: 'Inside a Creative Notebook: Explore Your Illustration Process',
    image: images.course4,
    progress: 10,
  },
  {
    id: 5,
    title: 'Daniel Wallet',
    image: images.course5,
    progress: 100,
  },
];

const Achievements = [
  {
    id: 1,
    title: 'Sketching: Transform Your Doodles into Art',
    image: images.course1,
    completed_date: '1st Jan, 2022',
    grade: '99%',
  },
  {
    id: 2,
    title: 'Illustration Techniques to Unlock your Creativity',
    image: images.course2,
    completed_date: '1st Jan, 2022',
    grade: '99%',
  },
  {
    id: 3,
    title: 'Creativity',
    image: images.course3,
    completed_date: '1st Jan, 2022',
    grade: '99%',
  },
  {
    id: 4,
    title: 'Inside a Creative Notebook: Explore Your Illustration Process',
    image: images.course4,
    completed_date: '1st Jan, 2022',
    grade: '99%',
  },
  {
    id: 5,
    title: 'Daniel Wallet',
    image: images.course5,
    completed_date: '1st Jan, 2022',
    grade: '99%',
  },
];

const MyWishList = [
  {
    id: 1,
    collection_title: 'Creative Courses',
    collection_image: images.course1,
  },
  {
    id: 2,
    collection_title: 'My Favourite Courses',
    collection_image: images.course2,
  },
  {
    id: 3,
    collection_title: 'Hand drawing courses',
    collection_image: images.course3,
  },
  {
    id: 4,
    collection_title: 'Digital Painting Courses',
    collection_image: images.course4,
  },
  {
    id: 5,
    collection_title: 'Water color Courses',
    collection_image: images.course1,
  },
  {
    id: 6,
    collection_title: 'Creative Courses',
    collection_image: images.course5,
  },
];

export {
  OnBoardingSlide,
  LearningPaths,
  Categories,
  Recommended,
  Popular,
  Featured,
  NotificationData,
  topSearch,
  level,
  prices,
  ratings,
  subtitles,
  lessonArray,
  reviewArray,
  creditCardArray,
  MyProfile,
  ProjectArray,
  MyLearningCourse,
  Achievements,
  MyWishList,
};
