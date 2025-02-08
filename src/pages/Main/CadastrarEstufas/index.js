import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../../Services/firebaseConfig';
import cadastrarEstufa from './cadastrarEstufas';
import { KeyboardAwareScrollView } from '@pietile-native-kit/keyboard-aware-scrollview';

export default function CadastrarEstufas() {
    const getCurrentUser = () => auth.currentUser;
    const navigation = useNavigation();
    const [nome, setNome] = useState('');
    const [codigo, setCodigo] = useState('');
    const nomeDaEstufa = useRef(null);
    const codigoDaEstufa = useRef(null);
    const [isNameEmpty, setIsNameEmpty] = useState(true);
    const [isCodeEmpty, setIsCodeEmpty] = useState(true);

    const focusInput = (ref) => ref.current.focus();

    const handleCadastrarEstufa = () => {
        if (isNameEmpty || isCodeEmpty) {
            Alert.alert('Ops, algo deu errado', "Por favor, preencha os dados solicitados.");
            return;
        }
        
        cadastrarEstufa({ nome, codigo}, getCurrentUser, navigation);

        setNome('');
        setCodigo('');
        setIsNameEmpty(true);
        setIsCodeEmpty(true);
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
                <Text style={styles.messageHeader}>Cadastre Sua Estufa</Text>
            </View>
            <View style={styles.containerForm}>
                <Text style={styles.title}>Nome da estufa</Text>
                <TextInput
                    ref={nomeDaEstufa}
                    placeholder="Digite o nome da estufa"
                    style={[styles.input, { color: "#000000", borderColor:'black' }]}
                    onSubmitEditing={() => focusInput(codigoDaEstufa)}
                    onChangeText={(text) => {
                        setIsNameEmpty(text.trim() === "");
                        setNome(text);
                    }}
                    value={nome}
                />
                <Text style={styles.title}>Código da estufa</Text>
                <TextInput
                    ref={codigoDaEstufa}
                    placeholder="Digite o código da sua estufa"
                    style={[styles.input, { color: "#000000", borderColor:'black' }]}
                    onChangeText={(text) => {
                        setIsCodeEmpty(text.trim() === "");
                        setCodigo(text);
                    }}
                    value={codigo}
                />
                <TouchableOpacity style={styles.button} onPress={handleCadastrarEstufa}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>

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
    scrollContainer: {
        backgroundColor: "#FFF"
    },

    title: {
        fontSize: 20,
        marginTop: 28,
    },
    input: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16,
    },
    button: {
        backgroundColor: "#000000",
        width: "100%",
        borderRadius: 50,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "bold"
    },
});
