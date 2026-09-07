export interface SkillItem {
    name: string
    description: string
}

export interface Skill {
    title: string
    content: SkillItem[] | string
}