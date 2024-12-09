import getToken from './useGetRole';
import jwtDecode from 'jwt-decode';

const getDecodedToken = async () => {
  const token = await getToken();
  if (token) {
    try {
      const decoded = jwtDecode(token);
      console.log('Çözümlenen Token:', decoded);
      return decoded; // Kullanıcı bilgileri: id, type, email vb.
    } catch (error) {
      console.error('Token çözümleme hatası:', error);
      return null;
    }
  }
  return null;
};
export default getDecodedToken;