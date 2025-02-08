import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RegisterHeader() {
    return (
        <View style={styles.container}>
            <Text style={styles.message}>Cadastre-se</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: "14%",
        marginBottom: "8%",
        paddingStart: "5%",
    },
    message: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#FFF",
    },
});
