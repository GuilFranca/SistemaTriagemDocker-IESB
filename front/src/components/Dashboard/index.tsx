import styles from "./Dashboard.module.css"
import PatientCard from "../PatientCard";
import FilterButton from "../FilterButton";
import PatientTable from "../PatientTable";

export interface patientData {
    id: number,
    nome: string,
    genero: string,
    idade: number,
    cpf_rg: string,
    prioridade: string,
    queixa_principal: string,
    observacoes: string,
    status: string,
    criado_em: string,
    tempo_espera: string
}

export interface priorityListType {
    priority: string,
    text: string
    colorDot: string,
    colorFont: string,
    timer: string
    limitTimer: number | null
}

const priorityList: priorityListType[] = [
    { priority: "todos", text: "Em Espera", colorDot: "#1b1212", colorFont: "#312d2d", timer: "pacientes na fila", limitTimer: null },
    { priority: "emergencia", text: "Emergência", colorDot: "#A32D2D", colorFont: "#E24B4A", timer: "atendimento imediato", limitTimer: 0 },
    { priority: "urgente", text: "Urgente", colorDot: "#F39C12", colorFont: "#F39C12", timer: "até 10 minutos", limitTimer: 10 },
    { priority: "pouco_urgente", text: "Pouco Urgente", colorDot: "#4A90E2", colorFont: "#4A90E2", timer: "até 30 minutos", limitTimer: 30 },
    { priority: "nao_urgente", text: "Não Urgente", colorDot: "#7CB342", colorFont: "#7CB342", timer: "até 120 minutos", limitTimer: 120 },
]

interface DashboardProps {
    patients: patientData[];
    priorityFilter: string;
    priorityFilterFunction: (priority: string) => void;
    onPatientUpdated?: () => void;
}

export default function Dashboard({ patients, priorityFilter, priorityFilterFunction, onPatientUpdated }: DashboardProps) {

    return (
        <main>
            <div className={styles.patientContainer}>
                <div className={styles.filterBoard}>
                    {priorityList.map((priority) => (
                        <FilterButton
                            key={priority.priority}
                            priority={priority}
                            isSelected={priorityFilter === priority.priority}
                            onClick={priorityFilterFunction}
                        />
                    ))}
                </div>
                <div className={styles.dashBoard}>
                    <div className={styles.priorityCardsContainer}>
                        {priorityList.map((priority) => (
                            <PatientCard
                                patinentData={patients}
                                priority={priority}
                            />
                        ))}
                    </div>
                    <PatientTable
                        priorityList={priorityList}
                        patientsList={patients}
                        onStatusUpdated={onPatientUpdated}
                        priorityFilter={priorityFilter}
                    />
                </div>
            </div>
        </main>
    )
}