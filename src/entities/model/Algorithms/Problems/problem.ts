export interface Problem {
    id: number
    category: string // '알고리즘' 페이지에서 '해시' 카드의 화살표를 누르면 Problem 카드 Category가 '해시'로 설정되어 있는 문제들만 보여줌
    title: string
    level: number
    link: string
}