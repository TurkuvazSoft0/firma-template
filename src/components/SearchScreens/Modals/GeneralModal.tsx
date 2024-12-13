import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Linking, Alert, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Button } from '@ui-kitten/components';
import tw from "twrnc"
interface GeneralModalProps {
  referanslar?: string[];
  generalModal: boolean;
  visible: boolean;
  onClose: any;
  phone?: { telefon: string; tag: string }[];
  email?: { mail: string; tag: string }[];
  web?: string[];
  location?: { konum: string; tag: string }[];
  tags?: { tag: string }[];
  mailtag?: string;
  text?: string;
  instegram?: string;
  facebook?: string;
  x?: string;
  linkedin?: string;
  pinterest?: string;
  setModalVisible:any;
}

const GeneralModal: React.FC<GeneralModalProps> = ({
  referanslar = [],
  generalModal,
  setModalVisible,
  onClose,
  phone,
  email,
  web,
  visible,
  location,
  tags,
  text,
  instegram,
  facebook,
  x,
  linkedin,
  pinterest
}) => {
  const validReferences = Array.isArray(referanslar) ? referanslar : [];

  const handlePress = (type: string, value: string) => {
    let url = '';
    switch (type) {
      case 'phone':
        url = `tel:${value}`;
        break;
      case 'email':
        url = `mailto:${value}`;
        break;
      case 'web':
        url = `https://${value}`;
        break;
      case 'google-location':
        url = value;
        break;
      case 'yandex-location':
        url = `https://yandex.com/maps/?text=${encodeURIComponent(value)}`;
        break;
      case 'instagram':
      case 'facebook':
      case 'x':
      case 'linkedin':
      case 'pinterest':
        url = value;
        break;
      default:
        Alert.alert("Unsupported action");
        return;
    }

    if (url) {
      Linking.openURL(url).catch(err => console.error(`Error opening ${type} URL:`, err));
    } else {
      Alert.alert(`${type} is not available`);
    }
  };

  const handleLocationPress = (url: string, location: string) => {
    if (url.startsWith('https://yandex.com') || url.startsWith('https://yandex.com.tr')) {
      handlePress('yandex-location', location);
    } else if (url.startsWith('https://google.com') || url.startsWith('https://google.com.tr')) {
      handlePress('google-location', location);
    } else {
      Alert.alert("Unsupported URL");
    }
  };

  const regexControl = (items: string) => {
    const reg = /goo.gl/;
    return reg.test(items);
  };

  const RegexYandexControl = (url: string) => {
    const yandexMapsPattern = /yandex/i;
    return yandexMapsPattern.test(url);
  };

  const getIcon = (tag: string) => {
    switch (tag) {
      case 'cep':
        return 'call';
      case 'sirket':
        return 'business';
      case 'faks':
        return 'print';
      case 'diger':
        return 'call';
      default:
        return 'call';
    }
  };

  const formatPhoneNumber = (phoneNumber: string) => {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `+${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
    }
    return phoneNumber;
  };

  return (
    <Modal transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Bilgiler</Text>
          {text && (
            <View>
              <Text style={styles.companyName}>{text}</Text>
            </View>
          )}
          <ScrollView>
            {phone && phone.map((ph, index) => (
              <View key={index}>
                <View style={styles.itemContainer}>
                  <Ionicons name={getIcon(tags ? tags[index]?.tag : 'diger')} size={24} color="#66D3FA" />
                  <Text style={styles.itemText}>{formatPhoneNumber(ph.telefon)}</Text>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handlePress('phone', ph.telefon)}
                  >
                    <Text style={styles.actionButtonText}>{ph.tag}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            {email && email.map((em, index) => (
              <View key={index}>
                <View style={styles.itemContainer}>
                  <Ionicons name="mail" size={24} color="#66D3FA" />
                  <Text style={styles.itemText}>{em.mail}</Text>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handlePress('email', em.mail)}
                  >
                    <Text style={styles.actionButtonText}>{em.tag}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            {web && web.map((wb, index) => (
              <View style={styles.itemContainer} key={index}>
                <Ionicons name="globe" size={24} color="#66D3FA" />
                <Text style={styles.itemText}>{wb}</Text>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handlePress('web', wb)}
                >
                  <Text style={styles.actionButtonText}>Web Sitesine Git</Text>
                </TouchableOpacity>
              </View>
            ))}

            <View style={{ display: "flex", flexDirection: "row", gap: 20, marginVertical: 10, alignItems: "center" }}>
              <Ionicons name="people" size={24} color="#66D3FA" />
              <View style={{ display: "flex", flexDirection: "row", gap: 20 }}>
                {validReferences.map((rf, index) => (
                  <Image
                    key={index}
                    source={{ uri: `https://mobileapp.turkuvazprojeler.com/uploads/referanslar/${rf}` }}
                    style={{ width: 50, height: 50, borderRadius: 5 }}
                  />
                ))}
              </View>
            </View>



            <View style={{ display: "flex", flexDirection: "row", gap: 20, marginVertical: 10, alignItems: "center" }}>
              <Ionicons name="person" size={24} color="#66D3FA" />
              <View style={{ display: "flex", flexDirection: "row", gap: 20 }}>
              <TouchableOpacity
                  style={styles.actionButton}
                 
                >
                  <Text style={tw`bg-[#66D3FA] text-white px-3`}>Takip Et</Text>
                </TouchableOpacity>              </View>
            </View>


            {location && location.map((loc, index) => (
              <View key={index}>
                <View style={styles.itemContainer}>
                  <Ionicons name="location" size={24} color="#66D3FA" />
                  <View style={styles.buttonGroup}>
                    {regexControl(loc.konum) &&
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleLocationPress('https://google.com', loc.konum)}
                      >
                        <Text style={styles.actionButtonText}>Konuma Git</Text>
                      </TouchableOpacity>
                    }
                    {RegexYandexControl(loc.konum) &&
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleLocationPress('https://yandex.com', loc.konum)}
                      >
                        <Text style={styles.actionButtonText}>Konuma Git {loc.tag}</Text>
                      </TouchableOpacity>
                    }
                  </View>
                </View>
              </View>
            ))}

            <View style={styles.socialContainer}>
              {instegram && (
                <TouchableOpacity onPress={() => handlePress('instagram', instegram)}>
                  <Ionicons name="logo-instagram" size={24} color="#C13584" />
                </TouchableOpacity>
              )}
              {facebook && (
                <TouchableOpacity onPress={() => handlePress('facebook', facebook)}>
                  <Ionicons name="logo-facebook" size={24} color="#4267B2" />
                </TouchableOpacity>
              )}
              {x && (
                <TouchableOpacity onPress={() => handlePress('x', x)}>
                  <FontAwesome6 name="x-twitter" size={24} color="black" />
                </TouchableOpacity>
              )}
              {linkedin && (
                <TouchableOpacity onPress={() => handlePress('linkedin', linkedin)}>
                  <Ionicons name="logo-linkedin" size={24} color="#0077B5" />
                </TouchableOpacity>
              )}
              {pinterest && (
                <TouchableOpacity onPress={() => handlePress('pinterest', pinterest)}>
                  <Ionicons name="logo-pinterest" size={24} color="#BD081C" />
                </TouchableOpacity>
              )}
            </View>


          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  companyName: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  itemText: {
    fontSize: 16,
    marginLeft: 20,
    color: '#000',
    flex: 1,
  },
  actionButton: {
    backgroundColor: '#66D3FA',
    borderRadius: 5,
    padding: 5,
    marginLeft: 10,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 12,
  },
  buttonGroup: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
});

export default GeneralModal;
