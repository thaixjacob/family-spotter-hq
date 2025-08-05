const FloatingCircles = ({ variant = "primary" }: { variant?: "primary" | "secondary" | "accent" }) => {
  const getColorClasses = () => {
    switch (variant) {
      case "secondary":
        return "bg-secondary/10";
      case "accent":
        return "bg-accent/15";
      default:
        return "bg-primary/10";
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Círculo grande */}
      <div 
        className={`absolute w-32 h-32 ${getColorClasses()} rounded-full blur-sm animate-[float_8s_ease-in-out_infinite]`}
        style={{
          top: '20%',
          left: '10%',
          animationDelay: '0s'
        }}
      />
      
      {/* Círculo médio */}
      <div 
        className={`absolute w-24 h-24 ${getColorClasses()} rounded-full blur-sm animate-[float_6s_ease-in-out_infinite]`}
        style={{
          top: '60%',
          right: '15%',
          animationDelay: '2s'
        }}
      />
      
      {/* Círculo pequeno */}
      <div 
        className={`absolute w-16 h-16 ${getColorClasses()} rounded-full blur-sm animate-[float_10s_ease-in-out_infinite]`}
        style={{
          top: '80%',
          left: '70%',
          animationDelay: '4s'
        }}
      />
    </div>
  );
};

export default FloatingCircles;