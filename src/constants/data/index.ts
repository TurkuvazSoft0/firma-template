import {faker} from '@faker-js/faker';
import {Images} from 'assets/images';
import {IDoctorProps, StatusOnlineEnum} from 'types/element-types';

export const DOCTORS_DATA: IDoctorProps[] = [
  {
    isFavorite: true,
    hospital: 'UCLA Medical Center',
    totalRating: 4.5,
    isOnline: StatusOnlineEnum.JustLeave,
    name: 'Dr. Jane Smith',
    specialty: 'Cardiology',
    avatar: Images.doctor_10,
    languages: ['English', 'Spanish'],
    education: [
      {
        type: 'Medical Degree',
        institution: 'Harvard Medical School',
        year: 2005,
      },
      {
        type: 'Residency',
        description: 'Internal Medicine',
        institution: "Brigham and Women's Hospital",
        year: 2008,
      },
      {
        type: 'Fellowship',
        description: 'Cardiovascular Disease',
        institution: 'Massachusetts General Hospital',
        year: 2011,
      },
    ],
    certifications: ['Internal Medicine', 'Cardiovascular Disease'],
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
      country: 'USA',
    },
    phone: '123-456-7890',
    email: 'jane.smith@healthcare.com',
    availableDays: [
      {
        day: 'Monday',
        timeslots: [
          {start: '9:00 AM', end: '12:00 PM'},
          {start: '2:00 PM', end: '5:00 PM'},
        ],
      },
      {
        day: 'Tuesday',
        timeslots: [
          {start: '9:00 AM', end: '12:00 PM'},
          {start: '2:00 PM', end: '5:00 PM'},
        ],
      },
      {
        day: 'Wednesday',
        timeslots: [{start: '9:00 AM', end: '12:00 PM'}],
      },
      {
        day: 'Thursday',
        timeslots: [{start: '2:00 PM', end: '5:00 PM'}],
      },
      {
        day: 'Friday',
        timeslots: [
          {start: '9:00 AM', end: '12:00 PM'},
          {start: '2:00 PM', end: '5:00 PM'},
        ],
      },
    ],
    about_me:
      'Dr. Bellamy Nicholas is a top specialist at London Bridge Hospital at London. He has achieved several awards and recognition for is contribution and service in his own field. He is available for private consultation. ',
    insuranceAccepted: ['Blue Cross', 'Aetna', 'Cigna'],
    reviews: [
      {
        id: '1a',
        patient: {
          name: faker.name.fullName(),
          avatar: faker.image.avatar(),
          id: '1',
        },
        rating: 4,
        comment:
          "Dr. Smith is a great cardiologist. She really takes the time to listen to her patients and explains things in a way that's easy to understand.",
      },
      {
        id: '1b',
        patient: {
          name: faker.name.fullName(),
          avatar: faker.image.avatar(),
          id: '2',
        },
        rating: 5,
        comment:
          "I'm so glad I found Dr. Smith! She's helped me manage my heart condition and improve my overall health.",
      },
    ],
  },
  {
    isFavorite: true,
    hospital: 'Cedars-Sinai Medical Center',
    totalRating: 4.5,
    isOnline: StatusOnlineEnum.Offline,
    name: 'Dr. John Lee',
    avatar: Images.doctor_11,
    specialty: 'Dermatology',
    languages: ['English', 'Chinese'],
    education: [
      {
        type: 'Medical Degree',
        institution: 'Johns Hopkins School of Medicine',
        year: 2007,
      },
      {
        type: 'Residency',
        description: 'Dermatology',
        institution: 'Stanford University Medical Center',
        year: 2011,
      },
    ],
    certifications: ['Dermatology'],
    address: {
      street: '456 Oak St',
      city: 'Otherville',
      state: 'NY',
      zip: '54321',
      country: 'USA',
    },
    phone: '555-123-4567',
    email: 'john.lee@healthcare.com',
    availableDays: [
      {
        day: 'Monday',
        timeslots: [
          {
            start: '9:00 AM',
            end: '12:00 PM',
          },
          {
            start: '2:00 PM',
            end: '5:00 PM',
          },
        ],
      },
      {
        day: 'Tuesday',
        timeslots: [
          {
            start: '2:00 PM',
            end: '5:00 PM',
          },
        ],
      },
      {
        day: 'Wednesday',
        timeslots: [
          {
            start: '9:00 AM',
            end: '12:00 PM',
          },
        ],
      },
      {
        day: 'Thursday',
        timeslots: [
          {
            start: '9:00 AM',
            end: '12:00 PM',
          },
          {
            start: '2:00 PM',
            end: '5:00 PM',
          },
        ],
      },
      {
        day: 'Friday',
        timeslots: [
          {
            start: '9:00 AM',
            end: '12:00 PM',
          },
        ],
      },
    ],
    insuranceAccepted: ['Blue Cross', 'Cigna'],
    about_me:
      'Dr. Bellamy Nicholas is a top specialist at London Bridge Hospital at London. He has achieved several awards and recognition for is contribution and service in his own field. He is available for private consultation. ',
    reviews: [
      {
        id: '1c',
        patient: {
          name: faker.name.fullName(),
          avatar: faker.image.avatar(),
          id: '3',
        },
        rating: 4,
        comment:
          "Dr. Lee is an excellent dermatologist. She's helped me with several skin issues and I always leave feeling confident that I received great care.",
      },
      {
        id: '1d',
        patient: {
          name: faker.name.fullName(),
          avatar: faker.image.avatar(),
          id: '4',
        },
        rating: 3,
        comment:
          'I had a difficult time getting an appointment with Dr. Lee, but once I did, she was very friendly and knowledgeable.',
      },
    ],
  },
  {
    isFavorite: true,
    hospital: 'New York-Presbyterian Hospital',
    totalRating: 4.8,
    isOnline: StatusOnlineEnum.Online,
    name: 'Dr. Jane Smith',
    specialty: 'Cardiology',
    avatar: Images.doctor_12,
    languages: ['English', 'Spanish'],
    education: [
      {
        type: 'Medical Degree',
        institution: 'Harvard Medical School',
        year: 2005,
      },
      {
        type: 'Residency',
        description: 'Internal Medicine',
        institution: "Brigham and Women's Hospital",
        year: 2008,
      },
      {
        type: 'Fellowship',
        description: 'Cardiovascular Disease',
        institution: 'Massachusetts General Hospital',
        year: 2011,
      },
    ],
    certifications: ['Internal Medicine', 'Cardiovascular Disease'],
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
      country: 'USA',
    },
    phone: '123-456-7890',
    email: 'jane.smith@healthcare.com',
    availableDays: [
      {
        day: 'Monday',
        timeslots: [
          {
            start: '9:00 AM',
            end: '12:00 PM',
          },
          {
            start: '2:00 PM',
            end: '5:00 PM',
          },
        ],
      },
      {
        day: 'Tuesday',
        timeslots: [
          {
            start: '9:00 AM',
            end: '12:00 PM',
          },
          {
            start: '2:00 PM',
            end: '5:00 PM',
          },
        ],
      },
      {
        day: 'Wednesday',
        timeslots: [
          {
            start: '9:00 AM',
            end: '12:00 PM',
          },
        ],
      },
      {
        day: 'Thursday',
        timeslots: [
          {
            start: '2:00 PM',
            end: '5:00 PM',
          },
        ],
      },
      {
        day: 'Friday',
        timeslots: [
          {
            start: '9:00 AM',
            end: '12:00 PM',
          },
          {
            start: '2:00 PM',
            end: '5:00 PM',
          },
        ],
      },
    ],
    insuranceAccepted: ['Blue Cross', 'Aetna', 'Cigna'],
    about_me:
      'Dr. Bellamy Nicholas is a top specialist at London Bridge Hospital at London. He has achieved several awards and recognition for is contribution and service in his own field. He is available for private consultation. ',
    reviews: [
      {
        patient: {
          name: faker.name.fullName(),
          avatar: faker.image.avatar(),
          id: '5',
        },
        rating: 4,
        id: '1aa',
        comment:
          "Dr. Smith is a great cardiologist. She really takes the time to listen to her patients and explains things in a way that's easy to understand.",
      },
      {
        id: '1ac',
        patient: {
          name: faker.name.fullName(),
          avatar: faker.image.avatar(),
          id: '6',
        },
        rating: 5,
        comment:
          "I'm so glad I found Dr. Smith! She's helped me manage my heart condition and improve my overall health.",
      },
    ],
  },
  {
    isFavorite: true,
    hospital: 'Stanford Health Care',
    totalRating: 5,
    isOnline: StatusOnlineEnum.JustLeave,
    name: 'Dr. John Lee',
    specialty: 'Dermatology',
    avatar: Images.doctor_13,
    languages: ['English', 'Chinese'],
    education: [
      {
        type: 'Medical Degree',
        institution: 'Johns Hopkins School of Medicine',
        year: 2007,
      },
      {
        type: 'Residency',
        description: 'Dermatology',
        institution: 'Stanford University Medical Center',
        year: 2011,
      },
    ],
    certifications: ['Dermatology'],
    address: {
      street: '456 Oak St',
      city: 'Otherville',
      state: 'NY',
      zip: '54321',
      country: 'USA',
    },
    phone: '555-123-4567',
    email: 'john.lee@healthcare.com',
    availableDays: [
      {
        day: 'Monday',
        timeslots: [
          {
            start: '9:00 AM',
            end: '12:00 PM',
          },
          {
            start: '2:00 PM',
            end: '5:00 PM',
          },
        ],
      },
      {
        day: 'Tuesday',
        timeslots: [
          {
            start: '2:00 PM',
            end: '5:00 PM',
          },
        ],
      },
      {
        day: 'Wednesday',
        timeslots: [
          {
            start: '9:00 AM',
            end: '12:00 PM',
          },
        ],
      },
      {
        day: 'Thursday',
        timeslots: [
          {
            start: '9:00 AM',
            end: '12:00 PM',
          },
          {
            start: '2:00 PM',
            end: '5:00 PM',
          },
        ],
      },
      {
        day: 'Friday',
        timeslots: [
          {
            start: '9:00 AM',
            end: '12:00 PM',
          },
        ],
      },
    ],
    insuranceAccepted: ['Blue Cross', 'Cigna'],
    about_me:
      'Dr. Bellamy Nicholas is a top specialist at London Bridge Hospital at London. He has achieved several awards and recognition for is contribution and service in his own field. He is available for private consultation. ',
    reviews: [
      {
        id: '1a1',
        patient: {
          name: faker.name.fullName(),
          avatar: faker.image.avatar(),
          id: '7',
        },
        rating: 4,
        comment:
          "Dr. Lee is an excellent dermatologist. She's helped me with several skin issues and I always leave feeling confident that I received great care.",
      },
      {
        id: '1a2',
        patient: {
          name: faker.name.fullName(),
          avatar: faker.image.avatar(),
          id: '8',
        },
        rating: 3,
        comment:
          'I had a difficult time getting an appointment with Dr. Lee, but once I did, she was very friendly and knowledgeable.',
      },
    ],
  },
  {
    isFavorite: false,
    hospital: `Brigham and Women's Hospital`,
    totalRating: 5,
    isOnline: StatusOnlineEnum.JustLeave,
    name: 'Dr. Jane Smith',
    specialty: 'Cardiology',
    avatar: Images.doctor_14,
    languages: ['English', 'Spanish'],
    education: [
      {
        type: 'Medical Degree',
        institution: 'Harvard Medical School',
        year: 2005,
      },
      {
        type: 'Residency',
        description: 'Internal Medicine',
        institution: "Brigham and Women's Hospital",
        year: 2008,
      },
      {
        type: 'Fellowship',
        description: 'Cardiovascular Disease',
        institution: 'Massachusetts General Hospital',
        year: 2011,
      },
    ],
    certifications: ['Internal Medicine', 'Cardiovascular Disease'],
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
      country: 'USA',
    },
    phone: '123-456-7890',
    email: 'jane.smith@healthcare.com',
    availableDays: [
      {
        day: 'Monday',
        timeslots: [
          {
            start: '9:00 AM',
            end: '12:00 PM',
          },
          {
            start: '2:00 PM',
            end: '5:00 PM',
          },
        ],
      },
      {
        day: 'Tuesday',
        timeslots: [
          {
            start: '9:00 AM',
            end: '12:00 PM',
          },
          {
            start: '2:00 PM',
            end: '5:00 PM',
          },
        ],
      },
      {
        day: 'Wednesday',
        timeslots: [
          {
            start: '9:00 AM',
            end: '12:00 PM',
          },
        ],
      },
      {
        day: 'Thursday',
        timeslots: [
          {
            start: '2:00 PM',
            end: '5:00 PM',
          },
        ],
      },
      {
        day: 'Friday',
        timeslots: [
          {
            start: '9:00 AM',
            end: '12:00 PM',
          },
          {
            start: '2:00 PM',
            end: '5:00 PM',
          },
        ],
      },
    ],
    insuranceAccepted: ['Blue Cross', 'Aetna', 'Cigna'],
    about_me:
      'Dr. Bellamy Nicholas is a top specialist at London Bridge Hospital at London. He has achieved several awards and recognition for is contribution and service in his own field. He is available for private consultation. ',
    reviews: [
      {
        id: '1a3',
        patient: {
          name: faker.name.fullName(),
          avatar: faker.image.avatar(),
          id: '10',
        },
        rating: 4,
        comment:
          "Dr. Smith is a great cardiologist. She really takes the time to listen to her patients and explains things in a way that's easy to understand.",
      },
      {
        id: '1a4',
        patient: {
          name: faker.name.fullName(),
          avatar: faker.image.avatar(),
          id: '12',
        },
        rating: 5,
        comment:
          "I'm so glad I found Dr. Smith! She's helped me manage my heart condition and improve my overall health.",
      },
    ],
  },
  {
    isFavorite: false,
    hospital: `Johns Hopkins Hospital`,
    totalRating: 4.7,
    isOnline: StatusOnlineEnum.Online,
    name: 'Dr. John Lee',
    specialty: 'Dermatology',
    avatar: Images.doctor_05,
    languages: ['English', 'Chinese'],
    education: [
      {
        type: 'Medical Degree',
        institution: 'Johns Hopkins School of Medicine',
        year: 2007,
      },
      {
        type: 'Residency',
        description: 'Dermatology',
        institution: 'Stanford University Medical Center',
        year: 2011,
      },
    ],
    certifications: ['Dermatology'],
    address: {
      street: '456 Oak St',
      city: 'Otherville',
      state: 'NY',
      zip: '54321',
      country: 'USA',
    },
    phone: '555-123-4567',
    email: 'john.lee@healthcare.com',
    availableDays: [
      {
        day: 'Monday',
        timeslots: [
          {
            start: '9:00 AM',
            end: '12:00 PM',
          },
          {
            start: '2:00 PM',
            end: '5:00 PM',
          },
        ],
      },
      {
        day: 'Tuesday',
        timeslots: [
          {
            start: '2:00 PM',
            end: '5:00 PM',
          },
        ],
      },
      {
        day: 'Wednesday',
        timeslots: [
          {
            start: '9:00 AM',
            end: '12:00 PM',
          },
        ],
      },
      {
        day: 'Thursday',
        timeslots: [
          {
            start: '9:00 AM',
            end: '12:00 PM',
          },
          {
            start: '2:00 PM',
            end: '5:00 PM',
          },
        ],
      },
      {
        day: 'Friday',
        timeslots: [
          {
            start: '9:00 AM',
            end: '12:00 PM',
          },
        ],
      },
    ],
    insuranceAccepted: ['Blue Cross', 'Cigna'],
    about_me:
      'Dr. Bellamy Nicholas is a top specialist at London Bridge Hospital at London. He has achieved several awards and recognition for is contribution and service in his own field. He is available for private consultation. ',
    reviews: [
      {
        id: '1a5',
        patient: {
          name: faker.name.fullName(),
          avatar: faker.image.avatar(),
          id: 'a1',
        },
        rating: 4,
        comment:
          "Dr. Lee is an excellent dermatologist. She's helped me with several skin issues and I always leave feeling confident that I received great care.",
      },
      {
        id: '112',
        patient: {
          name: faker.name.fullName(),
          avatar: faker.image.avatar(),
          id: '1b',
        },
        rating: 3,
        comment:
          'I had a difficult time getting an appointment with Dr. Lee, but once I did, she was very friendly and knowledgeable.',
      },
    ],
  },
];
const content_example =
  'Prospective data on the risk of recurrence among women with hormone receptor–positive early breast cancer who temporarily discontinue endocrine therapy to attempt pregnancy are lacking.\n\n We conducted a single-group trial in which we evaluated the temporary interruption of adjuvant endocrine therapy to attempt pregnancy in young women with previous breast cancer. Eligible women were 42 years of age or younger; had had stage I, II, or III disease; had received adjuvant endocrine therapy for 18 to 30 months; and desired pregnancy. \n\nThe primary end point was the number of breast cancer events (defined as local, regional, or distant recurrence of invasive breast cancer or new contralateral invasive breast cancer) during follow-up. The primary analysis was planned to be performed after 1600 patient-years of follow-up. The prespecified safety threshold was the occurrence of 46 breast cancer events during this period. Breast cancer outcomes in this treatment-interruption group were compared with those in an external control cohort consisting of women who would have met the entry criteria for the current trial.\n\n Among 516 women, the median age was 37 years, the median time from breast cancer diagnosis to enrollment was 29 months, and 93.4% had stage I or II disease. Among 497 women who were followed for pregnancy status, 368 (74.0%) had at least one pregnancy and 317 (63.8%) had at least one live birth. In total, 365 babies were born. At 1638 patient-years of follow-up (median follow-up, 41 months), 44 patients had a breast cancer event, a result that did not exceed the safety threshold.\n\n The 3-year incidence of breast cancer events was 8.9% (95% confidence interval [CI], 6.3 to 11.6) in the treatment-interruption group and 9.2% (95% CI, 7.6 to 10.8) in the control cohort. Among select women with previous hormone receptor–positive early breast cancer, temporary interruption of endocrine therapy to attempt pregnancy did not confer a greater short-term risk of breast cancer events, including distant recurrence, than that in the external control cohort. Further follow-up is critical to inform longer-term safety. (Funded by ETOP IBCSG Partners Foundation and others; POSITIVE ClinicalTrials.gov number, NCT02308085. opens in new tab.)';

