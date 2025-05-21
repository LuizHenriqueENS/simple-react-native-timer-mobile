import MinusButton from "@/components/MinusButton";
import PlayStopButton from "@/components/PlayStopButton";
import PlusButton from "@/components/PlusButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [time, setTime] = useState(zeroHour())
  const [timer, setTimer] = useState(false)

  // Start the timer if the play button is pressed
  useEffect(() => {
    if (!timer) return

    const intervalo = setInterval(() => {
      setTime(prev => {
        const newTime = new Date(prev)
        newTime.setSeconds(newTime.getSeconds() - 1)
        return newTime
      })

    }, 1000)

    return () => {
      clearInterval(intervalo)
    }
  }, [timer])


  // Check if the time is 00:00:00
  useEffect(() => {
    if ((isZeroHour(time)) || time.getHours() >= 23) {
      setTimer(false)
      setTime(zeroHour())
    }

  }, [time.getSeconds()])


  return (
    <SafeAreaView style={[styles.container]}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.fontStyle}>{time.toLocaleTimeString()}</Text>
          <Ionicons name="stopwatch-sharp" color={'black'} size={90} />
        </View>
        <View style={[{ gap: 4, flexDirection: "row" }]}>
          <MinusButton onPress={() => setTime(changeTimerSeconds(time, false))} />
          <PlayStopButton isDisable={timer} onPress={() => {
            if (isZeroHour(time)) return
            if (!timer)
              setTimer(true)
            else
              setTimer(false)
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
    newTime.setSeconds(newTime.getSeconds() - 10)
    
    if ((isZeroHour(newTime)) || newTime.getHours() >= 23)
      return zeroHour()
  }

  return newTime
}


function isZeroHour(time: Date) {
  return time.getHours() <= 0 && time.getMinutes() <= 0 && time.getSeconds() <= 0
}

function zeroHour() {
  return new Date(2025, 5, 14, 0, 0, 0)
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
