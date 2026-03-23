<template>
    <div class="container">
        <h2 class=" text-center my-5"> Editar Pelicula</h2>
        <p v-if="pelicula" class="text-center text-info mb-5 fs-4">
            {{ pelicula.nombre }}
        </p>

        <PeliculaForm
            v-if="pelicula"
            :pelicula="pelicula"
            :actores="actores"
            :generos="generos"
            :plataformas="plataformas"
            @guardar="actualizarPelicula"
        />

    </div>
    <div class="text-center mb-5">
        <button @click="volver" class="btn btn-dark">Volver</button>
    </div>
</template>

<script setup>
    import PeliculaForm from '@/components/PeliculaForm.vue';
    import { ref, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    import {
        updatePelicula,
        getPeliculas
    } from '@/services/peliculaService.js'

    import { getActores } from '@/services/actorService';
    import { getGeneros } from '@/services/generoService';
    import { getPlataformas } from '@/services/plataformaService';

    const route = useRoute()
    const router = useRouter()

    const volver = () => {
    router.back()
}

    const pelicula = ref(null)
    const actores = ref([])
    const generos = ref([])
    const plataformas = ref([])


    const id = route.params.id

    const loadData = async () => {
        const peliculas = await getPeliculas()
        pelicula.value = peliculas.find(p => p.id == id)

        actores.value = await getActores()
        generos.value = await getGeneros()
        plataformas.value = await getPlataformas()

    }

    onMounted(loadData)

    const actualizarPelicula = async(datos) => {
        await updatePelicula(id, datos)
        alert('Pelicula actualizada')
        router.push('/peliculas')
    }
</script>
<style scoped>

</style>