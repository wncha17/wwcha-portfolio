import { supabase } from "../../../shared/api/supabase";
import type { Archive } from "../model/archive";

export async function getArchive(): Promise<Archive[]> {
    const { data, error } = await supabase
        .from('archive')
        .select('repo, img, link')
        .order('id')
    
    if (error) throw error
    return data
}
