import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';


const GameOverScreen = props => {

    return (
        <View style={styles.screen}>
            <Text>La partie est terminée !</Text>
            <Text>Nombre d'essais: {props.roundsNumber}</Text>
            <Text>Le nombre était : {props.userNumber}</Text>
            <Button title='Nouvelle partie' onPress={props.onRestart} />
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default GameOverScreen;