<template>
    <div class="margen" v-if="pelicula">
        <h2 class="text-center my-5 py-5 display-3 fw-bold">🍿 {{ pelicula.nombre }} 🍿</h2>
        <div class="row justify-content-center mb-5">
            <div class=col-lg-10>
                <div class="card movie-card p-4">
                    <div class="row align-items-center g-5">
                        <div class="col-md-4">
                            <img :src="pelicula.poster" :alt="pelicula.nombre" class="poster-img">
                        </div>
                        <div class="col-md-8">
                            <p class="fs-2 mb-4"><strong>Estreno:</strong> {{ pelicula.year }}</p>
                            <div class="mb-4">
                                <h5 class="fw-bold"><i class="fas fa-user me-2"></i>Full Cast</h5>
                                <ul class="movie-list">
                                    <li v-for="actor in getNombreActores()" :key="actor">
                                        {{ actor }}
                                    </li>
                                </ul>
                            </div>
                            <div class="mb-4">
                                <h5 class="fw-bold"><i class="fas fa-clapperboard me-2"></i>Generos</h5>
                                <ul class="movie-list">
                                    <li v-for="genero in getNombreGeneros()" :key="genero">
                                        {{ genero }}
                                    </li>
                                </ul>
                            </div>
                            <div class="mb-4">
                                <h5 class="fw-bold"><i class="fas fa-video me-2"></i>Donde Ver</h5>
                                <ul class="movie-list">
                                    <li v-for="plataforma in getNombrePlataformas()" :key="plataforma">
                                        {{ plataforma }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center">
            <button @click="volver" class="btn btn-dark">Volver</button>
        </div>
    </div>
    <div v-else>
        <h5 class="text-center display-3 my-5">No existe la pelicula.</h5>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';

//colecciones de datos
import { getPeliculas } from '@/services/peliculaService.js';
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

const loadData = async () => {
    const peliculas = await getPeliculas()
    pelicula.value = peliculas.find(p => p.id === route.params.id)
    actores.value = await getActores()
    generos.value = await getGeneros()
    plataformas.value = await getPlataformas()
}

onMounted(loadData)

const getNombreActores = () => {
    if (!pelicula.value.actores) return []

    return actores.value
        .filter(actor => pelicula.value.actores.includes(actor.id))
        .map(actor => actor.nombre)
}

const getNombreGeneros = () => {
    if (!pelicula.value.generos) return []

    return generos.value
        .filter(genero => pelicula.value.generos.includes(genero.id))
        .map(genero => genero.nombre)
}

const getNombrePlataformas = () => {
    if (!pelicula.value.plataformas) return []

    return plataformas.value
        .filter(plataforma => pelicula.value.plataformas.includes(plataforma.id))
        .map(plataforma => plataforma.nombre)
}

</script>

<style scoped>
.margen {
    margin-bottom: 100px;
}

.poster-img {
    width: 100%;
    border-radius: 10px;
}

.movie-list {
    list-style: none;
    padding: 0;
}

.movie-list li {
    padding: 8px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.movie-card {
        background-color: #1e293b;
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 12px;
        color: #679c7f;
    }

    .movie-card h5 {
        color: #b9c6f1;
        margin-bottom: 15px;
    }

    i {
        color: #cbd5e1;
    }
</style>