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
        <Card className="col-span-3 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-lg font-medium">Total revenue</CardTitle>
                <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                    <button
                        onClick={() => setView('week')}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${view === 'week' ? 'bg-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Week
                    </button>
                    <button
                        onClick={() => setView('month')}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${view === 'month' ? 'bg-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Month
                    </button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                                fontSize={12}
                                tickMargin={12}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                fontSize={12}
                                tickMargin={12}
                                tickFormatter={(value) => `$${value}`}
                            />
                            <Tooltip
                                contentStyle={{ background: 'white', border: 'none', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
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