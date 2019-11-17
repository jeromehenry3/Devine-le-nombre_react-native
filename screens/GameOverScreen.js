import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GameOverScreen = () => {

    return (
        <View style={styles.screen}>
            <Text>La partie est terminée !</Text>
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