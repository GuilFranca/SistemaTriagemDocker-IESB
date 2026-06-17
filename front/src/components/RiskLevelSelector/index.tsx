import styles from "./RiskLevelSelector.module.css";

interface RiskLevelSelectorProps {
    value: string;
    onChange: (value: string) => void;
}


const options = [
    {
        value: "emergencia",
        label: "Emergência",
        color: "#A32D2D",
        background: "#FCEBEB",
        border: "#E24B4A",
    },
    {
        value: "urgente",
        label: "Muito Urgente",
        color: "#F39C12",
        background: "#FFF4E5",
        border: "#F39C12",
    },
    {
        value: "pouco_urgente",
        label: "Pouco Urgente",
        color: "#4A90E2",
        background: "#EAF3FF",
        border: "#4A90E2",
    },
    {
        value: "nao_urgente",
        label: "Não Urgente",
        color: "#7CB342",
        background: "#EDF7E8",
        border: "#7CB342",
    },
];

console.log(styles)

export default function RiskLevelSelector({ value, onChange }: RiskLevelSelectorProps) {

    return (
        <div className={styles.container}>
            <label className={styles.label}>Classificação de risco</label>

            <div className={styles.options}>
                {options.map((option) => (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => onChange(option.value)}
                        className={`
                            ${styles.option}
                            ${styles[option.value]}
                            ${value === option.value
                                ? styles[`${option.value}Selected`]
                                : ""
                            }
                        `}
                    >
                        <span
                            className={styles.dot}
                            style={{ backgroundColor: option.color }}
                        />

                        <span className={styles.risk}>{option.label}</span>
                    </button>
                ))}
            </div>

        </div >
    )
}