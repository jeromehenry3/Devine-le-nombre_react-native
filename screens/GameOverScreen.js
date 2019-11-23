import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';

import colors from '../constants/colors';

const GameOverScreen = props => {

    return (
        <ScrollView>
            <View style={styles.screen}>
                <BodyText>La partie est terminée !</BodyText>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        fadeDuration={800}
                        resizeMode='cover'
                        // source={require('../assets/img/success.png')}
                        source={{uri: 'https://www.ternelia.com/sites/default/files/styles/crop_1400x688/public/landing_page/banniere-groupe-montagne.jpg'}}
                    />
                </View>
                <BodyText>Nombre d'essais: <Text style={styles.highlight}>
                    {props.roundsNumber}
                </Text></BodyText>
                <BodyText>Le nombre était : <Text style={styles.highlight}>
                    {props.userNumber}
                </Text></BodyText>
                <MainButton title='Nouvelle partie' onPress={props.onRestart}>Nouvelle partie</MainButton>
            </View>
        </ScrollView>
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
    },
    highlight: {
        color: colors.primary,
        fontFamily: 'open-sans-bold',
        marginBottom: 5,
    }
})

export default GameOverScreen;