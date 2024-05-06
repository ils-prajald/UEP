import React, { useEffect, useState } from 'react'
import { View, Text, ImageBackground, SafeAreaView, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, Image, Keyboard } from 'react-native'
import Header from '../../components/Header'
import LinearGradient from 'react-native-linear-gradient'
import UEPTextInput from '../../components/UEPInputText'
import UEPButton from '../../components/UEPButton'
import toastr from '../../utilities/toastr'
import { useAppDispatch } from '../../redux/hooks'
import { fetchHeaderText, userLogin } from '../../redux/action/authAction'
import { decryptData, encryptData } from '../../utilities/Cryoto'
import { LoginContext } from '../../context/loginContext'
import { fcmService } from '../../utilities/FMCServices'
import messaging from '@react-native-firebase/messaging';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import Fonts from '../../constants/Fonts'

type Props = {
  navigation: any;
};

const  UserLogin = ({navigation} : Props) => {
  // const { setIsLoggedIn, setProfile, setIsChecking, setCartCount, setNotificationCount, deviceToken, isLoggedIn, setUserId } = React.useContext(LoginContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [devicetoken , setDeviceToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const login = "Login";
  const continue_as_guest_text = "Continue as Guest";
  const dispatch = useDispatch<any>();
  
  const headerText = useSelector((state: RootState) => state.header.headerText);
  const loading = useSelector((state: RootState) => state.header.loading);
  const error = useSelector((state: RootState) => state.header.error);
  useEffect(() => {
    dispatch(fetchHeaderText());
  }, [dispatch]);

  const forgot_password_text = headerText ? headerText.forgot_password_text : ""
  console.log("headerText",forgot_password_text);

  useEffect(() => {
    const registerForFCM = async () => {
      try {
        if (Platform.OS === "android") {
          fcmService.register(onRegister, () => {}, () => {});
        } else {
          const authStatus = await messaging().requestPermission();
          const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
          if (enabled) {
            fcmService.register(onRegister, () => {}, () => {});
          } else {
            // Handle the case where permission is not granted
          }
        }
      } catch (error) {
        console.error("Error registering for FCM:", error);
      }
    };
  
    registerForFCM();
  
    return () => {
      // Clean-up function if needed
    };
  }, []);
  
  const onRegister = (token : any) => {
    console.log("Device token:", token);
    setDeviceToken(token);
  };
  

  const validateEmail = (email : any) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleData = () => {
    console.log("handledata");
    if (email === "") {
      toastr.warning("Required email");
    }
    else if (!validateEmail(email)) {
      toastr.warning("Please enter valid email");
    }
    else if (password === "") {
      toastr.warning("Required password");
    } else {
      submitData(email, password);
    }
  };

  console.log("password",password);
  console.log("email",email);




  // const submitData = async (email : string, password : string) => {
  //   console.log("submitData");
  //   // setSpinner(true);
  //   const payload = encryptData({email_id: email,
  //     password: password,
  //     device_token: devicetoken,
  //     device_type: Platform.OS == "android" ? '1' : '2'})

  //     dispatch(userLogin(payload))
  //     .then(async (res : any) => {
  //       res.data = await decryptData(res.data);
  //       console.log("res.data",res.data);
  //       });
  // };

  const submitData = async (email: string, password: string) => {
    console.log("submitData");
    // setSpinner(true);
    const payload = encryptData({
        email_id: email,
        password: password,
        device_token: devicetoken,
        device_type: Platform.OS == "android" ? '1' : '2'
    });

    try {
        const res = await dispatch(userLogin(payload));
        console.log("Response from userLogin:", res);

        if (res && res.data) {
            const decryptedData = await decryptData(res.data);
            console.log("Decrypted data:", decryptedData);
        } else {
            console.error("Invalid response data:", res);
        }
    } catch (error) {
        console.error("Error occurred:", error);
        // Handle error
    }
};



  return (
    <View style={styles.screen}>
      <ImageBackground
        source={require("../../assets/auth/login_bg.png")}
        resizeMode="cover"
        style={styles.bgImage}
      >
        <SafeAreaView>
          <LinearGradient colors={["#393838", "#222222"]}>
            <Header />
          </LinearGradient>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1 }}>
            <View style={styles.loginContainer}>
              <View style={styles.loginFormContainer}>
                <View style={styles.loginHeadingText}>
                  <Text style={styles.loginText}>{headerText.login_into_your_account_text}</Text>
                </View>
                <View style={styles.loginForm}>

                  <View style={styles.formView}>
                    {Platform.OS === "ios" &&
                      <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => {
                          // handleFaceID();
                        }}>
                          <Image source={require("../../assets/FaceID.png")} style={{
                            width: 30,
                            height: 30,
                            tintColor: 'white'
                          }} />
                        </TouchableOpacity>

                      </View>}

                    {/* Email  */}
                    <UEPTextInput
                      onChangeText={(e : any) => {
                        if (e.includes(" ")) {
                          setEmail(e.trim());
                        } else {
                          setEmail(e);
                        }
                      }}
                      value={email}
                      placeholder="Email Address"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      returnKeyType={"next"}
                    />
                    {/* Password  */}
                    {/* {showPassword === false ? ( */}
                    <View style={styles.showPasswordView}>
                      <UEPTextInput
                        onChangeText={(e : any) => {
                          if (e.includes(" ")) {
                            setPassword(e.trim());
                          } else {
                            setPassword(e);
                          }
                        }}
                        value={password}
                        placeholder="Password"
                        secureTextEntry={true}
                      />
                      <View style={styles.iconView}>
                        <TouchableOpacity
                        onPress={() => {
                          setShowPassword(true);
                        }}
                        >
                          <Image
                            source={require("../../assets/auth/eye-close.png")}
                            style={styles.iconImage}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    {/* ) : ( */}
                    {/* <View style={styles.showPasswordView}>
                        <UEPTextInput
                          // onChangeText={(e) => {
                          //   if (e.includes(" ")) {
                          //     setPassword(e.trim());
                          //   } else {
                          //     setPassword(e);
                          //   }
                          // }}
                          // value={password}
                          placeholder="Password"
                          secureTextEntry={false}
                        />
                        <View style={styles.iconView}>
                          <TouchableOpacity
                            // onPress={() => {
                            //   setShowPassword(false);
                            // }}
                          >
                            <Image
                              source={require("../../assets/auth/eye-open.png")}
                              style={styles.iconImage}
                            />
                          </TouchableOpacity>
                        </View>
                      </View> */}
                    {/* )} */}
                    <View style={styles.buttonsContainer}>
                      <View style={{ marginTop: "1%" }}>
                        <UEPButton
                          title={headerText.login_text}
                        onPressButton={() => {
                          handleData();
                          Keyboard.dismiss();
                          // navigation.navigate("HomeScreen");

                        }}
                        />  
                      </View>

                      <View style={{ marginTop: "-3%" }}>
                        <UEPButton
                          title={continue_as_guest_text}
                          // onPressButton={() => {
                          //   navigation.navigate("HomeScreen");
                          // }}
                        />
                      </View>
                    </View>
                    <View style={styles.bottomView}>
                      <View style={styles.createAccountView}>
                        <Text
                          onPress={() => {
                            navigation.navigate("CreateAccount");
                          }}
                          style={styles.createAccountText}
                        >
                          {headerText.create_account_text}
                        </Text>
                      </View>
                      <View style={styles.forgotPassView}>
                        <Text
                          onPress={() => {
                            navigation.navigate("ForgotPassword");
                          }}
                          style={styles.forgotPassText}
                        >
                          {headerText.forgot_password_text}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  )
}

