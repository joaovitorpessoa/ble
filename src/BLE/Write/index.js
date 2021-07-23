import {Base64} from '../Base64';

const Write = (manager, connectedDeviceInfo, text) => {
  if (connectedDeviceInfo) {
    const [{service: serviceForWrite, uuid: characteristicForWrite}] =
      connectedDeviceInfo.characteristics.filter(
        characteristic => characteristic.allowed.isWritableWithResponse,
      );

    console.log('');
    console.log(`Comando "${text}" enviado!`);

    manager.writeCharacteristicWithResponseForDevice(
      connectedDeviceInfo.deviceId,
      serviceForWrite,
      characteristicForWrite,
      Base64.encoder(text),
    );
  }
};

export {Write};
