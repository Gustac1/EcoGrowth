
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useRef, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import { handleCreateUser } from '../Components/authFunctions';
import { Alert } from 'react-native';


export default function RegisterForm({

}) {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [isPasswordEmpty, setPasswordEmpty] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isNameValid, setNameValid] = useState(true);
    const [isNameEmpty, setNameEmpty] = useState(true);
    const [isEmailValid, setEmailValid] = useState(true);
    const [isEmailEmpty, setEmailEmpty] = useState(true);
    const [isPasswordValid, setPasswordValid] = useState(true);
    const [doPasswordsMatch, setDoPasswordsMatch] = useState(true);
    const navigation = useNavigation()
    const nameInputRef = useRef(null)
    const emailInputRef = useRef(null)
    const passwordInputRef = useRef(null)
    const confirmPasswordInputRef = useRef(null)
    const [isPasswordVisible, setPasswordVisible] = useState(false)
    const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

    const focusInput = (ref) => {
        ref.current.focus();


    };

    useEffect(() => {
        // Verifica se as senhas correspondem sempre que uma das senhas for alterada
        setDoPasswordsMatch(password === confirmPassword);
    }, [password, confirmPassword]);

    return (



        <View>

            <Text style={styles.title}>Nome completo</Text>
            <TextInput
                ref={nameInputRef}
                placeholder="Digite seu nome completo"
                style={[
                    styles.input,
                    { color: "#000000", borderColor: isNameValid ? 'black' : 'red' },
                ]}
                onSubmitEditing={() => focusInput(emailInputRef)}
                onChangeText={(text) => {
                    // Validação do formato do nome
                    const namePattern = /^[a-zA-Z]+ [a-zA-Z]+$/; // Assume que um nome é composto por duas palavras separadas por espaço
                    setNameValid(namePattern.test(text));

                    // Verifique se o campo de e-mail está vazio
                    const isNameEmpty = text.trim() === "";
                    setNameEmpty(isNameEmpty);

                    setName(text);
                }}
                value={name}

            />
            {!isNameValid && (
                <Text style={[styles.errorText, { color: 'red' }]}>
                    O nome deve estar no formato "Nome Sobrenome".
                </Text>
            )}


            <Text style={styles.title}>Email</Text>
            <TextInput
                ref={emailInputRef}
                placeholder="Digite um email"
                style={[
                    styles.input,
                    {
                        color: "#000000",
                        borderColor: isEmailValid ? 'black' : 'red',
                    },
                ]}
                onSubmitEditing={() => focusInput(passwordInputRef)}
                onChangeText={(text) => {
                    // Validação do formato do e-mail
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    const isValid = emailPattern.test(text);
                    setEmailValid(isValid);

                    // Verifique se o campo de e-mail está vazio
                    const isEmptyEmail = text.trim() === "";
                    setEmailEmpty(isEmptyEmail);

                    setEmail(text);
                }}
                value={email}
            />
            {!isEmailValid && (
                <Text style={[styles.errorText, { color: 'red' }]}>
                    O e-mail não está no formato correto.
                </Text>
            )}



            <Text style={styles.title}>Criar senha</Text>
            <View style={[styles.passwordLadoALado, { color: "#000000", borderColor: isPasswordValid ? 'black' : 'red' }]}>
                <TextInput
                    ref={passwordInputRef}
                    placeholder="Digite uma senha"
                    style={styles.inputSenha}
                    secureTextEntry={!isPasswordVisible}
                    onSubmitEditing={() => focusInput(confirmPasswordInputRef)}
                    onChangeText={(text) => {
                        // Validação da senha
                        setPassword(text);
                        setPasswordValid(text.length >= 8);


                        // Verifique se o campo de e-mail está vazio
                        const isEmptyPassword = text.trim() === "";
                        setPasswordEmpty(isEmptyPassword);


                    }}
                    value={password}
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
                    <Text>
                        <Icon name={isPasswordVisible ? "eye-slash" : 'eye'} size={20} />
                    </Text>
                </TouchableOpacity>
            </View>
            {!isPasswordValid && (
                <Text style={[styles.errorText, { color: 'red' }]}>
                    A senha deve ter pelo menos 8 caracteres.
                </Text>
            )}

            <Text style={styles.title}>Confirmar senha</Text>
            <View style={[styles.passwordLadoALado, { color: "#000000", borderColor: doPasswordsMatch ? 'black' : 'red' }]}>
                <TextInput
                    ref={confirmPasswordInputRef}
                    placeholder="Confirme a senha"
                    style={styles.inputSenha}
                    secureTextEntry={!isConfirmPasswordVisible}
                    onChangeText={(text) => {
                        setConfirmPassword(text);
                    }}
                    value={confirmPassword}
                />
                <TouchableOpacity onPress={() => setConfirmPasswordVisible(!isConfirmPasswordVisible)}>
                    <Text>
                        <Icon name={isConfirmPasswordVisible ? "eye-slash" : 'eye'} size={20} />
                    </Text>
                </TouchableOpacity>
            </View>
            {!doPasswordsMatch && (
                <Text style={[styles.errorText, { color: 'red' }]}>
                    As senhas não correspondem.
                </Text>
            )}

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    if (!isNameValid || isNameEmpty) {
                        Alert.alert(
                            "Ops, algo deu errado",
                            "Por favor, insira um nome válido."
                        );
                        return;
                    }

                    // Verifique se o campo de e-mail está no formato correto e se não está vazio
                    if (!isEmailValid || isEmailEmpty) {
                        Alert.alert(
                            'Ops, algo deu errado',
                            "Por favor, insira um endereço de e-mail válido."
                        );
                        return;
                    }


                    // Verifique se o campo de senha está no formato correto e se não está vazio
                    if (!isPasswordValid || isPasswordEmpty) {
                        Alert.alert(
                            'Ops, algo deu errado',
                            "Por favor, insira uma senha válida."
                        );
                        return;
                    }


                    // Verifique se as senhas correspondem, se o nome está no formato correto, se a senha é válida e se o email é
                    if (doPasswordsMatch && isNameValid && isPasswordValid && isEmailValid) {
                        // As senhas correspondem, o campo de nome não está vazio, o e-mail está no formato correto e a senha é válida, prossiga com o registro
                        handleCreateUser(email, password, navigation,name);
                        return;
                    }
                }}
            >
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonSignIn} onPress={() => navigation.navigate('SignIn')}>
                <Text style={styles.buttonSignInText}>Já tem uma conta? Acessar</Text>
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({

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
    inputSenha: {
        fontSize: 16,
        height: 40,
        flex: 1,
    },
    passwordLadoALado: {
        flexDirection: 'row',
        marginBottom: 12,
        borderBottomWidth: 1,
        alignItems: 'center',
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
});
