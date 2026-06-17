import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import styles from "./NewPatientModal.module.css";
import { IoClose } from "react-icons/io5";
import { pacienteService } from "../../services/apiService";
import NewPacientInput from "../NewPatientInput";
import NewPacientSelect from "../NewPatientSelect";
import RiskLevelSelector from "../RiskLevelSelector";

interface NewPacientModalProps {
    onClose: () => void;
    onSaved?: () => void;
}

interface formPacient {
    nome: string;
    genero: string;
    idade: string;
    cpf_rg: string;
    prioridade: string;
    queixa_principal: string;
    observacoes?: string;
}

export default function NewPacientModal({ onClose, onSaved }: NewPacientModalProps) {
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const [formData, setFormData] = useState<formPacient>({
        nome: "",
        genero: "",
        idade: "",
        cpf_rg: "",
        prioridade: "",
        queixa_principal: "",
        observacoes: ""
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const requiredFields = [
            { key: "nome", label: "Nome" },
            { key: "genero", label: "Gênero" },
            { key: "idade", label: "Idade" },
            { key: "cpf_rg", label: "CPF / RG" },
            { key: "prioridade", label: "Prioridade" },
            { key: "queixa_principal", label: "Queixa principal" },
        ] as const;

        const missingField = requiredFields.find(
            (field) => !formData[field.key] || formData[field.key].trim() === ""
        );

        if (missingField) {
            setToastMessage(`Preencha o campo ${missingField.label} para cadastrar o paciente.`);
            return;
        }

        try {
            await pacienteService.criar({
                ...formData,
                idade: Number(formData.idade)
            });

            onSaved?.();
            onClose();
            console.log("Enviado com sucesso");
        } catch (error) {
            console.error("Erro ao cadastrar paciente:", error);
        }
    };

    useEffect(() => {
        if (!toastMessage) return;

        const timeoutId = window.setTimeout(() => {
            setToastMessage(null);
        }, 3000);

        return () => clearTimeout(timeoutId);
    }, [toastMessage]);

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>

                <div className={styles.modalTopContent}>
                    <h1 className={styles.modalTitle}>Cadastrar Novo Paciente</h1>
                    <button type="button" className={styles.closeButton} onClick={onClose}>
                        <IoClose size={"25px"} style={{ color: "var(--gray-dark)" }} />
                    </button>
                </div>

                <form className={styles.modalForm} onSubmit={handleSubmit}>
                    {toastMessage && (
                        <div className={styles.toastNotification}>
                            {toastMessage}
                        </div>
                    )}

                    <div className={styles.modalInputs}>

                        <div className={styles.modalInputsTop}>
                            <NewPacientInput
                                label="Nome completo"
                                name="nome"
                                value={formData.nome}
                                onChange={handleChange}
                                placeholder="Digite o nome..."
                            />

                            <NewPacientInput
                                label="CPF / RG"
                                name="cpf_rg"
                                value={formData.cpf_rg}
                                onChange={handleChange}
                                placeholder="000.000.000-00"
                                type="cpf"
                            />

                            <NewPacientInput
                                label="Idade"
                                name="idade"
                                value={formData.idade}
                                onChange={handleChange}
                                placeholder="Digite a idade..."
                            />

                            <NewPacientSelect
                                value={formData.genero}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.modalInputsBottom}>
                            <NewPacientInput
                                label="Queixa principal"
                                name="queixa_principal"
                                value={formData.queixa_principal}
                                onChange={handleChange}
                                placeholder="Digite a queixa..."
                            />

                            <RiskLevelSelector
                                value={formData.prioridade}
                                onChange={(value) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        prioridade: value,
                                    }))
                                }
                            />

                            <NewPacientInput
                                label="Observações"
                                name="observacoes"
                                value={formData.observacoes!}
                                onChange={handleChange}
                                placeholder="Digite as observações..."
                                multiline
                            />
                        </div>
                    </div>

                    <div className={styles.formActions}>
                        <button type="button" onClick={onClose} className={styles.cancelButton}>
                            Cancelar
                        </button>
                        <button type="submit" className={styles.saveButton}>
                            Registrar Triagem
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}