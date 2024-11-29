import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart as BarChartIcon, 
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  Table as TableIcon,
  Calendar,
  Download,
  RefreshCw,
  Clock
} from 'lucide-react';
import { Card, Title, BarChart, LineChart, DonutChart } from '@tremor/react';

interface ReportConfig {
  type: 'financial' | 'performance' | 'sales' | 'customer' | 'operational';
  timeRange: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annual' | 'custom';
  components: ('kpi' | 'chart' | 'table' | 'trend' | 'comparison' | 'summary')[];
  visualizations: ('bar' | 'line' | 'pie' | 'heatmap' | 'scatter' | 'table')[];
  autoRefresh: number | null;
  exportFormat: 'pdf' | 'excel' | 'csv';
}

const reportTypes = [
  { id: 'financial', label: 'Financial Analysis' },
  { id: 'performance', label: 'Performance Metrics' },
  { id: 'sales', label: 'Sales Overview' },
  { id: 'customer', label: 'Customer Insights' },
  { id: 'operational', label: 'Operational Statistics' },
];

const timeRanges = [
  { id: 'daily', label: 'Daily' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'quarterly', label: 'Quarterly' },
  { id: 'annual', label: 'Annual' },
  { id: 'custom', label: 'Custom Range' },
];

const components = [
  { id: 'kpi', label: 'Key Performance Indicators' },
  { id: 'chart', label: 'Charts and Graphs' },
  { id: 'table', label: 'Data Tables' },
  { id: 'trend', label: 'Trend Analysis' },
  { id: 'comparison', label: 'Comparative Statistics' },
  { id: 'summary', label: 'Executive Summary' },
];

const visualizations = [
  { id: 'bar', label: 'Bar Charts', icon: BarChartIcon },
  { id: 'line', label: 'Line Graphs', icon: LineChartIcon },
  { id: 'pie', label: 'Pie Charts', icon: PieChartIcon },
  { id: 'table', label: 'Data Tables', icon: TableIcon },
];

