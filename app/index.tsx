import MinusButton from "@/components/MinusButton";
import PlayStopButton from "@/components/PlayStopButton";
import PlusButton from "@/components/PlusButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [time, setTime] = useState(new Date(2025, 5, 14, 0, 0, 0))
  const [timer, setTimer] = useState(false)

  useEffect(() => {
    if (!timer) return

    const intervalo = setInterval(() => {
      setTime(prev => {

        if (prev.getHours() <= 0 && prev.getMinutes() <= 0 && prev.getSeconds() <= 0) {
          setTimer(false)
          return new Date(2025, 5, 14, 0, 0, 0)
        }

        const newTime = new Date(prev)
        newTime.setSeconds(newTime.getSeconds() - 1)
        return newTime
      })

    }, 1000)

    return () => {
      clearInterval(intervalo)
    }
  }, [timer])

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.fontStyle}>{time.toLocaleTimeString()}</Text>
        <Ionicons name="stopwatch-sharp" color={'black'} size={90} />
          </View>
        <View style={[{ gap: 4, flexDirection: "row" }]}>
          <MinusButton onPress={() => setTime(changeTimerSeconds(time, false))} />
          <PlayStopButton isDisable={timer} onPress={() => {
            if (!timer) setTimer(true)
            else setTimer(false)
          }} />
          <PlusButton onPress={() => setTime(changeTimerSeconds(time, true))} />
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Ionicons name="logo-github" size={26} />
        <Link href="https://github.com/luizhenriqueens" style={{ color: '#0000FF', fontSize: 22, fontStyle: 'italic' }}>GitHub</Link>
      </View>
    </SafeAreaView>
  );
}

function changeTimerSeconds(pt: Date, increaseTime: boolean) {
  const newTime = new Date(pt)

  if (increaseTime) {
    newTime.setSeconds(newTime.getSeconds() + 10)
  } else {
    if (pt.getHours() <= 0 && pt.getMinutes() <= 0 && pt.getSeconds() <= 0)
      return new Date(2025, 5, 14, 0, 0, 0)
    newTime.setSeconds(newTime.getSeconds() - 10)
  }

  return newTime
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  fontStyle: {
    fontSize: 22,
    fontWeight: 900,
    color: '#000'
  }
})
