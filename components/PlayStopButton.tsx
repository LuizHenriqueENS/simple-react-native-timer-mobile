import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props ={
    onPress: () => void;
    isDisable: boolean
}

export default function PlayStopButton({onPress, isDisable} : Props) {
   return (
        <View>
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <View style={{alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons color={!isDisable ? 'black' : 'red'} name={!isDisable ? 'play-circle' : 'pause-circle'} style={styles.iconStyle} size={70} />
                    <Text style={{fontSize: 10}}>{!isDisable ? 'Iniciar' : 'Pausar'}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red',
        padding: 4
    },
    iconStyle: {
        // color: 'black',
    },
    disableButton:{
        color: "#ccc"
    }
})