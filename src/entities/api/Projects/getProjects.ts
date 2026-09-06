import { supabase } from "../../../shared/api/supabase";
import type { Project } from "../../model/Projects/project";

export async function getProjects(): Promise<Project[]> {
    const { data, error } = await supabase
        .from('projects')
        .select('id, category, title, about, summary, skills, links, date')
        .order('id')
    
    if (error) throw error
    return data
}
