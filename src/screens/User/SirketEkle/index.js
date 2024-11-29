import React, { useEffect, useState } from 'react';
import { View,  StyleSheet, TouchableOpacity, Alert, ScrollView, SafeAreaView,Image, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'react-native-axios';
import PhoneInput from 'react-native-phone-input';
import RNPickerSelect from 'react-native-picker-select';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'expo-image-picker';
import { Input, TopNavigation } from '@ui-kitten/components';
import {
  AppIcon,
  ButtonPickCountry,
  Container,
  Content,
  CustomLayout,
  NavigationAction,
  Text,
} from 'components';
import { width } from 'react-native-size-scaling';
const CompanyScreen = ({ navigation }) => {
  
  const referanslar = [];
  const [selectedImages, setSelectedImages] = useState([]);
  const [county,setCountry] = useState(_country);
  const [fileData, setFileData] = useState(new FormData());
console.log(fileData);
  const pickImages = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('İzin Gerekli', 'Fotoğraf galerisine erişim izni verilmedi.');
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true, // Çoklu seçim aktif
        selectionLimit: 0, // Sınırsız seçim
        quality: 1,
      });
      if (!result.canceled) {
        setFirmaResimler(result.assets.map((asset) => asset.uri)); // Seçilen resimleri state'e ekle
      }
    } catch (error) {
      console.error('Resim seçme hatası:', error);
      Alert.alert('Hata', 'Resim seçilirken bir hata oluştu.');
    }
  };
const fileDatas = new FormData();

const handlepickImages = async () => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('İzin Gerekli', 'Fotoğraf galerisine erişim izni verilmedi.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // Çoklu seçim sadece Bare Workflow ile çalışır.
      selectionLimit: 0, // Sınırsız seçim
      quality: 1,
    });

    if (!result.canceled) {
      // FormData'ya resimleri ekle
      const newFileData = new FormData();

      result.assets.map((item, index) => {
        referanslar.push(`image-${index}.jpg`);
        // Resim bilgilerini FormData'ya ekle
        newFileData.append('sirket_referanslar[]', {
          uri: item.uri,
          type: 'image/jpeg', // Resmin formatına göre ayarlayın (image/png, image/jpg vb.)
          name: `image-${index}.jpg`,
        });

        // Ekstra bilgileri ekleyin (height, width vs.)
        newFileData.append(`file_info_${index}`, JSON.stringify({
          height: item.height,
          width: item.width,
          uri: item.uri,
        }));
      });

      setFileData(newFileData); // FormData'yı state'e kaydet
      console.log(fileData);
      setSelectedImages(result.assets.map((asset) => asset.uri)); // Seçilen resimleri URI olarak state'e kaydet
    }
  } catch (error) {
    console.error('Resim seçme hatası:', error);
    Alert.alert('Hata', 'Resim seçilirken bir hata oluştu.');
  }
};


