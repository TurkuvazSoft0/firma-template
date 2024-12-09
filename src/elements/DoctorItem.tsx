import React, { useState } from 'react';
import { Alert,  TouchableOpacity, View } from 'react-native';
import { Button, Icon } from '@ui-kitten/components';
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
import tw from "twrnc"
const DoctorItem = React.memo(({mailList, nameList,data,  searchValue, setMailList,setNameList,mailList2,setMailList2,mail }: {mail:string, mailList:any,setNameList:any,data: any, setMailList: any, onOpen: any, searchValue: any,nameList:any,mailList2:any,setMailList2:any}) => {
  const theme = useTheme();
  const { width } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [selectedMail, setSelectedMail] = useState<any | null | object>(null);
  const [selectedName, setSelectedName] = useState<any | null | object>(null);

  const handlePress = () => {
    console.log(selectedMail, "selected mail");
if(!searchValue)
{
  Alert.alert("Lütfen Firma Arama İşlemi Yapınız");
} 


   else if (selectedMail === mail) {
      setSelectedMail(null);
      setSelectedName(null);
      setMailList2((prevList: any) => {
        // mail'i listeden çıkar
        const filteredList = prevList.filter((existingMail: string) => existingMail !== mail);
        return filteredList;
      });

      console.log(mailList2, "mail listesi2");
      setMailList((prevMailList: { mail: string; tag: string }[]) => {
        const index = prevMailList.findIndex(mailObj => mailObj.mail === data.sirket_veriler?.sirket_mail);
        if (index !== -1) {
          const newMailList = [...prevMailList];
          newMailList.splice(index, 1); // Belirtilen indeksi çıkar
          return newMailList;
        }
        return prevMailList;
      });
      // İsim listeden çıkarılıyor
      setNameList((prevNameList: string[]) =>
        prevNameList.filter((name) => name !== data.sirket_ad)
      );  
    } 
    else {
      // Firma seçiliyor
      setSelectedMail(mail);
      setMailList2((prevList: any) => {
        // mail'i eklemeden önce kontrol et
        if (!prevList.includes(mail)) {
          return [...prevList, mail];
        }
        return prevList;
      });
     
      setSelectedName(data.sirket_ad);
      setMailList((prevMailList: { mail: string; tag: string }[]) => [
        ...prevMailList,
        ...(data.sirket_veriler?.sirket_mail || []),
      ]);
      console.log(nameList, "name listesi");
      // İsim listeye ekleniyor
      setNameList((prevNameList: string[]) => [...prevNameList, data.sirket_ad]);
      console.log(nameList, "name listesi");
    }
    console.log(mailList2, "mail listesi2");
  };
console.log(mailList2,"mail listesi2");
  const modalPress = () => {
    setModalVisible(true); // Modal açılıyor
  };
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  // İkonun rengi, seçilmiş olup olmamasına göre belirleniyor
  const buttonColor =  mailList2.includes(mail) 
    ? theme['color-success-default'] // Yeşil
    : theme['color-basic-600']; // Gri

  return (
    <CustomLayout
      level="1"
      onPress={modalPress}
      style={[
        styles.container,
        searchValue && mailList2.includes(mail)
          ? { backgroundColor: theme['color-success-default'] }
          : { backgroundColor: theme['background-basic-color-1'] },
      ]}
      horizontal
      gap={12}
    >
      {/* Modal */}
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

      <CustomLayout style={{ flex: 1 }} horizontal justify="space-between">
      <Text numberOfLines={1} style={{ maxWidth: 200 * (width / 335) }}>
          {truncateText(data.sirket_ad, 25)}
        </Text>
        {/* İkonun rengi seçili duruma göre değişiyor */}
        <View style={tw`flex-row gap-2`}> 
        <TouchableOpacity
          onPress={handlePress} // İkon tıklanınca handlePress çalışır
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: buttonColor,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: theme['color-basic-100'], fontWeight: 'bold' }}>✔</Text>
        </TouchableOpacity>
        <TouchableOpacity
  style={{
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "green",
    justifyContent: 'center',
    alignItems: 'center',
  }}
>
  <Icon
    name='eye'
    fill={theme['color-basic-100']}
    style={{ width: 24, height: 24 }}
  />
</TouchableOpacity>
</View>
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
