import { useEffect, useState } from 'react'

import Input from '../form/Input'
import Select from '../form/Select'
import SubmmitButton from '../form/SubmmitButton'
import styles from './ProjetoForm.module.css'

// esse código é uma promisse:
// -----------------------------------------
// request(requisição) de "get"
// para pegar as categorias do "banco de dados"
// fetch(" http://localhost:5000/categorias", {
//         method: "GET",
//         headers: {
//           tipo de comunicação pra receber "json"
//             'Content-Type': 'application/json'
//         }
//     })
//-----------------------------------------------------
// pegou os dados da resposta da API e transforma em "json"
// .then((resp) => resp.json())
//-------------------------------
// pegou os dados em "json" e colocou no hook
//    .then((data) => {
//    setCategorias(data)
//----------------------------
// para evitar o loop infinito na requisição
// useEffect()

function ProjetoForm({handleSubmit, btnText, projectData}) {
    const [categorias, setCategorias] = useState([]);
    const [project, setProject] = useState(projectData || {})

    useEffect(() => {

        fetch(" http://localhost:5000/categorias", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((resp) => resp.json())
        .then((data) => {
            setCategorias(data)
        })
        .catch((err) => console.log(err))

    }, [])

    const submit = (e) => {
        e.preventDefault()
        //console.log(project)
       handleSubmit(project)
    }
    
    function handleChange(e) {
        setProject({...project, [e.target.name]: e.target.value})
    }

    function handleCategory(e) {
        setProject({...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        },
    })
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input 
            type="text"
            text="Nome do Projeto"
            name="name"
            placeholder="Insira o nome do projeto"
            handleOnChange={handleChange}
            value={project.name ? project.name : ''} />
            <Input 
            type="number"
            text="Orçamento do Projeto"
            name="budget"
            placeholder="Insira o orçamento total"
            handleOnChange={handleChange}
            value={project.budget ? project.budget : ''} />
            <Select 
            name="categoria_id" 
            text="Selecione a categoria"
            options={categorias}
            handleOnChange={handleCategory}
            value={project.categorias ? project.categorias.id : ''} />
            <SubmmitButton text={btnText} />
        </form>
    )
}

export default ProjetoForm