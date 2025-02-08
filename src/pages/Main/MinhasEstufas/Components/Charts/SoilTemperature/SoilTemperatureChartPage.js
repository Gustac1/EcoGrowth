import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, Alert, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from '@pietile-native-kit/keyboard-aware-scrollview';
import SoilTemperatureChart from './SoilTemperatureChart';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../../../../Services/firebaseConfig';

export default function SoilTemperatureChartPage() {
    const route = useRoute();
    const { nomeEstufa, codigoEstufa, userUid } = route.params;
    const [isAdmin, setAdmin] = useState(false);
    const [isMember, setMember] = useState(false);

    const [desiredSoilTemperature, setDesiredSoilTemperature] = useState(50);
    const [editPermission, setEditPermission] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false); // Estado para controlar se os dados foram carregados com sucesso

    // Função para verificar se o userUid está nos documentos de Administradores ou Membros
    const verificarUsuarioEmDocumento = async (codigoEstufa, userUid) => {
        try {
            // Referência para o documento de Administradores
            const adminDocRef = doc(db, `Dispositivos/${codigoEstufa}/Usuarios/Administradores`);
    
            // Referência para o documento de Membros
            const membrosDocRef = doc(db, `Dispositivos/${codigoEstufa}/Usuarios/Membros`);
    
            // Obtenha os dados dos documentos de Administradores e Membros
            const [adminSnapshot, membrosSnapshot] = await Promise.all([
                getDoc(adminDocRef),
                getDoc(membrosDocRef)
            ]);
    
            // Definir variáveis de administrador e membro com base na existência do userUid nos documentos
            const isAdmin = adminSnapshot.exists() && adminSnapshot.data().hasOwnProperty(userUid);
            const isMember = membrosSnapshot.exists() && membrosSnapshot.data().hasOwnProperty(userUid);
    
            if (isAdmin) {
                console.log('Usuário encontrado como administrador:', adminSnapshot.data());
                // Adicione qualquer lógica adicional necessária para administradores
                setAdmin(true);
                setMember(false);
            } else if (isMember) {
                console.log('Usuário encontrado como membro:', membrosSnapshot.data());
                // Adicione qualquer lógica adicional necessária para membros
                setMember(true);
                setAdmin(false);
            } else {
                console.log('Usuário não encontrado como administrador ou membro.');
                // Aqui você pode adicionar qualquer lógica adicional que desejar
            }
        } catch (error) {
            console.error('Erro ao verificar usuário em documento:', error);
        }
    };
    

    // Efeito para carregar os dados quando a tela for focada
    useFocusEffect(
        React.useCallback(() => {
            console.log("Fetching data...");
            console.log("Admin:");
            console.log(isAdmin);
            console.log("Membro:");
            console.log(isMember);
            console.log("codigoEstufa:", codigoEstufa);
            console.log("userUid:", userUid);

            const fetchData = async () => {
                setLoading(true);
                try {
                    const docRef = doc(db, `Dispositivos/${codigoEstufa}/Dados/TemperaturaDoSolo`);
                    console.log("docRef:", docRef.path);
                    const docSnap = await getDoc(docRef);
                    console.log("docSnap.exists():", docSnap.exists());
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        console.log("Data fetched:", data);
                        setEditPermission(data.PermissaoPraEditar);
                        setDesiredSoilTemperature(data.TemperaturaDoSoloDesejada);
                        setDataLoaded(true); // Definir como true quando os dados forem obtidos
                    } else {
                        console.log("Documento não encontrado!");
                        // Se o documento não existir, crie-o com valores padrão
                        const newDocRef = doc(db, `Dispositivos/${codigoEstufa}/Dados/TemperaturaDoSolo`);
                        await setDoc(newDocRef, { TemperaturaDoSoloDesejada: 50, PermissaoPraEditar: false });
                        console.log("Documento criado com valores padrão.");
                        // Defina os valores padrão nos estados
                        setEditPermission(false);
                        setDesiredSoilTemperature(50);
                        setDataLoaded(true);
                    }
                } catch (error) {
                    console.error("Erro ao obter o documento:", error);
                    Alert.alert(
                        "Erro",
                        "Ocorreu um erro ao tentar obter os dados. Por favor, tente novamente mais tarde.",
                        [{ text: "OK" }]
                    );
                } finally {
                    setLoading(false);
                }
            };

            verificarUsuarioEmDocumento(codigoEstufa, userUid);
            fetchData();

            return () => {
                console.log("Cleaning up...");
            };
        }, [codigoEstufa])
    );

    const handleSoilTemperatureChange = (SoilTemperature) => {
        const roundedSoilTemperature = Math.round(SoilTemperature);
        setDesiredSoilTemperature(roundedSoilTemperature);

        const docRef = doc(db, `Dispositivos/${codigoEstufa}/Dados/TemperaturaDoSolo`);
        setDoc(docRef, { TemperaturaDoSoloDesejada: roundedSoilTemperature }, { merge: true })
            .then(() => {
                console.log("TemperaturaDoSolo desejada atualizada com sucesso!");
            })
            .catch((error) => {
                console.error("Erro ao atualizar TemperaturaDoSolo desejada: ", error);
                Alert.alert(
                    "Erro",
                    "Ocorreu um erro ao tentar atualizar a TemperaturaDoSolo desejada. Por favor, tente novamente mais tarde.",
                    [{ text: "OK" }]
                );
            });
    };

    const toggleEditPermission = () => {
        const newPermission = !editPermission;
        setEditPermission(newPermission);

        const docRef = doc(db, `Dispositivos/${codigoEstufa}/Dados/TemperaturaDoSolo`);
        setDoc(docRef, { PermissaoPraEditar: newPermission }, { merge: true })
            .then(() => {
                console.log("Permissão pra editar atualizada com sucesso!");
            })
            .catch((error) => {
                console.error("Erro ao atualizar a permissão pra editar: ", error);
                Alert.alert(
                    "Erro",
                    "Ocorreu um erro ao tentar atualizar a permissão pra editar. Por favor, tente novamente mais tarde.",
                    [{ text: "OK" }]
                );
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
                        <SoilTemperatureChart />
                    </View>
                    {dataLoaded && ( // Renderizar somente se os dados estiverem carregados com sucesso
    <View>
        {(!isMember || (isMember && editPermission)) && ( // Verifica se não é um membro ou se é um membro com permissão de edição
            <View>
                <View style={styles.labelContainer}>
                    <Ionicons name="water-outline" size={24} color="#000" style={styles.icon} />
                    <Text style={styles.label}>TemperaturaDoSolo Desejada (%)</Text>
                </View>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={100}
                    step={1}
                    value={desiredSoilTemperature}
                    onValueChange={handleSoilTemperatureChange}
                    minimumTrackTintColor="#000000"
                    maximumTrackTintColor="#000000"
                    thumbTintColor="#000000"
                />
                <View style={styles.sliderValueContainer}>
                    <Text style={styles.sliderValue}>{desiredSoilTemperature}%</Text>
                </View>
            </View>
        )}
        {!isMember && ( // Renderizar somente se o usuário não for um membro
            <View style={styles.editPermissionContainer}>
                <Text style={styles.editPermissionText}>Permitir edição de parâmetros para membros</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#767577" }}
                    thumbColor={editPermission ? "#000000" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleEditPermission}
                    value={editPermission}
                />
            </View>
        )}
    </View>
)}

                    {loading && ( // Renderizar o indicador de atividade enquanto os dados estão sendo buscados
                        <ActivityIndicator size="large" color="#000" />
                    )}
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
        justifyContent: 'center',
        marginTop: 8,
    },
    sliderValue: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 5,
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
