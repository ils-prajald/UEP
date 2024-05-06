import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Fonts from "../constants/Fonts";

const InfoHeader = (props : any) => {
  return (
    <Text style={styles.textStyle} color={props.color}>
      {props.text}
    </Text>
  );
};

export default InfoHeader;

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: Fonts.AvenirNextCondensedRegular,
    fontSize: RFValue(16),
    color: "white",
    marginHorizontal: 18,
  },
});
