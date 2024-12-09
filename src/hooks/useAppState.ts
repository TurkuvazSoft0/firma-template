
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';
const useAppState = () => {
    const deleteToken = async () => {
        await SecureStore.deleteItemAsync('token');
    };
    useEffect(() => {
        const subscription = AppState.addEventListener('change', async (nextAppState) => {
            if (nextAppState === 'background') {
                // Uygulama arka plana geçtiğinde token'ı sil
                await deleteToken();
            }
        });

        return () => {
            subscription.remove();
        };
    }, []);
};

export default useAppState;