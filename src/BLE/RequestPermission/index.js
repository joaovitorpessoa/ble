import {PermissionsAndroid} from 'react-native';

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      'android.permission.ACCESS_FINE_LOCATION',
      {
        title: 'Permissão de localização',
        message:
          'Para executar o aplicativo é necessário permitir acesso a localização',
        buttonNeutral: 'Pergunte-me depois',
        buttonPositive: 'Aceitar',
        buttonNegative: 'Rejeitar',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Acesso permitido a ACESS_FINE_LOCATION');
      return true;
    } else {
      console.log('Acesso negado a ACESS_FINE_LOCATION');
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

export {requestLocationPermission};
