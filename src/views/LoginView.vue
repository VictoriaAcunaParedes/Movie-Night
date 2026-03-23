<template>
    <div class="row justify-content-center">
        <div class="col-md-4">
            <h2 class="mb-5 text-center">Iniciar Sesion</h2>
            <form @submit.prevent="iniciarSesion">
                <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-control" v-model="email" required>
                </div>
                <div class="mb-5">
                    <label class="form-label">Password</label>
                    <input type="password" class="form-control" v-model="password" required>
                </div>
                <button class="btn btn-movie w-100 mb-5">Iniciar Sesion</button>
            </form>

        </div>

    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router';
    import { login, getUserRol, getUserProfile } from '../services/authService'

    const store = useStore()
    const router = useRouter()

    const email = ref('')
    const password = ref('')

    const iniciarSesion = async () => {
        try {
            const user = await login(email.value, password.value)

            store.commit('setUser', user)

            const rol = await getUserRol(user.uid)

            store.commit('setRol', rol)

            const profile = await getUserProfile(user.uid)

            store.commit('setUserProfile', profile)

            router.push('/peliculas')
        } catch (error) {
            alert(error.message)
        }
    }
</script>

<style scoped></style>