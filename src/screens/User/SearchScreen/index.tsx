import * as React from 'react';
import {ActivityIndicator, Alert,  FlatList, Linking, TouchableOpacity, View} from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
    Input, 
Button,
Icon,
IconElement

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
import {NavigationProp, useNavigation, useTheme} from '@react-navigation/native';
import {MainStackParamList} from 'types/navigation-types';
// ----------------------------- Assets ---------------------------------------
import {DOCTORS_DATA} from 'constants/data';
import { IDoctorProps } from 'types/element-types';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch } from 'reduxs/store';
import { useEffect } from 'react';
import { AppDispatch, RootState } from "reduxs/store";
import { fetchSirketler } from 'reduxs/reducers/SirketlerSlice';
import { stat } from 'fs';
import ModalItem from 'elements/ModalsItem';
import { logout } from 'reduxs/reducers/UserSlice';
import { AuthStackParamList } from 'types/navigation-types';
import { AddBulkMail, setMailArray } from 'reduxs/reducers/teklifSlice';

const SearchScreen = React.memo(() => {
  const styles = useStyleSheet(themedStyles);
  const {top} = useLayout();
  const [mail_list,setMailList] = React.useState<any>([]);
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();

  const GoogleIcon = (props) => (
    <Icon name='google' pack='eva' {...props} />
  );
  
  const YandexIcon = (props) => (
    <Icon name='globe-outline' pack='eva' {...props} /> // Yandex ikonu için uygun bir simge (örn. globe)
  );
  
  const [sirketId, setSirketId] = React.useState<number>(0);
  const sirketler  = useSelector((state: RootState) => state.sirketler.sirketler);
  const status = useSelector((state:RootState) => state.sirketler.status);
  const mail_lists  = useSelector((state: RootState) => state.teklif.mails_array);
  const mail  = useSelector((state: RootState) => state.teklif.mails);
  
  const user_mail  = useSelector((state: RootState) => state.register.email);

  const [baslik, setBaslik] = React.useState<string | undefined>(undefined);
  const [icerik, setİcerik] = React.useState<string | undefined>(undefined);
  


  if (status === 'loading') {
     
        
        <ActivityIndicator size="large" color="#0000ff" /> 

        
  }
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
    dispatch(fetchSirketler());
  }, [dispatch]);

  
  const {height} = useLayout();
  const [active, setActive] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState('');
  const {ref, open, close} = useModalize();
  const modalizeRef2 = React.useRef<Modalize>(null);
  // İlk modalı açma fonksiyonu
 
 // Mail gönderme fonksiyonu
 const handleMailPress = (mail : string) => {
  Linking.openURL(`mailto:${mail}`);
};

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
      <TouchableOpacity key={index} style={styles.row} onPress={() => handleMailPress(mailItem.mail)}>
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
  const searchResults = sirketler.filter(sirket =>
    sirket.sirket_ad.toLowerCase().includes(searchValue.toLowerCase()),
  );

  let newMailList = []; 
  searchResults.forEach(sirket => {
    sirket.sirket_veriler.sirket_mail.map((item) => 
    {
      dispatch(setMailArray(item.mail));
    newMailList.push(item.mail);
      setMailList(newMailList);
    })
  });

  return searchResults;
}, [searchValue]);


