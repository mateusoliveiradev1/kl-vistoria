import { Home, AlertTriangle } from 'lucide-react';
import { Button } from './ui/Button';

export function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center max-w-lg">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <AlertTriangle className="w-12 h-12 text-red-500" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Página não encontrada</h1>
        <p className="text-xl text-gray-600 mb-8">
          Ops! Parece que você tentou acessar um caminho que não existe na nossa unidade móvel.
        </p>
        
        <div className="flex justify-center gap-4">
          <a href="/">
            <Button size="lg" className="gap-2">
              <Home className="w-5 h-5" />
              Voltar para o Início
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
