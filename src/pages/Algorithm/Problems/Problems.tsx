import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import type { Problem } from "../../../entities/model/Algorithms/Problems/problem";
import { getProblems } from "../../../entities/api/Algorithms/Problems/getProblems";
import styles from "./Problems.module.css";

export default function Problems() {
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");

    const { data: problems, isLoading, error } = useQuery<Problem[]>({
        queryKey: ['problems'],
        queryFn: getProblems
    });

    if (isLoading)
        return <p>불러오는 중...</p>

    if (error)
        return <p>에러: {error.message}</p>

    if (!problems || problems.length === 0)
        return <p>데이터가 없습니다.</p>

    // category 쿼리 파라미터가 있으면 해당 알고리즘 분류의 문제만 필터링합니다.
    const filteredProblems = category
        ? problems.filter((p) => p.category === category)
        : problems;

    return (
        <section className={styles.section}>
            <div className={styles.title}>{category ?? "전체 문제"}</div>

            {filteredProblems.length === 0 ? (
                <p className={styles.empty}>해당 분류의 문제가 없습니다.</p>
            ) : (
                <div className={styles.list}>
                    {filteredProblems.map((problem) => (
                        <div key={problem.id} className={styles.item}>
                            <div className={styles.itemInfo}>
                                <span className={styles.itemTitle}>{problem.title}</span>
                                <span className={styles.itemLevel}>Level {problem.level}</span>
                            </div>
 
                            <a
                                href={problem.link}
                                target="_blank"
                                rel="noreferrer"
                                className={styles.linkButton}
                            >
                                문제와 풀이
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}