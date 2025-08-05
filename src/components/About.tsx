import { useTranslation } from 'react-i18next';
import { Heart, MapPin, Users, Baby } from "lucide-react";

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="sobre" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-h2 font-bold text-foreground mb-4">
            {t('about.title')}
          </h2>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Story Side */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Baby className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-h3 font-bold text-foreground mb-3">
                    {t('about.story.newMom.title')}
                  </h3>
                  <p className="text-body text-muted-foreground leading-relaxed">
                    {t('about.story.newMom.description')}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <MapPin className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-h3 font-bold text-foreground mb-3">
                    {t('about.story.discovery.title')}
                  </h3>
                  <p className="text-body text-muted-foreground leading-relaxed">
                    {t('about.story.discovery.description')}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-h3 font-bold text-foreground mb-3">
                    {t('about.story.solution.title')}
                  </h3>
                  <p className="text-body text-muted-foreground leading-relaxed">
                    {t('about.story.solution.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              {/* Quote */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <blockquote className="text-body text-muted-foreground italic text-center">
                  "{t('about.quote')}"
                </blockquote>
                <div className="text-center mt-4">
                  <span className="text-small text-foreground font-medium">
                    {t('about.founder')}
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-primary/20 to-primary-dark/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-secondary/20 to-secondary-dark/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;