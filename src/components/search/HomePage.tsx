import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface HomePageProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
  searchHistory: string[];
}

const HomePage = ({ searchQuery, setSearchQuery, handleSearch, searchHistory }: HomePageProps) => {
  return (
    <div className="max-w-3xl mx-auto mt-32 space-y-6">
      <div className="text-center space-y-4 animate-slide-up">
        <h2 className="text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Найди всё что нужно
        </h2>
        <p className="text-xl text-muted-foreground">
          Продвинутая поисковая система с умными фильтрами
        </p>
      </div>

      <div className="relative animate-scale-in">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-2xl blur-xl"></div>
        <Card className="relative p-2 border-2 shadow-2xl">
          <div className="flex gap-2">
            <Input
              placeholder="Введите поисковый запрос..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="text-lg h-14 border-0 focus-visible:ring-0"
            />
            <Button 
              size="lg" 
              onClick={handleSearch}
              className="px-8 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
            >
              <Icon name="Search" size={20} className="mr-2" />
              Найти
            </Button>
          </div>
        </Card>
      </div>

      {searchHistory.length > 0 && (
        <div className="space-y-3 animate-fade-in">
          <p className="text-sm text-muted-foreground">Последние запросы:</p>
          <div className="flex flex-wrap gap-2">
            {searchHistory.map((query, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => {
                  setSearchQuery(query);
                  handleSearch();
                }}
              >
                <Icon name="Clock" size={14} className="mr-2" />
                {query}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