const submitData = async () => {
  try {
    const response = await axios.post('https://mobileapp.turkuvazprojeler.com/upload-multiple-image.php', fileData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    Alert.alert('Başarılı', 'Resimler başarıyla yüklendi.');
    console.log('Sunucu yanıtı:', response.data);
  } catch (error) {
    console.error('Yükleme hatası:', error);
    Alert.alert('Hata', 'Resim yüklenirken bir hata oluştu.');
  }
};


  
  const [formData, setFormData] = useState({
    sirketAd: '',
    sirketTelefon: [{ telefon: '', tag: 'Şirket Telefon' }],
    sirketMail: [{ mail: '', tag: 'sirketmail' }],
    sirketKonum: [{ konum: '', tag: 'Konum' }],
    sirketWeb: [''],
    sirketReferanslar:[''],
    etiketler: [],
    etiket: '',
    instagram: '',
    pinterest: '',
    linkedin: '',
    xcom: '',
    facebook: ''
  });

  const [formErrors, setFormErrors] = useState({
    sirketAd: '',
    sirketTelefon: [''],
    sirketMail: [''],
    sirketKonum: [''],
    sirketWeb: [''],
    etiketler: [''],
    sirketReferanslar:referanslar ? referanslar : [],
  });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateWebsite = (url) => {
    const re = /^(https?:\/\/)?([a-zA-Z0-9.-]+)?\.[a-zA-Z]{2,}\/?.*$/;
    return re.test(String(url).toLowerCase());
  };

  const validateMapUrl = (url) => {
    const re = /^https:\/\/maps\.app\.goo\.gl\/.+/;
    const ya = /yandex/;
    return re.test(String(url).toLowerCase()) || ya.test(String(url).toLowerCase());
  };

  const validateSocialUrl = (url, type) => {

    
    let re;
    switch(type) {
      case 'instagram':
        re = /^https:\/\/(www\.)?instagram\.com\/.*$/;
        break;
      case 'pinterest':
        re = /^https:\/\/(www\.)?(pinterest|tr\.pinterest)\.com\/.*$/;
        break;
      case 'linkedin':
        re = /^https:\/\/(www\.)?(linkedin|tr\.linkedin)\.com\/.*$/;
        break;
      case 'xcom':
        re = /^https:\/\/(www\.)?x\.com\/.*$/;
        break;
      case 'facebook':
        re = /^https:\/\/(www\.)?facebook\.com\/.*$/;
        break;
      default:
        return false;
    }
    return re.test(String(url).toLowerCase());
  };

  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .replace(/(?:^|\s)\S/g, char => char.toUpperCase());
  };

  const handleAddField = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], field === 'sirketTelefon' ? { telefon: '', tag: '' } : field === 'sirketMail' ? { mail: '', tag: '' } : field === 'sirketKonum' ? { konum: '', tag: 'Konum' } : { value: '' }]
    });
    setFormErrors({
      ...formErrors,
      [field]: [...formErrors[field], '']
    });
  };

  const handleRemoveField = (field, index) => {
    const newFieldValues = [...formData[field]];
    newFieldValues.splice(index, 1);
    setFormData({
      ...formData,
      [field]: newFieldValues
    });
    const newFieldErrors = [...formErrors[field]];
    newFieldErrors.splice(index, 1);
    setFormErrors({
      ...formErrors,
      [field]: newFieldErrors
    });
  };

  const handleInputChange = (field, index, value, key = null) => {
    const newFieldValues = [...formData[field] || []]; // Eğer undefined ise, boş dizi oluştur

    if (field === 'sirketTelefon') {
        if (key === 'telefon') {
            value = value.replace(/[^0-9]/g, ''); // Sadece rakam ve + işaretine izin ver
            newFieldValues[index].telefon = value;
        } else {
            newFieldValues[index][key] = value;
        }
    } else if (field === 'sirketMail') {
        if (key === 'mail') {
            newFieldValues[index].mail = value.toLowerCase();
        } else {
            newFieldValues[index][key] = value.toLowerCase();
        }
    } else if (field === 'sirketKonum') {
        if (key === 'konum') {
            newFieldValues[index].konum = value;
        } else if (key === 'tag') {
            newFieldValues[index].tag = value;
        }
    } else if (field === 'etiketler') {
        newFieldValues[index].value = value;
    } else if (field === 'sirketAd') {
        setFormData({
            ...formData,
            [field]: value.toLocaleUpperCase("tr-TR")
        });
        const newFieldErrors = { ...formErrors };
        newFieldErrors.sirketAd = value ? '' : 'Şirket adı boş bırakılamaz.';
        setFormErrors(newFieldErrors);
        return;
    } else if (field === 'sirketWeb') {
        newFieldValues[index] = value;
    } else if (field === 'sirketReferanslar') {
        newFieldValues[index] = value;
    } else {
        newFieldValues[index] = value;
    }

    setFormData({
        ...formData,
        [field]: newFieldValues
    });

    // Hata mesajını güncelle
    const newFieldErrors = [...formErrors[field] || []]; // Eğer undefined ise, boş dizi oluştur
    if (field === 'sirketMail' && key === 'mail') {
        newFieldErrors[index] = validateEmail(value) ? '' : 'Geçerli bir e-posta adresi girin.';
    } else if (field === 'sirketTelefon' && key === 'telefon') {
        newFieldErrors[index] = value.length >= 10 ? '' : 'Telefon en az 10 haneli olmalıdır.';
    } else if (field === 'sirketWeb') {
        newFieldErrors[index] = validateWebsite(value) ? '' : 'Geçerli bir web sitesi URL\'si girin.';
    } else if (field === 'sirketKonum') {
        if (key === 'konum') {
            newFieldErrors[index] = validateMapUrl(value) ? '' : 'Geçerli bir harita URL\'si girin (Google veya Yandex Maps).';
        } else if (key === 'tag') {
            newFieldErrors[index] = value ? '' : 'Konum tag\'i seçilmelidir.';
        }
    }  else {
        newFieldErrors[index] = '';
    }
    setFormErrors({
        ...formErrors,
        [field]: newFieldErrors
    });
};


