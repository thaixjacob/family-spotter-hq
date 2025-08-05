import { useTranslation } from 'react-i18next';
import { Shield, Filter, RefreshCw, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

const Benefits = () => {
  const { t } = useTranslation();
  const [animationPhase, setAnimationPhase] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showPins, setShowPins] = useState(false);
  const [visiblePins, setVisiblePins] = useState<number[]>([]);

  const benefits = [
    {
      icon: Shield,
      title: t('benefits.items.verified.title'),
      description: t('benefits.items.verified.description'),
      color: "primary"
    },
    {
      icon: Filter,
      title: t('benefits.items.filters.title'),
      description: t('benefits.items.filters.description'),
      color: "secondary"
    },
    {
      icon: RefreshCw,
      title: t('benefits.items.updated.title'),
      description: t('benefits.items.updated.description'),
      color: "accent"
    }
  ];

  const categories = [t('benefits.categories.cafes'), t('benefits.categories.restaurants'), t('benefits.categories.activities'), t('benefits.categories.playgrounds')];
  const filters = [t('benefits.filters.shade'), t('benefits.filters.drinkingFountain'), t('benefits.filters.accessibility'), t('benefits.filters.foodNearby')];

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
      setSelectedFilters([t('benefits.filters.shade'), t('benefits.filters.foodNearby')]);
      setAnimationPhase(4);
      
      // Phase 5: Show pins one by one
      await new Promise(resolve => setTimeout(resolve, 2000));
      setAnimationPhase(5);
      setShowPins(true);
      
      // Show pins one by one with pop-up effect
      for (let i = 0; i < 10; i++) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setVisiblePins(prev => [...prev, i]);
      }
      
      // Reset animation
      await new Promise(resolve => setTimeout(resolve, 3000));
      setAnimationPhase(0);
      setSelectedFilters([]);
      setShowPins(false);
      setVisiblePins([]);
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
            {t('benefits.title')}
          </h2>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto">
            {t('benefits.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
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

        {/* Interactive Animation */}
        <div className="mt-20 flex justify-center">
          <div className="relative w-full max-w-2xl h-96 bg-gradient-to-br from-secondary/20 via-primary/20 to-accent/20 rounded-[2rem] p-8 overflow-hidden border-4 border-white/50 shadow-2xl">

            {/* Phase 1 & 2: Category Dropdown */}
            {(animationPhase === 1 || animationPhase === 2) && (
              <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${
                animationPhase === 2 ? 'scale-0 opacity-0' : 'scale-100 opacity-100 animate-fade-in'
              }`}>
                <div className="bg-white rounded-3xl shadow-2xl border-4 border-secondary/30 p-4 min-w-64">
                  {categories.map((category, idx) => (
                    <div
                      key={category}
                      className={`px-8 py-5 rounded-2xl text-button font-bold transition-all duration-500 cursor-pointer ${
                        category === t('benefits.categories.playgrounds') && animationPhase === 2
                          ? "bg-primary text-white shadow-lg scale-110 transform"
                          : "hover:bg-gray-100 text-foreground hover:scale-105"
                      }`}
                    >
                      {category === t('benefits.categories.cafes') && "☕"} 
                      {category === t('benefits.categories.restaurants') && "🍽️"} 
                      {category === t('benefits.categories.activities') && "🎯"} 
                      {category === t('benefits.categories.playgrounds') && "🏰"} {category}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Phase 3 & 4: Filter Rectangles */}
            {(animationPhase === 3 || animationPhase === 4) && (
              <div className={`absolute top-20 left-8 right-8 transition-all duration-1000 opacity-100 scale-100`}>
                <div className="grid grid-cols-2 gap-6">
                  {filters.map((filter, idx) => (
                    <button
                      key={filter}
                      className={`px-6 py-5 rounded-3xl text-small font-bold transition-all duration-700 border-3 shadow-lg transform hover:scale-105 ${
                        selectedFilters.includes(filter)
                          ? "bg-secondary text-white border-secondary shadow-xl scale-110 animate-pulse"
                          : "bg-white hover:bg-gray-50 border-gray-200 text-foreground"
                      } ${animationPhase === 3 ? `animate-fade-in` : ''}`}
                      style={{
                        animationDelay: animationPhase === 3 ? `${idx * 0.3}s` : '0s'
                      }}
                    >
                      {filter === t('benefits.filters.shade') && "🌳"} 
                      {filter === t('benefits.filters.drinkingFountain') && "💧"} 
                      {filter === t('benefits.filters.accessibility') && "♿"} 
                      {filter === t('benefits.filters.foodNearby') && "🍕"} {filter}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Phase 5: Map Pins */}
            {showPins && (
              <div className="absolute inset-0">
                {[...Array(10)].map((_, i) => {
                  const positions = [
                    { left: '10%', top: '15%' },
                    { left: '75%', top: '25%' },
                    { left: '25%', top: '40%' },
                    { left: '85%', top: '55%' },
                    { left: '40%', top: '20%' },
                    { left: '60%', top: '70%' },
                    { left: '15%', top: '75%' },
                    { left: '70%', top: '45%' },
                    { left: '45%', top: '60%' },
                    { left: '30%', top: '80%' }
                  ];
                  
                  return visiblePins.includes(i) && (
                    <div
                      key={i}
                      className={`absolute ${
                        visiblePins.includes(i) ? 'animate-bounce' : 'opacity-0'
                      }`}
                      style={{
                        left: positions[i].left,
                        top: positions[i].top,
                        animationDuration: '1.5s'
                      }}
                    >
                      <div className={`transform transition-all duration-300 ${
                        visiblePins.includes(i) ? 'scale-100 animate-scale-in' : 'scale-0'
                      }`}>
                        <MapPin className="w-8 h-8 text-white drop-shadow-lg" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Benefits;