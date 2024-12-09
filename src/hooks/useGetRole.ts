import * as SecureStore from 'expo-secure-store';
import { useSelector } from 'react-redux';
import { RootState } from '../reduxs/store';

const getToken = async () => {
  const role = useSelector((state : RootState) => state.register.status_type); 
  return role; 
};
export default getToken;