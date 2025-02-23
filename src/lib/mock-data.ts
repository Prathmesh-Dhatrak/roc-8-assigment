
import { Project, TeamMember, RevenueData } from '../types/dashboard';
import { 
  UserIcon
} from 'lucide-react';

export const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Andrea',
    role: 'UI Designer',
    avatar: UserIcon,
    mood: 'happy'
  },
  {
    id: '2',
    name: 'Alvaro',
    role: 'Front-end Developer',
    avatar: UserIcon,
    mood: 'happy'
  },
  {
    id: '3',
    name: 'Juan',
    role: 'UX Senior',
    avatar: UserIcon,
    mood: 'neutral'
  },
  {
    id: '4',
    name: 'Jose',
    role: 'Marketing',
    avatar: UserIcon,
    mood: 'happy'
  },
  {
    id: '5',
    name: 'Maria',
    role: 'UX Junior',
    avatar: UserIcon,
    mood: 'happy'
  }
];

export const mockProjects: Project[] = [
    {
      id: '1',
      name: 'Insurance App',
      status: 'delayed',
      totalBudget: 70000,
      remainingBudget: -2500,
      actualHours: 100,
      estimatedHours: 80,
      team: [mockTeamMembers[0], mockTeamMembers[1]]
    },
    {
      id: '2',
      name: 'Neo',
      status: 'ongoing',
      totalBudget: 70000,
      remainingBudget: 4000,
      actualHours: 100,
      estimatedHours: 120,
      team: [mockTeamMembers[2]]
    },
    {
      id: '3',
      name: 'VR Website',
      status: 'ongoing',
      totalBudget: 70000,
      remainingBudget: 4000,
      actualHours: 100,
      estimatedHours: 150,
      team: [mockTeamMembers[3]]
    },
    {
      id: '4',
      name: 'VR Website 2',
      status: 'completed',
      totalBudget: 70000,
      remainingBudget: 4000,
      actualHours: 100,
      estimatedHours: 90,
      team: [mockTeamMembers[4]]
    }
  ];
  
export const mockRevenueData: RevenueData[] = [
    { date: '19 June', amount: 1000 },
    { date: '20 June', amount: 3500 },
    { date: '21 June', amount: 3700 },
    { date: '22 June', amount: 4200 },
    { date: '23 June', amount: 5500 },
    { date: '24 June', amount: 6500 },
    { date: '25 June', amount: 6500 }
  ];