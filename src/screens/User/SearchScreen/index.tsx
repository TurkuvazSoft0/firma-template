import * as React from 'react';
import {ActivityIndicator, Alert,  FlatList, Linking, Modal,  TouchableOpacity, View,Share} from 'react-native';
// ----------------------------- UI kitten ----impo-------------------------------
import tw from 'twrnc';
import * as SecureStore from 'expo-secure-store';

import {
  TopNavigation,
  StyleService,
  useStyleSheet,
    Input, 
Button,
Icon,
IconElement,
IndexPath,
Select,
SelectItem

} from '@ui-kitten/components';
// ----------------------------- Components && Elements -----------------------

import {
  AppIcon,
  Container,
  CustomLayout,
  NavigationAction,
  Text,
 
} from 'components';
import DoctorItem from 'elements/DoctorItem';
import ListEmptyDoctor from './ListEmptyDoctor';
// ----------------------------- Utils ---------------------------------------
import keyExtractoUtil from 'utils/keyExtractorUtil';
// ----------------------------- Types ---------------------------------------
import EvaIcons from 'types/eva-icon-enum';
import {Modalize, useModalize} from 'react-native-modalize';
import {useLayout} from 'hooks';
import {Link, NavigationProp, useNavigation, useTheme} from '@react-navigation/native';
import {MainStackParamList} from 'types/navigation-types';
// ----------------------------- Assets ---------------------------------------
import {DOCTORS_DATA} from 'constants/data';
import { IDoctorProps } from 'types/element-types';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch } from 'reduxs/store';
import { useEffect, useRef } from 'react';
import { AppDispatch, RootState } from "reduxs/store";
import { fetchSirketler } from 'reduxs/reducers/SirketlerSlice';
import { stat } from 'fs';
import ModalItem from 'elements/ModalsItem';
import { logout } from 'reduxs/reducers/UserSlice';
import { AuthStackParamList } from 'types/navigation-types';
import { AddBulkMail, setMailArray } from 'reduxs/reducers/teklifSlice';
import GeneralModal from "../../../components/SearchScreens/Modals/GeneralModal"
import { resetPasswordState } from 'reduxs/reducers/forgetPassword';
import { resetStatusType } from 'reduxs/reducers/UserRegister';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../../../reduxs/store';
import getDecodedToken from '../../../hooks/useGetDecodedToken';
import CompanyApplicationModal from '../../../components/SearchScreens/Modals/CompanyApplicationModal';
const SearchScreen = React.memo(() => {
  const decodedToken = getDecodedToken();
  console.log(decodedToken,"Decoded Token");
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [token, setToken] = React.useState<string | null>(null);
  const [tokenRemoved, setTokenRemoved] = React.useState(false);
  const styles = useStyleSheet(themedStyles);
  const icerikInputRef = useRef(null);
  const {top} = useLayout();
  const [mailList, setMailList] = React.useState<string[] | any>([]);
  const [mailList2, setMailList2] = React.useState<string[] | any>([]);
  const [nameList, setNameList] = React.useState<string[] | null>([]);
  const bilgiler = store.getState();
  console.log(bilgiler,"Store İçindeki Bilgiler");
  useEffect(() => {
  },[setMailList2]);
  useEffect(() => 
    {
    },[nameList]);
  useEffect(() => 
    { 
    },[mailList]);
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();
  
  const MainStackNavigator = useNavigation<NavigationProp<MainStackParamList>>();
  const GoogleIcon = (props) => (
    <Icon name='google' pack='eva' {...props} />
  );
  
  const YandexIcon = (props) => (
    <Icon name='globe-outline' pack='eva' {...props} /> // Yandex ikonu için uygun bir simge (örn. globe)
  );
  const [isCompanyApplicationModalVisible, setCompanyApplicationModalVisible] = React.useState(false);
  const [sirketId, setSirketId] = React.useState<number>(0);
  const sirketler  = useSelector((state: RootState) => state.sirketler.sirketler);
  const status = useSelector((state:RootState) => state.sirketler.status);
  const mail_lists  = useSelector((state: RootState) => state.teklif.mails_array);
  const mail  = useSelector((state: RootState) => state.teklif.mails);



  
  const user_mail  = useSelector((state: RootState) => state.register.email);

  const [baslik, setBaslik] = React.useState<string | undefined>();
  const [icerik, setİcerik] = React.useState<string | undefined>();


  interface MailInfo {
    mail: string;
    tag: string;
  }
  
  interface KonumInfo {
    konum: string;
    tag: string;
  }
  
  interface TelefonInfo {
    telefon: string;
    tag: string;
  }
  
  interface Etiket {
    value: string;
  }
  
  interface Sirket {
    sirket_mail: MailInfo[];
    sirket_konum: KonumInfo[];
    sirket_web: string[];
    sirket_telefon: TelefonInfo[];
    etiketler: Etiket[];
    instegram: string;
    facebook: string;
    linkedin: string;
    pinterest: string;
    x: string;
  }
  const dispatch = useDispatch<AppDispatch>();
  // Component mount olduğunda veriyi çekiyoruz
 
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync("userToken");
        setToken(storedToken);
      } catch (error) {
        console.error("Token alma hatası:", error);
      }
    };

    fetchToken();
  }, []); // Bu useEffect sadece component mount olduğunda çalışır

  // Burası Token Değiştiğinde çalışacak
  useEffect(() => {
    if (token) {
      dispatch(fetchSirketler());
    }
  }, [token, dispatch]); // Token değiştiğinde veya dispatch değiştiğinde çalışır

  useEffect(() => {
    if (tokenRemoved) {
      dispatch(fetchSirketler());
      setTokenRemoved(false);
    }
  }, [tokenRemoved, dispatch]);

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync('userToken');
      setToken(null);
      setTokenRemoved(true);
      navigate("Login");
    } catch (error) {
      console.error("Token kaldırma hatası:", error);
    }
  };

  const {height} = useLayout();
  const [active, setActive] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState('');
  const {ref, open, close} = useModalize();
  const modalizeRef2 = React.useRef<Modalize>(null);
  // İlk modalı açma fonksiyonu
 

  const handleSelect = (index: IndexPath) => {
  };
  const handleMailPress = (mail: string, baslik: string, icerik: string) => {
    const subject = baslik || "";
    const body = icerik || "";
    const mailAddresses = mail;
  
    const mailtoURL = `mailto:${mailAddresses}?subject=${subject}&body=${body}`;
  
    Share.share({
      message: `Subject: ${baslik}\n\n${icerik}`,
      url: mailtoURL,
    }).catch(err => console.error("An error occurred", err));
  };
  
