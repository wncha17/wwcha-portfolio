import { supabase } from "../../../shared/api/supabase";
import type { Problem } from "../model/problem";

export async function getProblems(): Promise<Problem[]> {
    const { data, error } = await supabase
        .from('problem')
        .select('id, category, title, level, link')
        .order('id')
    
    if (error) throw error
    return data
}
