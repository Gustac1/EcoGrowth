import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { auth } from '../../../../Services/firebaseConfig';
import { KeyboardAwareScrollView } from '@pietile-native-kit/keyboard-aware-scrollview';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import TemperatureChart from './Charts/Temperature/TemperatureChart';
import HumidityChart from './Charts/Humidity/HumidityChart';
import { ScatterChart } from 'react-native-chart-kit';

export default function EstufaSelecionada() {
    const navigation = useNavigation();
    const route = useRoute();
    const { nomeEstufa } = route.params;
    const { codigoEstufa } = route.params;
    const { userUid } = route.params;



    const navigateToTemperatureChart = () => {
        console.log("Estufa Selecionada")
        console.log(codigoEstufa); // Movido o console.log para fora da chamada navigation.navigate
        console.log(userUid);
        console.log("A partir daqui ja é o grafico")
        navigation.navigate('TemperatureChartPage', {
            nomeEstufa,
            codigoEstufa,
            userUid,
        });
    };

    const navigateToHumidityChart = () => {
        console.log("Estufa Selecionada")
        console.log(codigoEstufa); // Movido o console.log para fora da chamada navigation.navigate
        console.log(userUid);
        console.log("A partir daqui ja é o grafico")
        navigation.navigate('HumidityChartPage', {
            nomeEstufa,
            codigoEstufa,
            userUid,
        });
    };

    const navigateToLuminosityChart = () => {
        console.log("Estufa Selecionada")
        console.log(codigoEstufa); // Movido o console.log para fora da chamada navigation.navigate
        console.log(userUid);
        console.log("A partir daqui ja é o grafico")
        navigation.navigate('LuminosityChartPage', {
            nomeEstufa,
            codigoEstufa,
            userUid,
        });
    };

    const navigateToSoilTemperatureChart = () => {
        console.log("Estufa Selecionada")
        console.log(codigoEstufa); // Movido o console.log para fora da chamada navigation.navigate
        console.log(userUid);
        console.log("A partir daqui ja é o grafico")
        navigation.navigate('SoilTemperatureChartPage', {
            nomeEstufa,
            codigoEstufa,
            userUid,
        });
    };

    const navigateToSoilMoistureChart = () => {
        console.log("Estufa Selecionada")
        console.log(codigoEstufa); // Movido o console.log para fora da chamada navigation.navigate
        console.log(userUid);
        console.log("A partir daqui ja é o grafico")
        navigation.navigate('SoilMoistureChartPage', {
            nomeEstufa,
            codigoEstufa,
            userUid,
        });
    };

    const navigateToSoilpHChart = () => {
        console.log("Estufa Selecionada")
        console.log(codigoEstufa); // Movido o console.log para fora da chamada navigation.navigate
        console.log(userUid);
        console.log("A partir daqui ja é o grafico de ph")
        navigation.navigate('SoilpHChartPage', {
            nomeEstufa,
            codigoEstufa,
            userUid,
        });
    };

    const navigateToVentilationChart = () => {
        console.log("Estufa Selecionada")
        console.log(codigoEstufa); // Movido o console.log para fora da chamada navigation.navigate
        console.log(userUid);
        console.log("A partir daqui ja é o grafico de ph")
        navigation.navigate('VentilationChartPage', {
            nomeEstufa,
            codigoEstufa,
            userUid,
        });
    };

    return (
        <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContainer}
            scrollEnabled={true}
            extraHeight={100}
            showsVerticalScrollIndicator={false}
            backgroundColor={"#FFF"}
        >
            <View style={styles.container}>
                <View style={styles.containerHeader}>
                    <Text style={styles.messageHeader}>{nomeEstufa}</Text>
                </View>
                <View style={styles.containerForm}>
                    <View style={styles.infoContainer}>
                        <View style={styles.infoItem}>
                            <Ionicons name="checkmark-circle-outline" size={32} />
                            <Text style={styles.infoTitle}>Status</Text>
                            <Text style={styles.infoValue}>Online</Text>
                        </View>
                        <TouchableWithoutFeedback onPress={navigateToTemperatureChart}>
                            <View style={styles.infoItem}>
                                <Ionicons name="thermometer-outline" size={32} />
                                <Text style={styles.infoTitle}>Temperatura</Text>
                                <Text style={styles.infoValue}>25°C</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={navigateToHumidityChart}>
                            <View style={styles.infoItem}>
                                <Ionicons name="water-outline" size={32} />
                                <Text style={styles.infoTitle}>Umidade</Text>
                                <Text style={styles.infoValue}>60%</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={navigateToLuminosityChart}>
                            <View style={styles.infoItem}>
                                <Ionicons name="sunny-outline" size={32} />
                                <Text style={styles.infoTitle}>Luminosidade</Text>
                                <Text style={styles.infoValue}>50%</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={navigateToSoilTemperatureChart}>
                            <View style={styles.infoItem}>
                                <Ionicons name="thermometer-outline" size={32} />
                                <Text style={styles.infoTitle}>Temperatura do Solo</Text>
                                <Text style={styles.infoValue}>20°C</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={navigateToSoilMoistureChart}>
                            <View style={styles.infoItem}>
                                <Ionicons name="water-outline" size={32} />
                                <Text style={styles.infoTitle}>Umidade do Solo</Text>
                                <Text style={styles.infoValue}>50%</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={navigateToSoilpHChart}>
                            <View style={styles.infoItem}>
                                <Ionicons name="color-palette-outline" size={32} />
                                <Text style={styles.infoTitle}>pH do Solo</Text>
                                <Text style={styles.infoValue}>6.5</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={navigateToVentilationChart}>
                            <View style={styles.infoItem}>
                                <MaterialCommunityIcons name="fan" size={32} />
                                <Text style={styles.infoTitle}>Ventilação</Text>
                                <Text style={styles.infoValue}>Boa</Text>
                            </View>
                        </TouchableWithoutFeedback>






                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    containerHeader: {
        marginTop: "14%",
        marginBottom: "8%",
        paddingStart: "5%",
    },
    messageHeader: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#FFF",
    },
    container: {
        flex: 1,
        backgroundColor: "#000000"
    },
    containerForm: {
        backgroundColor: "#FFF",
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: "5%",
        paddingEnd: "5%"
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginVertical: 20,
    },
    infoItem: {
        width: '48%',
        alignItems: 'center',
        marginBottom: 20,
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
        marginLeft: 5,
    },
    infoValue: {
        fontSize: 16,
        color: '#000000',
        textAlign: 'center',
    },
});
