import { StyleSheet, View } from "react-native"
import Svg, { Path } from "react-native-svg"

const VolumeDown = () => {
  return (
    <View>
      <Svg width="20" height="20" viewBox="0 0 9 12" fill="none">
        <Path
          d="M7.98296 12C8.56688 12 9 11.6036 9 11.0687V0.960537C9 0.425668 8.56688 0 7.97082 0C7.58852 0 7.30033 0.143305 6.88425 0.50654L3.90979 3.0645C3.8639 3.10009 3.81536 3.12001 3.7524 3.12001H1.72103C0.609523 3.12001 0 3.69593 0 4.77417V7.2349C0 8.31767 0.609523 8.89116 1.72103 8.89116H3.75011C3.81078 8.89116 3.86161 8.90474 3.9075 8.94035L6.88425 11.5227C7.26884 11.857 7.5869 12 7.98296 12Z"
          fill="#A4A3A3"
          fillOpacity="0.6"
        />
      </Svg>
    </View>
  )
}

export default VolumeDown

const styles = StyleSheet.create({})
