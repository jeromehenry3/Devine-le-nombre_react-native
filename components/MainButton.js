import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import Colors from '../constants/colors';

const MainButton = props => (
    <TouchableOpacity activeOpacity={.6} onPress={props.onPress}>
        <View style={styles.button}>
            <Text style={styles.buttonText}>{ props.children }</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 15,
        elevation: 6,
    },
    buttonText: {
        color: '#fff',
        fontFamily: 'open-sans',
        fontSize: 18,
        textTransform: 'uppercase',
    }
});
export default MainButton;