export default function CustomReport() {
  const [config, setConfig] = useState<ReportConfig>({
    type: 'financial',
    timeRange: 'monthly',
    components: ['kpi', 'chart', 'summary'],
    visualizations: ['bar', 'line'],
    autoRefresh: null,
    exportFormat: 'pdf',
  });

  const [customDateRange, setCustomDateRange] = useState({
    start: '',
    end: '',
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  // Sample data - replace with actual data
  const chartData = [
    { date: '2024-01', value: 2890 },
    { date: '2024-02', value: 3890 },
    { date: '2024-03', value: 4890 },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-xl bg-white/80 dark:bg-dark-secondary/80 rounded-xl shadow-lg border border-white/20 dark:border-dark-border/20 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-dark-text">
            Custom Report Generator
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Report'
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
              Report Type
            </label>
            <select
              value={config.type}
              onChange={(e) => setConfig({ ...config, type: e.target.value as ReportConfig['type'] })}
              className="w-full rounded-lg border border-gray-300 dark:border-dark-border px-3 py-2 bg-white dark:bg-dark-accent text-gray-900 dark:text-dark-text"
            >
              {reportTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
              Time Period
            </label>
            <select
              value={config.timeRange}
              onChange={(e) => setConfig({ ...config, timeRange: e.target.value as ReportConfig['timeRange'] })}
              className="w-full rounded-lg border border-gray-300 dark:border-dark-border px-3 py-2 bg-white dark:bg-dark-accent text-gray-900 dark:text-dark-text"
            >
              {timeRanges.map((range) => (
                <option key={range.id} value={range.id}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          {config.timeRange === 'custom' && (
            <div className="col-span-2 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={customDateRange.start}
                  onChange={(e) => setCustomDateRange({ ...customDateRange, start: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 dark:border-dark-border px-3 py-2 bg-white dark:bg-dark-accent text-gray-900 dark:text-dark-text"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={customDateRange.end}
                  onChange={(e) => setCustomDateRange({ ...customDateRange, end: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 dark:border-dark-border px-3 py-2 bg-white dark:bg-dark-accent text-gray-900 dark:text-dark-text"
                />
              </div>
            </div>
          )}

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
              Components
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {components.map((component) => (
                <label
                  key={component.id}
                  className="flex items-center space-x-2 p-2 rounded-lg border border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-accent cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={config.components.includes(component.id as any)}
                    onChange={(e) => {
                      const newComponents = e.target.checked
                        ? [...config.components, component.id]
                        : config.components.filter((c) => c !== component.id);
                      setConfig({ ...config, components: newComponents as ReportConfig['components'] });
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-dark-text">
                    {component.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
              Visualizations
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {visualizations.map((viz) => {
                const Icon = viz.icon;
                return (
                  <label
                    key={viz.id}
                    className="flex items-center space-x-2 p-2 rounded-lg border border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-accent cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={config.visualizations.includes(viz.id as any)}
                      onChange={(e) => {
                        const newVisualizations = e.target.checked
                          ? [...config.visualizations, viz.id]
                          : config.visualizations.filter((v) => v !== viz.id);
                        setConfig({ ...config, visualizations: newVisualizations as ReportConfig['visualizations'] });
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <Icon className="w-4 h-4 text-gray-500 dark:text-dark-muted" />
                    <span className="text-sm text-gray-700 dark:text-dark-text">
                      {viz.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
              Auto-Refresh Interval
            </label>
            <select
              value={config.autoRefresh?.toString() || ''}
              onChange={(e) => setConfig({ ...config, autoRefresh: e.target.value ? parseInt(e.target.value) : null })}
              className="w-full rounded-lg border border-gray-300 dark:border-dark-border px-3 py-2 bg-white dark:bg-dark-accent text-gray-900 dark:text-dark-text"
            >
              <option value="">Never</option>
              <option value="300">5 minutes</option>
              <option value="900">15 minutes</option>
              <option value="1800">30 minutes</option>
              <option value="3600">1 hour</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
              Export Format
            </label>
            <select
              value={config.exportFormat}
              onChange={(e) => setConfig({ ...config, exportFormat: e.target.value as ReportConfig['exportFormat'] })}
              className="w-full rounded-lg border border-gray-300 dark:border-dark-border px-3 py-2 bg-white dark:bg-dark-accent text-gray-900 dark:text-dark-text"
            >
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Preview Section */}
      {!isGenerating && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text">
              Report Preview
            </h3>
            <button className="flex items-center px-4 py-2 text-gray-700 dark:text-dark-text bg-white dark:bg-dark-accent rounded-lg border border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-border transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {config.visualizations.includes('bar') && (
              <Card>
                <Title>Revenue Trend</Title>
                <BarChart
                  data={chartData}
                  index="date"
                  categories={['value']}
                  colors={['blue']}
                  valueFormatter={(number) => `$${number.toLocaleString()}`}
                  yAxisWidth={48}
                />
              </Card>
            )}

            {config.visualizations.includes('line') && (
              <Card>
                <Title>Growth Analysis</Title>
                <LineChart
                  data={chartData}
                  index="date"
                  categories={['value']}
                  colors={['emerald']}
                  valueFormatter={(number) => `$${number.toLocaleString()}`}
                  yAxisWidth={48}
                />
              </Card>
            )}

            {config.visualizations.includes('pie') && (
              <Card>
                <Title>Distribution</Title>
                <DonutChart
                  data={[
                    { name: 'Category A', value: 35 },
                    { name: 'Category B', value: 45 },
                    { name: 'Category C', value: 20 },
                  ]}
                  category="value"
                  index="name"
                  valueFormatter={(number) => `${number}%`}
                  colors={['blue', 'cyan', 'indigo']}
                />
              </Card>
            )}

            {config.visualizations.includes('table') && (
              <Card>
                <Title>Detailed Data</Title>
                <div className="mt-4">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-border">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-muted uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-muted uppercase tracking-wider">
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-dark-border">
                      {chartData.map((row) => (
                        <tr key={row.date}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-dark-text">
                            {row.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-dark-text">
                            ${row.value.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}