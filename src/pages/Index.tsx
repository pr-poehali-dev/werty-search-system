import { useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import SearchHeader from '@/components/search/SearchHeader';
import HomePage from '@/components/search/HomePage';
import SearchResults from '@/components/search/SearchResults';
import SettingsPage from '@/components/search/SettingsPage';

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
        <SearchHeader activeTab={activeTab} setActiveTab={setActiveTab} />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="home" className="space-y-8 animate-fade-in">
            <HomePage
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
              searchHistory={searchHistory}
            />
          </TabsContent>

          <TabsContent value="results" className="animate-fade-in">
            <SearchResults
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
              contentType={contentType}
              setContentType={setContentType}
              dateFilter={dateFilter}
              setDateFilter={setDateFilter}
              sourceFilter={sourceFilter}
              setSourceFilter={setSourceFilter}
              relevanceThreshold={relevanceThreshold}
              setRelevanceThreshold={setRelevanceThreshold}
              filteredResults={filteredResults}
            />
          </TabsContent>

          <SettingsPage
            searchHistory={searchHistory}
            setSearchQuery={setSearchQuery}
            setActiveTab={setActiveTab}
          />
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
