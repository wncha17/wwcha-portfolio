import { supabase } from "../../../shared/api/supabase";
import type { IntroCard } from "../../model/About/introCard";

export async function getIntroCard(): Promise<IntroCard> {
    const { data, error } = await supabase
        .from('introCard')
        .select('id, title, content')
        .single();
    
    if (error) throw error
    return data
}
