import React from 'react';
import { View, StyleSheet, Button, Image } from 'react-native';
import BodyText from '../components/BodyText';


const GameOverScreen = props => {

    return (
        <View style={styles.screen}>
            <BodyText>La partie est terminée !</BodyText>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    resizeMode='cover'
                    source={require('../assets/img/success.png')}
                />
            </View>
            <BodyText>Nombre d'essais: {props.roundsNumber}</BodyText>
            <BodyText>Le nombre était : {props.userNumber}</BodyText>
            <Button title='Nouvelle partie' onPress={props.onRestart} />
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        width: 200,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 25,
    },
    image: {
        width: '100%',
        height: '100%',
    }
})

export default GameOverScreen;