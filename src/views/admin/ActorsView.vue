<template>
    <h2 class="text-center my-5">Actores</h2>
    <ActorForm
        :actor="actorSeleccionado"
        @guardar="guardarActor"
    />
    <table class="table-actors mb-5">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="actor in actores" :key="actor.id">
                <td>{{ actor.nombre }}</td>
                <td>
                    <button class="btn btn-movie  btn-sm me-2" @click="editActor(actor)">Editar</button>
                    <button class="btn btn-movie-delete btn-sm" @click="removeActor(actor.id)">Eliminar</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>

    import { ref, onMounted } from 'vue'
    import ActorForm from '@/components/ActorForm.vue'

    import {
        getActores,
        createActor,
        updateActor,
        deleteActor
    } from '@/services/actorService'

    const actores = ref([])

    const actorSeleccionado = ref(null)
    const isEditing = ref(false)

    const loadActores = async () => {
        try {
            actores.value = await getActores()
        } catch (error) {
            console.error('Error al cargar Actores: ', error)
        }
    }

    onMounted(loadActores)

    const guardarActor = async (actor) => {
        if (isEditing.value) {
            await updateActor(actorSeleccionado.value.id, actor)
        } else {
            await createActor(actor)
        }

        actorSeleccionado.value = null
        isEditing.value = false

        await loadActores()
    }

    const editActor = (actor) => {
        actorSeleccionado.value = actor
        isEditing.value = true
    }

    const removeActor = async (id) => {
        if(!confirm('Seguro/a que quieres eliminar a este actor?')) return
        await deleteActor(id)
        await loadActores()
    }
</script>

<style scoped>
    .table-actors {
        width: 100%;
        background-color: #1e293b;
        color: #f8fafc;
        border-radius: 10px;
    }

    .table-actors th,
    .table-actors td {
        padding: 12px 16px;
        text-align: left;
    }

    .table-actors thead {
    background-color: #172033;
    }

    .table-actors th {
        font-weight: 600;
        border-bottom: 1px solid rgba(255,255,255,0.08);
    }

    .table-actors td {
        border-bottom: 1px solid rgba(255,255,255,0.05);
    }

    .table-actors tbody tr:hover {
        background-color: #273449;
    }
</style>