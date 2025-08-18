import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="text-xl text-muted-foreground mb-4">Oops! Página não encontrada</p>
        <a 
          href="/" 
          className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-primary text-primary-foreground hover:shadow-glow transition-corporate"
        >
          Voltar ao Sistema Torre de Controle
        </a>
      </div>
    </div>
  );
};

export default NotFound;
