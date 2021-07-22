import {Base64} from '../Base64';

const Write = (manager, deviceScannedInfo, text) => {
  if (deviceScannedInfo) {
    const [{service: serviceForWrite, uuid: characteristicForWrite}] =
      deviceScannedInfo.characteristics.filter(
        characteristic => characteristic.allowed.isWritableWithResponse,
      );

    console.log('');
    console.log(`Comando "${text}" enviado!`);

    managerBle.writeCharacteristicWithResponseForDevice(
      deviceScannedInfo.deviceId,
      serviceForWrite,
      characteristicForWrite,
      Base64.encoder(text),
    );
  }
};

export {Write};
