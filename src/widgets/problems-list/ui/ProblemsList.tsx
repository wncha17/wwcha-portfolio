import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import type { Problem } from "../../../entities/problem";
import { getProblems } from "../../../entities/problem";
import styles from "./ProblemsList.module.css";

export default function ProblemsList() {
    // URL 쿼리 스트링(Query Parameter) 조회
    // 예: /problems?category=스택/큐 -> category 변수에 '스택/큐' 저장
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");

    // 서버 데이터 패칭 (React Query)
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
                // 문제 리스트 영역
                <div className={styles.list}>
                    {filteredProblems.map((problem) => (
                        <div key={problem.id} className={styles.item}>
                            {/* 왼쪽: 문제 이름 및 난이도 */}
                            <div className={styles.itemInfo}>
                                <span className={styles.itemTitle}>{problem.title}</span>
                                <span className={styles.itemLevel}>Level {problem.level}</span>
                            </div>
 
                            {/* 오른쪽: 외부 문제 링크/풀이 페이지 이동 버튼 */}
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