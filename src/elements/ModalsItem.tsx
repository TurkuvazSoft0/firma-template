import React from 'react';
import { TouchableOpacity, Linking, View } from 'react-native';
// ----------------------------- UI Kitten -----------------------------------
import { StyleService, useStyleSheet, useTheme } from '@ui-kitten/components';
// ----------------------------- Components -----------------------
import { AppIcon, CustomLayout, Text } from 'components'; // Kendi bileşenlerinizi içe aktarın veya Icon ve Text kullanın.
// ----------------------------- UI Kitten Icons -----------------------
import EvaIcons from '@ui-kitten/eva-icons';

// Gelen verilerin herhangi bir türde olabileceğini belirtmek için `any` kullanıyoruz.
interface ModalItemProps {
  data: any; // Gelen veri herhangi bir türde olabilir
}

const ModalItem: React.FC<ModalItemProps> = ({ data }) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  // Mail gönderme fonksiyonu
  const handleMailPress = (mail: string) => {
    Linking.openURL(`mailto:${mail}`);
  };

  // Telefon arama fonksiyonu
  const handlePhonePress = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  // Web sitesine gitme fonksiyonu
  const handleWebPress = (url: string) => {
    Linking.openURL(`https://${url}`);
  };

  // Konuma gitme fonksiyonu
  const handleLocationPress = (konum: string) => {
    Linking.openURL(konum);
  };

  return (
    <CustomLayout level="1" style={styles.container} horizontal gap={12}>
      {/* Şirket Adı */}
      <CustomLayout style={{ flex: 1 }}>
        <CustomLayout horizontal justify="space-between">
          <Text category="t5">{data.sirket_ad}</Text>
        </CustomLayout>

    

      </CustomLayout>
    </CustomLayout>
  );
};

export default ModalItem;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    backgroundColor: 'background-basic-color-1',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
  },
});
