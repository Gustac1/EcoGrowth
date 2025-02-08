import { collection, addDoc, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
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

        // Referência para o documento de administradores
        const administradoresRef = doc(db, `Dispositivos/${estufa.codigo}/Usuarios/Administradores`);
        // Referência para o documento de membros
        const membrosRef = doc(db, `Dispositivos/${estufa.codigo}/Usuarios/Membros`);

        // Verifica se o documento de administradores já existe
        const administradoresDoc = await getDoc(administradoresRef);

        if (administradoresDoc.exists()) {
            console.log('O documento de administradores já existe:', administradoresDoc.data());

            // Adiciona o usuário como membro
            await setDoc(membrosRef, {
                [user.uid]: {
                    nome: user.displayName, // ou qualquer outro campo que identifique o usuário
                }
            }, { merge: true });
        } else {
            console.log('O documento de administradores não existe.');

            // Define o usuário como administrador caso o documento não exista
            await setDoc(administradoresRef, {
                [user.uid]: {
                    nome: user.displayName, // ou qualquer outro campo que identifique o usuário
                }
            });
        }

        // Adiciona a estufa ao usuário
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