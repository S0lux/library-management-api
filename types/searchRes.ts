export interface SearchResponse {
    numFound: number
    start: number
    numFoundExact: boolean
    docs: Doc[]
    num_found: number
    q: string
    offset: any
  }
  
  export interface Doc {
    key: string
    title: string
    author_name?: string[]
    editions: Editions
  }
  
  export interface Editions {
    numFound: number
    start: number
    numFoundExact: boolean
    docs: Doc2[]
  }
  
  export interface Doc2 {
    publish_date?: string[]
    isbn?: string[]
  }
  