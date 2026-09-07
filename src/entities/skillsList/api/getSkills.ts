import { supabase } from "../../../shared/api/supabase";
import type { Skills } from "../model/skills";

export async function getSkills(): Promise<Skills[]> {
    const { data, error } = await supabase
        .from('skills')
        .select('id, title, content')
        .order('id')

    if (error) throw error
    return data
}
