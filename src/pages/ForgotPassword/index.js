import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'; // Importe os métodos corretos
import { app } from '../../Services/firebaseConfig';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigation = useNavigation()
    const isFocused = useIsFocused()
    const fadeInLeftRef = useRef(null)
    const fadeInUpRef = useRef(null)
    const emailInputRef = useRef(null)

    const handlePressOutside = () => {
        Keyboard.dismiss();
    }

    useEffect(() => {
        // Executa o código quando o componente recebe o foco (isFocused)
        if (isFocused) {
            // Se a referência fadeInLeftRef não for nula, executa a animação fadeInLeft
            if (fadeInLeftRef.current) {
                fadeInLeftRef.current?.fadeInLeft(1000);
            }
            // Se a referência fadeInUpRef não for nula, executa a animação fadeInUp
            if (fadeInUpRef.current) {
                fadeInUpRef.current?.fadeInUp(1000);
            }
        }
    
        // Cleanup: Limpeza das referências quando o componente é desmontado
        // ou quando a dependência isFocused mudar
        return () => {
            // Define as referências como nulas para evitar vazamento de memória
            fadeInLeftRef.current = null;
            fadeInUpRef.current = null;
        };
    
    }, [isFocused]); // Executa sempre que o valor de 'isFocused' mudar

    const handlePasswordReset = async () => {
        try {
            await sendPasswordResetEmail(getAuth(app), email); // Use sendPasswordResetEmail com a instância de autenticação correta
            // Exiba a mensagem de sucesso em um alert
            Alert.alert('Sucesso', 'Um email de recuperação de senha foi enviado com sucesso.', [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('SignIn')
                    
                },
            ]);
        } catch (error) {
            // Trate erros aqui e exiba uma mensagem de erro em um alert
            Alert.alert('Ops, algo deu errado', 'Ocorreu um erro ao enviar o email de recuperação de senha, verifique o email inserido e tente novamente.', [{ text: 'Tentar novamente' }]);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={handlePressOutside}>
            <View style={styles.container}>
                <Animatable.View ref={fadeInLeftRef} style={styles.containerHeader}>
                    <Text style={styles.message}>Recupere sua senha </Text>
                </Animatable.View>
                <Animatable.View ref={fadeInUpRef} style={styles.containerForm}>
                    <Text style={styles.title}>Email</Text>
                    <TextInput
                        ref={emailInputRef}
                        placeholder="Digite um email"
                        style={[styles.input, { color: "#000000" }]}
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                    />
                    <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
                        <Text style={styles.buttonText}>Recuperar senha</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonSignIn} onPress= {() => navigation.navigate('SignIn')}>
                        
                        <Text style={styles.buttonSignInText}>Voltar</Text>
                    </TouchableOpacity>
                </Animatable.View>
                {message ? <Text style={styles.message}>{message}</Text> : null}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000"
    },
    containerHeader: {
        marginTop: "14%",
        marginBottom: "8%",
        paddingStart: "5%"
    },
    message: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#FFF"
    },
    containerForm: {
        backgroundColor: "#FFF",
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: "5%",
        paddingEnd: "5%"
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
    buttonSignIn: {
        width: "100%",
        alignItems: "center",
        marginTop: 14,
    },
    buttonSignInText: {
        color: "#A1A1A1"
    }
})

