import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableOpacity,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import env from "../../config";
import axios from "axios";
import colors from "../../constants/colors";
// import fonts from "../../constants/fonts";
import Spinner from "react-native-loading-spinner-overlay";
import { RFValue } from "react-native-responsive-fontsize";
//Components
import Header from "../../components/Header";
import UEPButton from "../../components/UEPButton";
import ScreenHeader from "../../components/ScreenHeader";
import InfoHeader from "../../components/InfoHeader";
import ContentHeader from "../../components/ContentHeader";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import UEPTextInput from "../../components/UEPInputText";
import store, { RootState } from "../../redux/store";
import { encryptData, decryptData } from "../../utilities/Cryoto";
import toastr from "../../utilities/toastr";
import Yup from "../../utilities/Yup";
import Fonts from "../../constants/Fonts";
const RESEND_OTP_TIME_LIMIT = 600;
let resendOtpTimerInterval : any;

type Props = {
    navigation: any;
    route: any;
  };

const VerifyForgotPassword = ({route, navigation } : Props) => {
  const [vericationCode, setVerificationCode] = useState("");
  const { email } = route.params;
  const [spinner, setSpinner] = useState(false);
  const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
    RESEND_OTP_TIME_LIMIT,
  );
  const headerText = useSelector((state: RootState) => state.header.headerText);


  useFocusEffect(
    React.useCallback(() => {
      global.guestIndex = 2;
    }, [])
  );

  useEffect(() => {
    startResendOtpTimer();

    return () => {
      if (resendOtpTimerInterval) {
        clearInterval(resendOtpTimerInterval);
      }
    };
  }, [resendButtonDisabledTime]);

  const startResendOtpTimer = () => {
    if (resendOtpTimerInterval) {
      clearInterval(resendOtpTimerInterval);
    }
    resendOtpTimerInterval = setInterval(() => {
      if (resendButtonDisabledTime <= 0) {
        clearInterval(resendOtpTimerInterval);
      } else {
        setResendButtonDisabledTime(resendButtonDisabledTime - 1);
      }
    }, 1000);
  };

  const submitData = () => {
    const cred = {
      email_id: email,
      reset_password_otp: vericationCode,
    };
    Yup
      .validateVerifyForgotPassword()
      .validate(cred)
      .then(() => {
        setSpinner(true);
        axios
          .post(env.BASE_URL + "/user/api/verifyResetPasswordToken", encryptData(cred))
          .then(async (res) => {
            setSpinner(false);
            setTimeout(() => {
              navigation.navigate("ResetPassword", {
                email: email,
              });
            }, 500);
          })
          .catch((err) => {
            setSpinner(false);
            setTimeout(() => {
              toastr.warning(err.response.data.message);
            }, 300);
          })
          .finally(() => {
            setSpinner(false);
          });
      })
      .catch((err) => {
        toastr.warning(err.errors[0]);
      });
  };

  const onResendOtpButtonPress = () => {

    setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
    startResendOtpTimer();

    // resend OTP Api call
    // todo
    const cred = {
      email_id: email,
    };
    setSpinner(true);
    axios
      .post(env.BASE_URL + "/user/api/sendResetPasswordToken", encryptData(cred))
      .then(async (res) => {
        res.data = await decryptData(res.data);
        setTimeout(() => {
          toastr.success(res.data.message);
        }, 1000)
      })
      .catch((err) => {
        setTimeout(() => {
          toastr.warning(err.response.data.message);
        }, 1000);
      })
      .finally(() => {
        setSpinner(false);
      });
  };

  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <Spinner visible={spinner} />
        <LinearGradient colors={["#393838", "#222222"]}>
          <Header />
        </LinearGradient>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <View style={styles.contentView}>
            <ScrollView>
              <ContentHeader text={headerText.enter_verification_code_text} />
              <View style={{ marginVertical: 20 }}>
                <InfoHeader
                  text={headerText.forgot_password_verification_text}
                />
                <InfoHeader
                  text={headerText.enter_below_code_text}
                />
              </View>

              <View style={styles.formView}>
                {/* Verify Account */}
                <UEPTextInput
                //   style={styles.textInput}
                  onChangeText={(e : any) => {
                    setVerificationCode(e);
                  }}
                  value={vericationCode}
                  placeholder="Verification Code"
                  placeholderTextColor={colors.place_holder_color}
                  keyboardType="number-pad"
                  // fontSize={15}
                  underlineColorAndroid="transparent"
                  autoCorrect={false}
                  maxLength={5}
                  textAlign="center"
                />
              </View>

              {resendButtonDisabledTime > 0 ? (
                <Text style={{
                  alignSelf: 'center', 
                  fontFamily: Fonts.AvenirNextCondensedDemiBold,
                  fontSize: RFValue(18),
                  color: colors.header, marginVertical: 25
                }}>{headerText.resent_otp_text_in} {resendButtonDisabledTime}S</Text>
              ) : (
                <TouchableOpacity
                 onPress={onResendOtpButtonPress} 
                style={{
                  paddingTop: 8,
                  paddingBottom: 8,
                  paddingLeft: 16,
                  paddingRight: 16,
                  borderWidth: 1,
                  borderRadius: 3,
                  alignSelf: 'center',
                  marginVertical: 25,
                  borderColor: colors.header
                }}>
                  <Text style={{
                    alignSelf: 'center',
                     fontFamily: Fonts.AvenirNextCondensedDemiBold,
                    fontSize: RFValue(18),
                    color: colors.header
                  }}>{headerText.resend_otp_text}</Text>
                </TouchableOpacity>
              )}

            </ScrollView>
            <UEPButton
              title={headerText.continue_text}
              onPressButton={() => {
                Keyboard.dismiss();
                submitData();
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default VerifyForgotPassword;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#3F3F3F",
    alignItems: "center",
  },
  contentView: {
    flex: 1,
    paddingTop: 20,
    marginHorizontal: 20,
  },
  informationTextView: {
    justifyContent: "center",
    alignItems: "center",
  },

  formView: {
    marginHorizontal: 10,
  },
});
