import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { Algorithm } from "../../entities/model/Algorithms/algorithm";
import { getAlgorithms } from "../../entities/api/Algorithms/getAlgorithms";
import type { Problem } from "../../entities/model/Algorithms/Problems/problem";
import { getProblems } from "../../entities/api/Algorithms/Problems/getProblems";
import styles from "./Algorithm.module.css"
import { useMemo } from "react";

const MAX_STARS = 5;
const MAX_LEVEL = 5;

export default function Algorithm() {
    const navigate = useNavigate();

    const { data: algorithms, isLoading, error } = useQuery<Algorithm[]>({
        queryKey: ['algorithms'],
        queryFn: getAlgorithms
    });

    const { data: problems, isLoading: isProblemsLoading, error: problemsError } = useQuery<Problem[]>({
        queryKey: ['problems'],
        queryFn: getProblems
    });

    // algorithm.title과 일치하는 problem.category 개수를 세어 Map으로 만들어둡니다.
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
                    const filledStars = Math.max(0, Math.min(MAX_STARS, algo.freq));
                    const levelPercent = Math.max(0, Math.min(100, (algo.level / MAX_LEVEL) * 100));

                    const problemCount = problemCountByCategory.get(algo.title) ?? 0;

                    return (
                        <div key={algo.id} className={styles.card}>
                            <h3 className={styles.cardTitle}>{algo.title}</h3>
 
                            <p className={styles.description}>{algo.description}</p>
 
                            {/* 출제빈도: 별 5개 */}
                            <div className={styles.statRow}>
                                <span className={styles.statLabel}>출제빈도</span>
                                <div className={styles.stars} aria-label={`${filledStars} / ${MAX_STARS}`}>
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
                                <div
                                    className={styles.levelBar}
                                    role="meter"
                                    aria-valuenow={algo.level}
                                    aria-valuemin={0}
                                    aria-valuemax={MAX_LEVEL}
                                >
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
 
                            <button
                                type="button"
                                className={styles.cornerArrow}
                                onClick={() => navigate(`/problems?category=${encodeURIComponent(algo.title)}`)}
                                aria-label={`${algo.title} 문제 목록 보기`}
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
