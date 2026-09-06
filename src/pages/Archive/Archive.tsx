import { useQuery } from "@tanstack/react-query";
import { getArchive } from "../../entities/api/Archive/getArchive";
import type { Archive } from "../../entities/model/Archive/archive";
import styles from "./Archive.module.css"

export default function Archive() {

    const { data: archive, isLoading, error } = useQuery<Archive[]> ({
        queryKey: ['archive'],
        queryFn: getArchive
    });

    if (isLoading)
        return <p>불러오는 중...</p>
    
    if (error)
        return <p>에러: {error.message}</p>

    if (!archive || archive.length === 0)
        return <p>데이터가 없습니다.</p>
    
    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Archive</h2>

            <div className={styles.cardGrid}>
                {archive.map((item) => (
                    <a key={item.repo} href={item.link} className={styles.card}>
                        <span className={styles.cardLabel}>{item.repo}</span>

                        <div className={styles.cardImgWrapper}>
                            <img
                                src={item.img}
                                alt={item.repo}
                                className={styles.cardImg}
                            />
                        </div>
                    </a>
                ))}
            </div>
        </section>
    )
}