import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Button,Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import tw from "twrnc";
import {
    AppIcon,
    ButtonPickCountry,
    Container,
    Content,
    CustomLayout,
    NavigationAction,
  
  } from 'components';
  import { TopNavigation } from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList, MainStackParamList } from "types/navigation-types";

const GeneralPage = () => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();


  return (
            <Container style={styles.container} level="1"
    style={styles.container}>
            <TopNavigation
              title={'Genel Bildirimler'}
              accessoryLeft={() => <NavigationAction marginRight={12} />}
            />

          <Content contentContainerStyle={styles.content}> 
          <Text category="t4" style={tw` font-bold`}>Bildirim İşlemleri</Text>
        
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={tw`bg-red-400 p-4  rounded-full mx-5`} onPress={() => navigation.navigate("Teklifler")}    status='primary'>
          <Text style={tw`text-white text-center font-bold m-auto`}>Giden Bildirimler</Text>
        </TouchableOpacity>
        <TouchableOpacity  style={tw`bg-blue-800 p-4  rounded-full mx-5`} onPress={() => navigation.navigate("Bildirimler")}   status='danger'>
        <Text style={tw`text-white text-center font-bold m-auto`}>Gelen Bildirimler</Text>
        </TouchableOpacity>
      </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
 
    buttonContainer: {
        display:"flex",
      flexDirection: 'row',
      marginTop: 22,
      alignItems:"center",
    },
    button: {
      flex: 1,
      marginHorizontal: 5,
      margin:"auto"
    },
    content: {
        paddingTop: 24,
        paddingHorizontal: 24,
        display:"flex",
  
        alignItems:"center",
        height:"100%",
       textAlign:"center",
      },
    container: {
        flex: 1,
      },
    buttonText: {
      fontSize: 12,
      textAlign:"center"
    },
  });
  
export default GeneralPage;
