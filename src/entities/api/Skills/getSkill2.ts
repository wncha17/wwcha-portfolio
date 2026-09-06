import { supabase } from "../../../shared/api/supabase";
import type { Skill2 } from "../../model/Skills/skill2";

export async function getSkill2(): Promise<Skill2> {
    const { data, error } = await supabase
        .from('frontEnd')
        .select('id, title, content')
        .single();

    if (error) throw error
    return data
}
