import { useQuery } from "@tanstack/react-query";
import type { Skill1, SkillItem } from "../../entities/model/Skills/skill1";
import { getSkill1 } from "../../entities/api/Skills/getSkill1";
import type { Skill2 } from "../../entities/model/Skills/skill2";
import { getSkill2 } from "../../entities/api/Skills/getSkill2";
import type { Skill3 } from "../../entities/model/Skills/skill3";
import { getSkill3 } from "../../entities/api/Skills/getSkill3";
import type { Skill4 } from "../../entities/model/Skills/skill4";
import { getSkill4 } from "../../entities/api/Skills/getSkill4";
import styles from "./Skills.module.css"

export default function Skills() {

    // 1. Language 카드 데이터
    const { data: skill1, isLoading: isLoading1, error: error1 } = useQuery<Skill1> ({
        queryKey: ['language'],
        queryFn: getSkill1
    });

    // 2. FrontEnd 카드 데이터
    const { data: skill2, isLoading: isLoading2, error: error2 } = useQuery<Skill2> ({
        queryKey: ['frontEnd'],
        queryFn: getSkill2
    });

    // 3. BackEnd 카드 데이터
    const { data: skill3, isLoading: isLoading3, error: error3 } = useQuery<Skill3> ({
        queryKey: ['backEnd'],
        queryFn: getSkill3
    });

    // 4. DevOps 카드 데이터
    const { data: skill4, isLoading: isLoading4, error: error4 } = useQuery<Skill4> ({
        queryKey: ['devOps'],
        queryFn: getSkill4
    });

    // 아직 오는 중
    if (isLoading1 || isLoading2 || isLoading3 || isLoading4)
        return <p>불러오는 중...</p>
    
    if (error1 || error2 || error3 || error4) {
        const errorMsg = error1?.message || error2?.message || error3?.message || error4?.message;
        return <p>에러: {errorMsg}</p>;
    }

    if (!skill1 || !skill2 || !skill3 || !skill4)
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

    const skillCategories = [
        { data: skill1, items: parseSkillItems(skill1.content) },
        { data: skill2, items: parseSkillItems(skill2.content) },
        { data: skill3, items: parseSkillItems(skill3.content) },
        { data: skill4, items: parseSkillItems(skill4.content) },
    ];

    return (
        <section className={styles.section}>
            {/* 헤더 */}
            <div className={styles.title}>Skills</div>

            {/* 기술 카테고리 카드 목록 */}
            <div className={styles.cardList}>
                {skillCategories.map((cat, idx) => (
                    <div key={idx} className={styles.card}>
                        <h3 className={styles.cardTitle}>{cat.data.title}</h3>
                        <div className={styles.chipGroup}>
                            {cat.items.map((skill, itemIdx) => (
                                <div key={itemIdx} className={styles.chipWrapper}>
                                    <button className={styles.chip}>{skill.name}</button>
                                    
                                    {/* 호버 시 나타나는 툴팁 */}
                                    <div className={styles.tooltip}>
                                        {skill.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

        </section>
    )
    
}