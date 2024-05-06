// import { Button } from "native-base";
import React from "react";
import { StyleSheet, Text, View, Image, SafeAreaView, Button, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useSelector } from "react-redux";
import colors from "../../constants/colors";
import store, { RootState } from "../../redux/store";
import Fonts from "../../constants/Fonts";
// import colors from "../constants/colors";
// import fonts from "../constants/fonts";
// import { store } from '../store/Store';
const RegisterConfirm = ({ props, navigation }: any) => {
    const headerText = useSelector((state: RootState) => state.header.headerText);

    return (
        <View style={styles.screen}>
            <SafeAreaView>
                <View style={styles.cardView}>
                    <Image
                        source={require("../../assets/auth/success.png")}
                        style={styles.image}
                    />
                    <Text style={styles.infoText}>{headerText.congratulations_text}</Text>
                    <Text style={styles.infoText}>
                        {headerText.account_creation_text}
                    </Text>
                    {/* 
                    <Button
                        style={styles.button}
                        onPress={() => {
                            navigation.navigate("UserLogin");
                        }}
                    >
                        <Text style={styles.buttonText}>{headerText.login_here_text}</Text>
                    </Button> */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            navigation.navigate("UserLogin");
                        }}
                    >
                        <Text style={styles.buttonText}>{headerText.login_here_text}</Text>
                    </TouchableOpacity>

                </View>
            </SafeAreaView>
        </View>
    );
};

export default RegisterConfirm;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3F3F3F",
    },
    cardView: {
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    infoText: {
        fontSize: RFValue(18),
        textAlign: "center",
        fontFamily: Fonts.AvenirNextCondensedMediumItalic,
    },
    button: {
        backgroundColor: "#EA377C",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
        marginHorizontal: 20,
        borderRadius: 10,
        height: 40,
    },
    buttonText: {
        color: "white",
        fontSize: RFValue(15),
        fontFamily: Fonts.AvenirNextCondensedBold,
    },
    image: {
        width: 40,
        height: 40,
        tintColor: colors.uep_pink,
        marginVertical: 10,
    },
});
