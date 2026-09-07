import { supabase } from "../../../shared/api/supabase";
import type { IdCard } from "../model/idCard";

export async function getIdCard(): Promise<IdCard> {
    const { data, error } = await supabase
        .from('idCard')
        .select('id, profile, name, birth, home, contact, education')
        .single();

    if (error) throw error
    return data
}
