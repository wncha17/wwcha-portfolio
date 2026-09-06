import { useQuery } from "@tanstack/react-query";
import type { Project } from "../../entities/model/Projects/project";
import { getProjects } from "../../entities/api/Projects/getProjects";
import styles from "./Projects.module.css";
import { useState } from "react";

const FILTERS = ["전체", "학교", "교육", "실무"] as const;
type Filter = (typeof FILTERS)[number];

export default function Projects() {

    const [filter, setFilter] = useState<Filter>("전체");
    const [openIds, setOpenIds] = useState<Set<number>>(new Set());

    const { data: projects, isLoading, error } = useQuery<Project[]>({
        queryKey: ['projects'],
        queryFn: getProjects
    });

    if (isLoading)
        return <p>불러오는 중...</p>
    
    if (error)
        return <p>에러: {error.message}</p>

    if (!projects || projects.length === 0)
        return <p>데이터가 없습니다.</p>
    
    const filteredProjects = 
        filter === "전체" ? projects : projects.filter((p) => p.category === filter);

    const formatPeriod = (date: Project["date"]) => {
        const d = typeof date === "string" ? new Date(date) : date;
        if (isNaN(d.getTime())) return String(date);
        return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}`;
    };

    const parseSkills = (skills: string) =>
        skills.split(",").map((s) => s.trim()).filter(Boolean);

    const parseSummary = (summary: string) =>
        summary
            .split("\n")
            .map((line) => line.replace(/^[-•]\s*/, "").trim())
            .filter(Boolean);
    
    const toggle = (id: number) => {
        setOpenIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    return (
        <section className={styles.section}>
            {/* 헤더 */}
            <div className={styles.title}>Projects</div>

            {/* 필터 탭 */}
            <div className={styles.filterGroup}>
                {FILTERS.map((f) => (
                    <button
                        key={f}
                        type="button"
                        className={`${styles.filterBtn} ${filter === f ? styles.filterBtnActive : ""}`}                    
                        onClick={() => setFilter(f)}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* 카드 그리드 (2열) */}
            <div className={styles.cardGrid}>
                {filteredProjects.map((project) => {
                    const skills = parseSkills(project.skills);
                    const summaryLines = parseSummary(project.summary)
                    const isOpen = openIds.has(project.id);

                    return (
                        <div key={project.id} className={styles.card}>
                            <button
                                type="button"
                                className={styles.cardHeader}
                                onClick={() => toggle(project.id)}
                                aria-expanded={isOpen}
                            >
                                <div className={styles.cardHeaderText}>
                                    <h3 className={styles.cardTitle}>{project.title}</h3>
                                    <p className={styles.cardAbout}>{project.about}</p>
                                </div>
                                <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}>
                                    ⌄
                                </span>
                            </button>
 
                            {isOpen && (
                                <div className={styles.cardBody}>
                                    {summaryLines.length > 0 && (
                                        <ul className={styles.summaryList}>
                                            {summaryLines.map((line, idx) => (
                                                <li key={idx}>{line}</li>
                                            ))}
                                        </ul>
                                    )}
 
                                    {skills.length > 0 && (
                                        <div className={styles.skillGroup}>
                                            {skills.map((skill) => (
                                                <span key={skill} className={styles.skillChip}>
                                                    #{skill}
                                                </span>
                                            ))}
                                        </div>
                                    )}
 
                                    <div className={styles.metaRow}>
                                        {project.links ? (
                                            <a href={project.links}
                                               className={styles.metaLink}
                                            >
                                                첨부파일
                                            </a>
                                        ) : (
                                            <span />
                                        )}
                                        <span className={styles.metaValue}>{formatPeriod(project.date)}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

        </section>

    )
}