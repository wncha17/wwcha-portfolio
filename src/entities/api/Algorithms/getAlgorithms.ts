import { supabase } from "../../../shared/api/supabase";
import type { Algorithm } from "../../model/Algorithms/algorithm";

export async function getAlgorithms(): Promise<Algorithm[]> {
    const { data, error } = await supabase
        .from('algorithm')
        .select('id, title, description, freq, level')
        .order('id')
    
    if (error) throw error
    return data
}
