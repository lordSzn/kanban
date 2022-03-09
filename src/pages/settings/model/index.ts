import { createStore } from 'effector'
import { menuSettings } from '../data/menu-lists'

export const $menuList = createStore(menuSettings)
