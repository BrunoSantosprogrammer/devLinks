import { FormEvent, useEffect, useState } from "react"
import { setDoc,doc, getDoc } from "firebase/firestore"

import Header from "../../components/Header"
import Input from "../../components/Input"
import { firebase } from '../../services/firebaseConnection'


const Networks = () => {
    const [facebook, setFacebook] = useState('')
    const [instagram, setInstagram] = useState('')
    const [youtube, setYoutube] = useState('')

    useEffect(() => {
        const loadLinks = () => {
            const docRef = doc(firebase, 'social', 'link')
            getDoc(docRef)
            .then((snapshot) => {
                if(snapshot.data() !== undefined ){
                    setFacebook(snapshot.data()?.facebook)
                    setInstagram(snapshot.data()?.instagram)
                    setYoutube(snapshot.data()?.youtube)
                }
            })
        }
        loadLinks()
    },[])

    const handleRegister = (e: FormEvent) => {
        e.preventDefault()
        setDoc(doc(firebase, 'social', 'link'), {
            facebook: facebook,
            instagram: instagram,
            youtube: youtube
        })
        .then(() => {
            console.log('CADASTRADO COM SUCESSO!')
        })
        .catch((error) => {
            console.log('ERRO AO SALVAR' + error)
        })
    }

    return(
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header />
            <h1 className="text-white text-2xl font-medium mt-8 mb-4">Minhas redes sociais</h1>
            <form className="flex flex-col max-w-xl w-full" onSubmit={handleRegister}>
                <label className="text-white font-medium mt-2 mb-2">Link do facebook</label>
                <Input 
                type="url"
                placeholder="Dígite a url do facebook..."
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                />
                <label className="text-white font-medium mt-2 mb-2">Link do instagram</label>
                <Input 
                type="url"
                placeholder="Dígite a url do instagram..."
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                />
                <label className="text-white font-medium mt-2 mb-2">Link do youtube</label>
                <Input 
                type="url"
                placeholder="Dígite a url do youtube..."
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
                />
                <button type="submit" className="text-white bg-blue-600 h-9 rounded-md items-center justify-center flex mb-7 font-medium">Salvar links</button>
            </form>
        </div>
    )
}

export default Networks