import { useState, useEffect } from "react"
import styles from './Message.module.css'

// msg, para deixar a mensagem dinâmica
function Message({type, msg}) {

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if(!msg) {
            setVisible(false)
            return
        }

        setVisible(true)

        const timer = setTimeout(() => {
            setVisible(false)
        }, 3000)

        return () => clearTimeout(timer)

    }, [msg])

    return (
        <>
            {visible &&
            // precisei usar fragment "<></>" para mostrar/ocultar a div
            // pq a div já é o elmento pai.
                <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
            }
        </>
    )
}

export default Message