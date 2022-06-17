// import React from 'react';
// import { useNavigate  } from 'react-router-dom'
// import { useLocation } from "react-router-dom"
// import Message from "../layout/Message"
import Loading from '../layout/Loading'
import styles from './NovoProjeto.module.css'
import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import ProjectCard from '../project/ProjectCard'
import { useState, useEffect } from 'react'

function NovoProjeto() {

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)

    // const naviagte = useNavigate()
    // let message = ''
    // if(naviagte.state) {
    //     message = naviagte.state.message
    // }

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/projetos', {
            method: "GET",
            headers: {
                'Content-Type' : 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            setProjects(data)
            setRemoveLoading(true)
        })
        .catch(err =>  console.log(err))
        }, 600)
    }, [])

    function removeProject(id) {
        fetch(`http://localhost:5000/projetos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json'
            },
        })
        .then(resp => resp.json())
        .then(data => {
            setProjects(projects.filter((project) => project.id !== id))
        })
        .catch(err => console.log(err))
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>  
                <LinkButton to="/projetos" text="Criar Projeto" />
            </div>
            <Container customClass="start">
                {projects.length > 0 && 
                projects.map((project) => (
                    <ProjectCard 
                    id={project.id}
                    name={project.name}
                    budget={project.budget}
                    category={project.category.name}
                    key={project.id}
                    handleRemove={removeProject}
                     />
                ))}
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Não há projetos cadastrados!</p>
                )}
            </Container>
        </div>
    )
    
}

export default NovoProjeto

// {message && <Message type="success" msg={message} />}