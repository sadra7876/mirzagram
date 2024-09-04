import React, { createContext, useState, useContext, ReactNode } from 'react';
import { UserProfileModel } from '../model/userProfile.interface';

interface UserProfileContextProps {
    userProfile: UserProfileModel | null;
    setUserProfile: React.Dispatch<React.SetStateAction<UserProfileModel | null>>;
  }

const UserProfileContext = createContext<UserProfileContextProps | undefined>(undefined);

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const [userProfile, setUserProfile] = useState<UserProfileModel | null>(null);

  return (
    <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
};