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

  const categories = ["Cafés", "Restaurantes", "Atividades", "Playgrounds"];
  const filters = ["Sombra", "Bebedouro público", "Acessibilidade", "Lugares para comer próximo"];

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
      setSelectedFilters(["Sombra", "Lugares para comer próximo"]);
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

        {/* Interactive Animation */}
        <div className="mb-20 flex justify-center">
          <div className="relative w-full max-w-lg h-80 bg-gradient-to-br from-secondary/20 via-primary/20 to-accent/20 rounded-[2rem] p-8 overflow-hidden border-4 border-white/50 shadow-2xl">
            
            {/* Cartoon Mouse Cursor */}
            <div className={`absolute transition-all duration-1000 ease-in-out pointer-events-none z-50 ${
              animationPhase === 1 ? 'top-20 left-36' :
              animationPhase === 2 ? 'top-24 left-52' :
              animationPhase === 4 ? 'top-40 left-28' : 'top-16 left-24'
            }`}>
              <div className="relative transform hover:scale-110 transition-transform">
                <div className="w-8 h-8 bg-foreground rounded-full shadow-xl border-2 border-white"></div>
                <div className="absolute -top-1 -left-1 w-4 h-4 bg-white border-2 border-foreground rounded-full"></div>
                <div className="absolute top-5 left-3 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-foreground"></div>
              </div>
            </div>

            {/* Phase 1 & 2: Dropdown */}
            {(animationPhase === 1 || animationPhase === 2) && (
              <div className={`absolute top-12 left-12 transition-all duration-1000 ${
                animationPhase === 2 ? 'scale-50 opacity-0 rotate-12' : 'scale-100 opacity-100'
              }`}>
                <div className="bg-white rounded-3xl shadow-2xl border-4 border-secondary/30 p-3 min-w-56">
                  {categories.map((category, idx) => (
                    <div
                      key={category}
                      className={`px-6 py-4 rounded-2xl text-button font-bold transition-all duration-500 cursor-pointer ${
                        category === "Playgrounds" && animationPhase === 2
                          ? "bg-primary text-white shadow-lg scale-110 transform"
                          : "hover:bg-gray-100 text-foreground"
                      }`}
                    >
                      🎪 {category}
                    </div>
                  ))}
                </div>
                
                {/* Droplets effect */}
                {animationPhase === 2 && (
                  <div className="absolute top-0 left-0 w-full h-full">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className={`absolute w-4 h-4 bg-primary/70 rounded-full animate-ping`}
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${30 + (i % 3) * 20}%`,
                          animationDelay: `${i * 0.15}s`,
                          animationDuration: '1s'
                        }}
                      ></div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Phase 3 & 4: Filter Buttons */}
            {(animationPhase === 3 || animationPhase === 4 || animationPhase === 5) && (
              <div className={`absolute top-16 left-6 right-6 transition-all duration-1000 ${
                animationPhase === 5 ? 'opacity-0 scale-75 blur-sm' : 'opacity-100 scale-100'
              }`}>
                <div className="grid grid-cols-2 gap-4">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      className={`px-5 py-4 rounded-3xl text-small font-bold transition-all duration-700 border-3 shadow-lg transform hover:scale-105 ${
                        selectedFilters.includes(filter)
                          ? "bg-secondary text-white border-secondary shadow-xl scale-110"
                          : "bg-white hover:bg-gray-50 border-gray-200 text-foreground"
                      }`}
                    >
                      {filter === "Sombra" && "🌳"} 
                      {filter === "Bebedouro público" && "💧"} 
                      {filter === "Acessibilidade" && "♿"} 
                      {filter === "Lugares para comer próximo" && "🍕"} {filter}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Phase 5: Liquid Mix Effect */}
            {animationPhase === 5 && (
              <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-secondary/40 to-accent/40 animate-pulse"></div>
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full bg-gradient-to-br from-primary via-secondary to-accent opacity-80 animate-bounce shadow-xl"
                    style={{
                      width: `${20 + Math.random() * 30}px`,
                      height: `${20 + Math.random() * 30}px`,
                      left: `${Math.random() * 85}%`,
                      top: `${Math.random() * 85}%`,
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: `${1.5 + Math.random() * 1}s`
                    }}
                  ></div>
                ))}
              </div>
            )}

            {/* Phase 5: Map Pins */}
            {showPins && (
              <div className="absolute inset-0">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute animate-bounce"
                    style={{
                      left: `${15 + Math.random() * 70}%`,
                      top: `${15 + Math.random() * 70}%`,
                      animationDelay: `${i * 0.4}s`,
                      animationDuration: '2s'
                    }}
                  >
                    <div className="relative transform hover:scale-125 transition-transform">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-full shadow-2xl flex items-center justify-center border-4 border-white">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-l-transparent border-r-transparent border-t-[12px] border-t-primary-dark"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
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