import React from 'react'
import Icon from '@music/utils/customIcon'
import { IIcon } from '@music/types/image.interface'

const MusicIcon = (props: IIcon) => {
  return (
    <Icon name={props.name} color={props.color as string } size={props.size || 12} style={props.style || {}}/>
  )
}

export default MusicIcon