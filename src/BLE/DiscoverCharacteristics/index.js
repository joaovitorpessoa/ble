const discoverCharacteristics = async deviceConnected => {
  const deviceScannedInfo = {};

  await deviceConnected.discoverAllServicesAndCharacteristics();

  const services = await deviceConnected.services();

  for (service of services) {
    const {uuid: uuidService} = service;
    const listOfCharacteristics =
      await deviceConnected.characteristicsForService(uuidService);

    listOfCharacteristics.forEach(characteristic => {
      const {
        uuid: uuidCharacteristc,
        isReadable,
        isWritableWithoutResponse,
        isWritableWithResponse,
        isNotifiable,
        isIndicatable,
        isNotifying,
      } = characteristic;

      if (Object.keys(deviceScannedInfo).length === 0) {
        (deviceScannedInfo.deviceId = deviceConnected.id),
          (deviceScannedInfo.characteristics = [
            {
              service: uuidService,
              uuid: uuidCharacteristc,
              allowed: {
                isWritableWithoutResponse,
                isWritableWithResponse,
                isReadable,
                isNotifiable,
                isIndicatable,
                isNotifying,
              },
            },
          ]);
      } else {
        deviceScannedInfo.characteristics.push({
          service: uuidService,
          uuid: uuidCharacteristc,
          allowed: {
            isWritableWithoutResponse,
            isWritableWithResponse,
            isReadable,
            isNotifiable,
            isIndicatable,
            isNotifying,
          },
        });
      }
    });
  }

  deviceScannedInfo.characteristics = deviceScannedInfo.characteristics.filter(
    characteristic =>
      characteristic.allowed.isWritableWithResponse ||
      characteristic.allowed.isNotifiable,
  );

  return deviceScannedInfo;
};

export {discoverCharacteristics};
