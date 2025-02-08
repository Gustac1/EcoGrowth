import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importando o hook de navegação

export default function Config() {
  const navigation = useNavigation(); // Obtendo a referência de navegação

  const handleLogout = () => {
    // Adicione aqui o código para fazer logout (se necessário)
    navigation.navigate('Welcome'); // Navegando para a tela de Welcome
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.messageHeader}>Configurações</Text>
      </View>

      <View style={styles.containerForm}>
        <Text style={styles.text}>
          O EcoGrowth foi desenvolvido como parte do meu Trabalho de Conclusão de Curso (TCC) para obtenção do diploma de Engenharia Elétrica pelo Instituto Federal de Santa Catarina - Campus Itajaí (IFSC - Itajaí). Agradeço a oportunidade de apresentar este projeto que representa os meus estudos e esforços acadêmicos. Obrigado pela sua participação e apoio neste processo.
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    backgroundColor: '#000000',
  },
  containerForm: {
    backgroundColor: "#FFF",
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
    paddingTop: "5%",
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
  text: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'justify'
  }
});
