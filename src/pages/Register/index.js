import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Platform} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useIsFocused } from '@react-navigation/native';
import RegisterHeader from './Components/RegisterHeader';
import RegisterForm from './Components/RegisterForm';
import { KeyboardAwareScrollView } from '@pietile-native-kit/keyboard-aware-scrollview';


export default function Register() {

  const scrollViewRef = useRef(null)



  
  const fadeInLeftRef = useRef(null) // Referência para a animação fadeInLeft
  const fadeInUpRef = useRef(null) // Referência para a animação fadeInUp
  const isFocused = useIsFocused()



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

    <TouchableWithoutFeedback>
    <KeyboardAwareScrollView 
    
    keyboardShouldPersistTaps="handled"
    contentContainerStyle={styles.scrollContainer} 
    scrollEnabled={true}
    extraHeight={100}
    showsVerticalScrollIndicator={false}

    
    >

   

      <View style={styles.container} >



          <Animatable.View ref={fadeInLeftRef}>
            <RegisterHeader />
          </Animatable.View>

          <Animatable.View ref={fadeInUpRef} style={styles.containerForm}>
            <RegisterForm />
          </Animatable.View>

    

      </View>


    </KeyboardAwareScrollView>
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
    backgroundColor: "#FFF"
  },
  containerForm: {
    backgroundColor: "#FFF",
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%"
  },
})