import type { ChangeEvent } from "react";
import { PatternFormat } from "react-number-format";
import styles from "./NewPatientInput.module.css";

interface NewPacientInputProps {
    label: string;
    name: string;
    value: string;
    onChange: (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    placeholder: string;
    type?: string;
    multiline?: boolean;
}

export default function NewPacientInput({
    label,
    name,
    value,
    onChange,
    placeholder,
    type,
    multiline,
}: NewPacientInputProps) {
    return (
        <div className={styles.container}>
            <label className={styles.label}>{label}</label>

            {type === "cpf" ? (
                <PatternFormat
                    className={styles.input}
                    format="###.###.###-##"
                    mask="_"
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
            ) : multiline ? (
                <textarea
                    className={styles.textarea}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
            ) : (
                <input
                    className={styles.input}
                    type="text"
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
            )}
        </div>
    );
}