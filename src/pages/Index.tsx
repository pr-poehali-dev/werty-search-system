import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
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

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [contentType, setContentType] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('anytime');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [relevanceThreshold, setRelevanceThreshold] = useState([70]);
  const [searchHistory, setSearchHistory] = useState<string[]>([
    'TypeScript best practices',
    'React performance optimization',
    'Modern web design trends',
  ]);

  const mockResults: SearchResult[] = [
    {
      id: '1',
      title: 'Руководство по современной веб-разработке 2024',
      url: 'https://example.com/web-dev-guide',
      description: 'Полное руководство по современным трендам веб-разработки, включая новейшие фреймворки и инструменты для создания быстрых и отзывчивых приложений.',
      type: 'web',
      date: '2024-12-01',
      source: 'TechBlog',
      relevance: 95,
    },
    {
      id: '2',
      title: 'Топ-10 дизайн-трендов в 2024 году',
      url: 'https://example.com/design-trends',
      description: 'Исследование актуальных трендов в UI/UX дизайне: от микроанимаций до продвинутых градиентов и glassmorphism эффектов.',
      type: 'web',
      date: '2024-11-28',
      source: 'DesignWeekly',
      relevance: 88,
    },
    {
      id: '3',
      title: 'Как оптимизировать производительность веб-приложений',
      url: 'https://example.com/performance',
      description: 'Практическое руководство по улучшению скорости загрузки и отзывчивости современных веб-приложений с использованием передовых техник.',
      type: 'web',
      date: '2024-11-15',
      source: 'DevMasters',
      relevance: 92,
    },
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSearchHistory(prev => [searchQuery, ...prev.filter(q => q !== searchQuery).slice(0, 4)]);
      setActiveTab('results');
    }
  };

  const filteredResults = mockResults.filter(result => {
    if (contentType !== 'all' && result.type !== contentType) return false;
    if (result.relevance < relevanceThreshold[0]) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-6">
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="home" className="space-y-8 animate-fade-in">
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
          </TabsContent>

          <TabsContent value="results" className="space-y-6 animate-fade-in">
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
          </TabsContent>

          <TabsContent value="history" className="space-y-6 animate-fade-in">
            <Card className="p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Icon name="History" size={28} className="text-primary" />
                    История поиска
                  </h2>
                  <Button variant="outline" size="sm">
                    <Icon name="Trash2" size={16} className="mr-2" />
                    Очистить историю
                  </Button>
                </div>
                <Separator />
                <div className="space-y-3">
                  {searchHistory.map((query, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg hover:bg-muted transition-colors cursor-pointer group"
                      onClick={() => {
                        setSearchQuery(query);
                        setActiveTab('results');
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <Icon name="Search" size={18} className="text-muted-foreground" />
                        <span className="font-medium">{query}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Недавно</span>
                        <Icon name="ChevronRight" size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6 animate-fade-in">
            <Card className="p-8">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Icon name="Settings" size={28} className="text-primary" />
                  Настройки
                </h2>
                <Separator />
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Icon name="Palette" size={18} />
                      Внешний вид
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="p-4 cursor-pointer hover:border-primary transition-colors border-2 border-primary">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
                          <span className="font-medium">Яркая тема</span>
                        </div>
                      </Card>
                      <Card className="p-4 cursor-pointer hover:border-primary transition-colors">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-gray-800"></div>
                          <span className="font-medium">Тёмная тема</span>
                        </div>
                      </Card>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Icon name="Zap" size={18} />
                      Производительность
                    </h3>
                    <div className="space-y-2">
                      <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-muted transition-colors">
                        <span>Быстрый поиск</span>
                        <input type="checkbox" defaultChecked className="w-5 h-5" />
                      </label>
                      <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-muted transition-colors">
                        <span>Автодополнение</span>
                        <input type="checkbox" defaultChecked className="w-5 h-5" />
                      </label>
                      <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-muted transition-colors">
                        <span>Сохранять историю</span>
                        <input type="checkbox" defaultChecked className="w-5 h-5" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="about" className="space-y-6 animate-fade-in">
            <Card className="p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center animate-gradient bg-[length:200%_200%]">
                    <Icon name="Sparkles" size={40} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">WERTY</h2>
                    <p className="text-muted-foreground">Версия 1.0.0</p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Icon name="Target" size={18} className="text-primary" />
                      О системе
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      WERTY — это современная поисковая система с продвинутыми фильтрами и интеллектуальными алгоритмами поиска.
                      Мы помогаем находить именно то, что вам нужно, используя умные технологии фильтрации по типам контента,
                      датам, источникам и релевантности.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Rocket" size={18} className="text-secondary" />
                      Ключевые возможности
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <Icon name="Filter" size={20} className="text-primary mt-1" />
                        <div>
                          <p className="font-medium">Продвинутые фильтры</p>
                          <p className="text-sm text-muted-foreground">Точная настройка поиска</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <Icon name="Zap" size={20} className="text-accent mt-1" />
                        <div>
                          <p className="font-medium">Быстрый поиск</p>
                          <p className="text-sm text-muted-foreground">Результаты за миллисекунды</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <Icon name="Brain" size={20} className="text-secondary mt-1" />
                        <div>
                          <p className="font-medium">Умная релевантность</p>
                          <p className="text-sm text-muted-foreground">Лучшие результаты первыми</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <Icon name="History" size={20} className="text-primary mt-1" />
                        <div>
                          <p className="font-medium">История поиска</p>
                          <p className="text-sm text-muted-foreground">Быстрый доступ к запросам</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
