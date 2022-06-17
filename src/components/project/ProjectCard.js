import {Link} from 'react-router-dom'
import styles from './ProjectCard.module.css'
import {BsPencil, BsFillTrashFill} from 'react-icons/bs'

import swal from 'sweetalert'

function ProjectCard({id, name, budget, category, handleRemove}) {

    const mostraMessagemDeletar = () => {
        swal("Projeto excluído!", {
            buttons: false,
            timer: 3000,
            icon: "warning",
        });
    }

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
        mostraMessagemDeletar()
    }

    return (
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Orçamento:</span> R${budget}
            </p>
            <p className={styles.category_text}>
                <span className={`${styles[category.toLowerCase()]}`}></span> {category}
            </p>
            <div className={styles.project_card_actions}>
                <Link to={`/cadaprojeto/${id}`}>
                    <BsPencil /> Editar
                </Link>
                <button onClick={remove}>
                    <BsFillTrashFill /> Excluir
                </button>
            </div>
        </div>
    )
}

export default ProjectCard