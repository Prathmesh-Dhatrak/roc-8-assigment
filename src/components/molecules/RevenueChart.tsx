import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RevenueData } from '@/types/dashboard';

type RevenueChartProps = {
    data: RevenueData[];
};

export const RevenueChart = ({ data }: RevenueChartProps) => {
    const [view, setView] = useState<'week' | 'month'>('week');

    return (
        <Card className="col-span-full lg:col-span-3 shadow-sm">
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0 pb-4">
                <CardTitle className="text-base sm:text-lg font-medium">Total revenue</CardTitle>
                <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 w-full sm:w-auto">
                    <button
                        onClick={() => setView('week')}
                        className={`flex-1 sm:flex-none px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                            view === 'week' ? 'bg-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Week
                    </button>
                    <button
                        onClick={() => setView('month')}
                        className={`flex-1 sm:flex-none px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                            view === 'month' ? 'bg-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Month
                    </button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-[200px] sm:h-[250px] md:h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                                fontSize={10}
                                tickMargin={8}
                                tick={{ fontSize: '10px' }}
                                height={30}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                fontSize={10}
                                tickMargin={8}
                                tickFormatter={(value) => `$${value}`}
                                width={40}
                            />
                            <Tooltip
                                contentStyle={{ 
                                    background: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                    fontSize: '12px',
                                    padding: '8px'
                                }}
                                formatter={(value) => [`$${value}`, 'Revenue']}
                            />
                            <Line
                                type="monotone"
                                dataKey="amount"
                                stroke="#0EA5E9"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};