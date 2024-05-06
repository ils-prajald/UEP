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
  Alert,
  TouchableOpacity
} from "react-native";

import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import colors from "../../constants/colors";
// import fonts from "../../constants/fonts";
import Spinner from "react-native-loading-spinner-overlay";
//Components
import Header from "../../components/Header";
import UEPButton from "../../components/UEPButton";
import ScreenHeader from "../../components/ScreenHeader";
import { RFValue } from "react-native-responsive-fontsize";
// import { toastr, yupSchema } from "../utilities/index";
import InfoHeader from "../../components/InfoHeader";
import { useFocusEffect } from "@react-navigation/native";
import UEPTextInput from "../../components/UEPInputText";
import { useSelector } from "react-redux";
import store, { RootState } from "../../redux/store";
import Fonts from "../../constants/Fonts";
import { decryptData, encryptData } from "../../utilities/Cryoto";
import toastr from "../../utilities/toastr";
import Yup from "../../utilities/Yup";
import env from "../../config";
const RESEND_OTP_TIME_LIMIT = 600;
let resendOtpTimerInterval: number;

type Props = {
    navigation: any;
    route: any;
  };

const VerifyAccount = ({  route, navigation } : Props) => {
  const [code, setCode] = useState("");
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

  const submitData = () => {
    const cred = {
      email_id: email,
      verification_otp: code,
    };
    Yup
      .validateVerifyAccount()
      .validate(cred)
      .then(() => {
        setSpinner(true);
        axios
          .post(env.BASE_URL + "/user/api/verifyOTP", encryptData(cred))
          .then(async (res) => {
            res.data = await decryptData(res.data);
            navigation.navigate("SetPassword", {
              email: email,
            });
          })
          .catch((err) => {
            setTimeout(() => {
              toastr.warning(err.response.data.message);
            }, 1000);
          })
          .finally(() => {
            setSpinner(false);
          });
      })
      .catch((err) => {
        toastr.warning(err.errors[0]);
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
              <ScreenHeader text={headerText.verify_account_text} />
              <View style={{ marginVertical: 10 }}>
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
                  style={styles.textInput}
                  onChangeText={(e : any) => {
                    setCode(e);
                  }}
                  value={code}
                  placeholder="Verification Code"
                  keyboardType="phone-pad"
                  textAlign="center"
                  maxLength={5}
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
          </View>
          <View style={{ marginHorizontal: "5%" }}>
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

export default VerifyAccount;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#3F3F3F",
    alignItems: "center",
  },
  contentView: {
    flex: 1,
    marginTop: "2%",
    marginHorizontal: "10%",
  },
  informationTextView: {
    justifyContent: "center",
    alignItems: "center",
  },

  informationText: {
    color: "#FACFAA",
    marginVertical: 10,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  textInput: {
    borderBottomColor: "#FACFAA",
    borderBottomWidth: 2,
    marginHorizontal: 10,
    marginVertical: 10,
    height: 40,
    color: "white",
  },
  stateAndZipCodeView: {
    flexDirection: "row",
  },
  stateView: {
    width: "50%",
  },
  zipCodeView: {
    width: "50%",
  },
  formView: {
    marginHorizontal: 10,
  },
  bottomButtonView: {
    bottom: 0,
  },
});
