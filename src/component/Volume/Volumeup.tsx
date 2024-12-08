import { StyleSheet } from "react-native"
import Animated, {
  SharedValue,
} from "react-native-reanimated"
import Svg, { Path } from "react-native-svg"

interface IVolumeup {
  innerWidth: SharedValue<number>
}

const AnimatedPath = Animated.createAnimatedComponent(Path)

const Volumeup = (props: IVolumeup) => {

  return (
    <Svg width="30" height="30" viewBox="0 0 20 14" fill="none">
      <AnimatedPath
        d="M7.68381 13.2041C8.24821 13.2041 8.66299 12.7942 8.66299 12.2411V1.78925C8.66299 1.2362 8.24821 0.79606 7.67433 0.79606C7.2993 0.79606 7.02404 0.944238 6.62817 1.31982L3.75741 3.96473C3.71796 4.00156 3.6665 4.02215 3.60808 4.02215H1.65701C0.582113 4.02215 0 4.61763 0 5.73253V8.27695C0 9.39653 0.582113 9.98953 1.65701 9.98953H3.60588C3.66429 9.98953 3.71576 10.0036 3.75521 10.0404L6.62817 12.7106C6.99374 13.0562 7.29994 13.2041 7.68381 13.2041ZM11.1315 10.1308C11.4623 10.3411 11.8947 10.2668 12.1265 9.94024C12.7032 9.17067 13.047 8.10439 13.047 6.99319C13.047 5.88202 12.7032 4.82041 12.1265 4.04178C11.8947 3.71955 11.4623 3.63847 11.1315 3.85556C10.7518 4.09573 10.677 4.54585 10.9784 5.00839C11.3481 5.53999 11.5574 6.25162 11.5574 6.99319C11.5574 7.73478 11.3434 8.43955 10.9784 8.97801C10.6817 9.44303 10.7518 9.88596 11.1315 10.1308ZM14.0595 11.9985C14.4136 12.2138 14.848 12.128 15.0863 11.7777C16.0018 10.4737 16.5294 8.76263 16.5294 6.99319C16.5294 5.22377 16.0065 3.5033 15.0863 2.20651C14.848 1.8584 14.4136 1.77263 14.0595 1.98786C13.6788 2.21618 13.6283 2.67845 13.8982 3.09078C14.6243 4.16299 15.042 5.55315 15.042 6.99319C15.042 8.43325 14.6148 9.81186 13.8982 10.8934C13.633 11.3058 13.6788 11.7702 14.0595 11.9985ZM16.9931 13.885C17.3419 14.1046 17.7971 14.0032 18.0332 13.637C19.2663 11.7784 20 9.4945 20 6.99975C20 4.50249 19.2521 2.2258 18.0332 0.364677C17.7971 -0.00838068 17.3419 -0.102887 16.9931 0.116709C16.6165 0.347533 16.5619 0.803238 16.8179 1.21122C17.8724 2.82875 18.5199 4.81627 18.5199 6.99975C18.5199 9.17854 17.8724 11.1776 16.8179 12.7905C16.5619 13.1984 16.6165 13.652 16.9931 13.885Z"
        fill="#A4A3A3"
        fillOpacity="0.5"
      />
    </Svg>
  )
}

export default Volumeup

const styles = StyleSheet.create({})