const handleSubmit = () => {
  const { sirketAd, sirketReferanslar, sirketTelefon, sirketMail, sirketKonum, sirketWeb, etiketler, instagram, pinterest, linkedin, xcom, facebook } = formData;
  if (!sirketAd || !Array.isArray(sirketTelefon) || !Array.isArray(sirketMail) || !Array.isArray(sirketKonum) || !Array.isArray(sirketWeb)) {
      Alert.alert('Hata', 'Lütfen tüm gerekli alanları doldurun.');
      return;
  }

  let errors = {
      sirketAd: sirketAd ? '' : 'Şirket adı boş bırakılamaz.',
      sirketTelefon: sirketTelefon.map(item => (item.telefon ? '' : 'Telefon numarası boş bırakılamaz.')),
      sirketMail: sirketMail.map(item => (validateEmail(item.mail) ? '' : 'Geçerli bir e-posta adresi girin.')),
      sirketKonum: sirketKonum.map(item => (validateMapUrl(item.konum) ? '' : 'Geçerli bir harita URL\'si girin (Google veya Yandex Maps).')),
      sirketWeb: sirketWeb.map((item, index) => (validateWebsite(item) ? '' : 'Geçerli bir web sitesi URL\'si girin.')),
      etiketler: etiketler.map(item => (item ? '' : 'Şirket Faaliyet boş bırakılamaz.')),
  };

  setFormErrors(errors);

  const hasErrors = Object.values(errors).some(fieldErrors =>
      Array.isArray(fieldErrors) ? fieldErrors.some(error => error !== '') : fieldErrors !== ''
  );

  if (hasErrors) {
      Alert.alert('Hata', 'Lütfen tüm alanları doğru bir şekilde doldurun.');
      return;
  } else if (etiketler.length < 1) {
      Alert.alert('Hata', 'Lütfen tüm alanları doğru bir şekilde doldurun.');
      return;
  }

  const processedData = {
    sirket_ad: sirketAd || '',
    sirket_telefon: sirketTelefon || [],
    sirket_mail: sirketMail || [],
    sirket_konum: sirketKonum || [],
    sirket_web: sirketWeb || [],
    etiketler: etiketler || [],
    sirket_referanslar: sirketReferanslar || [],
    sirket_instegram: instagram || null,
    sirket_pinterest: pinterest || null,
    sirket_linkedin: linkedin || null,
    sirket_x: xcom || null,
    sirket_facebook: facebook || null,
  };
  axios.post('https://mobileapp.turkuvazprojeler.com/sirket-ekle.php', processedData, {
      headers: {
          'Content-Type': 'application/json',
      },
  })
  .then(response => {
      Alert.alert('Başarılı', 'Şirket bilgileri başarıyla kaydedildi.');
      navigation.goBack();
      setFormData({
          sirketAd: '',
          sirketTelefon: [{ telefon: '', tag: '' }],
          sirketMail: [{ mail: '', tag: '' }],
          sirketKonum: [{ konum: '', tag: 'Konum' }],
          sirketWeb: [''],
          sirketReferanslar: [''],
          etiketler: [],
          instagram: '',
          pinterest: '',
          linkedin: '',
          xcom: '',
          facebook: ''
      });
    
  })
  .catch(error => {
      console.error(error);
      Alert.alert('Hata', 'Şirket eklenirken bir hata oluştu.');
  });
  submitData();
};


  const handleTagSubmit = (value) => {
    if (value.trim() === '') return;
    setFormData((prevFormData) => ({
      ...prevFormData,
      etiketler: [...prevFormData.etiketler, { value: value.trim() }],
      etiket: ''  // Mevcut etiket girişini temizle
    }));
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      etiketler: [...prevFormErrors.etiketler, ''],
      etiket: ''  // Mevcut etiket giriş hatasını temizle
    }));
  };

  const locationTags = [
    { label: 'Merkez', value: 'Merkez' },
    { label: 'Şube', value: 'Şube' },
  ];

  return (
    <Container level='1' style={styles.container} useSafeArea={false}>
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps='handled'
      >
         
     <Content contentContainerStyle={styles.content}> 

     <TopNavigation
     style={{marginLeft:-23}}
              title={''}
              accessoryLeft={() => <NavigationAction    />}
            />
     
          <View style={styles.sperator} />
          <View style={styles.inputContainer}>
          <Text style={styles.label}>Şirket Adı</Text>
            <Input
            placeholder='Şirket Adı'
              placeholderTextColor="#999"
              style={styles.input}
              value={formData.sirketAd}
              onChangeText={(value) => handleInputChange('sirketAd', 0, value)}
            />
            {formErrors.sirketAd ? <Text style={styles.error}>{formErrors.sirketAd}</Text> : null}
          </View>
          <Text style={styles.labelResponsive}>Şirket Konum</Text>
          {formData.sirketKonum.map((item, index) => (
            <View key={index} style={styles.dynamicInputContainerRow}>
              <View style={styles.inputRowContainer}>
            
                <Input
                  placeholderTextColor="#999"
                  value={item.konum}
                  onChangeText={(value) => handleInputChange('sirketKonum', index, value, 'konum')}
                  placeholder="Konum URL"
                  style={styles.input}
                />
                
                <RNPickerSelect
                  placeholderTextColor="#999"
                  onValueChange={(value) => handleInputChange('sirketKonum', index, value, 'tag')}
                  items={locationTags}
                  value={item.tag}
                  style={pickerSelectStyles}
                  placeholder={{ label: "Konum seçin...", value: null }}
                />
                    {index > 0 && (
                  <TouchableOpacity onPress={() => handleRemoveField('sirketKonum', index)}>
                    <Ionicons name="remove-circle" size={24} color="red" />
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => handleAddField('sirketKonum')}>
                  <Ionicons name="add-circle" size={24} color="green" />
                </TouchableOpacity>
              </View>
              {formErrors.sirketKonum[index] ? <Text style={styles.error}>{formErrors.sirketKonum[index]}</Text> : null}
            </View>
          ))}
<Text style={styles.labelResponsive}>Şirket Mail</Text>
          {formData.sirketMail.map((item, index) => (
            <View key={index} style={styles.dynamicInputContainerRow}>
              <View style={styles.inputRowContainer}>
          
                <Input
                  placeholderTextColor="#999"
                  style={styles.input}
                  value={item.mail.toLowerCase()}
                  placeholder='Şirket Mail'
                  onChangeText={(value) => handleInputChange('sirketMail', index, value.toLowerCase(), 'mail')}
                />
                
                {index < 1 && (
                  <View style={{  height: "100%", borderRadius: 5,marginTop:10,marginRight: 5, flex: 1}}>
                    <Text style={{ marginRight: 10,marginTop:-30,  marginTop: 10,  borderRadius: 10 }}> Şirket Mail</Text>
                  </View>
                )}
                {index > 0 && (
                  <Input
                    placeholderTextColor="#999"
                    style={styles.inputDepartment}
                    value={item.tag}
                    onChangeText={(value) => handleInputChange('sirketMail', index, value, 'tag')}
                    placeholder="Departman Adı"
                  />
                )}
                      {index > 0 && (
                  <TouchableOpacity onPress={() => handleRemoveField('sirketMail', index)}>
                    <Ionicons name="remove-circle" size={24} color="red" />
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => handleAddField('sirketMail')}>
                  <Ionicons name="add-circle" size={24} color="green" />
                </TouchableOpacity>
              </View>
              {formErrors.sirketMail[index] ? <Text style={styles.error}>{formErrors.sirketMail[index]}</Text> : null}
            </View>
          ))}
   

          <Text style={styles.labelResponsive}>Şirket Telefon</Text>
          {formData.sirketTelefon.map((item, index) => (
  <View key={index} style={styles.dynamicInputContainerRow}>
    <View style={styles.inputRowContainer}>
      {/* Departman Adı Üstte, Telefon Numarası ve Ülke Seçimi Altta */}
      <View style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Departman Adı */}
        {index > 0 && (
          <Input
            placeholderTextColor="#999"
            style={styles.inputDepartment}
            value={item.tag}
            onChangeText={(value) => handleInputChange('sirketTelefon', index, value, 'tag')}
            placeholder="Departman Adı"
          />
        )}
        
        {/* Telefon Numarası ve Ülke Kodu */}
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: 10 }}>
          {/* Ülke Kodu Seçimi */}
          
          <ButtonPickCountry
          style={{marginRight:10}}
            country={county}
            onSave={e => setCountry('country', e)}
          />

          {/* Telefon Numarası */}
          <Input
            placeholder={'Telefon Numarası'}
            style={styles.input}
            value={item.telefon}
            onChangeText={(value) => handleInputChange('sirketTelefon', index, value, 'telefon')}
            onBlur={() => handleInputChange('sirketTelefon', index, item.telefon, 'telefon')}
            accessoryLeft={({ style }) => {
              return (
                county.dial_code && (
                  <CustomLayout horizontal itemsCenter gap={8}>
                    <Text>{county.dial_code}</Text>
                  </CustomLayout>
                )
              );
            }}
          />
               <TouchableOpacity onPress={() => handleAddField('sirketTelefon')}>
        <Ionicons name="add-circle" size={24} color="green" />
      </TouchableOpacity>
        </View>
      </View>

      {/* Ekle/Kaldır Butonları */}
 

      {index > 0 && (
        <TouchableOpacity onPress={() => handleRemoveField('sirketTelefon', index)}>
          <Ionicons name="remove-circle" size={24} color="red" />
        </TouchableOpacity>
      )}
    </View>

    {/* Hata Mesajı */}
    {formErrors.sirketTelefon[index] ? <Text style={styles.error}>{formErrors.sirketTelefon[index]}</Text> : null}
  </View>
))}


          

          <Text style={styles.label}>Şirket Web Sitesi</Text>
          {formData.sirketWeb.map((item, index) => (
            <View key={index} style={styles.dynamicInputContainer}>
              <View style={styles.inputContainer}>
                <Input
                placeholder='Web Site Adresiniz'
                  placeholderTextColor="#999"
                  style={styles.input}
                  value={item}
                  onChangeText={(value) => {
                    if (!value.startsWith('www.')) {
                      value = 'www.' + value.replace(/^(https?:\/\/)?(www\.)?/, ''); // www. ekle ve varsa diğer başlangıçları kaldır
                    }
                    handleInputChange('sirketWeb', index, value.toLowerCase());
                  }}
                  onFocus={() => {
                    if (formData.sirketWeb[index] === '') {
                      handleInputChange('sirketWeb', index, 'www.');
                    }
                  }}
                  onBlur={() => {
                    if (formData.sirketWeb[index] === '') {
                      handleInputChange('sirketWeb', index, 'www.');
                    }
                  }}
                />
                {formErrors.sirketWeb[index] ? <Text style={styles.error}>{formErrors.sirketWeb[index]}</Text> : null}
              </View>
              {index > 0 && (
                <TouchableOpacity onPress={() => handleRemoveField('sirketWeb', index)}>
                  <Ionicons name="remove-circle" size={24} color="red" />
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => handleAddField('sirketWeb')}>
                <Ionicons name="add-circle" size={24} color="green" />
              </TouchableOpacity>
            </View>
          ))}

    {/* Referanslar için dosya yükleme alanı */}
<TouchableOpacity onPress={handlepickImages} style={{marginTop:20}}>
  <Text style={styles.label}>Şirket Referans Yükle</Text>
  <Ionicons name="cloud-upload" size={24} color="blue" />
</TouchableOpacity>

<ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imagePreviewContainer}>
        {selectedImages.map((uri, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image source={{ uri }} style={styles.imagePreview} />
          </View>
        ))}
      </ScrollView>


          <Text style={styles.label}>Instagram</Text>
          <View style={styles.inputContainer}>
            <Input
              placeholderTextColor="#999"
              style={styles.input}
              placeholder="Instagram URL"
              value={formData.instagram}
              onChangeText={(value) => handleInputChange('instagram', 0, value)}
            />
            {formErrors.instagram ? <Text style={styles.error}>{formErrors.instagram}</Text> : null}
          </View>

          <Text style={styles.label}>Pinterest</Text>
          <View style={styles.inputContainer}>
            <Input
              placeholderTextColor="#999"
              style={styles.input}
              placeholder="Pinterest URL"
              value={formData.pinterest}
              onChangeText={(value) => handleInputChange('pinterest', 0, value)}
            />
          </View>

          <Text style={styles.label}>LinkedIn</Text>
          <View style={styles.inputContainer}>
            <Input
              placeholderTextColor="#999"
              style={styles.input}
              placeholder="LinkedIn URL"
              value={formData.linkedin}
              onChangeText={(value) => handleInputChange('linkedin', 0, value)}
            />
          </View>

          <Text style={styles.label}>X.com</Text>
          <View style={styles.inputContainer}>
            <Input
              placeholderTextColor="#999"
              style={styles.input}
              placeholder="X.com URL"
              value={formData.xcom}
              onChangeText={(value) => handleInputChange('xcom', 0, value)}
            />
          </View>

          <Text style={styles.label}>Facebook</Text>
          <View style={styles.inputContainer}>
            <Input
              placeholderTextColor="#999"
              style={styles.input}
              placeholder="Facebook URL"
              value={formData.facebook}
              onChangeText={(value) => handleInputChange('facebook', 0, value)}
            />
          </View>

          <Text style={styles.label}>Şirket Faaliyetleri</Text>
          <View style={styles.dynamicInputContainer}>
            <Input
              placeholderTextColor="#999"
              style={styles.input}
              placeholder="Şirket Faaliyeti Ekle"
              onSubmitEditing={(e) => {
                const inputText = e.nativeEvent.text;
                const formattedText = inputText.charAt(0).toUpperCase() + inputText.slice(1).toLowerCase();
                handleTagSubmit(formattedText);
              }}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.tagContainer}>
            {formData.etiketler.map((item, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{item.value}</Text>
                <TouchableOpacity onPress={() => handleRemoveField('etiketler', index)}>
                  <Ionicons name="close-circle" size={20} color="red" />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", flex: 1,marginTop:20 }}>
            <TouchableOpacity style={styles.Button} onPress={handleSubmit}>
              <Text style={{ textAlign: "center", color: "white" }}>Ekle</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ButtonDelete} onPress={() => navigation.goBack("Şirketler")}>
              <Text style={{ textAlign: "center", color: "white" }}>Kapat</Text>
            </TouchableOpacity>
          </View>
          <TopNavigation
              title={''}
            
            />
        </Content>
      </KeyboardAwareScrollView>

</Container>
  );
};

