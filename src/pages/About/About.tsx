import { useQuery } from "@tanstack/react-query";
import type { IdCard } from "../../entities/projects/model/About/idCard";
import type { IntroCard } from "../../entities/projects/model/About/introCard";
import type { ExpCard } from "../../entities/projects/model/About/expCard";
import { getIdCard } from "../../entities/projects/api/About/getIdCard";
import { getIntroCard } from "../../entities/projects/api/About/getIntroCard";
import { getExpCards } from "../../entities/projects/api/About/getExpCards";
import styles from "./About.module.css"

export default function About() {

    // 1. 프로필 카드 데이터
    const { data: idCard, isLoading: isLoading1, error: error1 } = useQuery<IdCard> ({
        queryKey: ['idCard'],
        queryFn: getIdCard
    });

    // 2. Intro 카드 데이터
    const { data: introCard, isLoading: isLoading2, error: error2 } = useQuery<IntroCard> ({
        queryKey: ['introCard'],
        queryFn: getIntroCard
    });

    // 3. Experience 3열 카드 데이터
    const { data: expCard, isLoading: isLoading3, error: error3 } = useQuery<ExpCard[]> ({
        queryKey: ['expCard'],
        queryFn: getExpCards
    });

    // 아직 오는 중
    if (isLoading1 || isLoading2 || isLoading3)
        return <p>불러오는 중...</p>
    
    if (error1 || error2 || error3) {
        const errorMsg = error1?.message || error2?.message || error3?.message;
        return <p>에러: {errorMsg}</p>;
    }

    if (!idCard || !introCard || !expCard)
        return <p>데이터가 없습니다.</p>
    
    return (
        <section className={styles.section}>
            {/* 헤더 */}
            <div className={styles.title}>ABOUT ME</div>

            {/* 1. 프로필 카드 */}
            <div className={styles.cardContainer}>
                <div className={styles.profileWrapper}>
                    <img 
                        src={idCard.profile || "/images/profile.jpeg"}
                        alt={`${idCard.name} 프로필`}
                        className={styles.profileImg}
                    />
                </div>

                <div className={styles.infoSection}>
                    <div className={styles.infoRow}>
                        <span className={styles.label}>이름</span>
                        <span className={styles.value}>{idCard.name}</span>
                    </div>

                    <div className={styles.infoRow}>
                        <span className={styles.label}>생년월일</span>
                        <span className={styles.value}>{String(idCard.birth)}</span>
                    </div>

                    <div className={styles.infoRow}>
                        <span className={styles.label}>거주지</span>
                        <span className={styles.value}>{idCard.home}</span>
                    </div>

                    <div className={styles.infoRow}>
                        <span className={styles.label}>연락처</span>
                        <span className={styles.value}>{idCard.contact}</span>
                    </div>
                    
                    <div className={styles.infoRow}>
                        <span className={styles.label}>학력</span>
                        <span className={styles.value}>{idCard.education}</span>
                    </div>

                    <div className={styles.infoRow}>
                        <span className={styles.label}>링크</span>
                        <div className={styles.linkGroup}>
                            {idCard.bio?.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.url}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Intro 영역 카드 */}
            <div className={styles.introCard}>
                <h3 className={styles.introTitle}>{introCard.title || "Intro"}</h3>
                <p className={styles.introContent}>{introCard.content}</p>
            </div>

            {/* 3. Experience 영역 카드 */}
            <div className={styles.expGrid}>
                {expCard?.map((exp) => (
                    <div key={exp.id} className={styles.expCard}>
                        <h4 className={styles.expTitle}>{exp.title}</h4>
                        <span className={styles.expPeriod}>{exp.period}</span>
                        <p className={styles.expDescription}>{exp.description}</p>
                    </div>
                ))}
            </div>
        </section>
    
    )
}