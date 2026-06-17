import type { patientData, priorityListType } from "../Dashboard";
import styles from "./PatientCard.module.css";

interface PatientCardProps {
    patinentData: patientData[],
    priority: priorityListType
}


export default function PatientCard({ patinentData, priority }: PatientCardProps) {

    let countPriority = patinentData.filter(
        (patient) => patient.prioridade === priority.priority && patient.status === "aguardando"
    ).length;

    if (priority.priority === "todos") {
        countPriority = patinentData.length - patinentData.filter(patient => patient.status !== "aguardando").length;
    }

    return (
        <div className={styles.card}>
            {priority.priority !== "todos" ? (
                <h2 className={styles.PatientCardtop}>
                    <span
                        className={styles.dot}
                        style={{ background: priority.colorDot }}
                    />
                    <h2 className={styles.priorityTitle}>{priority.text}</h2>
                </h2>
            ) : (
                <h2 className={styles.priorityTitle}>{priority.text}</h2>
            )}
            <h3 className={styles.countPriority} style={{color: priority.colorFont}}>{countPriority}</h3>
            <p className={styles.timer}>{priority.timer}</p>
        </div>
    )

}