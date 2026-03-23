import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

import ActorsView from '@/views/admin/ActorsView.vue'
import GenerosView from '@/views/admin/GenerosView.vue'
import PeliculasView from '@/views/PeliculasView.vue'
import DetallePelicula from '@/views/DetallePelicula.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import NuevaPeliculaView from '@/views/admin/NuevaPeliculaView.vue'
import EditarPeliculaView from '@/views/admin/EditarPeliculaView.vue'
import PlataformasView from '@/views/admin/PlataformasView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/peliculas'
    },
      {
      path: '/peliculas',
      component: PeliculasView
    },
    {
      path: '/peliculas/:id',
      component: DetallePelicula
    },
    {
      path: '/login',
      component: LoginView
    },
    {
      path: '/register',
      component: RegisterView
    },
    //Rutas admin 
    {
      path: '/admin/nueva-pelicula',
      component: NuevaPeliculaView,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin/editar-pelicula/:id',
      component : EditarPeliculaView,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin/actors',
      component: ActorsView,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin/generos',
      component: GenerosView,
      meta: { requiresAuth: true, requiresAdmin: true  }
    },
    {
      path: '/admin/plataformas',
      component: PlataformasView,
      meta: { requiresAuth: true, requiresAdmin: true  }
    },
  ],
})

router.beforeEach((to) => {
  const user = store.state.user
  const rol = store.state.rol

  if (to.meta.requiresAuth && !user) {
    return { path: '/login' }
  }
  if (to.meta.requiresAdmin && rol !== 'admin') {
    return { path: '/peliculas'}
  }
})

export default router
