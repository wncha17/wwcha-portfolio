import { supabase } from "../../../../shared/api/supabase";
import type { Skill4 } from "../../model/Skills/skill4";

export async function getSkill4(): Promise<Skill4> {
    const { data, error } = await supabase
        .from('devOps')
        .select('id, title, content')
        .single();

    if (error) throw error
    return data
}
