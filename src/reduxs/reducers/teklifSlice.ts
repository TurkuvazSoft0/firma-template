import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'react-native-axios';
import { Alert } from 'react-native';

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
  async (data: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://mobileapp.turkuvazprojeler.com/toplu-mail-gönder.php',
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

export const GetFullMail = createAsyncThunk(
  'mails/GetFullMail',
  async (data: FormData, { rejectWithValue }) => {
    console.log(data,"d gelen ata");
    try {
      const response = await axios.post(
        'https://mobileapp.turkuvazprojeler.com/mail-al.php',
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
      const response = await axios.post(
        'https://mobileapp.turkuvazprojeler.com/teklifDurumGuncelle.php',
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

export const GetMailUsers = createAsyncThunk(
  'mails/GetMailUsers',
  async (data: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://mobileapp.turkuvazprojeler.com/kullanici-mail-getir.php',
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
      .addCase(AddBulkMail.pending, (state: MailState) => {
        state.status = 'loading';
      })
      .addCase(AddBulkMail.fulfilled, (state: MailState, action: PayloadAction<any>) => {
        state.status = 'succeeded';
      })
      .addCase(AddBulkMail.rejected, (state: MailState, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(GetFullMail.fulfilled, (state: MailState, action: PayloadAction<any>) => {
        console.log(action.payload,"pdwewe")
        state.maillist = action.payload;
        state.mail_id = action.payload.mail_id;
      })
      .addCase(SetMailUpdate.fulfilled, (state: MailState) => {
        // Başarılı güncelleme
      })
      .addCase(SetMailUpdate.rejected, (state: MailState, action: PayloadAction<any>) => {
        state.error = action.payload;
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
