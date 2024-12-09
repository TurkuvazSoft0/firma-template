import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
import axios from 'react-native-axios';
import axiosInstance from '../axiosIstance/index';



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
  sirket_id:number,
  sirket_veriler:any,
  sirket_ad:string, 
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

// Asenkron işlemi createAsyncThunk ile tanımlayın
export const fetchSirketler = createAsyncThunk(
  'sirketapi/fetchSirketler',
  async () => {
    
    const response = await axiosInstance.get('/companies/company-get');
    return response.data;
  }
);


export const fetchSirketEkle = createAsyncThunk(
  'sirketapi/fetchSirketEkle',
  async (formData: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://mobileapp.turkuvazprojeler.com/sirket-ekle.php",
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data; // Yanıt verilerini döndürün
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Sirketler için state tanımı
export interface ISirketlerState {
  sirketler: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  sirket: boolean;
  sirket_response: boolean;
  
}

export const initialSirketlerState: ISirketlerState = {
  sirketler: [],
  status: 'idle',
  error: null,
  sirket: false,
  sirket_response: false,
};

export const SirketlerSlice = createSlice({
  name: 'sirketapi',
  initialState: initialSirketlerState,
  reducers: {
    setSirketler: (state: ISirketlerState, action: PayloadAction<any[]>) => {
      state.sirketler = action.payload;
    },
    setSirket: (state: ISirketlerState, action: PayloadAction<boolean>) => {
      state.sirket = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSirketler.pending, (state: ISirketlerState) => {
        state.status = 'loading';

      })
      .addCase(fetchSirketler.fulfilled, (state: ISirketlerState, action: PayloadAction<any[]>) => {
        state.status = 'succeeded';
        state.sirketler = action.payload;
        console.log(action.payload,"action.payload sirket");
      })
      .addCase(fetchSirketler.rejected, (state: ISirketlerState, action: PayloadAction<any[]>) => {
        state.status = 'failed';
        state.error = action.error.message;
        console.log(action.payload,"action.payload sirket");

      })
      .addCase(fetchSirketEkle.fulfilled, (state: ISirketlerState, action: PayloadAction<any>) => {
        Alert.alert(action.payload);
        state.sirket_response = true;
      })
      .addCase(fetchSirketEkle.rejected, (state: ISirketlerState, action: any) => {
        state.error = action.payload;
        state.sirket_response = false;
      });
  },
});

// Actions dışa aktarımı
export const { setSirketler, setSirket } = SirketlerSlice.actions;

// Default reducer dışa aktarımı
export default SirketlerSlice.reducer;
