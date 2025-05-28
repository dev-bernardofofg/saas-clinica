import { CardAuth } from "@/components/(bases)/(cards)/card-auth";
import { SignInForm } from "@/components/(forms)/sign-in.form";
import { SignUpForm } from "@/components/(forms)/sign-up.form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LoginPage = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-neutral-300">
      <Tabs defaultValue="sign-in" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sign-in">Fazer login</TabsTrigger>
          <TabsTrigger value="sign-up">Criar conta</TabsTrigger>
        </TabsList>
        <TabsContent value="sign-in">
          <CardAuth title="Fazer login" description="Faça login para continuar">
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
  );
};

export default LoginPage;
