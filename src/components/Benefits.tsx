import { Shield, Filter, RefreshCw, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

const Benefits = () => {
  const [animationPhase, setAnimationPhase] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showPins, setShowPins] = useState(false);

  const benefits = [
    {
      icon: Shield,
      title: "Lugares Verificados pela Comunidade",
      description: "Todos os locais são recomendados e avaliados por pais reais, garantindo informações confiáveis e atualizadas.",
      color: "primary"
    },
    {
      icon: Filter,
      title: "Filtros por Idade e Necessidades",
      description: "Encontre lugares perfeitos para cada faixa etária do seu filho, desde bebês até crianças maiores.",
      color: "secondary"
    },
    {
      icon: RefreshCw,
      title: "Informações Atualizadas",
      description: "A comunidade mantém as informações sempre frescas, com horários, preços e condições atuais.",
      color: "accent"
    }
  ];

  const categories = ["Cafés", "Restaurants", "Activities", "Playgrounds"];
  const filters = ["Shade", "Drinking Fountain", "Accessibility", "Food Places Nearby"];

  useEffect(() => {
    const sequence = async () => {
      // Phase 1: Show dropdown
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAnimationPhase(1);
      
      // Phase 2: Click on Playground
      await new Promise(resolve => setTimeout(resolve, 2000));
      setAnimationPhase(2);
      
      // Phase 3: Show filters
      await new Promise(resolve => setTimeout(resolve, 1500));
      setAnimationPhase(3);
      
      // Phase 4: Select filters
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSelectedFilters(["Shade", "Food Places Nearby"]);
      setAnimationPhase(4);
      
      // Phase 5: Mix and show pins
      await new Promise(resolve => setTimeout(resolve, 2000));
      setAnimationPhase(5);
      setShowPins(true);
      
      // Reset animation
      await new Promise(resolve => setTimeout(resolve, 3000));
      setAnimationPhase(0);
      setSelectedFilters([]);
      setShowPins(false);
    };

    sequence();
    const interval = setInterval(sequence, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-h2 font-bold text-foreground mb-4">
            Por que Escolher o FamilySpot?
          </h2>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto">
            Criado por pais, para pais. Entendemos suas necessidades e 
            queremos facilitar suas descobertas familiares.
          </p>
        </div>


        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={benefit.title} className="group">
                <div className="h-full p-8 bg-card border border-border rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl mb-6 flex items-center justify-center ${
                    benefit.color === 'primary' ? 'bg-primary/10 text-primary' :
                    benefit.color === 'secondary' ? 'bg-secondary/10 text-secondary' :
                    'bg-accent/10 text-accent'
                  } group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-7 h-7" />
                  </div>

                  {/* Content */}
                  <h3 className="text-h3 font-bold text-foreground mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-body text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Benefits;