import {reactive, ref} from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import type {Popup} from "@/models/Popup";
export const usePopupStore = defineStore('popupStore', () => {

    const popUp: Popup = reactive({
        popupIsOpen: false,
        popupHeading: "",
        popupText: ""
    })


    return { popUp }
})
