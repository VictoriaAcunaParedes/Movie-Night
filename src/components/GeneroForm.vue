<template>
    <form @submit.prevent="submitForm" class="mb-5">
        <div class="mb-3">
            <label class="form-label">Nombre</label>
            <input type="text" class="form-control" v-model="nombre" required>
        </div>
        <button class="btn btn-movie">Guardar</button>
    </form>
</template>

<script setup>
    import { ref, watch } from 'vue'

    const props = defineProps({
        genero: Object
    })

    const emit = defineEmits(['guardar'])

    const nombre = ref('')

    watch(() => props.genero, (newGenero) => {
        if(newGenero) {
            nombre.value = newGenero.nombre
        }
    })

    const resetForm = () => nombre.value = ''

    const submitForm = () => {
        emit('guardar', {
            nombre: nombre.value
        })
        resetForm()
    }

</script>

<style scoped>
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