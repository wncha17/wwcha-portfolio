import { supabase } from "../../../shared/api/supabase";
import type { Skill } from "../model/skill";

export async function getSkills(): Promise<Skill[]> {
    const { data, error } = await supabase
        .from('skills')
        .select('id, title, content')
        .order('id')

    if (error) throw error
    return data
}
