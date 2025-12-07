import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface SearchHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SearchHeader = ({ activeTab, setActiveTab }: SearchHeaderProps) => {
  return (
    <header className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center animate-gradient bg-[length:200%_200%]">
          <Icon name="Search" size={24} className="text-white" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          WERTY
        </h1>
      </div>
      
      <nav className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => setActiveTab('home')}>
          <Icon name="Home" size={18} className="mr-2" />
          Главная
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setActiveTab('history')}>
          <Icon name="History" size={18} className="mr-2" />
          История
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setActiveTab('settings')}>
          <Icon name="Settings" size={18} className="mr-2" />
          Настройки
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setActiveTab('about')}>
          <Icon name="Info" size={18} className="mr-2" />
          О системе
        </Button>
      </nav>
    </header>
  );
};

export default SearchHeader;
