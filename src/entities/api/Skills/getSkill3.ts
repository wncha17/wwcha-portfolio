import { supabase } from "../../../shared/api/supabase";
import type { Skill3 } from "../../model/Skills/skill3";

export async function getSkill3(): Promise<Skill3> {
    const { data, error } = await supabase
        .from('backEnd')
        .select('id, title, content')
        .single();

    if (error) throw error
    return data
}
