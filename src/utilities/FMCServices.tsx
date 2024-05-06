import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

class FCMService {
    private messageListener: (() => void) | undefined;

    register = (
        onRegister: (token: string) => void,
        onNotification: (notification: FirebaseMessagingTypes.RemoteMessage) => void,
        onOpenNotification: (remoteMessage: FirebaseMessagingTypes.RemoteMessage | null) => void
    ) => {
        this.checkPermission(onRegister);
        this.createNotificationListeners(
            onRegister,
            onNotification,
            onOpenNotification,
        ); 
    };

    checkPermission = (onRegister: (token: string) => void) => {
        messaging()
            .hasPermission()
            .then((enabled) => {
                if (enabled) {
                    this.getToken(onRegister);
                } else {
                    this.requestPermission(onRegister);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    getToken = (onRegister: (token: string) => void) => {
        messaging()
            .getToken()
            .then((fcmToken) => {
                if (fcmToken) {
                    onRegister(fcmToken);
                }
            })
            .catch((error) => {
            });
    };

    requestPermission = (onRegister: (token: string) => void) => {
        messaging()
            .requestPermission()
            .then(() => {
                this.getToken(onRegister);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    deleteToken = () => {
        messaging()
            .deleteToken()
            .catch((error) => {
            });
    };

    createNotificationListeners = (
        onRegister: (token: string) => void,
        onNotification: (notification: FirebaseMessagingTypes.RemoteMessage) => void,
        onOpenNotification: (remoteMessage: FirebaseMessagingTypes.RemoteMessage | null) => void
    ) => {
        // When Application Running on Background
        messaging().onNotificationOpenedApp((remoteMessage) => {
            onOpenNotification(remoteMessage);
        });

        // When Application opens from quit state
        messaging()
            .getInitialNotification()
            .then((remoteMessage) => {
                onOpenNotification(remoteMessage);
            });

        // Foreground state message
        this.messageListener = messaging().onMessage(async (remoteMessage) => {
            if (remoteMessage) {
                let notification: FirebaseMessagingTypes.RemoteMessage | null = null;
                if (Platform.OS === 'ios') {
                    // notification = remoteMessage.data;
                    notification = remoteMessage;
                } else {
                    notification = remoteMessage;
                }

                onNotification(notification);
            }
        });

        // Triggered when a new Token is received
        messaging().onTokenRefresh((fcmToken) => {
            onRegister(fcmToken);
        });
    };

    unRegister = () => {
        if (this.messageListener) {
            this.messageListener();
        }
    }
}

export const fcmService = new FCMService();
