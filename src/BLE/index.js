import {Base64} from './Base64';
import {
  useConnectedDeviceInfo,
  useManager,
  ConnectedDeviceInfoProvider,
  ManagerProvider,
} from './Context';
import {discoverCharacteristics} from './DiscoverCharacteristics';
import {requestLocationPermission} from './RequestPermission';
import {Write} from './Write';

export {
  Base64,
  Write,
  discoverCharacteristics,
  requestLocationPermission,
  useConnectedDeviceInfo,
  useManager,
  ConnectedDeviceInfoProvider,
  ManagerProvider,
};
