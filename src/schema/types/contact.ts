// This Contact type has nine fields
interface Contact {
  id: string,
  first_name: string,
  last_name: string,
  email: string,
  phone_number: string,
  organization: string,
  country: string,
  created_at: string,
  message: string,
  isRead: boolean,
  contactId: string,
}

export default Contact;