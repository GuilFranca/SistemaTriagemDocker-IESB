import type React from "react";
import type { priorityListType } from "../Dashboard";
import styles from "./FilterButton.module.css";

interface FilterButtonProps {
    priority: priorityListType
    isSelected: boolean
    onClick: (priority: string) => void
}

export default function FilterButton({ priority, isSelected, onClick }: FilterButtonProps) {
    return (
        <button
            className={`${styles.filterButton} ${isSelected ? styles.selected : ""}`}
            style={{
                "--dot-color": priority.colorDot,
                "--font-color": priority.colorFont,
            } as React.CSSProperties}
            onClick={() => onClick(priority.priority)}
        >
            <span
                className={styles.dot}
                style={{ backgroundColor: priority.colorDot }}
            />
            <span className={styles.label}>{priority.text}</span>
        </button>
    )
}