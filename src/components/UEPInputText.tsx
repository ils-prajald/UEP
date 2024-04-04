import React from "react";
import { Platform, StyleSheet, TextInput, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import colors from "../constants/colors";
// import fonts from "../constants/fonts";
const UEPTextInput = (props: any) => {
  return (
    <View style={styles.textInputView}>
      <TextInput
        style={props.fontFamily ? {
          borderBottomColor: colors.header,
          borderBottomWidth: 2,
          color: "white",
          fontFamily: props.fontFamily,
          height: Platform.OS === "ios" ? 50 : 50,
        } : styles.textInput}
        onChangeText={props.onChangeText}
        value={props.value}
        placeholder={props.placeholder}
        placeholderTextColor={colors.place_holder_color}
        // fontSize={props.fontSize ? props.fontSize : RFValue(18)}
        autoCorrect={false}
        keyboardType={props.keyboardType}
        autoCapitalize={props.autoCapitalize}
        maxLength={props.maxLength}
        textAlign={props.textAlign}
        secureTextEntry={props.secureTextEntry}
        returnKeyType={props.returnKeyType}
        // numberFormat={props.numberFormat}
        textContentType={props.textContentType}
        dataDetectorTypes={props.dataDetectorTypes}
        multiline={props.multiline}
        ref={props.acresRef}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
      />
    </View>
  );
};

export default UEPTextInput;

const styles = StyleSheet.create({
  textInputView: {
    // Define your textInputView style here
  },
  textInput: {
    borderBottomColor: colors.header,
    borderBottomWidth: 2,
    color: "white",
    // fontFamily: fonts.AvenirNextCondensedDemiBold, 
    height: Platform.OS === "ios" ? 50 : 50,
  },
});
