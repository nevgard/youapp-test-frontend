import RegisterForm from '@/components/auth/register-form';
import Header from '@/components/header';

export default function RegisterPage() {
  return (
    <div className="min-h-screen  p-4">
      <Header url={"/login"} BackButton={true}/>
      <div className="  p-6 w-full max-w-md">
        <h1 className="text-2xl mt-14 text-white font-bold mb-6">Register</h1>
        <RegisterForm />
      </div>
    </div>
  );
}