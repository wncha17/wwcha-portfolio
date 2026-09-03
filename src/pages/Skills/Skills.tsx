import { useQuery } from "@tanstack/react-query";
import type { Skill1 } from "../../entities/projects/model/Skills/skill1";
import { getSkill1 } from "../../entities/projects/api/Skills/getSkill1";
import type { Skill2 } from "../../entities/projects/model/Skills/skill2";
import { getSkill2 } from "../../entities/projects/api/Skills/getSkill2";
import type { Skill3 } from "../../entities/projects/model/Skills/skill3";
import { getSkill3 } from "../../entities/projects/api/Skills/getSkill3";
import type { Skill4 } from "../../entities/projects/model/Skills/skill4";
import { getSkill4 } from "../../entities/projects/api/Skills/getSkill4";
import styles from "./Skills.module.css"

export default function Skills() {

    // 1. Language 카드 데이터

    // 2. FrontEnd 카드 데이터

    // 3. BackEnd 카드 데이터

    // 4. DevOps 카드 데이터

    const { data: skill1, isLoading: isLoading1, error: error1 } = useQuery<Skill1> ({
        queryKey: ['language'],
        queryFn: getSkill1
    });

    const { data: skill2, isLoading: isLoading2, error: error2 } = useQuery<Skill2> ({
        queryKey: ['frontEnd'],
        queryFn: getSkill2
    });

    const { data: skill3, isLoading: isLoading3, error: error3 } = useQuery<Skill3> ({
        queryKey: ['backEnd'],
        queryFn: getSkill3
    });

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
    

    // return
    // 1. 헤더
    // 2. Language 영역 카드
    // 3. FrontEnd 영역 카드
    // 4. BackEnd 영역 카드
    // 5. DevOps 영역 카드

    return (
        <section className={styles.section}>
            {/* 헤더 */}
            <div className={styles.title}>ABOUT ME</div>

            {/* 1. Language 영역 카드 */}
            <div className={styles.skill1}>
                <h3 className={styles.skill1Title}>{skill1.title}</h3>
                <p className={styles.skill1Content}>{skill1.content}</p>
            </div>

            {/* 2. FrontEnd 영역 카드 */}
            <div className={styles.skill2}>
                <h3 className={styles.skill2Title}>{skill2.title}</h3>
                <p className={styles.skill2Content}>{skill2.content}</p>
            </div>

            {/* 3. BackEnd 영역 카드 */}
            <div className={styles.skill3}>
                <h3 className={styles.skill3Title}>{skill3.title}</h3>
                <p className={styles.skill3Content}>{skill3.content}</p>
            </div>

            {/* 4. DevOps 영역 카드 */}
            <div className={styles.skill4}>
                <h3 className={styles.skill4Title}>{skill4.title}</h3>
                <p className={styles.skill4Content}>{skill4.content}</p>
            </div>

        </section>
    )
    
}