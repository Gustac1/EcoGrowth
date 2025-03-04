import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, Alert, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from '@pietile-native-kit/keyboard-aware-scrollview';
import TemperatureChart from './TemperatureChart';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../../../../Services/firebaseConfig';

export default function TemperatureChartPage() {
    const route = useRoute();
    const { nomeEstufa, codigoEstufa, userUid } = route.params;
    const [isAdmin, setAdmin] = useState(false);
    const [isMember, setMember] = useState(false);
    const [desiredTemperature, setDesiredTemperature] = useState(50);
    const [editPermission, setEditPermission] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);

    // 🔎 Verifica se o usuário é administrador ou membro
    const verificarUsuarioEmDocumento = async (codigoEstufa, userUid) => {
        try {
            const [adminSnapshot, membrosSnapshot] = await Promise.all([
                getDoc(doc(db, `Dispositivos/${codigoEstufa}/Usuarios/Administradores`)),
                getDoc(doc(db, `Dispositivos/${codigoEstufa}/Usuarios/Membros`))
            ]);

            const isAdmin = adminSnapshot.exists() && adminSnapshot.data()?.[userUid];
            const isMember = membrosSnapshot.exists() && membrosSnapshot.data()?.[userUid];

            setAdmin(isAdmin);
            setMember(isMember);
        } catch (error) {
            console.error('❌ Erro ao verificar usuário:', error);
        }
    };

    // 🔥 Obtém os dados do Firestore quando a tela for focada
    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const docRef = doc(db, `Dispositivos/${codigoEstufa}/Dados/Temperatura`);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setEditPermission(data.PermissaoPraEditar);
                        setDesiredTemperature(data.TemperaturaDesejada);
                    } else {
                        await setDoc(docRef, { TemperaturaDesejada: 50, PermissaoPraEditar: false });
                        setEditPermission(false);
                        setDesiredTemperature(50);
                    }

                    setDataLoaded(true);
                } catch (error) {
                    console.error("❌ Erro ao obter dados:", error);
                    Alert.alert("Erro", "Não foi possível carregar os dados.", [{ text: "OK" }]);
                } finally {
                    setLoading(false);
                }
            };

            verificarUsuarioEmDocumento(codigoEstufa, userUid);
            fetchData();
        }, [codigoEstufa, userUid])
    );

    // 🔄 Atualiza a temperatura desejada no Firestore
    const handleTemperatureChange = (temperature) => {
        const roundedTemp = Math.round(temperature);
        setDesiredTemperature(roundedTemp);

        setDoc(doc(db, `Dispositivos/${codigoEstufa}/Dados/Temperatura`), 
            { TemperaturaDesejada: roundedTemp }, 
            { merge: true }
        ).catch((error) => {
            console.error("❌ Erro ao atualizar temperatura:", error);
            Alert.alert("Erro", "Não foi possível atualizar a temperatura.", [{ text: "OK" }]);
        });
    };

    // 🔄 Alterna a permissão de edição para membros
    const toggleEditPermission = () => {
        const newPermission = !editPermission;
        setEditPermission(newPermission);

        setDoc(doc(db, `Dispositivos/${codigoEstufa}/Dados/Temperatura`), 
            { PermissaoPraEditar: newPermission }, 
            { merge: true }
        ).catch((error) => {
            console.error("❌ Erro ao atualizar permissão:", error);
            Alert.alert("Erro", "Não foi possível atualizar a permissão.", [{ text: "OK" }]);
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
                    <View style={{ marginTop: 20 }}>
                        <TemperatureChart />
                    </View>
                    
                    {dataLoaded && (
                        <View>
                            {(!isMember || (isMember && editPermission)) && (
                                <View>
                                    <View style={styles.labelContainer}>
                                        <Ionicons name="thermometer-outline" size={24} color="#000" style={styles.icon} />
                                        <Text style={styles.label}>Temperatura Desejada (%)</Text>
                                    </View>
                                    <Slider
                                        style={styles.slider}
                                        minimumValue={0}
                                        maximumValue={100}
                                        step={1}
                                        value={desiredTemperature}
                                        onValueChange={handleTemperatureChange}
                                        minimumTrackTintColor="#000"
                                        maximumTrackTintColor="#000"
                                        thumbTintColor="#000"
                                    />
                                    <View style={styles.sliderValueContainer}>
                                        <Text style={styles.sliderValue}>{desiredTemperature}%</Text>
                                    </View>
                                </View>
                            )}
                            {!isMember && (
                                <View style={styles.editPermissionContainer}>
                                    <Text style={styles.editPermissionText}>Permitir edição para membros</Text>
                                    <Switch
                                        trackColor={{ false: "#767577", true: "#767577" }}
                                        thumbColor={editPermission ? "#000" : "#f4f3f4"}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={toggleEditPermission}
                                        value={editPermission}
                                    />
                                </View>
                            )}
                        </View>
                    )}

                    {loading && <ActivityIndicator size="large" color="#000" />}
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
        backgroundColor: "#000",
    },
    containerForm: {
        backgroundColor: "#FFF",
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: "5%",
        paddingEnd: "5%",
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    slider: {
        width: '100%',
        marginTop: 8,
    },
    sliderValueContainer: {
        alignItems: 'center',
        marginTop: 8,
    },
    sliderValue: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    icon: {
        width: 24,
        height: 24,
    },
    editPermissionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    editPermissionText: {
        fontSize: 16,
        color: '#000',
    },
});
