import LoginForm from '@/components/auth/login-form';
import Header from '@/components/header';

export default function LoginPage() {
  return (
    <div className="min-h-screen  p-4">
      <Header url={"/login"} BackButton={true}/>
      <div className=" p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mt-14 mb-6 text-white">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}