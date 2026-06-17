import NewPatientButton from "../NewPatientButton";
import { Timer } from "../Timer";
import styles from "./Header.module.css"
import { FaRegHospital } from "react-icons/fa";

interface HeaderProps {
    onPatientSaved: () => void;
}

export default function Header({ onPatientSaved }: HeaderProps) {
    return (
        <header className={styles.header}>
           <div className={styles.leftContainerHeader}>
                <FaRegHospital size={"22px"}/>

                <div className={styles.textContainerHeader}>
                    <h1>Triagem Hospitalar</h1>
                    <p>UPA Central · Pronto-Socorro</p>
                </div>

            </div>
            
           <div className={styles.rightContainerHeader}>
                <Timer />
                <NewPatientButton onSaved={onPatientSaved} />
            </div> 
        </header>
    )
}