<template>
    <div class="container">
        <h1 class="text-center my-5 fw-bold display-5">Peliculas</h1>
    
        <div class="row">
            <div class="col-md-3 mb-5" v-for="pelicula in peliculas" :key="pelicula.id">
            <PeliculaCard 
                :pelicula="pelicula"
                @delete = "removePelicula"
            />
            </div>
        </div>
    </div>
    

</template>

<script setup>
    import { ref, onMounted } from 'vue'
    
    import { 
        getPeliculas,
        deletePelicula
    } from '@/services/peliculaService.js'

    import PeliculaCard from '@/components/PeliculaCard.vue';

    const peliculas = ref([])

    const loadData = async () => {
        peliculas.value = await getPeliculas()
    }

    onMounted(loadData)

    const removePelicula = async (id) => {
        if(!confirm('Seguro/a quieres eliminar esta pelicula')) return
        
        await deletePelicula(id)
        await loadData()
    }
    
</script>

<style scoped></style>