import { useContext } from 'react';
import { NetworkContextProps } from './interfaces/network-context-props.interface';

// contexts
import NetworkContext from './Network.context';

const useNetworkContext = (): NetworkContextProps => {
    const networkContext = useContext(NetworkContext);
    if (!networkContext) {
        throw new Error('No <NetworkContext.Provider> found when calling useNetworkContext');
    }
    return networkContext;
};

export default useNetworkContext;
