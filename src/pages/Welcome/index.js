import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,

} from 'react-native';

import * as Animatable from 'react-native-animatable';

import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Welcome() {

  const navigation = useNavigation();

  return (

    <View style={styles.container}>

      <Animatable.View
        animation="flipInY"
        delay={200}
        style={styles.containerLogo}>



        <Ionicons
          name="leaf-outline"
          size={200} // ajuste o tamanho do ícone conforme necessário
          color="#FFFFFF" // ajuste a cor do ícone conforme necessário


        />
        <Text style={styles.Nome}>EcoGrowth</Text>
      </Animatable.View>


      <Animatable.View delay={800} animation="fadeInUp" style={styles.containerForm}>

        <View style={styles.containerTitle}>
          <Text style={styles.title}>Monitore e controle suas</Text>
          <Text style={styles.title}>estufas de qualquer lugar!</Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('SignIn')}
          style={styles.button}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>

      </Animatable.View>



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  containerLogo: {
    flex: 2,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center"
  },
  containerForm: {
    flex: 1,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",

  },
  containerTitle: {
    alignItems: "center",
    marginTop: 28,
    marginBottom: 12,

  },

  title: {
    fontSize: 24,
    fontWeight: "bold",

  },
  text: {
    color: "#A1A1A1",
    alignSelf: "center"
  },
  button: {
    position: 'absolute',
    backgroundColor: "#000000",
    borderRadius: 50,
    paddingVertical: 8,
    width: "60%",
    alignSelf: "center",
    bottom: "30%",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {

    fontSize: 18,
    fontWeight: 'bold',
    color: "#FFF"

  },
  Nome: {
    fontSize: 54,
    fontWeight: 'bold',
    color: "#FFF"
  }






})