const styles = {
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  content: {
    flexGrow: 1,
  },
  sperator: {
    height: 1,
    backgroundColor: '#e5e5e5',
    marginVertical: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  dynamicInputContainerRow: {
    flexDirection: 'column',
    marginBottom: 16,
  width:"100%",
  },
  inputRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  labelResponsive: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
  },
  error: {
    color: 'red',
    fontSize: 12,
    width:"100%",
    
    marginTop: 4, // Hata mesajının inputun hemen altına gelmesi için margin
  
  },
  Button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  ButtonDelete: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 8,
    flex: 1,
  },
  imagePreviewContainer: {
    marginVertical: 16,
  },
  imageWrapper: {
    marginRight: 8,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginRight:10,
    color: 'gray',
    paddingRight: 35, // ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    marginRight: 3,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'gray',
    flex:1
  },
  containerSelectbox: {
    flex: 1,
    justifyContent: 'center', // Dikeyde ortalama
    alignItems: 'center', // Yatayda ortalama
    backgroundColor: '#ddd',
  },
  selectBox: {
    flex: 1,
    backgroundColor: '#d3d3d3', // Gri arka plan rengi
    justifyContent: 'center', // Dikeyde ortalama
    alignItems: 'center', // Yatayda ortalama
    borderRadius: 5, // Köşe yuvarlama
  },
  selectBoxText: {
    color: '#000', // Yazı rengi
    fontSize: 16, // Yazı boyutu
    padding: 10,
    backgroundColor: "red"
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
  },
  imagePreview: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  referanslarContainer: {
    marginTop: 10,
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  imageWrapper: {
    marginRight: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
});

const _country = {
  code: 'TR',
  dial_code: '+90',
  flag: '🇹🇷',
  name: {
    bg: 'Афганистан',
    by: 'Афганістан',
    cn: '阿富汗',
    cz: 'Afghánistán',
    de: 'Afghanistan',
    ee: 'Afganistan',
    en: 'Afghanistan',
    es: 'Afganistán',
    fr: "L'Afghanistan",
    he: 'אפגניסטן',
    it: 'Afghanistan',
    jp: 'アフガニスタン',
    nl: 'Afghanistan',
    pl: 'Afganistan',
    pt: 'Afeganistão',
    ro: 'Afganistan',
    ru: 'Афганистан',
    ua: 'Афганістан',
    zh: '阿富汗',
  },
};

export default CompanyScreen;