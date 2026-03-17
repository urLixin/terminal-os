import { FileSystemItem, Project, BlogPost } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Custom Hosting Infrastructure',
    description: 'Designed and managed a full-scale hosting infrastructure from scratch.',
    tags: ['SysAdmin', 'Infrastructure', 'Networking'],
  },
  {
    id: '2',
    title: 'Advanced Minecraft Plugins',
    description: 'Developed complex Java-based plugins for high-performance Minecraft servers.',
    tags: ['Java', 'Minecraft', 'Optimization'],
  },
  {
    id: '3',
    title: 'Terraform Network Automation',
    description: 'Automated server infrastructure deployment using Terraform.',
    tags: ['Terraform', 'IaC', 'DevOps'],
  }
];

export const CERTIFICATES = [
  {
    id: '1',
    title: 'Cisco Certified Support Technician (CCST) Networking',
    issuer: 'Cisco',
    date: 'Verified',
    link: 'https://www.credly.com/badges/e17bd084-2fc2-46bb-92b6-4ca382780e89/public_url'
  }
];

export const INITIAL_FILESYSTEM: FileSystemItem[] = [
  {
    name: 'home',
    type: 'dir',
    children: [
      {
        name: 'wlixin',
        type: 'dir',
        children: [
          { name: 'about.md', type: 'file', content: 'Name: WLixin\nAge: 17\nRole: Networking Specialist & SysAdmin\nExperience: 4 years Networking (Cisco Cert), 3 years SysAdmin.' },
          { name: 'skills.txt', type: 'file', content: 'Languages: Java, HTML, CSS\nTools: Terraform, Cisco IOS\nExpertise: Minecraft Plugin Dev (5y), Server Optimization (5y)' },
          { name: 'certificates.txt', type: 'file', content: 'Cisco Certified Support Technician (CCST) Networking' },
          { name: 'contact.txt', type: 'file', content: 'Discord: WLixin#0001\nEmail: wlixin@devsh.de' }
        ]
      }
    ]
  }
];
