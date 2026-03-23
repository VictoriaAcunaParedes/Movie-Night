import { db } from "../firebase/firebase";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc
} from 'firebase/firestore'

const plataformasCollection = collection(db, 'plataformas')

export const getPlataformas = async () => {
    const snapshot = await getDocs(plataformasCollection)

    return snapshot.docs.map( doc => ({
        id: doc.id,
        ...doc.data()
    }))
}

export const createPlataforma =  async (plataforma) => {
    return await addDoc(plataformasCollection, plataforma)
}

export const updatePlataforma = async (id, plataforma) => {
    const plataformaRef = doc(db, 'plataformas', id)
    return await updateDoc(plataformaRef, plataforma)
}

export const deletePlataforma = async (id) => {
    const plataformaRef = doc(db, 'plataformas', id)
    return await deleteDoc(plataformaRef)
}