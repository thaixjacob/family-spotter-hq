import { useTranslation } from 'react-i18next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const { t } = useTranslation();

  const faqItems = [
    {
      id: "what-is-familyspot",
      question: t('faq.items.whatIs.question'),
      answer: t('faq.items.whatIs.answer')
    },
    {
      id: "how-verification-works",
      question: t('faq.items.verification.question'),
      answer: t('faq.items.verification.answer')
    },
    {
      id: "cost",
      question: t('faq.items.cost.question'),
      answer: t('faq.items.cost.answer')
    },
    {
      id: "when-launch",
      question: t('faq.items.launch.question'),
      answer: t('faq.items.launch.answer')
    },
    {
      id: "contribute",
      question: t('faq.items.contribute.question'),
      answer: t('faq.items.contribute.answer')
    },
    {
      id: "cities",
      question: t('faq.items.cities.question'),
      answer: t('faq.items.cities.answer')
    }
  ];

  return (
    <section id="preguntas-frecuentes" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-h2 font-bold text-foreground mb-4">
              {t('faq.title')}
            </h2>
            <p className="text-body text-muted-foreground max-w-2xl mx-auto">
              {t('faq.subtitle')}
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item) => (
              <AccordionItem 
                key={item.id} 
                value={item.id}
                className="bg-background border border-border rounded-lg px-6 py-2 shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left text-base font-medium text-foreground hover:text-primary transition-colors">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pt-2 pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-12">
            <p className="text-small text-muted-foreground mb-4">
              {t('faq.moreQuestions')}
            </p>
            <a 
              href="mailto:hello@familyspot.app" 
              className="text-primary hover:text-primary-dark font-medium transition-colors"
            >
              hello@familyspot.app
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;