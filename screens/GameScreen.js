import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';

import DefaultStyles from '../constants/default-styles';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rnd = Math.floor(Math.random() * (max - min) + min);
    if (rnd === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rnd;
    }
}

const renderListItem = (listLength, itemData) => (
    <View key={itemData} style={styles.listItem}>
        <Text>#{listLength - itemData.index}</Text>
        <Text>{ itemData.item }</Text>
    </View>)


const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const currentLow = useRef(1);
    const currentHigh = useRef(99);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess,])

    const nextGuessHandler = direction => {
        if (direction === 'lower' && currentGuess < userChoice
            || direction === 'greater' && currentGuess > userChoice) {
                Alert.alert(`Ne mens pas`, `Tu sais bien que ce n'est pas vrai`, [{
                    text: 'Désolé !', style: 'cancel'
                }]);
                return;
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess;

        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber);
        // setRounds(currentRounds => currentRounds + 1);
        setPastGuesses(curpast => [nextNumber.toString(), ...curpast])
    }

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.bodyText}>Tentative :</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={() => nextGuessHandler('lower')}>
                    <Ionicons name='md-remove' size={24} color='white' />
                </MainButton>
                <MainButton onPress={() => nextGuessHandler('greater')}>
                    <Ionicons name='md-add' size={24} color='white' />
                </MainButton>
            </Card>
            <View style={{width: '60%', flex: 1}}>
                {/* <ScrollView contentContainerStyle={styles.list} >
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView> */}
                <FlatList
                    keyExtractor={item => item}
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                    contentContainerStyle={styles.list}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        // marginTop: 20,
        marginTop: Dimensions.get('window').height > 600 ? 30 : 5,
        width: 400,
        maxWidth: '90%',
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    list: {
        // alignItems: 'center',
        justifyContent: 'flex-end',
        flexGrow: 1,
    }
});

export default GameScreen;