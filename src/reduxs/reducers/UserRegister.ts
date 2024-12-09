import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'react-native-axios';
import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { navigate } from 'navigation/root-navigation';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackParamList, MainStackParamList, RootStackParamList } from 'types/navigation-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Kullanıcı durumu için arayüz tanımı
interface IRegisterState {
  user: string | null;
  loading: boolean;
  token: string | null | any;
  id: boolean | number;
  error: string | null;
  status_type: string | boolean;
  rememberme: boolean;
  email: string | boolean;
  username: string | boolean;
  firma_telefon: string | boolean;
  firma_vergidairesi: string | boolean;
  firma_verginumarasi: string | boolean;
}

// Başlangıç durumu
export const initialUserRegisterState: IRegisterState = {
  user: null,
  loading: false,
  token: null,
  id: false,
  error: null,
  status_type: false,
  rememberme: false,
  email: false,
  username: false,
  firma_telefon: false,
  firma_vergidairesi: false,
  firma_verginumarasi: false,
};
const apiUrl = "http://192.168.1.44:3000"
// Kullanıcı kayıt asenkron thunk
export const registerUser = createAsyncThunk(
  'user/register',
  async (formData: Record<string, string>, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      for (const key in formData) {
        params.append(key, formData[key]);
      }

      const response = await axios.post(
        `${apiUrl}/auth/register`,
        params,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      if (response.status !== 200) {
        return rejectWithValue(response.data);
      }

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Firma kullanıcı login kontrol asenkron thunk
export const firmaUserControl = createAsyncThunk(
  'user/firmalogincontrol',
  async (formData: FormData, { rejectWithValue }) => {
    console.log(formData,"form dataedededed");
    try {
      const response = await axios.post(
        `${apiUrl}/auth/login`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status !== 200) {
        return rejectWithValue(response.data);
      }

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Firma kullanıcı ekleme asenkron thunk
export const firmaUserAdd = createAsyncThunk(
  'user/firmauserAdd',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiUrl}/auth/register`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status !== 200) {
        return rejectWithValue(response.data);
      }

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Kullanıcı login kontrol asenkron thunk
export const loginUser = createAsyncThunk(
  'user/logincontrol',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiUrl}/auth/login`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status !== 200) {
        return rejectWithValue(response.data);
      }

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
// User slice tanımı
const userSlice = createSlice({
  name: 'user',
  initialState:initialUserRegisterState,
  reducers: {
    resetStatusType: (state) => {
      state.status_type = false;
      SecureStore.deleteItemAsync('userToken');
      navigate("Login")
    },
    setRememberMe: (state, action: PayloadAction<boolean>) => {
      state.rememberme = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(firmaUserAdd.fulfilled, (state, action) => {
      console.log("full filed");
if(action.payload.message) 
{
  Alert.alert("Bilgi",action.payload.message);
}

else 
{
  console.log("text geldi")
Alert.alert("Bilgi","Kayıt İşlemi Başarılı");
        
      setTimeout(() => {
        navigate("Login")
      },2000);

    }
    }).addCase(firmaUserAdd.rejected, (state,action) => {
      console.log(action.payload,"payload mesajı");
      Alert.alert("Hata", action.payload.text);
      
    });

    builder.addCase(loginUser.fulfilled, async (state, action) => {
      if (action.payload.message) {
        Alert.alert("Bilgi", action.payload.message);
      }
      
      console.log(action.payload,"action payload login verileri");
      const token = action.payload.token;
      console.log(token,"token");
      state.token   = token; 
      state.status_type = action.payload;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.firma_telefon = action.payload.telefon;
      SecureStore.setItemAsync('userToken', action.payload.token); // Token'ı SecureStore'da saklayın
      SecureStore.setItemAsync("role",action.payload.status_type);
    }).addCase(loginUser.rejected, (state, action) => {
      Alert.alert("Hata", action.payload?.message || "Kullanıcı girişi başarısız.");
      
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false; 
      console.log(action.payload,"payload mesajı");
      if(action.payload.message) 
        {
          Alert.alert("Bilgi",action.payload.message);
          navigate("MusteriLogin")
        }
        else if(action.payload.text)
        {
        Alert.alert("Bilgi",action.payload.text);
        navigate("MusteriLogin")

             
        
            }
    });



    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      Alert.alert("Hata", "Kullanıcı kaydı başarısız.");
      navigate("MusteriLogin")

    });

    builder.addCase(firmaUserControl.fulfilled, async (state, action) => {

      
      if (action.payload.message) {
        Alert.alert("Bilgi", action.payload.message);
        return;
      }
      // JWT token'ıx SecureStore'da saklayın
      const token = action.payload.token;
      state.token   = token; 
      state.status_type = action.payload.status_type
      Alert.alert(action.payload.status_type,"role");
      SecureStore.setItemAsync('userToken', action.payload.token); // Token'ı SecureStore'da saklayın
      SecureStore.setItemAsync('role', action.payload.status_type); 
      
    }).addCase(firmaUserControl.rejected, (state, action) => {

      console.log(action.payload,"payload mesajı ded" );
      Alert.alert("Hata", action.payload?.message || "Firma kullanıcı kontrolü başarısız.");

    });
  },
});

// Actions ve reducer exportları
export const { resetStatusType, setRememberMe } = userSlice.actions;
export default userSlice.reducer;
