import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
import axios from 'react-native-axios';
import { navigate } from 'navigation/root-navigation';

// Async Thunk to send a password reset email

interface IForgetPassword {
emailSent:Boolean |  number,
codeVerified:Boolean | number | string,
error:Boolean | [] | Object | string | null | any,
emailAdress:Boolean | string ,
codeNumber:Boolean | number ,
status:  'idle' | 'loading' | 'succeeded' | 'failed'
  }
  

  export const initialForgetPasswordState: IForgetPassword = {
    emailSent: false,
    codeVerified: false,
    error: null,
    emailAdress: false,
    codeNumber: false,
    status: 'idle',
  };


export const SendPasswordResetEmail = createAsyncThunk(
  'passwordReset/sendPasswordResetEmail',
  async (data : FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://mobileapp.turkuvazprojeler.com/sifre-sifirlama.php',  // Replace with your actual API endpoint
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',  // FormData için uygun içerik tipi
        },
        }
      );
      return response.data;
    } catch (error : any) {
      return rejectWithValue(error.response ?  error.response.data : error.message);
    }
  }
);

// Async Thunk to verify the password reset code
export const VerifyPasswordResetCode = createAsyncThunk(
  'passwordReset/verifyPasswordResetCode',
  async (data : FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://mobileapp.turkuvazprojeler.com/sifre-sifirlama-onay.php',  // Replace with your actual API endpoint
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error : any) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// The passwordReset slice
export const passwordResetSlice = createSlice({
  name: 'passwordReset',
  initialState: initialForgetPasswordState,
  reducers: {
    setMail:(state,action) => 
      {
        state.emailAdress = action.payload;
      },
      setCodes:(state,action) => 
        { 
          state.codeNumber = action.payload;
        },
  
      resetPasswordState: (state) => {
      state.status = 'idle';
      state.error = null;
      state.emailSent = false;
      state.codeVerified = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle the SendPasswordResetEmail action
      .addCase(SendPasswordResetEmail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(SendPasswordResetEmail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if(action.payload.success) 
        {

            Alert.alert("Bilgi","Mail Gönderim İşlemi Başarılı");
            
        state.emailSent = true;
        }
        else {
            Alert.alert("Bilgi","Lütfen Mail Adresinizi kontrol ediniz");
            state.emailSent = false;

        }
        
      })
      .addCase(SendPasswordResetEmail.rejected, (state, action) => {
        state.status = 'failed';
        Alert.alert("failed")
        state.error = action.payload;
      })
      // Handle the VerifyPasswordResetCode action
      .addCase(VerifyPasswordResetCode.pending, (state,action) => {
        state.status = 'loading';
        console.log(action.payload,"ewdwe");
      })
      .addCase(VerifyPasswordResetCode.fulfilled, (state, action) => {
        console.log(action.payload,"wwed");
        state.status = 'succeeded';
        state.codeVerified = true;
        Alert.alert("Bilgi",action.payload.message);
      })
      .addCase(VerifyPasswordResetCode.rejected, (state, action) => {
        state.status = 'failed';
        Alert.alert("Rejected");
        state.error = action.payload;
      });
  },
});

export const { resetPasswordState,setMail,setCodes } = passwordResetSlice.actions;

export default passwordResetSlice.reducer;