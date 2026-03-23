<template>
    <div class="container">
        <h2 class="text-center my-5">Agregar nueva pelicula</h2>
        <PeliculaForm 
            v-if="isAdmin"
            :actores="actores"
            :generos="generos"
            :plataformas="plataformas"
            @guardar="guardarPelicula"
        />
    </div>
</template>

<script setup>
    import { ref, onMounted, computed } from 'vue'
    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router';

    import PeliculaForm from '@/components/PeliculaForm.vue';

    import { createPelicula } from '@/services/peliculaService.js'

    import { getActores } from '@/services/actorService';
    import { getGeneros } from '@/services/generoService';
    import { getPlataformas } from '@/services/plataformaService';

    const store = useStore()
    const router = useRouter()

    const isAdmin = computed(() => store.state.rol === 'admin')

    const actores = ref([])
    const generos = ref([])
    const plataformas = ref([])

    const loadData = async () => {
        actores.value = await getActores()
        generos.value = await getGeneros()
        plataformas.value = await getPlataformas()
    }

    onMounted(loadData)

    const guardarPelicula = async (pelicula) => {
        await createPelicula(pelicula)
        router.push('/peliculas')
        await loadData()
    }




</script>

<style scoped></style>