const handleSubmit = () => { 

  // FormData nesnesi oluşturma
  const formData = new FormData();
  formData.append('baslik', baslik);
  formData.append('mesaj', icerik);
  formData.append("mail_adresi", user_mail);
  // Eğer mail_lists doluysa ve iç içe geçmiş diziler varsa, flat ile tek boyutlu bir diziye dönüştür

    const flattenedMailLists = mail_list.flat(); // İç içe dizileri düzleştiriyoruz
  
    console.log("Düzleştirilmiş mail listesi:", flattenedMailLists);
    formData.append('mails', JSON.stringify(mail_list));


  // Bu verileri dispatch ile gönderelim
  dispatch(AddBulkMail(formData));
  Alert.alert("Bilgi", "Mail Gönderim İşlemi Başarılı");
};



  const _onDetails = (doctor:IDoctorProps) => {
  openModal2();
  setSearchValue("");
  };
  const ListHeaderComponent = () => {
    return (
      <CustomLayout level="3" mt={16}>
        <FlatList
          keyExtractor={keyExtractoUtil}
          data={OPTIONS}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentTag}
          horizontal
          renderItem={({item: opt, index}) => {
            const isActive = index === active;
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.tag, isActive && styles.activeTag]}
                onPress={() => {
                  setActive(index);
                }}
                key={index}>
                <Text status={isActive ? 'white' : 'primary'}>{opt}</Text>
              </TouchableOpacity>
            );
          }}
        />
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
  return (
    <Container style={styles.container} useSafeArea={false}>
      <CustomLayout style={[styles.nav, {paddingTop: top + 8}]}>
        <TopNavigation
          title="Search"
          accessoryLeft={() => <NavigationAction marginRight={12} />}
          accessoryRight={() => (
            <>  
            <NavigationAction
              icon={EvaIcons.LogOut}
              onPress={() => {
                dispatch(logout())
                navigate("Login");
              }}
            />

            <NavigationAction
              icon={EvaIcons.Options2Outline}
              onPress={() => {
                open();
              }}
            />




<NavigationAction 

              icon={EvaIcons.BellOutline}
            
              onPress={() => {
                open();
              }}
            >
            </NavigationAction>



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
          renderItem={({item,index}) => {
            return (
              <CustomLayout mh={24} onPress={()=>  {
                
                _onDetails(item),
              setSirketId(index)
            

              }}>
                <DoctorItem data={item}/>

              </CustomLayout>
            );
          }}
        />
  
<Modalize
        ref={modalizeRef2} // Birinci modal ref
        handlePosition="inside"
        modalHeight={300}
        modalStyle={{backgroundColor:"white"}}
      
      >
    <CustomLayout level="2" style={styles.container} horizontal gap={12}>
      {/* Şirket Adı */}
      <CustomLayout style={{ flex: 1 }}>
        <CustomLayout style={{display:"flex",flexDirection:"column"}} horizontal justify="space-between">
          <Text category="t5" style={{textAlign:"center"}}> 

            {
              sirketler[sirketId]?.sirket_ad
              
            }

          </Text>
          <View>   
          <View style={{ marginLeft: 20, marginTop: 30, gap: 20 }}>

{/* Mail */}
<View>
  {sirketler[sirketId]?.sirket_veriler?.sirket_mail.map((item) => {
    return (
      <View key={item?.mail} style={{ display: "flex", flexDirection: "row", gap: 10,flexWrap:"wrap" }}>
        <AppIcon name={EvaIcons.Email} size={22} />
        <Text>{item?.mail}</Text>
        <Button
          style={styles.button}
          status='danger'
          size='tiny'
          onPress={() => openLink(`mailto:${item?.mail}`)} // Mail linkini açar
        >
          {item?.tag}
        </Button>
      </View>
    );
  })}
</View>

{/* Konum */}
<View>
{sirketler[sirketId]?.sirket_veriler?.sirket_konum.map((item, index) => {
        const isYandexLink = item?.konum.includes('yandex'); // Yandex link kontrolü
        return (
          <View key={index} style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }}>
            <AppIcon name={EvaIcons.Map} size={22} />
            <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
              {isYandexLink ? (
                <Button
                  style={styles.button}
                  status='info'
                  size='tiny'
                  onPress={() => openLink(item.konum)} // Yandex linkini açar
                >
                  Yandex ile Aç
                </Button>
              ) : (
                <Button
                  style={styles.button}
                  status='info'
                  size='tiny'
                  onPress={() => openLink(`https://www.google.com/maps?q=${item?.konum}`)} // Google Haritalar linkini açar
                >
                  Google ile Aç
                </Button>
              )}
            </View>
          </View>
        );
      })}
</View>

{/* Telefon */}
<View>
  {sirketler[sirketId]?.sirket_veriler?.sirket_telefon.map((item) => {
    return (
      <View key={item?.telefon} style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}>
        <AppIcon name={EvaIcons.Phone} size={22} />
        <Text>{item?.telefon}</Text>
        <Button
          style={styles.button}
          status='info'
          size='tiny'
          onPress={() => openLink(`tel:${item?.telefon}`)} // Telefon arama
        >
          {item?.tag}
        </Button>
      </View>
    );
  })}
</View>

{/* Web Sitesi */}
<View>
  {sirketler[sirketId]?.sirket_veriler?.sirket_web.map((item) => {
    return (
      <View key={item} style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}>
        <AppIcon name={EvaIcons.Globe} size={22} />
        <Text>{item}</Text>
        <Button
          style={styles.button}
          status='info'
          size='tiny'
          onPress={() => openLink(`https://${item}`)} // Web sitesine git
        >
          Git
        </Button>
      </View>
    );
  })}
</View>

{/* Referanslar */}
<View>
  {sirketler[sirketId]?.sirket_veriler?.sirket_referanslar.map((item) => {
    return (
      <View key={item} style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}>
        <AppIcon name={EvaIcons.Person} size={22} />
        <Text>{item}</Text>
        <Button
          style={styles.button}
          status='primary'
          size='tiny'
        >
          {item?.tag}
        </Button>
      </View>
    );
  })}
</View>

</View>
          </View>
        <View>




        </View>
        </CustomLayout>

    

      </CustomLayout>
    </CustomLayout>
      </Modalize>


<Modalize
        ref={ref}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}

        handlePosition="inside"
        modalHeight={height / 2}
        modalStyle={{borderRadius: 40,marginHorizontal:10,backgroundColor:"white"}}>
        <CustomLayout level="3" mt={20} ph={34} style={{height:360}}>
          <Text category="t4" style={{marginHorizontal:1}} center>
            Teklif Al
          </Text>
        
           <Input
           onChangeText={(value) => setBaslik(value)}
          style={{backgroundColor:"white",marginTop:20}}
          placeholder='Teklif Başlığı'
         accessoryLeft={props => (
            <AppIcon
              name={EvaIcons.MessageCircleOutline}
              //@ts-ignore
            
              size={props?.style.width}
              //@ts-ignore
              fill={props?.style.tintColor}
            />
          )}/> 
            <Input
                       onChangeText={(value) => setİcerik(value)}

          style={{backgroundColor:"white",marginTop:20,height:700}}
          placeholder='Teklif İçeriği'
        /> 
         <Input
                       onChangeText={(value) => setİcerik(value)}

          style={{backgroundColor:"white",marginTop:20,height:700}}
          placeholder='Teklif İçeriği'
        /> 
     
        
        </CustomLayout>
        <Button  onPress={() => handleSubmit()} style={{zIndex:100}}>
          Denemed
        </Button>
      </Modalize>


    </Container>
  );
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


});

export const OPTIONS = [
  'All',
  'General',
  'Dentist',
  'Nutritionist',
  'Medicationist',
];
