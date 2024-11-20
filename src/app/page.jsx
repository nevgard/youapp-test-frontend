import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default function Home() {
  const token = cookies().get('TokenX')

  if (!token) {
    redirect('/login')
  }

  // Jika sudah login, redirect ke profile
  return redirect('/profile')
}