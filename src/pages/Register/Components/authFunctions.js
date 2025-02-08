import { Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../../Services/firebaseConfig';
import { collection, addDoc, setDoc, doc } from "firebase/firestore";

export const handleCreateUser = (email, password, navigation,name) => {
    const authInstance = getAuth();

    createUserWithEmailAndPassword(authInstance, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const uid = user.uid;

            const userRef = doc(db, 'usuarios', uid)


            // Criar um documento para o usuário no Firestore
            setDoc(userRef,{
                Nome: name,
                Email: user.email,
                // Você pode adicionar outros campos aqui, se necessário
            })
            .then(() => {
                Alert.alert(
                    "Sucesso",
                    "Registro bem-sucedido!",
                    [
                        {
                            text: "Entrar",
                            onPress: () => {
                                navigation.navigate('SignIn');
                            }
                        }
                    ]
                );
            })
            .catch((error) => {
                console.error("Erro ao adicionar documento: ", error);
                Alert.alert(
                    "Falha no registro",
                    "Ocorreu um erro ao tentar criar o usuário. Por favor, tente novamente mais tarde.",
                    [
                        {
                            text: "OK",
                        }
                    ]
                );
            });
        })
        .catch((error) => {
            console.error("Erro ao criar usuário: ", error);
            const errorCode = error.code;
            const errorMessage = error.message;

            Alert.alert(
                "Falha no registro",
                "Por favor, verifique os dados e tente novamente.",
                [
                    {
                        text: "Tentar novamente",
                    }
                ]
            );
        });
};
