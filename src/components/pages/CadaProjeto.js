import {v4 as uuidv4} from 'uuid'
import styles from './CadaProjeto.module.css'
import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
// import Projetos from './Projetos'
import ProjetoForm from '../project/ProjetoForm'

import swal from 'sweetalert'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'

const mostraErroOrcamento = () => {
    swal("O orçamento não pode ser menor que o custo do projeto!", {
        buttons: false,
        timer: 3000,
        icon: "warning",
      });
}

const mostraErroOrcamentoServico = () => {
    swal("Orçamento ultrapassado! Verifique o valor do serviço.", {
        buttons: false,
        timer: 3000,
        icon: "warning",
      });
}

const mostraSucessoEdicao = () => {
    swal("Projeto atualizado com sucesso!", {
        buttons: false,
        timer: 3000,
        icon: "success",
      });
}

const removerServico = () => {
    swal("Serviço removido com sucesso!", {
        buttons: false,
        timer: 3000,
        icon: "success",
      });
}

function CadaProjeto() {
    const {id} = useParams()
    const [cadaprojeto, setCadaProjeto] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projetos/${id}`, {
            method: "GET",
            headers: {
                'Conten-Type' :'application/json'
            },
        })
        .then(resp => resp.json())
        .then((data) => {
            setCadaProjeto(data)
            setServices(data.services)
        })
        .catch(err => console.log(err))
        }, 600)
    }, [id])

    function editPost(project) {
        if(project.budget < project.cost) {
            mostraErroOrcamento()
            return false
        }

        fetch(` http://localhost:5000/projetos/${project.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(project),
        })
        .then(resp => resp.json())
        .then((data) => {
            setCadaProjeto(data)
            setShowProjectForm(false)
            mostraSucessoEdicao()
        })
        .catch(err => console.log(err))
    }

    function createService(project) {
        // para pegar o último serviço adicionado
        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if(newCost > parseFloat(project.budget)) {
            mostraErroOrcamentoServico()
            project.services.pop()
            return false
        }

        // somando tudo para adicionar um possível serviço a mais
        project.cost = newCost
        
        fetch(`http://localhost:5000/projetos/${project.id}`, {
            method: "PATCH",
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(project),
        })
        .then((resp) => resp.json())
        .then(() => {
            setShowServiceForm(false)
        })
        .catch(err => console.log(err))

    }

    function removeService(id, cost) {
        const servicesUpdate = cadaprojeto.services.filter(
            // só fica o id que não é igual ao id removido
            (service) => service.id !== id
        )

        const projectUpdate = cadaprojeto
        // remove o serviço
        projectUpdate.services = servicesUpdate
        // atualiza o valor do custo
        projectUpdate.cost = parseFloat(projectUpdate.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projetos/${projectUpdate.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(projectUpdate)
        })
        .then(resp => resp.json())
        .then((data) => {
            setCadaProjeto(projectUpdate)
            setServices(servicesUpdate)
            removerServico()
        })
        .catch(err => console.log(err))

    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    } 

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }
    
    return (
        <>
            {cadaprojeto.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        <div className={styles.details_container}>
                            <h1>Projeto: {cadaprojeto.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria:</span> {cadaprojeto.category.name}
                                    </p>
                                    <p>
                                        <span>Total de orçamento:</span> R${cadaprojeto.budget}
                                    </p>
                                    <p>
                                        <span>Total utilizado:</span> R${cadaprojeto.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjetoForm 
                                    handleSubmit={editPost} 
                                    btnText="Conclui edição"
                                    projectData={cadaprojeto} />
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && (
                                    <ServiceForm 
                                        handleSubmit={createService}
                                        btnText="Adicionar serviço"
                                        projectData={cadaprojeto}
                                    />
                                )}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start">
                           {
                            services.length > 0 &&
                                services.map((service) => (
                                   <ServiceCard 
                                        id={service.id}
                                        name={service.name}
                                        cost={service.cost}
                                        description={service.description}
                                        key={service.id}
                                        handleRemove={removeService}
                                   /> 
                                ))
                           }
                           {
                            services.length === 0 &&
                                <p>Não há serviços cadastrados!</p>
                           }
                        </Container>
                    </Container>
                </div>
            ): (
                <Loading />
            )}
        </>
    )
}

export default CadaProjeto