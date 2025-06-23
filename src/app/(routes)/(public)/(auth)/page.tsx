import { CardAuth } from "@/components/(bases)/(cards)/card-auth";
import { SignInForm } from "@/components/(forms)/sign-in.form";
import { SignUpForm } from "@/components/(forms)/sign-up.form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-neutral-200 p-4 dark:bg-neutral-900">
      <div className="flex w-full max-w-md flex-col items-center gap-6 rounded-xl border border-neutral-200 bg-white p-6 shadow-lg dark:border-neutral-800 dark:bg-neutral-950">
        <Image
          src="/brand-logo.svg"
          alt="logo doutor agenda"
          width={136}
          height={28}
        />
        <Tabs
          defaultValue="sign-in"
          className="w-full"
          aria-label="Autenticação"
        >
          <TabsList className="mb-4 grid w-full grid-cols-2">
            <TabsTrigger value="sign-in">Fazer login</TabsTrigger>
            <TabsTrigger value="sign-up">Criar conta</TabsTrigger>
          </TabsList>
          <TabsContent value="sign-in">
            <CardAuth
              title="Fazer login"
              description="Faça login para continuar"
            >
              <SignInForm />
            </CardAuth>
          </TabsContent>
          <TabsContent value="sign-up">
            <CardAuth
              title="Criar conta"
              description="Crie uma conta para continuar"
            >
              <SignUpForm />
            </CardAuth>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginPage;
