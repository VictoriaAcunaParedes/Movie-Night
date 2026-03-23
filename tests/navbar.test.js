import { mount } from "@vue/test-utils";
import { test, expect } from "vitest";
import { createStore } from "vuex";
import Navbar from "@/components/layout/Navbar.vue";

test('muestra el nombre de usuario cuando esta logeado', () => {
    const store = createStore({
        state() {
            return {
                user: { uid: "123" },
                rol: 'admin',
                userProfile: { nombre: 'Victoria' }
            }
        }
    })

    const wrapper = mount(Navbar, {
        global: {
            plugins: [store],
            stubs: ['router-link']
        }
    })

    expect(wrapper.text()).toContain('Victoria')
})

