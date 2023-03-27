import { createContext } from 'react';

// interfaces
import { ProfileContextProps } from './interfaces/context-props/profile-context-props.interface';

const ProfileContext = createContext<ProfileContextProps | undefined>(undefined);

export default ProfileContext;
