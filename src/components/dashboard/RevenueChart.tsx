import React, { useState } from 'react';
import { Card, Title, AreaChart, Tab, TabList, TabGroup, Text, Grid, Metric, Flex, BadgeDelta } from '@tremor/react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const chartdata = [
  {
    date: 'Jan 22',
    Revenue: 2890,
    Profit: 2400,
    Expenses: 490
  },
  {
    date: 'Feb 22',
    Revenue: 3890,
    Profit: 3200,
    Expenses: 690
  },
  {
    date: 'Mar 22',
    Revenue: 4890,
    Profit: 3800,
    Expenses: 1090
  },
  {
    date: 'Apr 22',
    Revenue: 4950,
    Profit: 3900,
    Expenses: 1050
  },
  {
    date: 'May 22',
    Revenue: 5890,
    Profit: 4200,
    Expenses: 1690
  },
  {
    date: 'Jun 22',
    Revenue: 6890,
    Profit: 5200,
    Expenses: 1690
  },
];

const calculateGrowth = (data: typeof chartdata) => {
  const firstMonth = data[0];
  const lastMonth = data[data.length - 1];
  
  const revenueGrowth = ((lastMonth.Revenue - firstMonth.Revenue) / firstMonth.Revenue) * 100;
  const profitGrowth = ((lastMonth.Profit - firstMonth.Profit) / firstMonth.Profit) * 100;
  
  return { revenueGrowth, profitGrowth };
};

const metrics = {
  revenue: {
    title: 'Total Revenue',
    metric: '$6,890',
    subtext: 'Last month',
    icon: DollarSign,
    color: 'indigo',
  },
  profit: {
    title: 'Net Profit',
    metric: '$5,200',
    subtext: 'Last month',
    icon: TrendingUp,
    color: 'cyan',
  },
};

export default function RevenueChart() {
  const [selectedView, setSelectedView] = useState('1');
  const { revenueGrowth, profitGrowth } = calculateGrowth(chartdata);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white rounded-xl shadow-md">
        <div className="mb-8">
          <Flex>
            <Title>Revenue & Profit Overview</Title>
            <TabGroup index={selectedView} onIndexChange={setSelectedView}>
              <TabList variant="solid" className="w-fit">
                <Tab>6 Months</Tab>
                <Tab>YTD</Tab>
                <Tab>All Time</Tab>
              </TabList>
            </TabGroup>
          </Flex>
        </div>

        <Grid numItems={1} numItemsSm={2} className="gap-6 mb-6">
          {Object.entries(metrics).map(([key, { title, metric, subtext, icon: Icon, color }]) => (
            <Card key={key} decoration="top" decorationColor={color as any}>
              <Flex>
                <div>
                  <Text>{title}</Text>
                  <Metric>{metric}</Metric>
                  <Text className="mt-2">{subtext}</Text>
                </div>
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-50">
                  <Icon className={`w-6 h-6 text-${color}-500`} />
                </div>
              </Flex>
              <Flex className="mt-4 space-x-2">
                <BadgeDelta
                  deltaType={key === 'revenue' ? (revenueGrowth >= 0 ? 'increase' : 'decrease') : (profitGrowth >= 0 ? 'increase' : 'decrease')}
                >
                  {key === 'revenue' ? revenueGrowth.toFixed(1) : profitGrowth.toFixed(1)}%
                </BadgeDelta>
                <Text>vs. 6 months ago</Text>
              </Flex>
            </Card>
          ))}
        </Grid>

        <AreaChart
          className="h-72 mt-4"
          data={chartdata}
          index="date"
          categories={["Revenue", "Profit", "Expenses"]}
          colors={["indigo", "cyan", "rose"]}
          valueFormatter={(number) => `$${number.toLocaleString()}`}
          yAxisWidth={60}
          showAnimation={true}
          showLegend={true}
          showGridLines={true}
          showTooltip={true}
          curveType="natural"
        />

        <Grid numItems={1} numItemsSm={2} className="gap-6 mt-6">
          <Card>
            <Title>Profit Margin</Title>
            <Metric className="mt-2">
              {((chartdata[chartdata.length - 1].Profit / chartdata[chartdata.length - 1].Revenue) * 100).toFixed(1)}%
            </Metric>
            <Text className="mt-2">Last month</Text>
          </Card>
          <Card>
            <Title>Monthly Growth</Title>
            <Metric className="mt-2">
              {((chartdata[chartdata.length - 1].Revenue - chartdata[chartdata.length - 2].Revenue) / chartdata[chartdata.length - 2].Revenue * 100).toFixed(1)}%
            </Metric>
            <Text className="mt-2">Revenue increase</Text>
          </Card>
        </Grid>
      </Card>
    </motion.div>
  );
}