// This Career type has nine fields
interface Career {
  id: string,
  careerId: string,
  title: string,
  description: string,
  photoURL: string,    
  created_at: number,
  updated_at: number,
  published_at: number,
  expired_at: number,
  isPublished: boolean,
  isExpired: boolean,
  authorId: string,
}

export default Career;