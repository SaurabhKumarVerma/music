import { Image } from "expo-image"
import { IMusicImage } from "@music/types/image.interface"

const MusicImage = (props: IMusicImage) => {
  // const {placeholder, ...rest} = props
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj["
  return <Image {...props} cachePolicy={"memory"} />
}

export default MusicImage
