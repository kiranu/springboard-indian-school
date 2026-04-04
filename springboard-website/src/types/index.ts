export interface Blog {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  featured_image: string
  author_name: string
  read_time: number
  published_at: string
  category: string
}

export interface BlogCategory {
  id: number
  name: string
  slug: string
}

export interface Event {
  id: number
  title: string
  slug: string
  description: string
  featured_image: string
  event_date: string
  event_time: string
  location: string
  event_type: string
  is_featured: boolean
}

export interface GalleryAlbum {
  id: number
  title: string
  slug: string
  description: string
  cover_image: string
}

export interface GalleryImage {
  id: number
  album_id: number
  title: string
  alt_text: string
  image_path: string
}

export interface EnquiryFormData {
  type: 'admission' | 'callback' | 'contact' | 'visit'
  parent_name: string
  child_name?: string
  phone: string
  email?: string
  grade_applying?: string
  message?: string
}

export interface Testimonial {
  id: number
  parent_name: string
  child_grade: string
  content: string
  rating: number
  photo: string
  is_featured: boolean
}

export interface ApiResponse<T> {
  results: T[]
  count: number
}
