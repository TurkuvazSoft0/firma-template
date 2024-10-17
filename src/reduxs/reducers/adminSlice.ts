import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'react-native-axios';
import { Alert } from 'react-native';
import { RootState } from './rootReducer'; // RootState'i dahil edin

// Async thunk: fetchSirketGuncelle
export const fetchSirketGuncelle = createAsyncThunk(
  'admin/fetchSirketlerGuncelle',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://mobileapp.turkuvazprojeler.com/mobilAdminGuncelle.php',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Interface for the state
export interface IAdminPanelState {
  name: string;
  tekliflerim: boolean;
  data: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
export const initialAdminPanelState: IAdminPanelState = {
  name: 'adminpanel',
  tekliflerim: false,
  data: null,
  status: 'idle',
  error: null,
};

// Create the slice
export const adminPanelSlice = createSlice({
  name: 'adminpanel',
  initialState: initialAdminPanelState,
  reducers: {
    setTekliflerim: (state, action: PayloadAction<boolean>) => {
      state.tekliflerim = action.payload;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSirketGuncelle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSirketGuncelle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        Alert.alert('Bilgi', action.payload);
      })
      .addCase(fetchSirketGuncelle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        Alert.alert('Hata', 'Güncelleme işlemi başarısız.');
      });
  },
});

// Actions dışa aktarımı
export const { setTekliflerim, resetError } = adminPanelSlice.actions;

// AdminPanel selector
export const adminPanelSelector = (state: RootState) => state.adminpanel;

// Default reducer dışa aktarımı
export default adminPanelSlice.reducer;
