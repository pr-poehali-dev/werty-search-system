import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface SearchResult {
  id: string;
  title: string;
  url: string;
  description: string;
  type: 'web' | 'image' | 'video' | 'news';
  date: string;
  source: string;
  relevance: number;
}

interface SearchResultsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
  contentType: string;
  setContentType: (type: string) => void;
  dateFilter: string;
  setDateFilter: (filter: string) => void;
  sourceFilter: string;
  setSourceFilter: (filter: string) => void;
  relevanceThreshold: number[];
  setRelevanceThreshold: (threshold: number[]) => void;
  filteredResults: SearchResult[];
}

const SearchResults = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  contentType,
  setContentType,
  dateFilter,
  setDateFilter,
  sourceFilter,
  setSourceFilter,
  relevanceThreshold,
  setRelevanceThreshold,
  filteredResults,
}: SearchResultsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex gap-2 items-center">
        <Input
          placeholder="Введите поисковый запрос..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="flex-1"
        />
        <Button onClick={handleSearch} className="bg-gradient-to-r from-primary to-secondary">
          <Icon name="Search" size={20} />
        </Button>
      </div>

      <Card className="p-6 border-2">
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Icon name="SlidersHorizontal" size={18} />
              Продвинутые фильтры
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Тип контента</label>
                <Select value={contentType} onValueChange={setContentType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      <div className="flex items-center gap-2">
                        <Icon name="Grid" size={16} />
                        Все типы
                      </div>
                    </SelectItem>
                    <SelectItem value="web">
                      <div className="flex items-center gap-2">
                        <Icon name="Globe" size={16} />
                        Веб-страницы
                      </div>
                    </SelectItem>
                    <SelectItem value="image">
                      <div className="flex items-center gap-2">
                        <Icon name="Image" size={16} />
                        Изображения
                      </div>
                    </SelectItem>
                    <SelectItem value="video">
                      <div className="flex items-center gap-2">
                        <Icon name="Video" size={16} />
                        Видео
                      </div>
                    </SelectItem>
                    <SelectItem value="news">
                      <div className="flex items-center gap-2">
                        <Icon name="Newspaper" size={16} />
                        Новости
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Дата</label>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="anytime">
                      <div className="flex items-center gap-2">
                        <Icon name="Calendar" size={16} />
                        Любое время
                      </div>
                    </SelectItem>
                    <SelectItem value="day">За день</SelectItem>
                    <SelectItem value="week">За неделю</SelectItem>
                    <SelectItem value="month">За месяц</SelectItem>
                    <SelectItem value="year">За год</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Источник</label>
                <Select value={sourceFilter} onValueChange={setSourceFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      <div className="flex items-center gap-2">
                        <Icon name="Database" size={16} />
                        Все источники
                      </div>
                    </SelectItem>
                    <SelectItem value="verified">Проверенные</SelectItem>
                    <SelectItem value="news">Новостные</SelectItem>
                    <SelectItem value="blog">Блоги</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Релевантность: {relevanceThreshold[0]}%
                </label>
                <Slider
                  value={relevanceThreshold}
                  onValueChange={setRelevanceThreshold}
                  max={100}
                  min={0}
                  step={5}
                  className="mt-3"
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Найдено результатов: <span className="font-semibold text-foreground">{filteredResults.length}</span>
          </p>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1">
              <Icon name="Filter" size={14} />
              {contentType !== 'all' ? 'Фильтры активны' : 'Без фильтров'}
            </Badge>
          </div>
        </div>

        {filteredResults.map((result, index) => (
          <Card 
            key={result.id} 
            className="p-6 hover:shadow-lg transition-all duration-300 hover:border-primary cursor-pointer animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {result.type === 'web' && <Icon name="Globe" size={12} className="mr-1" />}
                      {result.type === 'image' && <Icon name="Image" size={12} className="mr-1" />}
                      {result.type === 'video' && <Icon name="Video" size={12} className="mr-1" />}
                      {result.type === 'news' && <Icon name="Newspaper" size={12} className="mr-1" />}
                      {result.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{result.source}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{result.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-primary hover:underline mb-2">
                    {result.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">{result.url}</p>
                  <p className="text-foreground">{result.description}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-1 text-xs">
                    <Icon name="TrendingUp" size={14} className="text-accent" />
                    <span className="font-semibold">{result.relevance}%</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
