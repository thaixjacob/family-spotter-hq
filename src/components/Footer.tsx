import { useTranslation } from 'react-i18next';
import { Heart } from "lucide-react";
const familySpotLogo = "/lovable-uploads/455bbe5b-d7a3-4af9-963c-00074b8af666.png";
const Footer = () => {
  const { t } = useTranslation();
  const footerLinks = [{
    title: "Produto",
    links: [{
      label: "Como Funciona",
      href: "#como-funciona"
    }, {
      label: "Benefícios",
      href: "#beneficios"
    }, {
      label: "Sobre",
      href: "#sobre"
    }]
  }, {
    title: "Suporte",
    links: [{
      label: "Contato",
      href: "#contato"
    }, {
      label: "FAQ",
      href: "#faq"
    }, {
      label: "Ajuda",
      href: "#ajuda"
    }]
  }, {
    title: "Legal",
    links: [{
      label: "Privacidade",
      href: "#privacidade"
    }, {
      label: "Termos de Uso",
      href: "#termos"
    }, {
      label: "Cookies",
      href: "#cookies"
    }]
  }];
  return <footer className="bg-foreground text-background">
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
              Conectando famílias através da descoberta de lugares incríveis 
              para criar memórias inesquecíveis.
            </p>
            
            <div className="flex items-center space-x-2 text-small text-background/60">
              <span>Feito com</span>
              <Heart className="w-4 h-4 text-primary fill-current" />
              <span>para famílias</span>
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
                      className="text-body text-background/80 hover:text-secondary transition-colors"
                    >
                      {link.label}
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
              © 2025 FAMILYSPOT - Descubra lugares familiares
            </p>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-small text-background/60">
                  Plataforma em desenvolvimento
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