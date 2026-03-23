<template>
    <form @submit.prevent="submitForm" class="mb-5 card p-4 shadow">
        <div class="mb-3">
            <label class="form-label">Nombre</label>
            <input type="text" class="form-control" v-model="nombre" required>
        </div>
        <div class="mb-3">
            <label class="form-label">Año</label>
            <input type="number" class="form-control" v-model.number="year" required>
        </div>
        <div class="mb-3">
            <label class="form-label">Poster</label>
            <input type="text" class="form-control" v-model="poster" required>
        </div>
        <div class="mb-3">
            <label class="form-label">Actores</label>
            <select class="form-control" multiple size="10" v-model="actoresSeleccionados">
                <option v-for="actor in actores" :key="actor.id" :value="actor.id">
                    {{ actor.nombre }}
                </option>
            </select>
        </div>
        <div class="mb-3">
            <label class="form-label">Generos</label>
            <select class="form-control" multiple size="10" v-model="generosSeleccionados">
                <option v-for="genero in generos" :key="genero.id" :value="genero.id">
                    {{ genero.nombre }}
                </option>
            </select>
        </div>
        <div class="mb-3">
            <label class="form-label">Plataformas</label>
            <select class="form-control" multiple size="10" v-model="plataformasSeleccionados">
                <option v-for="plataforma in plataformas" :key="plataforma.id" :value="plataforma.id">
                    {{ plataforma.nombre }}
                </option>
            </select>
        </div>
        <button class="btn btn-movie">Guardar</button>

    </form>
</template>

<script setup>
    import { ref, watch } from 'vue'

    const props = defineProps({
        pelicula: Object,
        actores: Array,
        generos: Array,
        plataformas: Array
    })

    const emit = defineEmits(['guardar'])

    const nombre = ref('')
    const poster = ref('')
    const year = ref(null)
    const actoresSeleccionados = ref([])
    const generosSeleccionados = ref([])
    const plataformasSeleccionados = ref([])

    watch(() => props.pelicula, (nuevaPelicula) => {
        if(nuevaPelicula) {
            nombre.value = nuevaPelicula.nombre
            poster.value = nuevaPelicula.poster
            year.value = nuevaPelicula.year
            actoresSeleccionados.value = nuevaPelicula.actores || []
            generosSeleccionados.value = nuevaPelicula.generos || []
            plataformasSeleccionados.value = nuevaPelicula.plataformas || []
        } else {
            nombre.value = ''
            poster.value = ''
            year.value = null
            actoresSeleccionados.value = []
            generosSeleccionados.value = []
            plataformasSeleccionados.value = []
        }
    }, { immediate: true })

    const resetForm = () => {
        nombre.value = ''
        poster.value = ''
        year.value = null
        actoresSeleccionados.value = []
        generosSeleccionados.value = []
        plataformasSeleccionados.value = []
    }

    const submitForm = () => {
        emit('guardar', {
            nombre: nombre.value,
            poster: poster.value,
            year: year.value,
            actores: actoresSeleccionados.value,
            generos: generosSeleccionados.value,
            plataformas: plataformasSeleccionados.value
        })
        if (!props.pelicula) {
            resetForm()
        }  
    }
</script>

<style scoped>
    .card {
        background-color: #1e293b;
        border: 1px solid rgba(255,255,255,0.08);
        color: #f8fafc;
    }

    .form-control {
        background-color: #172033;
        border: 1px solid rgba(255,255,255,0.08);
        color: #f8fafc;
    }

    .form-control:focus {
        background-color: #172033;
        border-color: #273449;
        color: #f8fafc;
        box-shadow: none;
    }
</style>