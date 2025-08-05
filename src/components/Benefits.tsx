import { Shield, Filter, RefreshCw } from "lucide-react";

const Benefits = () => {
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

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "500+", label: "Lugares cadastrados" },
            { number: "50+", label: "Cidades cobertas" },
            { number: "1000+", label: "Famílias conectadas" },
            { number: "24h", label: "Suporte da comunidade" }
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-h2 font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-small text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;