export const EXAMPLE_ARTICLES = [
  {
    title: 'The Benefits of Regular Exercise',
    author: 'John Doe',
    date: '2022-04-10',
    content: content_example,
    category: 'Fitness',
    tags: ['exercise', 'health', 'fitness'],
    image_url: faker.image.food(),
    likes: 25,
    comments: [
      {
        user: 'Jane Smith',
        comment: 'Great article! I completely agree with your points.',
        date: '2022-04-12',
        avatar: faker.image.avatar(),
      },
      {
        user: 'Bob Johnson',
        comment: "Thanks for sharing these tips. They're very helpful.",
        date: '2022-04-13',
        avatar: faker.image.avatar(),
      },
    ],
  },
  {
    title: 'Healthy Eating Habits for a Better Life',
    author: 'Mary Johnson',
    date: '2022-04-09',
    content: content_example,
    category: 'Nutrition',
    tags: ['diet', 'nutrition', 'health'],
    image_url: faker.image.food(),
    likes: 16,
    comments: [
      {
        user: 'Tom Wilson',
        comment:
          'I struggle with eating healthy, but this article gave me some great ideas.',
        date: '2022-04-10',
        avatar: faker.image.avatar(),
      },
      {
        user: 'Sarah Lee',
        comment:
          "I've been trying to incorporate more fruits and vegetables into my diet, and it's been making a big difference.",
        date: '2022-04-11',
        avatar: faker.image.avatar(),
      },
      {
        user: 'Mike Chen',
        comment: 'Thanks for sharing these tips. Very informative!',
        date: '2022-04-11',
        avatar: faker.image.avatar(),
      },
    ],
  },
  {
    title: 'The Importance of Sleep for Your Health',
    author: 'Mary Smith',
    date: '2022-05-15',
    content: content_example,
    category: 'Health',
    tags: ['sleep', 'health', 'wellness'],
    image_url: faker.image.business(),
    likes: 42,
    comments: [
      {
        user: 'David Lee',
        comment:
          "I didn't realize how important sleep was until I read this. Thank you!",
        date: '2022-05-17',
        avatar: faker.image.avatar(),
      },
      {
        user: 'Samantha Jones',
        comment: "Great article! I'm going to try some of these tips tonight.",
        date: '2022-05-18',
        avatar: faker.image.avatar(),
      },
    ],
  },
  {
    title: '10 Simple Ways to Reduce Stress Today',
    author: 'John Doe',
    date: '2022-04-25',
    content: content_example,
    category: 'Self-improvement',
    tags: ['stress', 'mental health', 'wellness'],
    image_url: faker.image.business(),
    likes: 23,
    comments: [
      {
        user: 'Emily Chen',
        comment:
          "I've been looking for some new stress-reducing techniques to try. Can't wait to give these a shot!",
        date: '2022-04-27',
        avatar: faker.image.avatar(),
      },
      {
        user: 'Mark Johnson',
        comment:
          'Good advice. I find that getting outside for a walk always helps me de-stress.',
        date: '2022-04-28',
        avatar: faker.image.avatar(),
      },
    ],
  },
  {
    title: 'The Benefits of Practicing Gratitude',
    author: 'Jane Davis',
    date: '2022-03-10',
    content: content_example,
    category: 'Self-improvement',
    tags: ['gratitude', 'mental health', 'wellness'],
    image_url: faker.image.business(),
    likes: 56,
    comments: [
      {
        user: 'Benjamin Lee',
        comment:
          "I've heard a lot about the benefits of gratitude, but never really tried it myself. This article has inspired me to give it a shot.",
        date: '2022-03-11',
        avatar: faker.image.avatar(),
      },
      {
        user: 'Rachel Kim',
        comment: 'Great reminder to stay grateful even in tough times!',
        date: '2022-03-12',
        avatar: faker.image.avatar(),
      },
    ],
  },
];
export const USER = {
  avatar: faker.image.avatar(),
  name: faker.name.firstName(),
  age: 24,
  phone_number: faker.phone.number(),
  email: faker.internet.exampleEmail(),
};
