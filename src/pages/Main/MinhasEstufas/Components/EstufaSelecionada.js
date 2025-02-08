import React, { useRef, useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { auth, db } from '../../../../Services/firebaseConfig';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { KeyboardAwareScrollView } from '@pietile-native-kit/keyboard-aware-scrollview';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import TemperatureChart from './Charts/Temperature/TemperatureChart';
import HumidityChart from './Charts/Humidity/HumidityChart';
import { ScatterChart } from 'react-native-chart-kit';

export default function EstufaSelecionada() {
    const navigation = useNavigation();
    const route = useRoute();
    const { nomeEstufa, codigoEstufa, userUid } = route.params;

    // 🔹 Criamos estados para armazenar os valores dos sensores em tempo real
    const [temperatura, setTemperatura] = useState(null);
    const [umidade, setUmidade] = useState(null);
    const [luminosidade, setLuminosidade] = useState(null);
    const [temperaturaSolo, setTemperaturaSolo] = useState(null);
    const [umidadeSolo, setUmidadeSolo] = useState(null);
    const [pHDoSolo, setPHDoSolo] = useState(null);
    const [ventilacao, setVentilacao] = useState(null);

    useEffect(() => {
        if (!codigoEstufa) return;

        // 🔹 Caminhos ajustados para cada sensor no Firestore
        const temperaturaRef = doc(db, 'Dispositivos', codigoEstufa, 'Dados', 'Temperatura');
        const umidadeRef = doc(db, 'Dispositivos', codigoEstufa, 'Dados', 'Umidade');
        const luminosidadeRef = doc(db, 'Dispositivos', codigoEstufa, 'Dados', 'Luminosidade');
        const temperaturaSoloRef = doc(db, 'Dispositivos', codigoEstufa, 'Dados', 'TemperaturaDoSolo');
        const umidadeSoloRef = doc(db, 'Dispositivos', codigoEstufa, 'Dados', 'UmidadeDoSolo');
        const pHDoSoloRef = doc(db, 'Dispositivos', codigoEstufa, 'Dados', 'pHDoSolo');
        const ventilacaoRef = doc(db, 'Dispositivos', codigoEstufa, 'Dados', 'Ventilacao');

        // 🔹 Assinaturas onSnapshot para escutar as mudanças em tempo real
        const unsubscribeTemperatura = onSnapshot(temperaturaRef, (snapshot) => {
            if (snapshot.exists()) {
                setTemperatura(snapshot.data().TemperaturaDoArAtual || "N/A");
            }
        });

        const unsubscribeUmidade = onSnapshot(umidadeRef, (snapshot) => {
            if (snapshot.exists()) {
                setUmidade(snapshot.data().UmidadeDoArAtual || "N/A");
            }
        });

        const unsubscribeLuminosidade = onSnapshot(luminosidadeRef, (snapshot) => {
            if (snapshot.exists()) {
                setLuminosidade(snapshot.data().LuminosidadeAtual || "N/A");
            }
        });

        const unsubscribeTemperaturaSolo = onSnapshot(temperaturaSoloRef, (snapshot) => {
            if (snapshot.exists()) {
                setTemperaturaSolo(snapshot.data().TemperaturaDoSoloAtual || "N/A");
            }
        });

        const unsubscribeUmidadeSolo = onSnapshot(umidadeSoloRef, (snapshot) => {
            if (snapshot.exists()) {
                setUmidadeSolo(snapshot.data().UmidadeDoSoloAtual || "N/A");
            }
        });

        const unsubscribePHDoSolo = onSnapshot(pHDoSoloRef, (snapshot) => {
            if (snapshot.exists()) {
                setPHDoSolo(snapshot.data().pHDoSoloAtual || "N/A");
            }
        });

        const unsubscribeVentilacao = onSnapshot(ventilacaoRef, (snapshot) => {
            if (snapshot.exists()) {
                setVentilacao(snapshot.data().VentilacaoAtual || "N/A");
            }
        });

        // 🔹 Cleanup para evitar vazamento de memória
        return () => {
            unsubscribeTemperatura?.();
            unsubscribeUmidade?.();
            unsubscribeLuminosidade?.();
            unsubscribeTemperaturaSolo?.();
            unsubscribeUmidadeSolo?.();
            unsubscribePHDoSolo?.();
            unsubscribeVentilacao?.();
        };

    }, [codigoEstufa]);




    const navigateToTemperatureChart = () => {
        console.log(`🌱 Estufa Selecionada: ${nomeEstufa}`);
        console.log(`📌 Código da Estufa: ${codigoEstufa}`);
        console.log(`👤 Usuário UID: ${userUid}`);
        console.log(`📊 Abrindo gráfico de Temperatura...`);        
        navigation.navigate('TemperatureChartPage', {
            nomeEstufa,
            codigoEstufa,
            userUid,
        });
    };

    const navigateToHumidityChart = () => {
        console.log(`🌱 Estufa Selecionada: ${nomeEstufa}`);
        console.log(`📌 Código da Estufa: ${codigoEstufa}`);
        console.log(`👤 Usuário UID: ${userUid}`);
        console.log(`📊 Abrindo gráfico de Temperatura...`);        
        navigation.navigate('HumidityChartPage', {
            nomeEstufa,
            codigoEstufa,
            userUid,
        });
    };

    const navigateToLuminosityChart = () => {
        console.log(`🌱 Estufa Selecionada: ${nomeEstufa}`);
        console.log(`📌 Código da Estufa: ${codigoEstufa}`);
        console.log(`👤 Usuário UID: ${userUid}`);
        console.log(`📊 Abrindo gráfico de Temperatura...`);        
        navigation.navigate('LuminosityChartPage', {
            nomeEstufa,
            codigoEstufa,
            userUid,
        });
    };

    const navigateToSoilTemperatureChart = () => {
        console.log(`🌱 Estufa Selecionada: ${nomeEstufa}`);
        console.log(`📌 Código da Estufa: ${codigoEstufa}`);
        console.log(`👤 Usuário UID: ${userUid}`);
        console.log(`📊 Abrindo gráfico de Temperatura...`);        
        navigation.navigate('SoilTemperatureChartPage', {
            nomeEstufa,
            codigoEstufa,
            userUid,
        });
    };

    const navigateToSoilMoistureChart = () => {
        console.log(`🌱 Estufa Selecionada: ${nomeEstufa}`);
        console.log(`📌 Código da Estufa: ${codigoEstufa}`);
        console.log(`👤 Usuário UID: ${userUid}`);
        console.log(`📊 Abrindo gráfico de Temperatura...`);        
        navigation.navigate('SoilMoistureChartPage', {
            nomeEstufa,
            codigoEstufa,
            userUid,
        });
    };

    const navigateToSoilpHChart = () => {
        console.log(`🌱 Estufa Selecionada: ${nomeEstufa}`);
        console.log(`📌 Código da Estufa: ${codigoEstufa}`);
        console.log(`👤 Usuário UID: ${userUid}`);
        console.log(`📊 Abrindo gráfico de Temperatura...`);        
        navigation.navigate('SoilpHChartPage', {
            nomeEstufa,
            codigoEstufa,
            userUid,
        });
    };

    const navigateToVentilationChart = () => {
        console.log(`🌱 Estufa Selecionada: ${nomeEstufa}`);
        console.log(`📌 Código da Estufa: ${codigoEstufa}`);
        console.log(`👤 Usuário UID: ${userUid}`);
        console.log(`📊 Abrindo gráfico de Temperatura...`);        
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
                                <Text style={styles.infoValue}>{temperatura} °C</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        
                        <TouchableWithoutFeedback onPress={navigateToHumidityChart}>
                            <View style={styles.infoItem}>
                                <Ionicons name="water-outline" size={32} />
                                <Text style={styles.infoTitle}>Umidade</Text>
                                <Text style={styles.infoValue}>{umidade} %</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={navigateToLuminosityChart}>
                            <View style={styles.infoItem}>
                                <Ionicons name="sunny-outline" size={32} />
                                <Text style={styles.infoTitle}>Luminosidade</Text>
                                <Text style={styles.infoValue}>{luminosidade} lx</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={navigateToSoilTemperatureChart}>
                            <View style={styles.infoItem}>
                                <Ionicons name="thermometer-outline" size={32} />
                                <Text style={styles.infoTitle}>Temperatura do Solo</Text>
                                <Text style={styles.infoValue}>{temperaturaSolo} °C</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={navigateToSoilMoistureChart}>
                            <View style={styles.infoItem}>
                                <Ionicons name="water-outline" size={32} />
                                <Text style={styles.infoTitle}>Umidade do Solo</Text>
                                <Text style={styles.infoValue}>{umidadeSolo} %</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={navigateToSoilpHChart}>
                            <View style={styles.infoItem}>
                                <Ionicons name="color-palette-outline" size={32} />
                                <Text style={styles.infoTitle}>pH do Solo</Text>
                                <Text style={styles.infoValue}>{pHDoSolo}</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={navigateToVentilationChart}>
                            <View style={styles.infoItem}>
                                <MaterialCommunityIcons name="fan" size={32} />
                                <Text style={styles.infoTitle}>Ventilação</Text>
                                <Text style={styles.infoValue}>{ventilacao}</Text>
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
