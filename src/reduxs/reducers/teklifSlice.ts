import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'react-native-axios';
import { Alert } from 'react-native';
import axiosInstance from '../axiosIstance';

// Tip tanımlamaları
interface MailState {
  mails: boolean;
  mails_array: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  maillist: boolean | any;
  mail_id: boolean | number;
  musterimaileri: boolean | any;
}

// Başlangıç durumu
export const initialMailState: MailState = {
  mails: false,
  mails_array: [],
  status: 'idle',  // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  maillist: false,
  mail_id: false,
  musterimaileri: false,
};

// Asenkron POST isteği için createAsyncThunk kullanımı
export const AddBulkMail = createAsyncThunk(
  'mails/addBulkMail',
  async (data:FormData, { rejectWithValue }) => {
  

    try {
      const response = await axiosInstance.post(
        '/teklif/toplu-mail-gonder',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Hata:', error.response ? error.response.data : error.message);
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const ApplicationBulk = createAsyncThunk(
  'mails/ApplicationBulk',
  async (data:string, { rejectWithValue }) => {
  

    try {
      const response = await axiosInstance.get(
        `/application/firma-basvuru-ekle?basvuru_mesaj=${data}`,
     
      );
      return response.data;
    } catch (error) {
      console.error('Hata:', error.response ? error.response.data : error.message);
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const GetFullMail = createAsyncThunk(
  'mails/GetFullMail',
  async (data: FormData, { rejectWithValue }) => {
    console.log(data,"d gelen ata");
    try {
      const response = await axiosInstance.post('/teklif/mail-al',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const SetMailUpdate = createAsyncThunk(
  'mails/SetMailUpdate',
  async (data: FormData, { rejectWithValue }) => {
    try {
      // API'ye POST isteği gönder
      const response = await axiosInstance.post(`/teklif/teklifDurumGuncelle`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);


export const GetMailUsers = createAsyncThunk(
  'mails/GetMailUsers',
  async (data: FormData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        '/teklif/kullanici-mail-getir',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const mailSlice = createSlice({
  name: 'mails',
  initialState:initialMailState,
  reducers: {
    setMails: (state: MailState, action: PayloadAction<boolean>) => {
      state.mails = action.payload;
    },
    setMailArray: (state: MailState, action: PayloadAction<any>) => {
      state.mails_array.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(ApplicationBulk.fulfilled,(state : MailState,action:PayloadAction<any>) => 
      { 
      }).addCase(ApplicationBulk.rejected,(state:MailState,action:PayloadAction<any>) => 
        { 
          Alert.alert(action.payload.message);
        })
      .addCase(AddBulkMail.pending, (state: MailState) => {
        state.status = 'loading';
      })
      .addCase(AddBulkMail.fulfilled, (state: MailState, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        console.log("başarılı",action.payload);
        Alert.alert("başarılı",action.payload.message);
      })
      .addCase(AddBulkMail.rejected, (state: MailState, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
        Alert.alert("başarısız",action.payload.message);
      })
      .addCase(GetFullMail.fulfilled, (state: MailState, action: PayloadAction<any>) => {
        console.log(action.payload,"pdwewe")
        state.maillist = action.payload;
        state.mail_id = action.payload.mail_id;
      })
      .addCase(SetMailUpdate.fulfilled, (state: MailState,action: PayloadAction<any>) => {
        console.log("başarılı güncelleme",action.payload);
      })
      .addCase(SetMailUpdate.rejected, (state: MailState, action: PayloadAction<any>) => {
        state.error = action.payload;
        console.log("başarılı güncelleme",action.payload);

      })
      .addCase(GetMailUsers.fulfilled, (state: MailState, action: PayloadAction<any>) => {
        state.musterimaileri = action.payload;
      })
      .addCase(GetMailUsers.rejected, (state: MailState, action: PayloadAction<any>) => {
        state.error = action.payload;
      });
  },
});

// Reducer ve action'lar dışa aktarımı
export const { setMails, setMailArray } = mailSlice.actions;
export default mailSlice.reducer;
