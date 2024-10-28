import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
// ----------------------------- UI Kitten -----------------------------------
import {
  StyleService,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
// ----------------------------- Components && Elements -----------------------
import { CustomLayout, Text } from 'components';
// ----------------------------- @Types ---------------------------------------
import GeneralModal from 'components/SearchScreens/Modals/GeneralModal';
import { useLayout } from 'hooks';

const DoctorItem = React.memo(({ data, onOpen,searchValue,setMailList }: { data: any,setMailList:any, onOpen: any,searchValue:any }) => {
  const theme = useTheme();
  const { width } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [selectedMail, setSelectedMail] = useState<any | null | object>(null);
  const handlePress = () => {
    // Email bilgisini state'e kaydediyoruz
    setSelectedMail(data.sirket_veriler?.sirket_mail);
    setMailList((prevMailList: string[]) => [...prevMailList, ...(data.sirket_veriler?.sirket_mail || [])]);
    
    setModalVisible(true);
  };




  return (
    <CustomLayout
      level="1"
      onPress={onOpen}
      style={[
        styles.container,
        // Eğer seçilen mail bu öğedeki mail ise yeşil renk, aksi takdirde normal renk
 searchValue &&   selectedMail === data.sirket_veriler?.sirket_mail
          ? { backgroundColor: theme['color-success-default'] } // Yeşil renk
          : { backgroundColor: theme['background-basic-color-1'] }, // Normal renk
      ]}
      horizontal
      gap={12}
    >
      <GeneralModal
        setModalVisible={setModalVisible}
        referanslar={data.sirketler_veriler?.referanslar}
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        phone={data.sirket_veriler?.sirket_telefon || []}
        email={data.sirket_veriler?.sirket_mail || []}
        web={data.sirket_veriler?.sirket_web || []}
        location={data.sirket_veriler?.sirket_konum || []}
        tags={data.sirket_veriler?.tags || []}
        text={data.sirket_ad}
        instegram={data.sirket_veriler?.instegram}
        facebook={data.sirket_veriler?.facebook}
        x={data.sirket_veriler?.x}
        linkedin={data.sirket_veriler?.linkedin}
        pinterest={data.sirket_veriler?.pinterest}
      />

      <CustomLayout style={{ flex: 1 }} onPress={handlePress}>
        <CustomLayout horizontal justify="space-between">
          <Text numberOfLines={1} maxWidth={300 * (width / 375)}>
            {data.sirket_ad}
          </Text>
        </CustomLayout>
      </CustomLayout>
    </CustomLayout>
  );




  
});

export default DoctorItem;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
  },
});
