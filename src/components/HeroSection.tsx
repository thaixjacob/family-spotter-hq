import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-family.jpg";

const HeroSection = () => {
  const scrollToEmailCapture = () => {
    const emailSection = document.getElementById('email-capture');
    emailSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/30 to-secondary/5">
      <div className="container mx-auto px-4 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-h1 font-bold text-foreground leading-tight">
                Descubra os{" "}
                <span className="text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
                  Melhores Lugares
                </span>{" "}
                para sua Família
              </h1>
              
              <p className="text-body text-muted-foreground max-w-xl mx-auto lg:mx-0">
                Uma comunidade de pais ajudando pais a encontrar lugares seguros, 
                divertidos e adequados para crianças em suas cidades e no mundo afora
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                variant="hero" 
                size="lg"
                onClick={scrollToEmailCapture}
                className="group"
              >
                Quero ser notificado do lançamento
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Saiba mais
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center lg:justify-start space-x-6 pt-8">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-small text-muted-foreground">100% gratuito</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-small text-muted-foreground">Verificado pela comunidade</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-secondary rounded-full"></div>
                <span className="text-small text-muted-foreground">Sempre atualizado</span>
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src={heroImage}
                alt="Família feliz explorando lugares incríveis"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-accent to-accent-dark rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-primary to-primary-dark rounded-full opacity-20 blur-xl"></div>
            <div className="absolute top-1/2 -right-4 w-16 h-16 bg-gradient-to-br from-secondary to-secondary-dark rounded-full opacity-30 blur-lg"></div>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-secondary/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-accent/5 to-transparent rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default HeroSection;