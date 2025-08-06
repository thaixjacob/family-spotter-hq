import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import familySpotLogo from "/lovable-uploads/32030f87-7b3e-4dce-9045-94a8807c8c76.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const languages = [
    { code: 'pt', label: 'Português' },
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' }
  ];

  const navItems = [
    { label: t('header.about'), href: '#sobre' },
    { label: t('header.howItWorks'), href: '#como-funciona' },
    { label: t('header.benefits'), href: '#beneficios' },
    { label: 'FAQ', href: '#preguntas-frecuentes' },
    { label: t('header.contact'), href: '#contato' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img 
              src={familySpotLogo} 
              alt="FamilySpot - Lugares family-friendly verificados en Madrid, Barcelona y Málaga" 
              className="h-8 w-auto"
            />
            <span className="font-baloo font-bold text-h3 text-secondary">
              FamilySpot
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-body text-foreground hover:text-primary transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
            
            {/* Language Selector */}
            <div className="relative group">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1"
              >
                <Globe className="w-4 h-4" />
                <span className="text-small">{languages.find(l => l.code === i18n.language)?.label}</span>
              </Button>
              
              <div className="absolute top-full right-0 mt-2 py-2 w-32 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => i18n.changeLanguage(lang.code)}
                    className={`w-full px-3 py-2 text-small text-left hover:bg-muted transition-colors ${
                      i18n.language === lang.code ? 'text-secondary font-medium' : 'text-foreground'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-body text-foreground hover:text-secondary transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              
              <div className="pt-2 border-t border-border">
                <p className="text-small text-muted-foreground mb-2">{t('header.language')}:</p>
                <div className="flex flex-col space-y-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        i18n.changeLanguage(lang.code);
                        setIsMenuOpen(false);
                      }}
                      className={`text-small text-left ${
                        i18n.language === lang.code ? 'text-secondary font-medium' : 'text-foreground'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;