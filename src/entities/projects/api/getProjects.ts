import { supabase } from "../../../shared/api/supabase";
import type { Project } from "../model/project";

export async function getProjects(): Promise<Project[]> {
    const { data, error } = await supabase
        .from('projects')
        .select('id, title, about, summary, skills, date')
        .order('id')
    
    if (error) throw error
    return data
}
