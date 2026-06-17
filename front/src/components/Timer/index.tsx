import { useState, useEffect } from 'react';
import styles from "./Timer.module.css";

export function Timer() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
            setTime(new Date());
        }, 1000)

        // Limpeza (Cleanup): desmonta o intervalo quando o componente sair da tela
        return () => clearInterval(timerId);
    }, []);

    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');

    return (
        <p className={styles.timer}>
            <span className={styles.timeDigit}>{hours}</span>
            <span className={styles.timeDivider}>:</span>
            <span className={styles.timeDigit}>{minutes}</span>
            <span className={styles.timeDivider}>:</span>
            <span className={styles.timeDigit}>{seconds}</span>
        </p>
    );
}