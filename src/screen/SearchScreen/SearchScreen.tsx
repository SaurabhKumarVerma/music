import { StyleSheet, View } from "react-native"
import Search from "../../component/Search/Search"
import { color } from "@music/theme/color"

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <Search />
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
