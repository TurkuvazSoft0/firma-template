import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'react-native-axios';
import { Alert } from 'react-native';
import { navigate } from 'navigation/root-navigation';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackParamList, RootStackParamList } from 'types/navigation-types';

// Kullanıcı durumu için arayüz tanımı
interface IRegisterState {
  user: string | null;
  loading: boolean;
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
        'https://mobileapp.turkuvazprojeler.com/kullanici-kayit-ekle.php',
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
      try {
        const response = await axios.post(
          'https://mobileapp.turkuvazprojeler.com/login-control-firma.php',
          formData,  // FormData'yı doğrudan gönderiyoruz
          {
            headers: {
            'Content-Type': 'multipart/form-data'
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
        'https://mobileapp.turkuvazprojeler.com/kullanici-kayit-ekle.php',
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
  async (formData: Record<string, string>, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      for (const key in formData) {
        params.append(key, formData[key]);
      }

      const response = await axios.post(
        'https://mobileapp.turkuvazprojeler.com/login-control.php',
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

// User slice tanımı
const userSlice = createSlice({
  name: 'user',
  initialState:initialUserRegisterState,
  reducers: {
    resetStatusType: (state) => {
      state.status_type = false;
    },
    setRememberMe: (state, action: PayloadAction<boolean>) => {
      state.rememberme = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(firmaUserAdd.fulfilled, (state, action) => {
      Alert.alert("Bilgi", action.payload.message);
    }).addCase(firmaUserAdd.rejected, () => {
      Alert.alert("Hata", "Sunucu taraflı sorun oluştu.");
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload.message) {
        Alert.alert("Bilgi", action.payload.message);
      }

      state.status_type = action.payload.type;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.firma_telefon = action.payload.telefon;
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.message) {
        Alert.alert("Bilgi", action.payload.message);
      }
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      Alert.alert("Hata", "Kullanıcı kaydı başarısız.");
    });

    builder.addCase(firmaUserControl.fulfilled, (state, action) => {
      if (action.payload.message) {
        Alert.alert("Bilgi", action.payload.message);
        return;
      }

      state.status_type = action.payload.type;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.firma_telefon = action.payload.telefon;
      state.firma_vergidairesi = action.payload.firma_vergidairesi;
      state.firma_verginumarasi = action.payload.firma_verginumarasi;
      state.id = action.payload.id;

    });
  },
});

// Actions ve reducer exportları
export const { resetStatusType, setRememberMe } = userSlice.actions;
export default userSlice.reducer;
