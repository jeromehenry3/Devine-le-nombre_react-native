import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props => (
    <View style={{...styles.card, ...props.style}}>{props.children}</View>
);

const styles = StyleSheet.create({
    card: {
        paddingVertical: 30,
        alignItems: 'center',
        shadowColor: 'black', // ios
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 5, //android
        backgroundColor: 'white',
        borderRadius: 10,
    }
})

export default Card;