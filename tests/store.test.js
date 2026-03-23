import { describe, test, expect } from "vitest";
import store from "@/store";

describe('Vuex Store', () => {
    test("setUser guarda usuario en el estado", () => {
        const user = { uid: "123", email: "usuario.test@email.com"}

        store.commit('setUser', user)

        expect(store.state.user).toEqual(user)
    })
})