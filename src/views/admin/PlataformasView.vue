<template>
    <h2 class="my-5 text-center">Plataformas</h2>    
    <PlataformaForm 
        :plataforma="plataformaSeleccionado"
        @guardar="guardarPlataforma"
    />
    
    <table class="table-plataforma mb-5">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="plataforma in plataformas" :key="plataforma.id">
                <td>{{ plataforma.nombre }}</td>
                <td>
                    <button class="btn btn-movie btn-sm me-2" @click="editPlataforma(plataforma)">Editar</button>
                    <button class="btn btn-movie-delete btn-sm" @click="removePlataforma(plataforma.id)">Eliminar</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import PlataformaForm from '@/components/PlataformaForm.vue';

    import {
        getPlataformas,
        createPlataforma,
        updatePlataforma,
        deletePlataforma
    } from '@/services/plataformaService'

    const plataformas = ref([])
    const plataformaSeleccionado = ref(null)
    const isEditing = ref(false)

    const loadPlataformas = async () => {
        try {
            plataformas.value = await getPlataformas()
        } catch (error) {
            console.error('Error al cargar plataformas: ', error)
        }
    }
    onMounted(loadPlataformas)

    const guardarPlataforma = async (plataforma) => {
        if (isEditing.value) {
            await updatePlataforma(plataformaSeleccionado.value.id, plataforma)
        } else {
            await createPlataforma(plataforma)
        }

        plataformaSeleccionado.value = null
        isEditing.value = false

        await loadPlataformas()
    }

    const editPlataforma = (plataforma) => {
        plataformaSeleccionado.value = plataforma
        isEditing.value = true
    }

    const removePlataforma = async (id) => {
        if (!confirm('Seguro/a quieres eliminar esta plataforma?')) return
        await deletePlataforma(id)
        await loadPlataformas()
    }
</script>

<style scoped>
    .table-plataforma {
        width: 100%;
        background-color: #1e293b;
        color: #f8fafc;
        border-radius: 10px;
    }

    .table-plataforma th,
    .table-plataforma td {
        padding: 12px 16px;
        text-align: left;
    }

    .table-plataforma thead {
    background-color: #172033;
    }

    .table-plataforma th {
        font-weight: 600;
        border-bottom: 1px solid rgba(255,255,255,0.08);
    }

    .table-plataforma td {
        border-bottom: 1px solid rgba(255,255,255,0.05);
    }

    .table-plataforma tbody tr:hover {
        background-color: #273449;
    }
    </style>