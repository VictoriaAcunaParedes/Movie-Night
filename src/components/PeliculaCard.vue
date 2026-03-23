<template>
    <div class="card shadow-sm">
        <img class="card-img-top" :src="pelicula.poster" :alt="pelicula.nombre">
        <div class="card-body">
            <h5 class="card-title">
                {{ pelicula.nombre }}
            </h5>
            <p class="pelicula-year">
                {{ pelicula.year }}
            </p>
            <p class="small pelicula-info">
                <span class="me-3">🎭Actores: {{ pelicula.actores ? pelicula.actores.length : 0 }}</span>
                <span class="me-3">🎬Generos: {{ pelicula.generos ? pelicula.generos.length : 0 }}</span>
                <p>Donde Ver: {{ pelicula.plataformas ? pelicula.plataformas.length : 0 }}</p>
            </p>

        </div>
        <div class="card-footer text-center">
            <router-link :to="`/peliculas/${pelicula.id}`" class="btn btn-movie btn-sm me-2">Detalles</router-link>
            <router-link v-if="isAdmin" :to="`/admin/editar-pelicula/${pelicula.id}`" class="btn btn-movie btn-sm me-2">Editar</router-link>
            <button v-if="isAdmin" @click="$emit('delete', pelicula.id)" class="btn btn-movie-delete btn-sm">Eliminar</button>
        </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue'
    import { useStore } from 'vuex'

    const store = useStore()

    //estos 2 son filtros
    const isLogged = computed(() => !!store.state.user)
    const isAdmin = computed(() => store.state.rol === 'admin') 


    const props = defineProps({
        pelicula: Object
    })

    const emit = defineEmits([
        'edit',
        'delete'
    ])
</script>

<style scoped>
    .card {
        background-color: #1e293b;
        border: none;
        border-radius: 12px;
        overflow: hidden;
        transition: transform 0.25s ease;
    }

    .card:hover {
        transform: scale(1.05);
    }

    .card-img-top {
        height: 350px;
        object-fit: cover;
    }

    .card-body {
        color: #f9fafc;
    }

    .pelicula-year {
    color: #94a3b8;
    font-weight: 500;
    }

    .pelicula-info {
        color: #cbd5e1;
    }
</style>