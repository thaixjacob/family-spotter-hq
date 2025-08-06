import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-family.jpg";

const HeroSection = () => {
  const { t } = useTranslation();
  const scrollToEmailCapture = () => {
    const emailSection = document.getElementById('email-capture');
    emailSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/30 to-secondary/5">
      <div className="container mx-auto px-2 sm:px-4 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Encuentra los mejores <span className="text-primary">lugares family-friendly</span> de Madrid, Barcelona y Málaga
              </h1>
              
              <p className="text-body text-muted-foreground max-w-lg mx-auto lg:mx-0 px-4 sm:px-0">
                {t('hero.subtitle')}
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 justify-center lg:justify-start lg:items-center">
              <Button 
                variant="hero" 
                size="lg"
                onClick={scrollToEmailCapture}
                className="group text-sm sm:text-base px-4 sm:px-6 lg:flex-[2]"
              >
                {t('hero.notifyLaunch')}
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm sm:text-base px-4 sm:px-6 lg:flex-1"
              >
                {t('hero.learnMore')}
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-row flex-wrap gap-4 items-center justify-center lg:justify-start pt-6 px-4 sm:px-0">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <div className="flex items-center space-x-1.5">
                  <div className="w-2.5 h-2.5 bg-success rounded-full"></div>
                  <span className="text-xs sm:text-small text-muted-foreground">{t('hero.trustIndicators.free')}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>
                  <span className="text-xs sm:text-small text-muted-foreground">{t('hero.trustIndicators.verified')}</span>
                </div>
              </div>
              <div className="flex items-center space-x-1.5">
                <div className="w-2.5 h-2.5 bg-secondary rounded-full"></div>
                <span className="text-xs sm:text-small text-muted-foreground">{t('hero.trustIndicators.updated')}</span>
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="/lovable-uploads/b46a0d7b-97fa-4d8e-bd0f-8dce6c56987a.png"
                alt="Familia feliz descubriendo restaurantes family-friendly en Madrid, Barcelona y Málaga"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-accent to-accent-dark rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-primary to-primary-dark rounded-full opacity-20 blur-xl"></div>
            <div className="absolute top-1/2 -right-2 w-12 h-12 bg-gradient-to-br from-secondary to-secondary-dark rounded-full opacity-30 blur-lg"></div>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-20 left-4 w-48 h-48 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-4 w-64 h-64 bg-gradient-to-br from-secondary/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-accent/5 to-transparent rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default HeroSection;