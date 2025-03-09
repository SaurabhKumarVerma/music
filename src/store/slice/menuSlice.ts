import { IMenuData } from "@music/types/type"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface IMusicMenu<T> extends IMenu<T> {
  isActive: boolean
  xPosition: number
  yPosition: number
  menuData: T[]
}

interface IMenu<T> {
  menuData: T[]
}

const initialState: IMusicMenu<unknown> = {
  isActive: false,
  xPosition: 0,
  yPosition: 0,
  menuData: [],
}

const menuStore = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setIsMenuActive: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload
    },
    setIsMenuClose: (state) => {
      state.isActive = false
    },
    setMenuPosition: (state, action: PayloadAction<number>) => {
      //   state.xPosition = action.payload
      state.yPosition = action.payload
    },
    setMenuData: (state, action: PayloadAction<IMenu<IMenuData>>) => {
      state.menuData = action.payload
    },
  },
})

export const { setIsMenuActive, setIsMenuClose, setMenuPosition, setMenuData } = menuStore.actions
export default menuStore.reducer
