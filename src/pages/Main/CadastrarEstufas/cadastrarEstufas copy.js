import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from '../../../Services/firebaseConfig';
import { Alert } from 'react-native';

const cadastrarEstufa = async (estufa, getCurrentUser, navigation) => {
    try {
        const user = getCurrentUser();

        if (!user) {
            throw new Error('Usuário não autenticado');
        }

        // Verifica se o usuário já possui uma estufa com o mesmo código
        const estufasQuery = collection(db, `usuarios/${user.uid}/estufas`);
        const estufasSnapshot = await getDocs(estufasQuery);

        if (estufasSnapshot.docs.some(doc => doc.data().codigo === estufa.codigo)) {
            const mensagemErro = 'Você já possui uma estufa com o código fornecido';
            console.log(mensagemErro);
            throw new Error(mensagemErro);
        }

        // Verifica se o código fornecido corresponde a algum dispositivo
        const dispositivosQuery = collection(db, 'Dispositivos');
        const dispositivosSnapshot = await getDocs(dispositivosQuery);

        console.log("Documentos da coleção Dispositivos:");
        dispositivosSnapshot.forEach(doc => {
            console.log(doc.id, "=>", doc.data());
        });

        let codigoEncontrado = false;
        dispositivosSnapshot.forEach(doc => {
            if (doc.id === estufa.codigo) {
                codigoEncontrado = true;
            }
        });

        if (!codigoEncontrado) {
            const mensagemErro = 'O código de estufa fornecido não corresponde a nenhum dispositivo';
            console.log(mensagemErro);
            throw new Error(mensagemErro);
        }

        // Se não existir uma estufa com o mesmo código para o usuário e o código fornecido corresponder a um dispositivo,
        // prossegue com o cadastro da estufa
        await addDoc(estufasQuery, {
            nome: estufa.nome,
            codigo: estufa.codigo,
        });

        console.log('Estufa cadastrada com sucesso.');

        Alert.alert(
            "Sucesso",
            "Estufa cadastrada com sucesso!",
            [{ 
                text: "OK",
                onPress: () => {
                    navigation.navigate('MinhasEstufas');
                }
            }]
        );
        
    } catch (error) {
        console.error("Erro ao cadastrar estufa: ", error);
        Alert.alert(
            "Erro",
            error.message || "Ocorreu um erro ao tentar cadastrar a estufa. Por favor, tente novamente mais tarde.",
            [{ text: "OK" }]
        );
    }
};

export default cadastrarEstufa;
