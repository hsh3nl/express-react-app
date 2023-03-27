import { createContext } from 'react';

// interfaces
import { NetworkContextProps } from './interfaces/network-context-props.interface';

const NetworkContext = createContext<NetworkContextProps | undefined>(undefined);

export default NetworkContext;
