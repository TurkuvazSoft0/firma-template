import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  useTheme,
  Input,
  Icon,
} from '@ui-kitten/components';
// ----------------------------- Navigation -----------------------------------
import {NavigationProp, useNavigation} from '@react-navigation/native';
// ----------------------------- Hooks ---------------------------------------
import {useLayout} from 'hooks';
// ----------------------------- Assets ---------------------------------------
import {Images} from 'assets/images';
// ----------------------------- Components && Elements -----------------------

import {Container, Content, CustomLayout, Text} from 'components';
import EvaIcons from 'types/eva-icon-enum';
import FaqItem, {IFagProps} from './FaqItem';

const FaqScreen = React.memo(() => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const {goBack} = useNavigation();
  const {height, width, top, bottom} = useLayout();

  const [active, setActive] = React.useState<IFagProps | null>(null);
  const [searchValue, setSearchValue] = React.useState('');
  const resultCountries = React.useMemo(() => {
    const lowerSearchValue = searchValue.toLowerCase();

    return FAQS.filter((faqs: IFagProps) => {
      if (
        faqs.question.includes(searchValue) ||
        faqs.answer.toLowerCase().includes(lowerSearchValue)
      ) {
        return faqs;
      }
    });
  }, [searchValue]);

  const _onSelect = (item: IFagProps) => () => {
    if (item === active) {
      setActive(null);
    } else {
      setActive(item);
    }
  };
  return (
    <CustomLayout>
      <Input
        accessoryLeft={<Icon name={EvaIcons.Search} />}
        value={searchValue}
        onChangeText={setSearchValue}
        placeholder="Search"
        style={styles.input}
      />
      {resultCountries.map((item, index) => {
        return (
          <FaqItem
            onSelect={_onSelect(item)}
            key={index}
            item={item}
            isOpen={active === item}
          />
        );
      })}
    </CustomLayout>
  );
});

