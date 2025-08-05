import { useTranslation } from 'react-i18next';
import { Map, Users, Plus } from "lucide-react";

const HowItWorks = () => {
  const { t } = useTranslation();
  
  const steps = [
    {
      icon: Map,
      title: t('howItWorks.steps.explore.title'),
      description: t('howItWorks.steps.explore.description'),
      color: "primary",
      gradient: "from-primary to-primary-dark"
    },
    {
      icon: Users,
      title: t('howItWorks.steps.trust.title'),
      description: t('howItWorks.steps.trust.description'),
      color: "secondary",
      gradient: "from-secondary to-secondary-dark"
    },
    {
      icon: Plus,
      title: t('howItWorks.steps.contribute.title'),
      description: t('howItWorks.steps.contribute.description'),
      color: "accent",
      gradient: "from-accent to-accent-dark"
    }
  ];

  return (
    <section id="como-funciona" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-h2 font-bold text-foreground mb-4">
            {t('howItWorks.title')}
          </h2>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={step.title} className="relative">
                {/* Connection Line (hidden on mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-border to-transparent z-0"></div>
                )}
                
                <div className="relative z-10 text-center group hover:scale-105 transition-transform duration-300">
                  {/* Icon Container */}
                  <div className={`mx-auto w-16 h-16 rounded-full bg-gradient-to-br ${step.gradient} p-4 mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                    <IconComponent className="w-full h-full text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-h3 font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-body text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Context */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 bg-card border border-border rounded-xl shadow-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse-green"></div>
              <span className="text-small text-muted-foreground">
                {t('howItWorks.development')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;