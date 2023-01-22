// This User type has seven fields
interface User {
  id: string,
  userId: string,
  first_name: string,
  last_name: string,
  email: string,
  phone_number: string,
  created_at: number,
  updated_at: number,
  isAdmin: boolean,
}

export default User;