import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Check, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
const EmailCapture = () => {
  const [email, setEmail] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    toast
  } = useToast();
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        variant: "destructive",
        title: "Email obrigatório",
        description: "Por favor, insira seu email para continuar."
      });
      return;
    }
    if (!validateEmail(email)) {
      toast({
        variant: "destructive",
        title: "Email inválido",
        description: "Por favor, insira um email válido."
      });
      return;
    }
    if (!acceptTerms) {
      toast({
        variant: "destructive",
        title: "Aceite os termos",
        description: "Por favor, aceite receber novidades para continuar."
      });
      return;
    }
    setIsLoading(true);
    try {
      // Simular API call - aqui você integraria com seu serviço de email marketing
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
      toast({
        title: "Sucesso! 🎉",
        description: "Você foi adicionado à nossa lista. Em breve você receberá novidades!"
      });

      // Reset form
      setEmail('');
      setAcceptTerms(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao cadastrar",
        description: "Tente novamente em alguns minutos."
      });
    } finally {
      setIsLoading(false);
    }
  };
  if (isSuccess) {
    return <section id="email-capture" className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-success to-success/80 rounded-full flex items-center justify-center">
              <Check className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-h2 font-bold text-foreground mb-4">
              Obrigado! 🎉
            </h2>
            <p className="text-body text-muted-foreground mb-8">
              Você está na lista! Assim que o FamilySpot estiver pronto, 
              você será um dos primeiros a saber.
            </p>
            
            <Button variant="outline" onClick={() => setIsSuccess(false)}>
              Cadastrar outro email
            </Button>
          </div>
        </div>
      </section>;
  }
  return <section id="email-capture" className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-h2 font-bold text-foreground mb-4">
              Seja um dos Primeiros!
            </h2>
            <p className="text-body text-muted-foreground">
              Seja um dos primeiros a descobrir os melhores lugares para sua família
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Input type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} className="pl-12 h-12 text-body border-2 border-border focus:border-primary rounded-full" disabled={isLoading} />
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox id="accept-terms" checked={acceptTerms} onCheckedChange={checked => setAcceptTerms(checked as boolean)} disabled={isLoading} className="mt-1" />
                <label htmlFor="accept-terms" className="text-small text-muted-foreground leading-relaxed cursor-pointer">
                  Aceito receber novidades sobre o FamilySpot e concordo com a coleta 
                  dos meus dados para este fim
                </label>
              </div>
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full h-12" disabled={isLoading}>
              {isLoading ? <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Guardando seu lugar...</span>
                </div> : 'Guardar meu lugar na lista'}
            </Button>

            <p className="text-center text-small text-muted-foreground">100% gratuito • Sem spam</p>
          </form>
        </div>
      </div>
    </section>;
};
export default EmailCapture;