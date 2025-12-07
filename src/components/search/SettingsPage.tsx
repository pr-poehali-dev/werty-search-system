import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TabsContent } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface SettingsPageProps {
  searchHistory: string[];
  setSearchQuery: (query: string) => void;
  setActiveTab: (tab: string) => void;
}

const SettingsPage = ({ searchHistory, setSearchQuery, setActiveTab }: SettingsPageProps) => {
  return (
    <>
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
    </>
  );
};

export default SettingsPage;
