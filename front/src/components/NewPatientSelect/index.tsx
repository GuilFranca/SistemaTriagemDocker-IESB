import styles from "./NewPatientSelect.module.css";

interface NewPacientSelectProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function NewPacientSelect({
    value,
    onChange,
}: NewPacientSelectProps) {
    return (
        <div className={styles.container}>
            <label className={styles.label}>Sexo</label>

            <select
                className={styles.select}
                value={value}
                onChange={onChange}
                name="genero"
            >
                <option value="">Selecione</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outro">Outro</option>
            </select>
        </div>
    );
}