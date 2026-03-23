import { mount } from "@vue/test-utils";
import { describe, test, expect } from "vitest";
import PeliculaForm from "@/components/PeliculaForm.vue";

describe("PeliculaForm", () => {
    test("emite evento guardar con los datos del formulario", async () => {
        const wrapper = mount(PeliculaForm, {
            props: {
                pelicula: null,
                actores: [],
                generos: [],
                plataformas: []
            }
        })

        await wrapper.find('input[type="text"]').setValue("Matrix")
        await wrapper.find('input[type="number"]').setValue(1999)

        await wrapper.find('form').trigger('submit.prevent')

        const evento = wrapper.emitted('guardar')

        expect(evento).toBeTruthy()
        expect(evento[0][0]).toMatchObject({
            nombre: "Matrix",
            year: 1999
        })
    })
})