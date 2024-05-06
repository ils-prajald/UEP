import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
// import { store } from '../../store/Store'
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import env from '../../config'
import axios from "axios";
import { encryptData , decryptData } from "../../utilities/Cryoto";
import Spinner from "react-native-loading-spinner-overlay";

//Components
import Header from "../../components/Header";
import UEPButton from "../../components/UEPButton";
import ScreenHeader from "../../components/ScreenHeader";
import toastr from "../../utilities/toastr";
import Yup from "../../utilities/Yup";

import DeviceInfo from "react-native-device-info";
import UEPTextInput from "../../components/UEPInputText";
import Fonts from "../../constants/Fonts";
import ContentHeader from "../../components/ContentHeader";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import store, { RootState } from "../../redux/store";

const SetPassword = ({ props, route, navigation } : any) => {
  const [spinner, setSpinner] = useState(false);
  const [userData, setUserData] = useState();

  const { email } = route.params;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const headerText = useSelector((state: RootState) => state.header.headerText);

  let deviceId = DeviceInfo.getUniqueId();
  let deviceType = Platform.OS === "android" ? "1" : "2";
  let deviceModel = DeviceInfo.getModel();
  let osVersion = DeviceInfo.getSystemVersion();

  useFocusEffect(
    React.useCallback(() => {
      global.guestIndex = 2;
    }, [])
  );

  console.log("deviceId",deviceId);

  const submitData = () => {
    const cred = {
      email_id: email,
      password: password,
      confirm_password: confirmPassword,
      device_token: "deviceId",
      device_type: deviceType,
      device_model: deviceModel,
      os_version: osVersion,
    };
    Yup
      .validateSetPassword()
      .validate(cred)
      .then(() => {
        setSpinner(true);
        axios
          .post(env.BASE_URL + "/user/api/setUpUserPassword", encryptData(cred))
          .then(async (res) => {
            setSpinner(false);
            res.data = await decryptData(res.data);
            setUserData(res.data);
            setTimeout(() => {
              navigation.navigate("RegisterConfirm");
            }, 500)
            // toastr.success("You are registered sucessfully with UEPViewer");
          })
          .catch((err) => {
            setSpinner(false);
            setTimeout(() => {
              toastr.warning(err.response.data.message);
            }, 1000)
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
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={{ flex: 1 }}
        >
          <View style={styles.contentView}>
            <ScrollView>
              <ScreenHeader text={headerText.set_password_text} />
              <ContentHeader text={headerText.username_text} />
              <Text style={styles.emailText}>{email}</Text>
              <View style={styles.formView}>
                {/* Verify Account */}
                <UEPTextInput
                  onChangeText={(e : any) => {
                    setPassword(e);
                  }}
                  value={password}
                  placeholder="Enter Your Password"
                  autoFocus={true}
                  returnKeyType={"next"}
                  textAlign="center"
                />

                <View style={styles.hintTextView}>
                  <Text style={styles.hintText}>{headerText.password_must_contain_1_number_text}</Text>
                  <Text style={styles.hintText}>{headerText.one_uppercase_letter_1_lowercase_letter_text}</Text>
                  <Text style={styles.hintText}>{headerText.one_special_character_and_at_least_8_characters_text}</Text>
                </View>

                <UEPTextInput
                  onChangeText={(e : any) => {
                    setConfirmPassword(e);
                  }}
                  value={confirmPassword}
                  placeholder="Re-enter Your Password"
                  textAlign="center"
                />
              </View>
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

export default SetPassword;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#3F3F3F",
    alignItems: "center",
  },

  formView: {
    marginHorizontal: 10,
  },
  hintTextView: {
    marginHorizontal: "10%",
    marginVertical: "4%",
  },
  hintText: {
    fontFamily: Fonts.AvenirNextCondensedMediumItalic,
    fontSize: 15,
    color: "rgb(222,222,222)",
  },
  emailText: {
    justifyContent: "center",
    textAlign: "center",
    color: "white",
    fontFamily: Fonts.AvenirNextCondensedBold,
    fontSize: 20,
    marginVertical: "1%",
  },
  contentView: {
    flex: 1,
    marginTop: "2%",
    marginHorizontal: "10%",
  },
});
