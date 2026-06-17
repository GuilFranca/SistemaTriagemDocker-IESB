import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import styles from "./NewPatientButton.module.css";
import NewPatientModal from "../NewPatientModal";

interface NewPatientButtonProps {
  onSaved: () => void;
}

export default function NewPatientButton({ onSaved }: NewPatientButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button 
        className={styles.newPacientButton} 
        onClick={() => setIsModalOpen(true)}
      >
        <FaPlus /> Novo Paciente
      </button>

      {isModalOpen && (
        <NewPatientModal onClose={() => setIsModalOpen(false)} onSaved={onSaved} />
      )}
    </>
  );
}