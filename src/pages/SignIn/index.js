import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../../Services/firebaseConfig';
import { Alert } from 'react-native';



export default function SignIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const fadeInLeftRef = useRef(null) // Referência para a animação fadeInLeft
  const fadeInUpRef = useRef(null) // Referência para a animação fadeInUp
  const emailInputRef = useRef(null)
  const passwordInputRef = useRef(null)
  const [isPasswordVisible, setPasswordVisible] = useState(false)
  const handlePressOutside = () => {
    Keyboard.dismiss();
  }
  const handleEmailSubmit = () => {
    passwordInputRef.current.focus();
  }


  const handleSignIn = () => {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigation.navigate('MainTabs', { screen: 'MinhasEstufas' })
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;


        Alert.alert('Ops, algo deu errado', 'Email e/ou senha inválido(s)', [{ text: 'Entendi' }]);
      });
  };


  useEffect(() => {
    if (isFocused) {
      // Iniciar a animação aqui
      if (fadeInLeftRef.current) {
        fadeInLeftRef.current?.fadeInLeft(1000);
      }
      if (fadeInUpRef.current) {
        fadeInUpRef.current?.fadeInUp(1000);
      }
    }
  }, [isFocused])




  return (

    <TouchableWithoutFeedback onPress={handlePressOutside}>

      <View style={styles.container}>

        <Animatable.View ref={fadeInLeftRef} style={styles.containerHeader}>

          <Text style={styles.message}>Bem-vindo(a) </Text>

        </Animatable.View>

        <Animatable.View ref={fadeInUpRef} style={styles.containerForm}>

          <Text style={styles.title}>Email</Text>

          <TextInput
            ref={emailInputRef}
            placeholder="Digite um email"
            style={[styles.input, { color: "#000000" }]}
            onSubmitEditing={handleEmailSubmit}
            onChangeText={(text) => setEmail(text)}
            value={email}
          />

          <Text style={styles.title}>Senha</Text>

          <View style={styles.passwordLadoALado}>

            <TextInput
              ref={passwordInputRef}
              placeholder="Digite uma senha"
              style={[styles.inputSenha, { color: "#000000" }]}
              secureTextEntry={!isPasswordVisible}
              onChangeText={(text) => setPassword(text)}
              value={password}
            />

            <TouchableOpacity
              onPress={() => setPasswordVisible(!isPasswordVisible)}
            >


              <Icon name={isPasswordVisible ? "eye-slash" : 'eye'} size={20} />


            </TouchableOpacity>

          </View>


          <View style={styles.buttonForgotPasswordContainer}>

            <TouchableOpacity 
            onPress={() => navigation.navigate('ForgotPassword')}
            >

              <Text style={styles.buttonForgotPasswordText}>Esqueceu sua senha?</Text>

            </TouchableOpacity>
          </View>


          <TouchableOpacity style={styles.button}
            onPress={handleSignIn}
          >

            <Text style={styles.buttonText}>Entrar</Text>


          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonRegister}
            onPress={() => navigation.navigate('Register')}>
              



            <Text style={styles.buttonRegisterText}>Não possui uma conta? Cadastre-se</Text>

          </TouchableOpacity>

        </Animatable.View>

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
  inputSenha: {
    fontSize: 16,
    height: 40,
    flex: 1,
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
  buttonRegister: {
    width: "100%",
    alignItems: "center",
    marginTop: 14,
  },
  buttonRegisterText: {
    color: "#A1A1A1"
  },
  ForgotPassword:{
    flexDirection: 'row',

  },


  buttonForgotPasswordContainer: {
  
    flexDirection: 'row',
    justifyContent: 'flex-end', // Alinha o botão à direita
    alignItems: 'center',

  },
  buttonForgotPasswordText: {

    color: "#A1A1A1"
  },

  passwordLadoALado: {
    flexDirection: 'row',
    marginBottom: 12,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  rounded: {
    borderRadius: 10, // Ajuste esse valor para personalizar o arredondamento
    backgroundColor: '#000000', // Ajuste a cor de fundo conforme necessário
    // Outros estilos de acordo com o seu design
  },
})