// Örnek kullanım


// Telefon arama fonksiyonu
const handlePhonePress = (phone : number) => {
  Linking.openURL(`tel:${phone}`);
};

// Web sitesine gitme fonksiyonu
const handleWebPress = (url : string) => {
  Linking.openURL(`https://${url}`);
};
// Konuma gitme fonksiyonu
const handleLocationPress = (konum : string) => {
  Linking.openURL(konum);
};

interface MailInfo {
  mail: string;
  tag: string;
}

interface TelefonInfo {
  telefon: string;
  tag: string;
}

interface KonumInfo {
  konum: string;
  tag: string;
}

interface Etiket {
  value: string;
}

interface SirketVeriler {
  sirket_mail: MailInfo[];
  sirket_telefon: TelefonInfo[];
  sirket_konum: KonumInfo[];
  sirket_web: string[];
  etiketler: Etiket[];
  instegram: string;
  facebook: string;
  linkedin: string;
  pinterest: string;
  x: string;
}

interface Sirket {
  sirket_id: number;
  sirket_ad: string;
  sirket_durum: string;
  sirket_veriler: SirketVeriler; // Yukarıda tanımladığımız alt yapı
}


const StarIcon = (props): IconElement => (
  <Icon
    {...props}
    name='google'
  />
);

const renderItem = ({ item }: { item: Sirket }) => (
  <View style={styles.itemContainer}>
    {/* Şirket Mail */}
    {item.sirket_mail.map((mailItem, index) => (
      <TouchableOpacity key={index} style={styles.row} onPress={() => handleMailPress(mailItem.mail, "dwed", "wdwed")}>
        <AppIcon name={EvaIcons.EmailOutline} size={24}  />
        <Text style={styles.text}>{mailItem.mail}</Text>
      </TouchableOpacity>
    ))}

    {/* Şirket Telefon */}
    {item.sirket_telefon.map((telefonItem, index) => (
      <TouchableOpacity key={index} style={styles.row} onPress={() => handlePhonePress(telefonItem.telefon)}>
        <AppIcon name={EvaIcons.PhoneOutline} size={24}  />
        <Text style={styles.text}>{telefonItem.telefon}</Text>
      </TouchableOpacity>
    ))}

    {/* Şirket Konum */}
    {item.sirket_konum.map((konumItem, index) => (
      <TouchableOpacity key={index} style={styles.row} onPress={() => handleLocationPress(konumItem.konum)}>
        <AppIcon name={EvaIcons.PinOutline} size={24}  />
        <Text style={styles.text}>Konuma Git</Text>
      </TouchableOpacity>
    ))}

    {/* Şirket Web */}
    {item.sirket_web.map((webItem, index) => (
      <TouchableOpacity key={index} style={styles.row} onPress={() => handleWebPress(webItem)}>
        <AppIcon name={EvaIcons.GlobeOutline} size={24}  />
        <Text style={styles.text}>{webItem}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

  // İkinci modalı açma fonksiyonu
  const openModal2 = () => {
    modalizeRef2.current?.open(); // İkinci modalı açar
  };

  const openLink = (url) => {
    Linking.openURL(url).catch(err => console.error("An error occurred", err));
  };

  const closeModal2 = () => {
    modalizeRef2.current?.close(); // İkinci modalı kapatır
  };

  interface SirketMail {
    mail: string;
    tag: string;
  }
  
  interface SirketKonum {
    konum: string;
    tag: string;
  }
  
  interface SirketTelefon {
    telefon: string;
    tag: string;
  }
  
  interface Etiketler {
    value: string;
  }
  
  interface SirketVeriler {
    sirket_mail: SirketMail[];
    sirket_konum: SirketKonum[];
    sirket_web: string[];
    sirket_telefon: SirketTelefon[];
    etiketler: Etiketler[];
    instegram: string;
    facebook: string;
    linkedin: string;
    pinterest: string;
    x: string;
  }
  interface Sirket {
  sirket_ad: string;
  sirket_veriler: SirketVeriler;
}

interface Sirket {
  sirket_ad: string;

}

const searchDoctor = React.useMemo(() => {
  if (!searchValue) return sirketler; // Arama yoksa tüm listeyi döndür

  const searchValueUpper = searchValue.replace(/\s+/g, '').toLocaleUpperCase('tr-TR');
  const searchValueLower = searchValue.replace(/\s+/g, '').toLocaleLowerCase('tr-TR');
  
  return sirketler.filter((sirket: Sirket) => {
    const sirketAdUpper = sirket.sirket_ad.replace(/\s+/g, '').toLocaleUpperCase('tr-TR');

    // Şirket adıyla eşleşme kontrolü
    if (sirketAdUpper.includes(searchValueUpper)) return true;

    // Etiketlerde eşleşme kontrolü
    return sirket.sirket_veriler.etiketler.some((etiket: Etiket) =>
      etiket.value?.toLocaleLowerCase('tr-TR').replace(/\s+/g, '').includes(searchValueLower)
    );
  });
}, [searchValue, sirketler]);


const handleSubmit = () => {
  // FormData nesnesi oluşturma
  const formData = new FormData();

  // FormData'ya diğer alanları ekleme
  formData.append('baslik', baslik);
  formData.append('mesaj', icerik);
  formData.append('mail_adresi', user_mail);

  // Sadece mail adreslerini içeren bir dizi oluşturma
 
  // mailAddresses'i JSON formatına dönüştürerek formData'ya ekleme
  formData.append('mails', JSON.stringify(mailList2));

  // Veriyi dispatch ile gönderme
  console.log(formData, "FormData içeriği:");
  dispatch(AddBulkMail(formData));
  Alert.alert("Bilgi", "Teklif Gönderme İşlemi Başarılı");
  setModalVisible(false);
};

const bilgi = useSelector((state: RootState) => state.register);
console.log(bilgi,"bilgilerim");
const onClose = () => 
  {
    setModalVisible(false);
  }

const onOpen =  () => 
  {
    setModalVisible(true);
  }
  
  const _onDetails = (doctor:IDoctorProps) => {
  openModal2();
  setSearchValue("");

};
  const [selectedIndex, setSelectedIndex] = React.useState<IndexPath | IndexPath[]>(new IndexPath(0));

  const selectItem = ["Uygulama Üzerinden Mail Gönder","Mail Üzerinden Gönder "]
  
  const ListHeaderComponent = () => {
    return (
      <CustomLayout level="3" mt={16}>
      
        {searchValue ? (
          <Text category="t5" marginLeft={24} marginTop={16} marginBottom={8}>
             Arama Kelimesi: "{searchValue}"
          </Text>
        ) : (
          <Text category="t5" marginLeft={24} marginTop={16} marginBottom={8}>
            Firma Sayısı:32
          </Text>
        )}
      </CustomLayout>
    );
  };

  {
    if (status === 'loading') {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="blue" />
          <Text>Yükleniyor...</Text>
        </View>
      );
    }
    else 
    {
    return (
    <Container style={styles.container} useSafeArea={false}>
      <CustomLayout style={[styles.nav, {paddingTop: top + 8}]}>
        <TopNavigation
        style={{marginLeft:20}}
          title="Firmalar APP"
          accessoryRight={() => (
            <>  
          
            <Button size='tiny'  onPress={() =>
            {
               setCompanyApplicationModalVisible(true)
           
            }
               } status='primary'>
              Başvuru Yap
              
          </Button>
          <NavigationAction
              icon={EvaIcons.LogOut}
              onPress={handleLogout}
            />
            




             </>
          )}
        />


        <Input
          accessoryLeft={props => (
            <AppIcon
              name={EvaIcons.Search}
              //@ts-ignore
              size={props?.style.width}
              //@ts-ignore
              fill={props?.style.tintColor}
            />
          )}
          value={searchValue}
          onChangeText={e => setSearchValue(e)}
          placeholder="Firma Ara"
          style={styles.input}
          clearButtonMode="while-editing"
        />
      </CustomLayout>
        <FlatList
          contentContainerStyle={styles.contentContainer}
          ListEmptyComponent={() => <ListEmptyDoctor />}
          data={searchValue ? searchDoctor : sirketler}
          keyExtractor={keyExtractoUtil}
          
          renderItem={({ item, index }) => {
            const isLastItem = index === searchDoctor.length - 1; // Son item kontrolü
          
            return (
              <CustomLayout mh={24} onPress={() => {
                _onDetails(item);
                setSirketId(index);   
              }}>
               
                <DoctorItem 
                  nameList={nameList || []} 
                  setNameList={setNameList} 
                  setMailList2={setMailList2}
                  mailList2={mailList2}
                  setMailList={setMailList} 
                  mailList={mailList} 
                  mail={item.sirket_veriler.sirket_mail[0].mail}
                  searchValue={searchValue} 
                  onOpen={onOpen} 
                  data={item} 
                />
                
            
            {
              isLastItem && 
                  <Button 
                    size='tiny'
                    status={nameList?.length > 0 ? "success" : "danger"}
                    style={{marginTop:20,borderRadius:100}}
                    onPress={() => {
             
             
                      // Teklif al işlemini burada gerçekleştirin
                      if(nameList?.length > 0 ) 
                      {
                        setModalVisible(true);

                      }
                      else 
                      {
                        Alert.alert("Lütfen Mail Adresi Seçiniz")
                      }
                
                    }} 
                  >
                    Teklif Al
                  </Button>
          }
              </CustomLayout>
            );
          }}
          
        />
  

  <Modal
  visible={isModalVisible}
  transparent={true}
  animationType="slide"
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.centeredView}>
    <View style={styles.modalView}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setModalVisible(false)}
      >
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>

      <Text category="t5" style={{ marginHorizontal: 1, textAlign: 'center', marginBottom: 20, paddingTop: 20 }}>
        Teklif Al
      </Text>

      <View style={{ marginBottom: 20 }}>
        <Text category="label" style={{ textAlign: 'center', marginBottom: 10 }}>
          Mail Gönderilecek Firmalar
        </Text>
        {nameList && nameList.map((name, index) => (
          <Text key={index} style={{ textAlign: 'center', color: 'gray', marginBottom: 5 }}>
            {name}
          </Text>
        ))}
      </View>
      {
        baslik && icerik ? null : <Text style={tw`text-right ml-auto flex justify-end my-4 text-xs font-bold  text-red-600  `}>Lütfen Teklif Başlığı ve İçeriği Giriniz</Text>
      }

      <Select
        style={{ marginBottom: 10, width: "100%" }}
        selectedIndex={selectedIndex}
        onSelect={async() => {
          if (mailList2.length === 0) {
            Alert.alert("Uyarı", "Lütfen en az bir mail adresi seçiniz.");
            return;
          }

          const subject = baslik || "";
          const body = icerik || "";

          const mailAddresses = mailList2.join(',');

          const mailtoURL = `mailto:${mailAddresses}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

          try {
            const supported = await Linking.canOpenURL(mailtoURL);
            if (supported) {
              await Linking.openURL(mailtoURL);
              console.log('Mail uygulaması açıldı');
            } else {
              Alert.alert('Hata', 'Mail uygulaması açılamıyor');
              console.error('Mail uygulaması açılamıyor');
            }
          } catch (error) {
            Alert.alert('Hata', 'Mail açılırken bir hata oluştu');
            console.error('Mail açılırken hata:', error);
          }
        }}
        value={
          selectedIndex !== null
            ? selectedIndex.row === 0
              ? 'Uygulama Üzerinden Gönder'
              : 'Kendi Mail Adresin Üzerinden Gönder'
            : 'Gönderim Yöntemi Seçin'
        }
      >
        <SelectItem  disabled title="Uygulama Üzerinden Gönder" />
         <SelectItem disabled={baslik && icerik ? false : true} style={tw`${baslik && icerik ? "opacity-100" : "opacity-30"}`} title="Kendi Mail Adresin Üzerinden Gönder" /> 
      </Select>

      <Input
        onChangeText={(value) => setBaslik(value)}
        style={{ color: "black", backgroundColor: "black", marginBottom: 20 }}
        placeholder='Teklif Başlığı'
        textStyle={{ color: "white", height: 20,fontSize:14 }}
        returnKeyType="next"
        onSubmitEditing={() => icerikInputRef.current?.focus()}
        accessoryLeft={props => (
          <AppIcon
            name={EvaIcons.MessageCircleOutline}
            //@ts-ignore
            size={props?.style.width}
            //@ts-ignore
            fill={props?.style.tintColor}
          />
        )}
      />

      <Input
        ref={icerikInputRef}
        onChangeText={(value) => setİcerik(value)}
        textStyle={{ color: "white", height: 120,fontSize:14 }}
        style={{ backgroundColor: "black", marginBottom: 40 }}
        placeholder='Teklif İçeriği'
        placeholderTextColor="gray"
        returnKeyType="done"
      />

      <Button status='primary' onPress={() => handleSubmit()}>
        Teklif Al
      </Button>
    </View>
  </View>
</Modal>
<CompanyApplicationModal sirketler={sirketler} isModalVisible={isCompanyApplicationModalVisible} setModalVisible={setCompanyApplicationModalVisible} />

    </Container>
  );
}
}
});

export default SearchScreen;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  button: {
    minWidth: 64,
  },
  nav: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingBottom: 24,
    backgroundColor: 'background-basic-color-1',
  },
  input: {
    marginHorizontal: 24,
  },
  contentContainer: {
    paddingBottom: 150,
    gap: 16,
    marginTop:10,
    backgroundColor: 'background-basic-color-3',
  },
  activeTag: {
    backgroundColor: 'color-primary-default',
  },
  tag: {
    borderWidth: 1,
    borderColor: 'color-primary-default',
    paddingHorizontal: 12,
    borderRadius: 99,
    paddingVertical: 4,
  },
  contentTag: { 
    gap: 8,
    paddingHorizontal: 24,
    marginTop: 24,
  },
  background: {},
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 8,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'background-basic-color-3',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export const OPTIONS = [
  'All',
  'General',
  'Dentist',
  'Nutritionist',
  'Medicationist',
];
