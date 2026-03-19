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
          { name: 'contact.txt', type: 'file', content: 'Discord: WLixin#0001\nEmail: wlixin@devsh.de' },
          {
            name: 'projects',
            type: 'dir',
            children: [
              {
                name: 'hosting-infra',
                type: 'dir',
                children: [
                  { name: 'README.md', type: 'file', content: '# Custom Hosting Infrastructure\nDesigned and managed a full-scale hosting infrastructure from scratch.\n\nKey features:\n- ZFS storage management\n- Nginx reverse proxy setup\n- Automated backups\n- 99.9% uptime achieved' }
                ]
              },
              {
                name: 'minecraft-plugins',
                type: 'dir',
                children: [
                  { name: 'README.md', type: 'file', content: '# Advanced Minecraft Plugins\nDeveloped complex Java-based plugins for high-performance Minecraft servers.\n\nKey features:\n- Asynchronous data processing\n- Custom NMS implementations\n- Redis-based cross-server sync\n- 5 years of experience' }
                ]
              },
              {
                name: 'terraform-automation',
                type: 'dir',
                children: [
                  { name: 'README.md', type: 'file', content: '# Terraform Network Automation\nAutomated server infrastructure deployment using Terraform.\n\nKey features:\n- Infrastructure as Code (IaC)\n- Multi-cloud deployment\n- Automated network provisioning\n- Idempotent configurations' }
                ]
              }
            ]
          },
          {
            name: 'blog',
            type: 'dir',
            children: [
              { name: '2025-03-10.log', type: 'file', content: '[2025-03-10] Finally got Terraform idempotent across all nodes. Took 3 days.' },
              { name: '2025-02-28.log', type: 'file', content: '[2025-02-28] Cisco CCST certified. Easier than expected, but the subnetting was real.' }
            ]
          }
        ]
      }
    ]
  }
];
