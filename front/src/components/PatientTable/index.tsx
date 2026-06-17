import { useState } from "react";
import type { patientData, priorityListType } from "../Dashboard";
import styles from "./PatientTable.module.css";
import { useWaitingTime } from "../../hooks/useWaitingTime";
import { pacienteService } from "../../services/apiService";
import ViewPatientModal from "../ViewPatientModal";
import { FaTrashAlt } from "react-icons/fa";

interface PatientTableData {
    priorityFilter: string;
    priorityList: priorityListType[]
    patientsList: patientData[]
    onStatusUpdated?: () => void
}

function WaitingTimeCell({ patient, priorityList }: { patient: patientData; priorityList: priorityListType[] }) {
    const priority = priorityList.find(p => p.priority === patient.prioridade);
    const limitMinutes = priority?.limitTimer ?? null;
    const isStopped = patient.status !== "aguardando";

    const { waitingTimeFormatted, isExceeded } = useWaitingTime(
        patient.criado_em,
        limitMinutes,
        !isStopped
    );

    const displayTime = isStopped
        ? patient.tempo_espera || waitingTimeFormatted
        : waitingTimeFormatted;

    const warningClass = !isStopped ? (isExceeded ? styles.esperaOver : '') : '';

    return (
        <span className={`${styles.espera} ${warningClass}`}>
            {displayTime}
        </span>
    );
}

export default function PatientTable({ priorityFilter, priorityList, patientsList, onStatusUpdated }: PatientTableData) {
    const [selectedPatient, setSelectedPatient] = useState<patientData | null>(null);

    const filteredPatients = priorityFilter === "todos"
        ? patientsList
        : patientsList.filter((patient) => patient.prioridade === priorityFilter);

    const handleView = (patient: patientData) => {
        setSelectedPatient(patient);
    };

    const handleChamar = async (patientId: number | string) => {
        try {
            await pacienteService.atualizarStatus(patientId, "em_atendimento");
            onStatusUpdated?.();
        } catch (error) {
            console.error("Erro ao atualizar status do paciente:", error);
        }
    };

    const handleFinalizar = async (patientId: number | string) => {
        try {
            await pacienteService.atualizarStatus(patientId, "finalizado");
            onStatusUpdated?.();
        } catch (error) {
            console.error("Erro ao finalizar paciente:", error);
        }
    };

    const handleRemover = async (patientId: number | string) => {
        try {
            await pacienteService.remover(patientId);
            onStatusUpdated?.();
        } catch (error) {
            console.error("Erro ao remover paciente:", error);
        }
    };

    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Nº SENHA</th>
                        <th>PACIENTE</th>
                        <th>IDADE</th>
                        <th>PRIORIDADE</th>
                        <th>QUEIXA PRINCIPAL</th>
                        <th>ENTRADA</th>
                        <th>ESPERA</th>
                        <th>STATUS</th>
                        <th>AÇÕES</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPatients.map((patient) => {
                        const isAtendimento = patient.status === "em_atendimento";
                        const isFinalizado = patient.status === "finalizado";
                        const priorityColor = priorityList.find(p => p.priority === patient.prioridade);


                        return (
                            <tr key={patient.id} className={styles.row}>

                                <td className={styles.senha}>{patient.id}</td>

                                <td className={styles.paciente}>
                                    <span className={styles.nome}>{patient.nome}</span>
                                    <br />
                                    <span className={styles.genero}>{patient.genero}</span>
                                </td>

                                <td className={styles.idade}>{patient.idade}</td>

                                <td className={styles.tdPrioridade}>
                                    <span className={styles.prioridade}>
                                        <span className={styles.dot} style={{ backgroundColor: priorityColor?.colorDot }} />
                                        <span>{patient.prioridade}</span>
                                    </span>
                                </td>

                                <td className={styles.queixa}>{patient.queixa_principal}</td>

                                <td className={styles.entrada}>
                                    {new Date(patient.criado_em).toLocaleTimeString("pt-BR", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </td>

                                <td>
                                    <WaitingTimeCell patient={patient} priorityList={priorityList} />
                                </td>

                                <td className={styles.status}>
                                    {isAtendimento ? (
                                        <span className={styles.statusAtendimento}>
                                            <span className={styles.statusIcon}>⚕</span> Em atendimento
                                        </span>
                                    ) : isFinalizado ? (
                                        <span className={styles.statusAguardando}>
                                            <span className={styles.statusIcon}>✔</span> Finalizado
                                        </span>
                                    ) : (
                                        <span className={styles.statusAguardando}>
                                            <span className={styles.statusIcon}>⏳</span> Aguardando
                                        </span>
                                    )}
                                </td>

                                <td>
                                    <div className={styles.acoes}>
                                        {!isFinalizado ? (
                                            <>
                                                <button
                                                    className={styles.btnVer}
                                                    onClick={() => handleView(patient)}
                                                >
                                                    Ver
                                                </button>
                                                {isAtendimento ? (
                                                    <button
                                                        className={styles.btnFinalizar}
                                                        onClick={() => handleFinalizar(patient.id)}
                                                    >
                                                        Finalizar
                                                    </button>
                                                ) : (
                                                    <button
                                                        className={styles.btnChamar}
                                                        onClick={() => handleChamar(patient.id)}
                                                    >
                                                        Chamar
                                                    </button>
                                                )}
                                                <button
                                                    className={styles.btnRemover}
                                                    onClick={() => handleRemover(patient.id)}
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    className={styles.btnVer}
                                                    onClick={() => handleView(patient)}
                                                >
                                                    Ver
                                                </button>
                                                <button
                                                    className={styles.btnRemover}
                                                    onClick={() => handleRemover(patient.id)}
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>

                            </tr>
                        )
                    })}
                </tbody>

            </table>
            {selectedPatient && (
                <ViewPatientModal
                    patient={selectedPatient}
                    onClose={() => setSelectedPatient(null)}
                />
            )}

        </div>
    )
}