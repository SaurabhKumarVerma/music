import {
  ImageContentFit,
  ImageContentPositionObject,
  ImageSource,
  ImageStyle,
  ImageTransition,
} from "expo-image"
import { ViewStyle } from "react-native"

export interface IMusicImage {
  source: ImageSource | string | number | ImageSource[] | string[] | null
  placeholder?: ImageSource | string | number | ImageSource[] | string[] | null
  contentFit?: ImageContentFit
  transition?: ImageTransition | number | null
  priority?: "low" | "normal" | "high" | null
  cachePolicy?: "none" | "disk" | "memory" | "memory-disk"
  style?: ImageStyle
  contentPosition?: ImageContentPositionObject
  // onLoad?:(event: NativeSyntheticEvent<ImageLoadEventData>) => void
}

export interface IIcon {
  name: string
  size: number
  color: string
  style?: ViewStyle
}
