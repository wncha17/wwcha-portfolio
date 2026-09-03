import { supabase } from "../../../../shared/api/supabase";
import type { ExpCard } from "../../model/About/expCard";

export async function getExpCards(): Promise<ExpCard[]> {
    const { data, error } = await supabase
        .from('expCard')
        .select('id, title, period, description')
        .order('id')
    
    if (error) throw error
    return data
}