export default FaqScreen;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  input: {
    marginBottom: 16,
    marginHorizontal: 24,
  },
});
const FAQS = [
  {
    question: 'What is the best way to prevent the spread of germs?',
    answer:
      'Wash your hands regularly with soap and water, cover your mouth when you cough or sneeze, and avoid close contact with people who are sick.',
  },
  {
    question: 'How can I recognize the symptoms of a heart attack?',
    answer:
      'The most common symptoms of a heart attack include chest pain, shortness of breath, nausea, and lightheadedness.',
  },
  {
    question: 'What are the symptoms of COVID-19?',
    answer:
      'The symptoms of COVID-19 include fever, cough, and difficulty breathing, and can range from mild to severe.',
  },
  {
    question: 'How can I treat a minor burn at home?',
    answer:
      'For a minor burn, run cool water over the affected area for several minutes, clean the wound with soap and water, and cover it with a sterile bandage or gauze.',
  },
  {
    question: 'What is the difference between a cold and the flu?',
    answer:
      'While both the cold and the flu share some symptoms, such as a runny nose and cough, the flu usually comes on more suddenly and is more severe than a cold.',
  },
  {
    question: 'How can I manage my diabetes?',
    answer:
      'Managing diabetes includes monitoring your blood sugar levels, eating a healthy diet, exercising regularly, and taking medication as prescribed by your doctor.',
  },
  {
    question: 'What are the signs of a stroke?',
    answer:
      'The signs of a stroke include sudden numbness or weakness, confusion, trouble speaking or understanding speech, vision problems, dizziness, and severe headache.',
  },
  {
    question: 'How can I prevent food poisoning?',
    answer:
      'To prevent food poisoning, make sure to wash your hands before handling food, cook food to the appropriate temperature, and properly store perishable items.',
  },
  {
    question: 'What is the best way to quit smoking?',
    answer:
      'The best way to quit smoking is to set a quit date, find support from friends and family members, consider nicotine replacement therapy, and avoid triggers that may cause you to smoke.',
  },
  {
    question: 'How much sleep do I need every night?',
    answer:
      'Most adults need 7-8 hours of sleep per night, while children and teenagers may need more.',
  },
  {
    question: 'What are the symptoms of asthma?',
    answer:
      'The symptoms of asthma include wheezing, coughing, shortness of breath, and chest tightness.',
  },
  {
    question: 'How often should I get a mammogram?',
    answer:
      'The American Cancer Society recommends that women with an average risk of breast cancer should start getting annual mammograms at age 45. Women aged 40-44 should have the option to start annual screening, and women aged 55 and older should switch to biennial screening or have the choice to continue yearly mammograms.',
  },
  {
    question: 'How can I manage my high blood pressure?',
    answer:
      'Managing high blood pressure includes eating a healthy diet, maintaining a healthy weight, exercising regularly, limiting alcohol intake, reducing sodium intake, and taking medication as prescribed by your doctor.',
  },
  {
    question: 'What is the recommended daily intake of vitamins and minerals?',
    answer:
      'The recommended daily intake of vitamins and minerals varies depending on age, sex, and other factors. Talk to your doctor or a registered dietitian for personalized recommendations.',
  },
  {
    question: 'How can I manage my anxiety?',
    answer:
      'Managing anxiety includes practicing relaxation techniques, getting regular exercise, avoiding caffeine and alcohol, getting enough sleep, and seeking professional help if needed.',
  },
  {
    question: 'What are the benefits of getting regular exercise?',
    answer:
      'Regular exercise can help improve cardiovascular health, maintain a healthy weight, reduce stress and anxiety, and improve mood and energy levels.',
  },
  {
    question: 'How can I manage my allergies?',
    answer:
      'Managing allergies includes avoiding triggers, taking medication as prescribed by your doctor, and considering immunotherapy (allergy shots) if appropriate.',
  },
  {
    question: 'What are the stages of pregnancy?',
    answer:
      'Pregnancy is typically divided into three trimesters, each approximately 12-14 weeks long. During each trimester, certain developmental milestones occur for both the mother and the growing fetus.',
  },
  {
    question: 'How can I prevent skin cancer?',
    answer:
      'To prevent skin cancer, protect your skin from the sun by wearing protective clothing and sunscreen with at least SPF 30, seek shade during peak sunlight hours, and avoid indoor tanning.',
  },
  {
    question: 'What are the symptoms of a concussion?',
    answer:
      'The symptoms of a concussion can include headache, dizziness, nausea, sensitivity to light or noise, confusion, and memory problems.',
  },
  {
    question: 'How can I manage my arthritis pain?',
    answer:
      'Managing arthritis pain includes staying active, maintaining a healthy weight, using heat or cold therapy, getting enough rest, and taking medication as prescribed by your doctor.',
  },
  {
    question: 'What are the warning signs of depression?',
    answer:
      'The warning signs of depression include feeling sad or hopeless, losing interest in things you used to enjoy, changes in appetite or sleep patterns, irritability, and thoughts of self-harm or suicide.',
  },
  {
    question:
      'What is the best way to prevent sexually transmitted infections?',
    answer:
      'The best way to prevent sexually transmitted infections is to practice safe sex, which includes using condoms, getting tested regularly, and limiting sexual partners.',
  },
  {
    question: 'How can I manage my chronic pain?',
    answer:
      'Managing chronic pain includes finding the underlying cause of the pain, participating in physical therapy, practicing relaxation techniques, and taking medication as prescribed by your doctor.',
  },
  {
    question: 'What are the causes of migraines?',
    answer:
      'The causes of migraines are not well understood, but triggers can include stress, certain foods or drinks, hormonal changes, and changes in sleep patterns.',
  },
  {
    question: 'How can I improve my digestion?',
    answer:
      'To improve digestion, eat a healthy diet that includes plenty of fiber, drink plenty of water, exercise regularly, and avoid smoking and excessive alcohol intake.',
  },
  {
    question: 'What are the risks associated with obesity?',
    answer:
      'Obesity is associated with an increased risk of several health problems, including heart disease, stroke, diabetes, and certain types of cancer.',
  },
  {
    question: 'How can I manage my acid reflux?',
    answer:
      'Managing acid reflux includes avoiding trigger foods, eating smaller meals, not lying down for at least 3 hours after eating, and taking medication as prescribed by your doctor.',
  },
  {
    question: 'What are the potential side effects of certain medications?',
    answer:
      'The potential side effects of certain medications vary depending on the medication. Talk to your doctor and pharmacist about the potential side effects of any medications you are taking.',
  },
  {
    question: 'How can I protect my children from the flu?',
    answer:
      'To protect your children from the flu, make sure they get vaccinated each year, teach them to cover their mouth when coughing or sneezing, and encourage them to wash their hands regularly.',
  },
  {
    question: 'What are the benefits of breastfeeding?',
    answer:
      'Breastfeeding can provide many health benefits for both mother and baby, including lower risk of infections, stronger immune system, and bonding time between mother and baby.',
  },
  {
    question: 'How can I manage my ADHD?',
    answer:
      'Managing ADHD includes creating a routine, breaking tasks into smaller steps, using tools like calendars and reminders, and taking medication as prescribed by your doctor.',
  },
  {
    question: 'What are the different types of cancer?',
    answer:
      'There are many different types of cancer, including lung cancer, breast cancer, prostate cancer, and colon cancer, among others.',
  },
  {
    question: 'How can I prevent osteoporosis?',
    answer:
      'To prevent osteoporosis, consume enough calcium and vitamin D, participate in weight-bearing exercise, avoid smoking and excessive alcohol intake, and talk to your doctor about bone density testing if appropriate.',
  },
  {
    question: 'What are the benefits of getting a flu shot?',
    answer:
      'Getting a flu shot can help prevent the flu, reduce the severity of symptoms if you do get sick, and protect those around you who may be more vulnerable to complications from the flu.',
  },
  {
    question: 'How can I manage my eczema?',
    answer:
      'Managing eczema includes avoiding triggers, using gentle skin care products, moisturizing regularly, and taking medication as prescribed by your doctor.',
  },
  {
    question: 'What are the risks associated with high cholesterol?',
    answer:
      'High cholesterol is associated with an increased risk of heart disease and stroke.',
  },
];
