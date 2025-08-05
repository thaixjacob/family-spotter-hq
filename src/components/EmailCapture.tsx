import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Check, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
const EmailCapture = () => {
  const { t } = useTranslation();
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
        title: t('emailCapture.errors.emailRequired'),
        description: t('emailCapture.errors.emailRequiredDesc')
      });
      return;
    }
    if (!validateEmail(email)) {
      toast({
        variant: "destructive",
        title: t('emailCapture.errors.invalidEmail'),
        description: t('emailCapture.errors.invalidEmailDesc')
      });
      return;
    }
    if (!acceptTerms) {
      toast({
        variant: "destructive",
        title: t('emailCapture.errors.acceptTerms'),
        description: t('emailCapture.errors.acceptTermsDesc')
      });
      return;
    }
    setIsLoading(true);
    try {
      // Detectar idioma atual do usuário
      const currentLanguage = localStorage.getItem('i18nextLng') || 'en';
      
      // Chamar a edge function do Brevo
      const { data, error } = await supabase.functions.invoke('brevo-subscribe', {
        body: {
          email: email.toLowerCase().trim(),
          language: currentLanguage,
          acceptedTerms: acceptTerms
        }
      });
      
      if (error) {
        console.error('Subscription error:', error);
        
        if (error.message?.includes('already subscribed')) {
          toast({
            variant: "destructive",
            title: t('emailCapture.errors.emailExists'),
            description: t('emailCapture.errors.emailExistsDesc')
          });
        } else {
          toast({
            variant: "destructive",
            title: t('emailCapture.errors.submitError'),
            description: t('emailCapture.errors.submitErrorDesc')
          });
        }
        return;
      }
      
      console.log('Email subscriber created and added to Brevo:', data);
      setIsSuccess(true);
      toast({
        title: t('emailCapture.successToast'),
        description: t('emailCapture.successToastDesc')
      });

      // Reset form
      setEmail('');
      setAcceptTerms(false);
    } catch (error) {
      console.error('Submit error:', error);
      toast({
        variant: "destructive",
        title: t('emailCapture.errors.submitError'),
        description: t('emailCapture.errors.submitErrorDesc')
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
              {t('emailCapture.successTitle')}
            </h2>
            <p className="text-body text-muted-foreground mb-8">
              {t('emailCapture.successMessage')}
            </p>
            
            <Button variant="outline" onClick={() => setIsSuccess(false)}>
              {t('emailCapture.anotherEmail')}
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
              {t('emailCapture.title')}
            </h2>
            <p className="text-body text-muted-foreground">
              {t('emailCapture.subtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Input type="email" placeholder={t('emailCapture.placeholder')} value={email} onChange={e => setEmail(e.target.value)} className="pl-12 h-12 text-body border-2 border-border focus:border-primary rounded-full" disabled={isLoading} />
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox id="accept-terms" checked={acceptTerms} onCheckedChange={checked => setAcceptTerms(checked as boolean)} disabled={isLoading} className="mt-1" />
                <label htmlFor="accept-terms" className="text-small text-muted-foreground leading-relaxed cursor-pointer">
                  {t('emailCapture.acceptTerms')}
                </label>
              </div>
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full h-12" disabled={isLoading}>
              {isLoading ? <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{t('emailCapture.loading')}</span>
                </div> : t('emailCapture.submitButton')}
            </Button>

            <p className="text-center text-small text-muted-foreground">{t('emailCapture.disclaimer')}</p>
          </form>
        </div>
      </div>
    </section>;
};
export default EmailCapture;