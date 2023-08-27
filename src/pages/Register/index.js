import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from '../../Services/firebaseConfig';





export default function Register() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')









  const navigation = useNavigation()
  const scrollViewRef = useRef(null)
  const fadeInLeftRef = useRef(null) // Referência para a animação fadeInLeft
  const fadeInUpRef = useRef(null) // Referência para a animação fadeInUp
  const isFocused = useIsFocused()
  const nameInputRef = useRef(null)
  const emailInputRef = useRef(null)
  const passwordInputRef = useRef(null)
  const confirmPasswordInputRef = useRef(null)
  const [isPasswordVisible, setPasswordVisible] = useState(false)
  const [isPasswordVisible1, setPasswordVisible1] = useState(false)
  const handlePressOutside = () => {
    Keyboard.dismiss()
  }



  const handleNameSubmit = () => {
    emailInputRef.current.focus();
  }

  const handleEmailSubmit = () => {
    passwordInputRef.current.focus();
  }

  const handlePasswordSubmit = () => {

    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
      confirmPasswordInputRef.current.focus();
    }
  }
  const handleConfirmPasswordFocus = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }


  const handleCreateUser = () => {
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        Alert.alert(
          "Sucesso",
          "Registro bem-sucedido!",
          [
            {
              text: "Entrar",
              onPress: () => {
                navigation.navigate('SingIn'); // Navegar para a página "SingIn"
              }
            }
          ]
        );
 

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        Alert.alert(
          "Falha no registro",
          "Por favor, Verifique os dados e tente novamente.",
          [
            {
              text: "Tentar novamente",
            }
          ]
        );
 
        // ..
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

      <View style={styles.container} >
        <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollContainer} >

          <Animatable.View ref={fadeInLeftRef} style={styles.containerHeader}>

            <Text style={styles.message}>Cadastre-se </Text>

          </Animatable.View>

          <Animatable.View ref={fadeInUpRef} style={styles.containerForm}>

            <Text style={styles.title}>Nome completo</Text>

            <TextInput
              ref={nameInputRef}
              placeholder="Digite seu nome completo"
              style={[styles.input, { color: "#000000" }]}
              onSubmitEditing={handleNameSubmit}
            />

            <Text style={styles.title}>Email</Text>

            <TextInput
              ref={emailInputRef}
              placeholder="Digite um email"
              style={[styles.input, { color: "#000000" }]}
              onSubmitEditing={handleEmailSubmit}
              onChangeText={(text) => setEmail(text)}
              value={email}
            />

            <Text style={styles.title}>Criar senha</Text>

            <View style={styles.passwordLadoALado}>

              <TextInput
                ref={passwordInputRef}
                placeholder="Digite uma senha"
                style={[styles.inputSenha, { color: "#000000" }]}
                secureTextEntry={!isPasswordVisible}
                onSubmitEditing={handlePasswordSubmit}
                onChangeText={(text) => setPassword(text)}
                value={password}
              />

              <TouchableOpacity
                onPress={() => setPasswordVisible(!isPasswordVisible)}
              >

                <Text>
                  <Icon name={isPasswordVisible ? "eye-slash" : 'eye'} size={20} />
                </Text>

              </TouchableOpacity>


            </View>

            <Text style={styles.title}>Confirmar senha</Text>

            <View style={styles.passwordLadoALado}>

              <TextInput
                ref={confirmPasswordInputRef}
                placeholder="Confirme a senha"
                style={[styles.inputSenha, { color: "#000000" }]}
                secureTextEntry={!isPasswordVisible1}
                onFocus={handleConfirmPasswordFocus}



              />

              <TouchableOpacity
                onPress={() => setPasswordVisible1(!isPasswordVisible1)}
              >

                <Text>

                  <Icon name={isPasswordVisible1 ? "eye-slash" : 'eye'} size={20} />
                </Text>

              </TouchableOpacity>



            </View>



            <TouchableOpacity style={styles.button}
              onPress={handleCreateUser}
            >

              <Text style={styles.buttonText}>Cadastrar</Text>

            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonSingIn}
              onPress={() => navigation.navigate('SingIn')}>



              <Text style={styles.buttonSingInText}>Já tem uma conta? Acessar</Text>

            </TouchableOpacity>

          </Animatable.View>
        </ScrollView>
      </View>
 
    

    </TouchableWithoutFeedback>





  )
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000"
  },
  scrollContainer: {
    flexGrow: 1,
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
  buttonSingIn: {
    width: "100%",
    alignItems: "center",
    marginTop: 14,
  },
  buttonSingInText: {
    color: "#A1A1A1"
  },
  passwordLadoALado: {
    flexDirection: 'row',
    marginBottom: 12,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
})