import styles from './Footer.module.css'

export default function Footer() {

    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <p className={styles.copyright}>
                © {currentYear}. Cha Won Woo. All Rights Reserved.
            </p>
        </footer>
    )
}