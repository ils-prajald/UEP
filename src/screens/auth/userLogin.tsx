import React from 'react'
import { View, Text, ImageBackground, SafeAreaView, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, Image } from 'react-native'
import Header from '../../components/Header'
import LinearGradient from 'react-native-linear-gradient'
import UEPTextInput from '../../components/UEPInputText'
import UEPButton from '../../components/UEPButton'


const UserLogin = () => {
  const login = "Login";
  const continue_as_guest_text = "Continue as Guest";
  return (
    <View style={styles.screen}>
      <ImageBackground
        source={require("../../assests/auth/login_bg.png")}
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
                  <Text style={styles.loginText}>Login into your account</Text>
                </View>
                <View style={styles.loginForm}>

                  <View style={styles.formView}>
                    {Platform.OS === "ios" &&
                      <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => {
                          // handleFaceID();
                        }}>
                          <Image source={require("../../assests/FaceID.png")} style={{
                            width: 30,
                            height: 30,
                            tintColor: 'white'
                          }} />
                        </TouchableOpacity>

                      </View>}

                    {/* Email  */}
                    <UEPTextInput
                      // onChangeText={(e) => {
                      //   if (e.includes(" ")) {
                      //     setEmail(e.trim());
                      //   } else {
                      //     setEmail(e);
                      //   }
                      // }}
                      // value={email}
                      placeholder="Email Address"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      returnKeyType={"next"}
                    />
                    {/* Password  */}
                    {/* {showPassword === false ? ( */}
                    <View style={styles.showPasswordView}>
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
                        secureTextEntry={true}
                      />
                      <View style={styles.iconView}>
                        <TouchableOpacity
                        // onPress={() => {
                        //   setShowPassword(true);
                        // }}
                        >
                          <Image
                            source={require("../../assests/auth/eye-close.png")}
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
                              source={require("../../assests/auth/eye-open.png")}
                              style={styles.iconImage}
                            />
                          </TouchableOpacity>
                        </View>
                      </View> */}
                    {/* )} */}
                    <View style={styles.buttonsContainer}>
                      <View style={{ marginTop: "1%" }}>
                        <UEPButton
                          title={login}
                        // onPressButton={() => {
                        //   handleData();
                        //   Keyboard.dismiss();
                        // }}
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
                          // onPress={() => {
                          //   navigation.navigate("CreateAccount");
                          // }}
                          style={styles.createAccountText}
                        >
                          {/* {store.textData.create_account_text} */} Create Account
                        </Text>
                      </View>
                      <View style={styles.forgotPassView}>
                        <Text
                          // onPress={() => {
                          //   navigation.navigate("ForgotPassword");
                          // }}
                          style={styles.forgotPassText}
                        >
                          {/* {store.textData.forgot_password_text} */} Forgot Password
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
    // fontFamily: fonts.AvenirMedium,
  },
  createAccountText: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
    padding: 2,
    // fontFamily: fonts.AvenirMedium,
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
    // fontFamily: fonts.BebasNeueRegular,
    color: "white",
  },
  buttonsContainer: {
    marginHorizontal: "-1%",
    marginTop: "2%",
  },
});