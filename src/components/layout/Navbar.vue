<template>
    <nav class="navbar navbar-expand-lg bg-blue" data-bs-theme="dark">
        <div class="container">
            <router-link class="navbar-brand fw-bold" to="/peliculas"><i class="fas fa-film"></i> Movie Night</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav mx-auto">
                    <router-link class="nav-link active"  aria-current="page" to="/peliculas">Peliculas</router-link>
                    <router-link v-if="isAdmin" class="nav-link" to="/admin/actors">Actores</router-link>
                    <router-link v-if="isAdmin" class="nav-link" to="/admin/generos">Generos</router-link>
                    <router-link v-if="isAdmin" class="nav-link" to="/admin/plataformas">Plataformas</router-link>
                    <router-link v-if="isAdmin" class="nav-link" to="/admin/nueva-pelicula">Nueva Pelicula</router-link>
                </div>
                <div class="navbar-nav ms-auto">
                    <template v-if="!user">
                        <router-link to="/login" class="nav-link">Login</router-link>
                        <router-link to="/register" class="nav-link">Register</router-link>
                    </template>
                    <template v-else>
                        <span class=" nav-link me-3"><strong>Bienvenido: </strong>{{ nombre }}</span>
                        <button @click="cerrarSesion" class="btn btn-outline-light">Cerrar Sesion</button>
                    </template>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
    import { computed } from 'vue';
    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router';
    import { logout } from '@/services/authService';

    const store = useStore()
    const router = useRouter()

    const user = computed(() => store.state.user)

    const isAdmin = computed(() => store.state.rol === 'admin')

    const nombre = computed(() => {
        return store.state.userProfile?.nombre || ''
    })

    const cerrarSesion = async () => {
        await logout()
        store.commit('logout')
        router.push('/login')
    }
</script>

<style scoped>
    .bg-blue {
        background-color: #020617;
    }

</style>