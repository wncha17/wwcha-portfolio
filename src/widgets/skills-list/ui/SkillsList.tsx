import { useQuery } from "@tanstack/react-query";
import type { Skills, SkillItem } from "../../../entities/skillsList";
import { getSkills } from "../../../entities/skillsList";
import styles from "./SkillsList.module.css"

export default function SkillsList() {

    // 1. Skills 영역 데이터
    const { data: skills, isLoading, error } = useQuery<Skills[]> ({
        queryKey: ['skills'],
        queryFn: getSkills
    });

    // 아직 오는 중
    if (isLoading)
        return <p>불러오는 중...</p>
    
    if (error) {
        const errorMsg = error?.message;
        return <p>에러: {errorMsg}</p>;
    }

    if (!skills || skills.length === 0)
        return <p>데이터가 없습니다.</p>
    
    // JSON 데이터 안전하게 파싱하는 도우미 함수
    const parseSkillItems = (content: any): SkillItem[] => {
        if (!content) return [];
        if (typeof content === 'string') {
            try {
                return JSON.parse(content);
            } catch {
                // 기존 text 형태일 경우의 예외 처리
                return content.split(',').map(item => ({
                    name: item.trim(),
                    description: `${item.trim()} 기술 활용 경험`
                }));
            }
        }
        return content;
    }

    return (
        <section className={styles.section}>
            {/* 헤더 */}
            <h2 className={styles.title}>Skills</h2>

            {/* 기술 카테고리 카드 목록 */}
            <div className={styles.cardList}>
                {skills.map((category) => {
                    const items = parseSkillItems(category.content);

                    return (
                        <div key={category.title} className={styles.card}>
                            <h3 className={styles.cardTitle}>{category.title}</h3>
                            <div className={styles.chipGroup}>
                                {items.map((item, itemIdx) => (
                                    <div key={itemIdx} className={styles.chipWrapper}>
                                        <button className={styles.chip}>{item.name}</button>

                                        {/* 호버 시 나타나는 툴팁 */}
                                        <div className={styles.tooltip}>
                                            {item.description}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

        </section>
    )
    
}