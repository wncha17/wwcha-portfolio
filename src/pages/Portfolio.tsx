import { useQuery } from "@tanstack/react-query";
import type { Project } from "../entities/projects/model/types";
import { getProjects } from "../entities/projects/api/getProjects";

export default function Portfolio() {
    
    // 호출 - 상태 3개를 한 번에 받는다.
    const { data: projects, isLoading, error } = useQuery<Project[]> ({ 
        queryKey: ['projects'],
        queryFn: getProjects
    });

    // 아직 오는 중
    if (isLoading)
        return <p>불러오는 중...</p>
    
    if (error)
        return <p>에러: {String(error)}</p>
    
    return (
        <ul>
            {projects?.map((project) => (
                <li key={project.id}>
                    {project.title}
                    <p>{project.about}</p>
                    <p>{project.summary}</p>
                    <p>{project.skills}</p>
                    <span>{String(project.date)}</span>
                </li>
            ))}
        </ul>    
    )
}
