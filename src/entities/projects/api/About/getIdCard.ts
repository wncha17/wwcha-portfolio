import { supabase } from "../../../../shared/api/supabase";
import type { IdCard } from "../../model/About/idCard";

export async function getIdCard(): Promise<IdCard> {
    const { data, error } = await supabase
        .from('idCard')
        .select('id, profile, name, birth, home, contact, education, bio')
        .single();

    if (error) throw error
    return data
}
