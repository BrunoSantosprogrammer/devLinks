import { FormEvent, useEffect, useState } from "react"
import { FiTrash2 } from 'react-icons/fi'
import { addDoc,collection, onSnapshot, query, orderBy,doc,deleteDoc } from "firebase/firestore"

import Header from "../../components/Header"
import Input from "../../components/Input"
import { firebase } from "../../services/firebaseConnection"

interface LinkProps {
    id: string,
    name: string,
    url: string,
    bg: string,
    color: string
}

const Admin = () => {
    const [nameInput, setNameInput] = useState('')
    const [urlInput, setUrlInput] = useState('')
    const [textColorInput, setTextColorInput] = useState('#f1f1f1')
    const [backgroundColorInput, setBackgroundColorInput] = useState('#121212')

    const [links, setLnks] = useState<LinkProps[]>([])

    useEffect(() => {
        const linksRef = collection(firebase, 'links')
        const queryRef = query(linksRef, orderBy('create', 'asc'))
        const unsub = onSnapshot(queryRef, (snapshot) => {
            const lista = [] as LinkProps[]
            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color
                })
            })
            setLnks(lista)
        })
        return () => {
            unsub()
        }
    }, [])

    const handleRegister = (e: FormEvent) => {
        e.preventDefault()
        if(nameInput === '' && urlInput === ''){
            alert('Preencha todos os campos')
            return
        }
        addDoc(collection(firebase, 'links'), {
            name: nameInput,
            url: urlInput,
            bg: backgroundColorInput,
            color: textColorInput,
            create: new Date()
        })
        .then(() => {
            setNameInput('')
            setUrlInput('')
            console.log('CADASTRADO COM SUCESSO!!!')
        })
        .catch((error) => {
            console.log('ERRO AO CADASTRAR NO BANCO' + error)
        })
    }

    const handleDeleteLink = async (id: string) => {
        const docRef = doc(firebase, 'links', id)
        await deleteDoc(docRef)
    }

    return(
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header />
        <form className="flex flex-col mt-8 mb-3 w-full max-w-xl" onSubmit={handleRegister}>
            <label  className="text-white font-medium mt-2 mb-2">Nome do Link</label>
            <Input 
            placeholder="Dígite o nome do link"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            />
            <label  className="text-white font-medium mt-2 mb-2">URL do Link</label>
            <Input 
            type="url"
            placeholder="Dígite a url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            />
            <section className="flex my-4 gap-5">
                <div className="flex gap-2 mr-11">
                <label  className="text-white font-medium mt-2 mb-2">Cor do Link</label>
                <input 
                type="color"
                value={textColorInput}
                onChange={(e) => setTextColorInput(e.target.value)}
                />
                </div>
                <div className="flex gap-2">
                <label  className="text-white font-medium mt-2 mb-2">Fundo do Link</label>
                <input 
                type="color"
                value={backgroundColorInput}
                onChange={(e) => setBackgroundColorInput(e.target.value)}
                />
                </div>
            </section>
                {nameInput !== '' && (
                    <div className="flex items-center justify-start flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
                    <label  className="text-white font-medium mt-2 mb-3">Veja como está ficando:</label>
                    <article className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
                    style={{marginBottom: 8, marginTop: 8, backgroundColor: backgroundColorInput}}
                    >
                        <p style={{color: textColorInput}} className="font-medium">{nameInput}</p>
                    </article>
                    </div>
                ) }
            <button type="submit" className="bg-blue-600 h-9 rounded-md mb-7 text-white font-medium gap-4 flex justify-center items-center">
                Cadastrar
            </button>
        </form>
        <h2 className="font-bold text-white mb-4 text-2xl">Meus links</h2>
        {links.map((link) => (
            <article key={link.id} className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
            style={{backgroundColor: link.bg, color: link.color}}
        >
            <p>{link.name}</p>
            <div>
                <button onClick={() => handleDeleteLink(link.id)} className="border border-dashed p-1 rounded bg-neutral-900">
                    <FiTrash2 size={18} color='#fff'/>
                </button>
            </div>
        </article>
        ))}
        </div>
    )
}

export default Admin