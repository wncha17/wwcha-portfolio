import { supabase } from "../../../../shared/api/supabase";
import type { Skill1 } from "../../model/Skills/skill1";

export async function getSkill1(): Promise<Skill1> {
    const { data, error } = await supabase
        .from('language')
        .select('id, title, content')
        .single();

    if (error) throw error
    return data
}
