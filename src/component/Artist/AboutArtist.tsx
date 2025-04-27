import { useAppDispatch, useAppSelector } from "@music/hook/hook"
import { artistProfileData } from "@music/store/slice/artistDetailsSlice"
import axios from "axios"
import { useEffect } from "react"
import { ActivityIndicator, StyleSheet, Text, View } from "react-native"

interface IAboutArtist {
  id: string
}

const AboutArtist = (props: IAboutArtist) => {
  const dispatch = useAppDispatch()
  const { artistProfile, isArtistProfileLoading } = useAppSelector(
    (state) => state.artistDetailStore,
  )

  useEffect(() => {
    // dispatch(artistProfileData(props?.id))
  }, [])

  console.log(" props.id", props.id)

  console.log(" props.artistProfile", artistProfile)

//   if (isArtistProfileLoading) {
//     return <ActivityIndicator />
//   }
  return (
    <View>
      <Text>AboutArtist</Text>
    </View>
  )
}

export default AboutArtist

const styles = StyleSheet.create({})
