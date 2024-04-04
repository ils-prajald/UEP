import React, { useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { toastr } from "../screens/utilities/index";
// import { store } from "../store/Store";

export interface LoginContextInterface {
  isLoggedIn: boolean;
  isPersonal: number;
  setIsPersonal: React.Dispatch<React.SetStateAction<number>>;
  packageListArray: any[]; // Adjust type as per your data
  setPackageListArray: React.Dispatch<React.SetStateAction<any[]>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  profile: string; // Adjust type as per your data
  setProfile: React.Dispatch<React.SetStateAction<string>>;
  WiFi: boolean;
  setWiFi: React.Dispatch<React.SetStateAction<boolean>>;
  checking: boolean;
  setIsChecking: React.Dispatch<React.SetStateAction<boolean>>;
  SelectedPackage: any; // Adjust type as per your data
  setSelectedPackage: React.Dispatch<React.SetStateAction<any>>;
  cartCount: number;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
  notificationCount: number;
  setNotificationCount: React.Dispatch<React.SetStateAction<number>>;
  deviceToken: string;
  setDeviceToken: React.Dispatch<React.SetStateAction<string>>;
  initialRoute: string;
  setInitialRoute: React.Dispatch<React.SetStateAction<string>>;
  imagesData: any[]; // Adjust type as per your data
  setImagesData: React.Dispatch<React.SetStateAction<any[]>>;
  isFavourite: boolean;
  setIsFavourite: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
  initialRoute1: string | null;
  setInitialRoute1: React.Dispatch<React.SetStateAction<string | null>>;
  initialParams: any; // Adjust type as per your data
  setInitialParams: React.Dispatch<React.SetStateAction<any>>;
  images1: any[]; // Adjust type as per your data
  setImages1: React.Dispatch<React.SetStateAction<any[]>>;
  clearAllDetails: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  commonLogout: () => void;
}

export const LoginContext = React.createContext<LoginContextInterface | undefined>(undefined);

interface LoginProviderProps {
    children: React.ReactNode;
  }

const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checking, setIsChecking] = useState(true);
  const [profile, setProfile] = useState("");
  const [WiFi, setWiFi] = useState(false);
  const [SelectedPackage, setSelectedPackage] = useState({});
  const [packageListArray, setPackageListArray] = useState<any[]>([]);
  const [isPersonal, setIsPersonal] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
  const [deviceToken, setDeviceToken] = useState("");
  const [initialRoute, setInitialRoute] = useState("Home");
  const [imagesData, setImagesData] = useState<any[]>([]);
  const [isFavourite, setIsFavourite] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [initialRoute1, setInitialRoute1] = useState<string | null>("EventSearch");
  const [initialParams, setInitialParams] = useState<any>(null);
  const [images1, setImages1] = useState<any[]>([]);

  const logOut = async () => {
    // Your logout logic here
  };

  return (
    <LoginContext.Provider value={{
      isLoggedIn,
      isPersonal,
      setIsPersonal,
      packageListArray,
      setPackageListArray,
      setIsLoggedIn,
      profile,
      setProfile,
      WiFi,
      setWiFi,
      checking,
      setIsChecking,
      SelectedPackage,
      setSelectedPackage,
      cartCount,
      setCartCount,
      notificationCount,
      setNotificationCount,
      deviceToken,
      setDeviceToken,
      initialRoute,
      setInitialRoute,
      imagesData,
      setImagesData,
      isFavourite,
      setIsFavourite,
      userId,
      setUserId,
      initialRoute1,
      setInitialRoute1,
      initialParams,
      setInitialParams,
      images1,
      setImages1,
      clearAllDetails: async () => {
        // toastr.warning(store.textData.session_expired_text);
        logOut();
      },
      deleteAccount: async () => {
        // toastr.success(store.textData.delete_profile_success_text);
        logOut();
      },
      commonLogout: () => logOut()
    }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
