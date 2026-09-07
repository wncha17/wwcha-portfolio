import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { Project } from "../../../entities/projectList";
import { getProjects } from "../../../entities/projectList";
import styles from "./ProjectList.module.css";

// 필터 옵션 상수화 및 타입 정의
// 'as const'를 사용하여 배열을 읽기 전용 튜플로 고정
const FILTERS = ["전체", "학교", "교육", "실무"] as const;
type Filter = (typeof FILTERS)[number];

export default function ProjectList() {

    // 현재 선택된 카테고리 필터 상태
    const [filter, setFilter] = useState<Filter>("전체");
    // 펼쳐진 카드들의 id를 저장하는 배열 상태
    const [openIds, setOpenIds] = useState<number[]>([]);

    // 서버 데이터 패칭 (React Query)
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
    
    // '전체'일 때는 필터링 하지 않고 원본 배열 그대로 사용
    // 다른 필터일 때만 project.category와 비교
    const filteredProjects = 
        filter === "전체" ? projects : projects.filter((p) => p.category === filter);

    const parseSkills = (skills: string) =>
        skills.split(",").map((s) => s.trim()).filter(Boolean);

    const parseSummary = (summary: string) =>
        summary
            .split("\n")
            .map((line) => line.replace(/^[-•]\s*/, "").trim())
            .filter(Boolean);
    
    const toggle = (id: number) => {
        // 지금 이 카드가 펼쳐져 있는 상태인지 확인
        // (openIds 배열 안에 이 id가 들어있으면 true)
        const isAlreadyOpen = openIds.includes(id);

        // * React는 '상태가 바뀌었는지'를 판단할 때, 배열 안의 내용물이 아니라 배열 자체가 새로운 것인지 본다.
        if (isAlreadyOpen) {
            // 열려있으면 -> 배열에서 이 id만 빼고 나머지로 새 배열을 만들기 (= 닫기)
            const newOpenIds = openIds.filter((openId) => openId !== id);
            setOpenIds(newOpenIds);
        } else {
            // 닫혀있으면 -> 기존 배열 뒤에 이 id를 추가한 새 배열을 만들기 (= 열기)
            const newOpenIds = [...openIds, id];
            setOpenIds(newOpenIds);
        }
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
                        // 선택된 필터 항목에 동적으로 액티브 CSS 클래스 부여
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
                    // 현재 카드가 열려있는지 여부를 불리언 값으로 판단
                    const isOpen = openIds.includes(project.id);

                    return (
                        <div key={project.id} className={styles.card}>
                            {/* 카드 헤더 (클릭 시 아코디언 토글 실행) */}
                            <button
                                type="button"
                                className={styles.cardHeader}
                                onClick={() => toggle(project.id)}
                            >
                                <div className={styles.cardHeaderText}>
                                    <h3 className={styles.cardTitle}>{project.title}</h3>
                                    <p className={styles.cardAbout}>{project.about}</p>
                                </div>
                                {/* 개폐 여부에 따른 화살표 아이콘 로테이션 애니메이션용 클래스 조건부 부여 */}
                                <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}>
                                    ⌄
                                </span>
                            </button>
 
                            {/* 카드 바디 (isOpen 상태일 때만 조건부 렌더링) */}
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
                                            <a
                                                href={project.links}
                                                target="_blank"
                                                rel="noreferrer"
                                                className={styles.metaLink}
                                            >
                                                첨부파일
                                            </a>
                                        ) : (
                                            <span />
                                        )}
                                        <span className={styles.metaValue}>{project.date}</span>
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