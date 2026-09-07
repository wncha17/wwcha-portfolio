import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import type { Algorithm } from "../../../entities/algorithm";
import { getAlgorithms } from "../../../entities/algorithm";
import type { Problem } from "../../../entities/problem";
import { getProblems } from "../../../entities/problem";
import styles from "./AlgorithmList.module.css"

const MAX_STARS = 5;
const MAX_LEVEL = 5;

export default function AlgorithmList() {
    // 페이지 이동을 위한 React Router hook
    const navigate = useNavigate();

    // 알고리즘 카테고리 목록 조회
    const { data: algorithms, isLoading, error } = useQuery<Algorithm[]>({
        queryKey: ['algorithms'],
        queryFn: getAlgorithms
    });

    // 전체 문제 목록 조회
    const { data: problems, isLoading: isProblemsLoading, error: problemsError } = useQuery<Problem[]>({
        queryKey: ['problems'],
        queryFn: getProblems
    });

    // algorithm.title과 일치하는 problem.category 개수를 세어 Map으로 만들어두기
    const problemCountByCategory = useMemo(() => {
        const map = new Map<string, number>();
        (problems ?? []).forEach((p) => {
            map.set(p.category, (map.get(p.category) ?? 0) + 1);
        });
        return map;
    }, [problems]);

    if (isLoading || isProblemsLoading)
        return <p>불러오는 중...</p>
 
    if (error || problemsError)
        return <p>에러: {error?.message || problemsError?.message}</p>
 
    if (!algorithms || algorithms.length === 0)
        return <p>데이터가 없습니다.</p>

    return (
        <section className={styles.section}>
            {/* 헤더 */}
            <div className={styles.title}>Algorithm</div>

            {/* 카드 그리드 (3열) */}
            <div className={styles.cardGrid}>
                {algorithms.map((algo) => {
                    // 데이터 가공 및 수치 정규화
                    const filledStars = Math.max(0, Math.min(MAX_STARS, algo.freq));
                    const levelPercent = Math.max(0, Math.min(100, (algo.level / MAX_LEVEL) * 100));
                    
                    // Map에서 현재 알고리즘 타이틀에 해당하는 문제 개수 추출
                    const problemCount = problemCountByCategory.get(algo.title) ?? 0;

                    return (
                        <div key={algo.id} className={styles.card}>
                            {/* 알고리즘 이름 및 간단한 설명 */}
                            <h3 className={styles.cardTitle}>{algo.title}</h3>
                            <p className={styles.description}>{algo.description}</p>
 
                            {/* 출제빈도: 별 5개 */}
                            <div className={styles.statRow}>
                                <span className={styles.statLabel}>출제빈도</span>
                                <div className={styles.stars}>
                                    {Array.from({ length: MAX_STARS }).map((_, idx) => (
                                        <svg
                                            key={idx}
                                            viewBox="0 0 24 24"
                                            className={`${styles.star} ${idx < filledStars ? styles.starFilled : ""}`}
                                        >
                                            <path d="M12 2l2.9 6.26L21.5 9.27l-4.75 4.63L17.8 21 12 17.77 6.2 21l1.05-7.1L2.5 9.27l6.6-1.01L12 2z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
 
                            {/* 난이도: 가로 게이지 바 */}
                            <div className={styles.statRow}>
                                <span className={styles.statLabel}>난이도</span>
                                <div className={styles.levelBar}>
                                    <div
                                        className={styles.levelBarFill}
                                        style={{ width: `${levelPercent}%` }}
                                    />
                                </div>
                            </div>
 
                            {/* 문제 개수: 숫자 */}
                            <div className={`${styles.statRow} ${styles.countRow}`}>
                                <span className={styles.statLabel}>문제 개수</span>
                                <span className={styles.count}>{problemCount}</span>
                            </div>
 
                            {/* 문제 목록 페이지로 이동하는 버튼 */}
                            <button
                                type="button"
                                className={styles.cornerArrow}
                                onClick={() => navigate(`/problems?category=${encodeURIComponent(algo.title)}`)}
                            >
                                <svg viewBox="0 0 24 24">
                                    <path
                                        d="M7 4v10a3 3 0 0 0 3 3h8"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M14 13l4 4-4 4"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>
                    );
                })}
            </div>
        </section>
    )
}
