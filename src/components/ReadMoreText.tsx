import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import Text from './Text';

const ReadMoreText = ({text, maxLength}: {text: string; maxLength: number}) => {
  const [showAllText, setShowAllText] = useState(false);

  const toggleShowAllText = () => setShowAllText(!showAllText);

  return (
    <>
      <Text style={styles.text} category="subhead">
        {showAllText ? text+"   " : `${text.slice(0, maxLength)}...  `}
        <>
          {text.length > maxLength && !showAllText && (
            <Text
              category="c1"
              status="primary"
              onPress={toggleShowAllText}
              lineHeight={20}
              style={styles.toggleButton}>
              {'Read More'}
            </Text>
          )}
          {showAllText && (
            <Text
              category="c1"
              status="primary"
              lineHeight={20}
              style={styles.toggleButton}
              onPress={toggleShowAllText}>
              {'Read Less'}
            </Text>
          )}
        </>
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  text: {},
  toggleButton: {
    textDecorationLine: 'underline',
    marginBottom: -2,
  },
});

export default ReadMoreText;
