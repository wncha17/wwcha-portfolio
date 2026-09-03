export interface LinkItem {
    label: string
    url: string
}

export interface IdCard {
    profile: string
    name: string
    birth: Date | string
    home: string
    contact: string
    education: string
    bio: LinkItem[]
}