export default UserLogin

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#393838",
    alignItems: "center",
  },
  showPasswordView: {},
  modal: {
    flex: 1,
    backgroundColor: '#212121',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomView: {
    flexDirection: "row",
    marginVertical: 3,
    justifyContent: "center",
    paddingBottom: 10,
  },
  createAccountView: {
    width: "48%",
    marginHorizontal: "2%",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "black",
  },

  forgotPassView: {
    width: "48%",
    marginHorizontal: "2%",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "black",
  },
  forgotPassText: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
    padding: 2,
    fontFamily: Fonts.AvenirNextCondensedMediumItalic,
  },
  createAccountText: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
    padding: 2,
    fontFamily: Fonts.AvenirNextCondensedMediumItalic,
  },

  formView: {
    marginHorizontal: 10,
  },
  loginContainer: {
    marginHorizontal: "5%",
    borderRadius: 10,
    flex: 1,
  },
  loginFormContainer: {
    position: "absolute",
    bottom: "1%",
  },
  loginForm: {
    backgroundColor: "black",
    justifyContent: "space-between",
    left: 0,
    right: 0,
    opacity: 0.99,
    marginHorizontal: "1%",
    borderRadius: 10,
    paddingBottom: "2%",
    paddingTop: 10,
    paddingHorizontal: "3%",
  },
  bgImage: {
    flex: 1,
    justifyContent: "center",
  },
  iconView: {
    // backgroundColor: "green",
    height: 20,
    width: 40,
    right: "2%",
    marginTop: "3%",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  iconImage: {
    width: 25,
    height: 20,
    tintColor: "white",
  },
  loginHeadingText: {
    justifyContent: "center",
    alignItems: "center",
    padding: "2%",
  },
  loginText: {
    fontSize: 25,
    fontFamily: Fonts.BebasNeueRegular,
    color: "white",
  },
  buttonsContainer: {
    marginHorizontal: "-1%",
    marginTop: "2%",
  },
});


