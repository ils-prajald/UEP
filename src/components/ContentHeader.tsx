import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import colors from "../constants/colors";
import Fonts from "../constants/Fonts";

const ContentHeader = (props : any) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.headingText}>{props.text}</Text>
    </View>
  );
};

export default ContentHeader;

const styles = StyleSheet.create({
  screen: {
    marginHorizontal: "4%",
  },
  headingText: {
    color: colors.header,
    fontSize: RFValue(18),
    textAlign: "center",
    fontFamily: Fonts.BebasNeueRegular,
    lineHeight: 25,
    marginVertical: "3%",
  },
});
