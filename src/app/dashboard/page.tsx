'use client';

import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Chart, ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent,} from '@/components/ui/chart';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import {ScrollArea} from '@/components/ui/scroll-area';
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Icons} from '@/components/icons';

const DashboardPage: React.FC = () => {
  const requestData = [
    {id: 1, timestamp: '2024-07-08 10:00', endpoint: '/api/users', method: 'GET', status: 200},
    {id: 2, timestamp: '2024-07-08 10:05', endpoint: '/api/products', method: 'POST', status: 201},
    {id: 3, timestamp: '2024-07-08 10:10', endpoint: '/api/users/123', method: 'DELETE', status: 204},
    {id: 4, timestamp: '2024-07-08 10:15', endpoint: '/api/orders', method: 'GET', status: 500},
  ];

  const accessData = [
    {id: 1, timestamp: '2024-07-08 10:00', user: 'john.doe@example.com', action: 'Login', result: 'Success'},
    {id: 2, timestamp: '2024-07-08 10:05', user: 'jane.doe@example.com', action: 'Logout', result: 'Success'},
    {id: 3, timestamp: '2024-07-08 10:10', user: 'admin@example.com', action: 'Create User', result: 'Success'},
    {id: 4, timestamp: '2024-07-08 10:15', user: 'john.doe@example.com', action: 'Access Denied', result: 'Failure'},
  ];

  const chartConfig = {
    requests: {
      label: 'Requests',
      color: 'hsl(var(--chart-1))',
    },
    access: {
      label: 'Access',
      color: 'hsl(var(--chart-2))',
    },
    errors: {
      label: 'Errors',
      color: 'hsl(var(--destructive))',
    },
  };

  const data = [
    {name: 'Page A', requests: 4000, access: 2400, errors: 100},
    {name: 'Page B', requests: 3000, access: 1398, errors: 200},
    {name: 'Page C', requests: 2000, access: 9800, errors: 50},
    {name: 'Page D', requests: 2780, access: 3908, errors: 300},
    {name: 'Page E', requests: 1890, access: 4800, errors: 10},
    {name: 'Page F', requests: 2390, access: 3800, errors: 0},
    {name: 'Page G', requests: 3490, access: 4300, errors: 200},
  ];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
        <Card>
          <CardHeader>
            <CardTitle>Total Requests</CardTitle>
            <CardDescription>Number of requests received</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,567</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Access</CardTitle>
            <CardDescription>Number of access events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,234</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Error Rate</CardTitle>
            <CardDescription>Percentage of requests with errors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Uptime</CardTitle>
            <CardDescription>System uptime percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.9%</div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-5">
        <Card>
          <CardHeader>
            <CardTitle>Requests and Access Overview</CardTitle>
            <CardDescription>Graphical representation of requests and access events</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <Chart>
                <ChartLine dataKey="requests" stroke="hsl(var(--chart-1))"/>
                <ChartLine dataKey="access" stroke="hsl(var(--chart-2))"/>
                <ChartLine dataKey="errors" stroke="hsl(var(--destructive))"/>
                <ChartTooltip>
                  <ChartTooltipContent/>
                </ChartTooltip>
                <ChartLegend/>
              </Chart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        <Card>
          <CardHeader>
            <CardTitle>Recent Requests</CardTitle>
            <CardDescription>List of recent requests made to the system</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[300px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Endpoint</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requestData.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{request.id}</TableCell>
                      <TableCell>{request.timestamp}</TableCell>
                      <TableCell>{request.endpoint}</TableCell>
                      <TableCell>{request.method}</TableCell>
                      <TableCell>{request.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Access Logs</CardTitle>
            <CardDescription>List of recent access events</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[300px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Result</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accessData.map((access) => (
                    <TableRow key={access.id}>
                      <TableCell>{access.id}</TableCell>
                      <TableCell>{access.timestamp}</TableCell>
                      <TableCell>{access.user}</TableCell>
                      <TableCell>{access.action}</TableCell>
                      <TableCell>{access.result}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Access Control</CardTitle>
          <CardDescription>Manage user access and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="user-select" className="block text-sm font-medium leading-6 text-foreground">Select User</label>
              <div className="mt-2">
                <Select>
                  <SelectTrigger id="user-select">
                    <SelectValue placeholder="Select a user"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john.doe@example.com">john.doe@example.com</SelectItem>
                    <SelectItem value="jane.doe@example.com">jane.doe@example.com</SelectItem>
                    <SelectItem value="admin@example.com">admin@example.com</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label htmlFor="permission-input" className="block text-sm font-medium leading-6 text-foreground">Add Permission</label>
              <div className="mt-2">
                <Input type="text" id="permission-input" placeholder="Enter permission"/>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Button>Add Permission</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
