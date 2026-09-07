export interface SkillItem {
    name: string
    description: string
}

export interface Skills {
    id: number
    title: string
    content: SkillItem[] | string
}