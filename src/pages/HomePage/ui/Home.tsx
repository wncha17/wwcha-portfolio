import { AboutList } from "../../../widgets/about-list";
import { ArchiveList } from "../../../widgets/archive-list";
import { SkillsList } from "../../../widgets/skills-list";

export default function Home() {
    return (
        <>
            <AboutList />
            <SkillsList />
            <ArchiveList />
        </>
    )
}