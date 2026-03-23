import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { VueFire, VueFireFirestoreOptionsAPI } from 'vuefire'
import { firebaseApp } from './firebase/firebase'
import store from './store'
import { onAuthStateChanged } from 'firebase/auth'
import { getUserProfile } from './services/authService'
import { auth } from './firebase/firebase'


//CSS de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

//JS de Bootstrap
import 'bootstrap'

//CSS de Fontawesome
import '@fortawesome/fontawesome-free/css/all.min.css'

//CSS propio
import './assets/css/main.css'

import * as bootstrap from 'bootstrap'


const app = createApp(App)

app.use(router)
app.use(store)

app.use(VueFire, {
    firebaseApp,
    modules: [
        VueFireFirestoreOptionsAPI()
    ]
})

onAuthStateChanged(auth, async (user) => {
    if (user) {
        store.commit('setUser', user)
        const profile = await getUserProfile(user.uid)
        if (profile) {
            store.commit('setUserProfile', profile)
            store.commit('setRol', profile.rol)
        }
    } else {
        store.commit('logout')
    }
})

app.mount('#app')

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
tooltipTriggerList.forEach(el => new bootstrap.Tooltip(el))
