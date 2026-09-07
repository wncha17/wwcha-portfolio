import { supabase } from "../../../shared/api/supabase";
import type { ExpCard } from "../model/expCard";

export async function getExpCards(): Promise<ExpCard[]> {
    const { data, error } = await supabase
        .from('expCard')
        .select('id, logo, title, period, description')
        .order('id')
    
    if (error) throw error
    return data
}
