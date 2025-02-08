import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEstufasData } from '../User/useEstufasData';
import { useUserUid } from '../User/useUserUid';
import { Ionicons } from '@expo/vector-icons';

export default function MinhasEstufas() {
  const navigation = useNavigation();
  const estufasData = useEstufasData();
  const userUid = useUserUid();

  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemPress = (nomeEstufa, codigoEstufa) => {
    console.log("Nome da estufa:", nomeEstufa);
    console.log("Código da estufa:", codigoEstufa);
    console.log("Usuario:", userUid);
    navigation.navigate('MainStack', {
      screen: 'EstufaSelecionada',
      params: {
        nomeEstufa: nomeEstufa,
        codigoEstufa: codigoEstufa,
        userUid: userUid,
      }
    });
  };

  estufasData.sort((a, b) => a.nome.localeCompare(b.nome));

  const handleNavigateToCadastrarEstufas = () => {
    navigation.navigate('cadastrarEstufas');
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.messageHeader}>Minhas Estufas</Text>
      </View>

      <View style={styles.containerForm}>
        {estufasData.length === 0 ? (
          <TouchableOpacity
            style={styles.noEstufasContainer}
            onPress={handleNavigateToCadastrarEstufas}
          >
            <Ionicons name="sad-outline" size={60} color="#000" />
            <Text style={styles.noEstufasText}>Ops, nenhuma estufa encontrada.</Text>
            <Text style={styles.noEstufasSubtext}>Clique para cadastrar suas estufas!</Text>
          </TouchableOpacity>
        ) : (
          <ScrollView style={styles.listContainer}>
            {estufasData.map(({ nome, codigo }, index) => (
              <TouchableOpacity
                style={[
                  styles.item,
                  index === selectedItem && styles.selectedItem,
                ]}
                key={index}
                onPress={() => handleItemPress(nome, codigo)}
              >
                <View style={styles.itemContent}>
                  <View>
                    <Text style={styles.itemText}>{nome}</Text>
                    <Text style={styles.itemSubtext}>Código: {codigo}</Text>
                  </View>
                  <Ionicons name="chevron-forward-outline" size={24} color="#666" />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
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
    flex: 1,
    backgroundColor: '#FFF',
    paddingStart: '5%',
    paddingEnd: '5%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: 150,
  },
  listContainer: {
    marginTop: 10,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedItem: {
    backgroundColor: '#E0E0E0',
  },
  noEstufasContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noEstufasText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  noEstufasSubtext: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
  itemSubtext: {
    fontSize: 14,
    color: '#666',
  },
  itemSubtext: {
    fontSize: 14,
    color: '#666',
  },
});
