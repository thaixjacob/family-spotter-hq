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

        {/* Interactive Animation */}
        <div className="mb-20 flex justify-center">
          <div className="relative w-full max-w-2xl h-96 bg-gradient-to-br from-secondary/20 via-primary/20 to-accent/20 rounded-[2rem] p-8 overflow-hidden border-4 border-white/50 shadow-2xl">
            
            {/* Cartoon Mouse Cursor */}
            <div className={`absolute transition-all duration-1000 ease-bounce pointer-events-none z-50 ${
              animationPhase === 1 ? 'top-20 left-40' :
              animationPhase === 2 ? 'top-24 left-56' :
              animationPhase === 4 ? 'top-44 left-32' : 'top-16 left-28'
            }`}>
              <div className="relative transform hover:scale-110 transition-transform">
                <div className="w-10 h-10 bg-foreground rounded-full shadow-xl border-3 border-white animate-pulse"></div>
                <div className="absolute -top-1 -left-1 w-5 h-5 bg-white border-3 border-foreground rounded-full"></div>
                <div className="absolute top-6 left-4 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-foreground"></div>
              </div>
            </div>

            {/* Phase 1 & 2: Category Dropdown */}
            {(animationPhase === 1 || animationPhase === 2) && (
              <div className={`absolute top-16 left-16 transition-all duration-1000 ${
                animationPhase === 2 ? 'scale-50 opacity-0 rotate-12' : 'scale-100 opacity-100 animate-bounce'
              }`}>
                <div className="bg-white rounded-3xl shadow-2xl border-4 border-secondary/30 p-4 min-w-64">
                  {categories.map((category, idx) => (
                    <div
                      key={category}
                      className={`px-8 py-5 rounded-2xl text-button font-bold transition-all duration-500 cursor-pointer ${
                        category === "Playgrounds" && animationPhase === 2
                          ? "bg-primary text-white shadow-lg scale-110 transform animate-pulse"
                          : "hover:bg-gray-100 text-foreground hover:scale-105"
                      }`}
                    >
                      🎪 {category}
                    </div>
                  ))}
                </div>
                
                {/* Water Droplets Effect */}
                {animationPhase === 2 && (
                  <div className="absolute top-0 left-0 w-full h-full">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className={`absolute w-6 h-6 bg-primary/70 rounded-full animate-ping`}
                        style={{
                          left: `${15 + i * 12}%`,
                          top: `${25 + (i % 4) * 15}%`,
                          animationDelay: `${i * 0.1}s`,
                          animationDuration: '0.8s'
                        }}
                      ></div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Phase 3 & 4: Filter Rectangles */}
            {(animationPhase === 3 || animationPhase === 4 || animationPhase === 5) && (
              <div className={`absolute top-20 left-8 right-8 transition-all duration-1000 ${
                animationPhase === 5 ? 'opacity-0 scale-75 blur-sm' : 'opacity-100 scale-100'
              }`}>
                <div className="grid grid-cols-2 gap-6">
                  {filters.map((filter, idx) => (
                    <button
                      key={filter}
                      className={`px-6 py-5 rounded-3xl text-small font-bold transition-all duration-700 border-3 shadow-lg transform hover:scale-105 ${
                        selectedFilters.includes(filter)
                          ? "bg-secondary text-white border-secondary shadow-xl scale-110 animate-pulse"
                          : "bg-white hover:bg-gray-50 border-gray-200 text-foreground"
                      } ${animationPhase === 3 ? `animate-bounce` : ''}`}
                      style={{
                        animationDelay: animationPhase === 3 ? `${idx * 0.2}s` : '0s'
                      }}
                    >
                      {filter === "Shade" && "🌳"} 
                      {filter === "Drinking Fountain" && "💧"} 
                      {filter === "Accessibility" && "♿"} 
                      {filter === "Food Places Nearby" && "🍕"} {filter}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Phase 5: Liquid Swirl Transition */}
            {animationPhase === 5 && (
              <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-secondary/40 to-accent/40 animate-pulse"></div>
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full bg-gradient-to-br from-primary via-secondary to-accent opacity-80 animate-bounce shadow-xl"
                    style={{
                      width: `${25 + Math.random() * 40}px`,
                      height: `${25 + Math.random() * 40}px`,
                      left: `${Math.random() * 90}%`,
                      top: `${Math.random() * 90}%`,
                      animationDelay: `${i * 0.15}s`,
                      animationDuration: `${1.8 + Math.random() * 1.2}s`
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
                      left: `${10 + Math.random() * 80}%`,
                      top: `${10 + Math.random() * 80}%`,
                      animationDelay: `${i * 0.3}s`,
                      animationDuration: '1.5s'
                    }}
                  >
                    <div className="relative transform hover:scale-125 transition-transform">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-full shadow-2xl flex items-center justify-center border-4 border-white animate-pulse">
                        <MapPin className="w-7 h-7 text-white" />
                      </div>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-l-transparent border-r-transparent border-t-[15px] border-t-primary-dark"></div>
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