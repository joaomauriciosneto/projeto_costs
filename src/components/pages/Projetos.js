// import React from 'react';
import { useNavigate  } from 'react-router-dom'
import ProjetoForm from '../project/ProjetoForm'
import styles from './Projetos.module.css'

import swal from 'sweetalert'

const mostraMessagemSucesso = () => {
    swal("Projeto cadastrado com sucesso!", {
        buttons: false,
        timer: 3000,
        icon: "success",
      });
}

function Projetos() {

    const navigate  = useNavigate()

    function createPost(project) {
        project.cost = 0
        project.services = []

        fetch('http://localhost:5000/projetos', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            
            // troquei o history pelo naviagte, pois, não é mais funcional;
            // também tirei o ".push()" que também náo estava funcionando
            navigate('/novoprojeto', mostraMessagemSucesso()
                
            // {message: 'Projeto enviado com sucesso!'}
            )
            

        })
        .catch(err => console.log(err))
    }

    return (
       <div className={styles.novoprojeto_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjetoForm handleSubmit={createPost} btnText="Criar Projeto" />
       </div>
    )
}

export default Projetos