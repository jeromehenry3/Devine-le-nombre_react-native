import React, { useState, useEffect } from 'react';
import { View, 
    StyleSheet,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView,
    DeviceEventEmitter
} from 'react-native';
import Card from '../components/Card'
import BodyText from '../components/BodyText';
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';

import Colors from '../constants/colors';

const StartGameScreen = ({onStartGame}) => {
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 3)
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const[selectedNumber, setSelectedNumber] = useState('');

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    }
    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
        console.log(Dimensions.get('window'))
    };

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 3);
        }
        
        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        }
    });

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Nombre invalide', 'le nombre doit être compris entre 1 et 99', [{text: 'Ok', style: 'destructive', onPress: resetInputHandler}])
            return;
        }
        setSelectedNumber(chosenNumber);
        setConfirmed(true);
        setEnteredValue('');
        Keyboard.dismiss();
    }

    let confirmedOutput;
    if (confirmed) {
        confirmedOutput = (
        <Card style={styles.summaryContainer}>
            <BodyText>Nombre choisi :</BodyText>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <MainButton
                onPress={() => onStartGame(selectedNumber)}
            >Démarrer la partie</MainButton>
        </Card>
        )
    }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView>
            	<KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={30}>
            		<View style={styles.screen}>
            		    <BodyText style={styles.title}>Nouvelle partie</BodyText>
            		    <Card style={styles.card}>
            		        <BodyText>Choisissez un nombre</BodyText>
            		        <Input
            		        onChangeText={numberInputHandler}
            		        value={enteredValue}
            		        placeholder='e.g. 12'
            		        blurOnSubmit
            		        autoCapitalize='none'
            		        autoCorrect={false}
            		        keyboardType='number-pad'
            		        maxLength={2}
            		        style={styles.input}
            		        />
            		        <View style={styles.buttonContainer}>
            		            <View style={{width: buttonWidth}}>
            		                <Button title="Remise à zéro" onPress={resetInputHandler} color={Colors.secondary}></Button>
            		            </View>
            		            <View style={{width: buttonWidth}}>
            		                <Button title="Confirmer" onPress={confirmInputHandler} color={Colors.primary}></Button>
            		            </View>
            		        </View>
            		    </Card>
            		    {confirmedOutput}
            		</View>
            	</KeyboardAvoidingView>
            </ScrollView>
        </TouchableWithoutFeedback>
    );

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    card: {
        marginTop: 20,
        width: '80%',
        maxWidth: '95%',
        minWidth: 300,
    },
    input: {
        width: 100,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: "row",
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold',
        color: Colors.secondary,
    },
    summaryContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    }
});

export default StartGameScreen;