// app/(auth)/register/page.tsx
import RegisterForm from "@/components/auth/RegisterForm"; // FIX: Path impor yang benar

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>
        <RegisterForm />
      </div>
    </div>
  );
}
