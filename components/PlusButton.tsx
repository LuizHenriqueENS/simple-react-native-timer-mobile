import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'


type Props = {
    onPress: () => void
}

export default function PlusButton({ onPress }: Props) {
    return (
        <View>
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <View style={{alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons name='add-circle' style={styles.iconStyle} />
                    <Text style={{fontSize: 10}}>10 seg</Text>
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
        color: 'black',
        fontSize: 70
    }
})