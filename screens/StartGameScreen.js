import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Card from '../components/Card'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer';
import Colors from '../constants/colors';

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const[selectedNumber, setSelectedNumber] = useState('');

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    }
    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };
    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (chosenNumber === NaN || chosenNumber <= 0 || chosenNumber > 99) {
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
            <Text>Nombre choisi :</Text>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <Button title='Démarrer la partie' color={Colors.primary}></Button>
        </Card>
        )
    }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.screen}>
                <Text>Nouvelle partie</Text>
                <Card style={styles.card}>
                    <Text>Choisissez un nombre</Text>
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
                        <View style={styles.button}>
                            <Button title="Remise à zéro" onPress={resetInputHandler} color={Colors.secondary}></Button>
                        </View>
                        <View style={styles.button}>
                            <Button title="Confirmer" onPress={confirmInputHandler} color={Colors.primary}></Button>
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
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
        width: 300,
        maxWidth: '85%',
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
    button: {
        width: 120,
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    summaryContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    }
});

export default StartGameScreen;