export interface LanguageModel {
    id: string | number
    title: string
}

export interface TermDefinitionModel {
    id: string | number
    termId: string | number
    definition: string
}
export interface TermModel {
    id: string | number
    term: string
    definitions: TermDefinitionModel[]
}