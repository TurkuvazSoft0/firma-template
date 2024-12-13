import React, { useEffect, useState } from 'react';
import { Modal, View, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Input, Autocomplete, AutocompleteItem, Button, Text, Select, SelectItem } from '@ui-kitten/components';
import tw from "twrnc";
import EvaIcons from '../../../types/eva-icon-enum';
import { StyleSheet } from 'react-native';
import { AppIcon } from '../../AppIcon';
import { useDispatch } from 'react-redux';
import { AddBulkMail, ApplicationBulk } from '../../../reduxs/reducers/teklifSlice';
import { AppDispatch } from '../../../reduxs/store';
const CompanyApplicationModal = ({sirketler, isModalVisible, setModalVisible}:{sirketler:any, isModalVisible:boolean, setModalVisible:any}) => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [query, setQuery] = useState('');
  const [message,setMessage] = React.useState<string | false>();
const dispatch = useDispatch<AppDispatch>();
const formData = new FormData();


  const filteredCompanies = sirketler.filter(sirket => sirket.sirket_ad.toLowerCase().includes(query.toLowerCase()));
  
  return (
    <Modal
      visible={isModalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setModalVisible(false)}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>

          <Text category="t4" style={styles.modalText}>
            Başvuru Yap
          </Text>
<Input  placeholder='İletmek İstediğiniz Mesaj' onChangeText={(value) => setMessage(value)} textStyle={{height:120}} />
       


          <Button onPress={() => dispatch(ApplicationBulk(message))} status='primary'>
            Başvuru  Yap
          </Button>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({  
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    width: "90%",
    display: "flex",
    gap: 20
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },    
  closeButtonText: {
    color: "black",
    fontSize: 20,
    fontWeight: 'bold',
  },    
  modalText: {
    marginHorizontal: 1,
    textAlign: 'center',
    marginBottom: 20,
    paddingTop: 20,
    color: 'black',
  },
  autocompleteContainer: {
    width: "100%",
    zIndex: 1, // Autocomplete'in diğer bileşenlerin üstünde görünmesi için
  },
  autocomplete: {
    backgroundColor: "white",
    marginBottom: 20,
    width: "100%",
  },
  autocompleteText: {
    color: "black",
  },
  select: {
    width: "100%",
    marginBottom: 20,
  },
});

export default CompanyApplicationModal;