import styles from './SubmmitButton.module.css'

function SubmmitButton({text}) {
    return (
        <div>
            <button className={styles.btn}>{text}</button>
        </div>
    )
}

export default SubmmitButton