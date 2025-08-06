import { useTranslation } from 'react-i18next';
import { Heart, Instagram, Music, Twitter, MessageCircle } from "lucide-react";
const familySpotLogo = "/lovable-uploads/455bbe5b-d7a3-4af9-963c-00074b8af666.png";
const Footer = () => {
  const { t } = useTranslation();
  const footerLinks = [
    {
      title: t('footer.product'),
      links: [
        {
          label: t('footer.howItWorks'),
          href: "#como-funciona"
        },
        {
          label: t('footer.benefits'),
          href: "#beneficios"
        },
        {
          label: t('footer.about'),
          href: "#sobre"
        }
      ]
    },
    {
      title: t('footer.followUs'),
      links: [
        {
          label: t('footer.instagram'),
          href: "https://instagram.com/familyspot.app",
          icon: Instagram
        },
        {
          label: t('footer.tiktok'), 
          href: "https://tiktok.com/@familyspot.app",
          icon: Music
        },
        {
          label: t('footer.twitter'),
          href: "https://x.com/familyspot_app", 
          icon: Twitter
        },
        {
          label: t('footer.threads'),
          href: "https://threads.net/@familyspot.app",
          icon: MessageCircle
        }
      ]
    },
    {
      title: t('footer.legal'),
      links: [
        {
          label: t('footer.privacy'),
          href: "#privacidade"
        },
        {
          label: t('footer.terms'),
          href: "#termos"
        },
        {
          label: t('footer.cookies'),
          href: "#cookies"
        }
      ]
    },
    {
      title: t('footer.contact'),
      links: [
        {
          label: "hi@familyspot.app",
          href: "mailto:hi@familyspot.app"
        }
      ]
    }
  ];
  return <footer id="contato" className="bg-foreground text-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <img src={familySpotLogo} alt="FamilySpot" className="h-10 w-auto" />
              <span className="font-baloo font-bold text-h3 text-secondary">
                FamilySpot
              </span>
            </div>
            
            <p className="text-body text-background/80 mb-6 max-w-sm">
              {t('footer.description')}
            </p>
            
            <div className="flex items-center space-x-2 text-small text-background/60">
              <span>{t('footer.madeWithLove')}</span>
              <Heart className="w-4 h-4 text-primary fill-current" />
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map(section => <div key={section.title}>
              <h3 className="text-h3 font-bold text-background mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map(link => (
                  <li key={link.label}>
                    <a 
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : '_self'}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-body text-background/80 hover:text-secondary transition-colors flex items-center space-x-2"
                    >
                      {link.icon && <link.icon className="w-4 h-4" />}
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>)}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-small text-background/60 text-center md:text-left">
              {t('footer.copyright')}
            </p>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse-green"></div>
                <span className="text-small text-background/60">
                  {t('footer.developmentStatus')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none"></div>
    </footer>;
};
export default Footer;