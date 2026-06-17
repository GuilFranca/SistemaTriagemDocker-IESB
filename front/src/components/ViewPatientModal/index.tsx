import type { patientData } from "../Dashboard";
import modalStyles from "../NewPatientModal/NewPatientModal.module.css";
import inputStyles from "../NewPatientInput/NewPatientInput.module.css";
import { IoClose } from "react-icons/io5";

interface ViewPatientModalProps {
  patient: patientData;
  onClose: () => void;
}

const priorityLabels: Record<string, string> = {
  emergencia: "Emergência",
  urgente: "Urgente",
  pouco_urgente: "Pouco Urgente",
  nao_urgente: "Não Urgente",
};

export default function ViewPatientModal({ patient, onClose }: ViewPatientModalProps) {
  const priorityLabel = priorityLabels[patient.prioridade] ?? patient.prioridade;

  return (
    <div className={modalStyles.modalOverlay} onClick={onClose}>
      <div className={modalStyles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={modalStyles.modalTopContent}>
          <h1 className={modalStyles.modalTitle}>Detalhes do Paciente</h1>
          <button type="button" className={modalStyles.closeButton} onClick={onClose}>
            <IoClose size="25px" style={{ color: "var(--gray-dark)" }} />
          </button>
        </div>

        <div className={modalStyles.modalForm}>
          <div className={modalStyles.modalInputs}>
            <div className={modalStyles.modalInputsTop}>
              <div className={inputStyles.container}>
                <label className={inputStyles.label}>Nome completo</label>
                <input className={inputStyles.input} value={patient.nome} disabled />
              </div>

              <div className={inputStyles.container}>
                <label className={inputStyles.label}>CPF / RG</label>
                <input className={inputStyles.input} value={patient.cpf_rg} disabled />
              </div>

              <div className={inputStyles.container}>
                <label className={inputStyles.label}>Idade</label>
                <input className={inputStyles.input} value={String(patient.idade)} disabled />
              </div>

              <div className={inputStyles.container}>
                <label className={inputStyles.label}>Sexo</label>
                <input className={inputStyles.input} value={patient.genero} disabled />
              </div>
            </div>

            <div className={modalStyles.modalInputsBottom}>
              <div className={inputStyles.container}>
                <label className={inputStyles.label}>Queixa principal</label>
                <textarea className={inputStyles.textarea} value={patient.queixa_principal} disabled />
              </div>

              <div className={inputStyles.container}>
                <label className={inputStyles.label}>Classificação de risco</label>
                <input className={inputStyles.input} value={priorityLabel} disabled />
              </div>

              <div className={inputStyles.container}>
                <label className={inputStyles.label}>Observações</label>
                <textarea className={inputStyles.textarea} value={patient.observacoes ?? ""} disabled />
              </div>
            </div>
          </div>

          <div className={modalStyles.formActions}>
            <button type="button" onClick={onClose} className={modalStyles.cancelButton}>
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
