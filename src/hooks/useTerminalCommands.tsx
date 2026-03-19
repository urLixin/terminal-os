import React from 'react';
import { User, Code, Briefcase, Award, Mail, Github, ExternalLink, Copy, Terminal as TerminalIcon } from 'lucide-react';
import { Theme } from '../types';
import { PROJECTS, CERTIFICATES, INITIAL_FILESYSTEM } from '../constants';

export const useTerminalCommands = (
  onThemeChange: (theme: Theme) => void,
  setCurrentDir: (dir: string) => void,
  currentDir: string,
  setHistory: React.Dispatch<React.SetStateAction<any[]>>,
  startTime: Date
) => {
  const handleCommand = (cmd: string, silent = false, setCommandHistory?: React.Dispatch<React.SetStateAction<string[]>>, setHistoryIndex?: React.Dispatch<React.SetStateAction<number>>) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const args = trimmedCmd.split(' ');
    const baseCmd = args[0];
    let output: React.ReactNode = null;

    if (!silent && setCommandHistory && setHistoryIndex) {
      setCommandHistory(prev => [cmd, ...prev]);
      setHistoryIndex(-1);
    }

    switch (baseCmd) {
      case 'neofetch':
        const getUptime = () => {
          const seconds = Math.floor((Date.now() - startTime.getTime()) / 1000);
          const mins = Math.floor(seconds / 60);
          const secs = seconds % 60;
          return `${mins} mins, ${secs} secs`;
        };
        output = (
          <div className="flex flex-col md:flex-row gap-8 py-4 animate-scroll-up">
            <div className="text-blue-400 font-bold leading-tight whitespace-pre">
{`       .
      / \\
     /   \\
    /     \\
   /       \\
  /  _   _  \\
 /  / \\ / \\  \\
/  /   V   \\  \\`}
            </div>
            <div className="space-y-1 text-sm">
              <p><span className="font-bold text-blue-400">wLixin@portfolio</span></p>
              <p>----------------</p>
              <p><span className="font-bold text-blue-400">OS:</span> Arch Linux x86_64</p>
              <p><span className="font-bold text-blue-400">Host:</span> WLixin-Homelab</p>
              <p><span className="font-bold text-blue-400">Kernel:</span> Linux 6.6.0-arch1</p>
              <p><span className="font-bold text-blue-400">Uptime:</span> {getUptime()}</p>
              <p><span className="font-bold text-blue-400">Packages:</span> 2048 (pacman), 64 (flatpak)</p>
              <p><span className="font-bold text-blue-400">Shell:</span> zsh 5.9</p>
              <p><span className="font-bold text-blue-400">DE:</span> KDE Plasma 6.9.0</p>
              <p><span className="font-bold text-blue-400">WM:</span> KWin (Wayland)</p>
              <p><span className="font-bold text-blue-400">Theme:</span> Catppuccin-Mocha [Qt]</p>
              <p><span className="font-bold text-blue-400">Icons:</span> Papirus-Dark [Qt]</p>
              <p><span className="font-bold text-blue-400">Terminal:</span> konsole 25.12.3</p>
              <p><span className="font-bold text-blue-400">CPU:</span> Intel Core i7-10700K (16) @ 5.10GHz</p>
              <p><span className="font-bold text-blue-400">GPU:</span> NVIDIA GTX 1080 Ti</p>
              <p><span className="font-bold text-blue-400">Memory:</span> 16 GiB / 32 GiB (50%)</p>
              <p><span className="font-bold text-blue-400">Disk (/):</span> 420 GiB / 2 TiB (21%) - ext4</p>
              <p><span className="font-bold text-blue-400">Local IP:</span> 10.0.0.1/24</p>
              <p><span className="font-bold text-blue-400">Locale:</span> en_US.UTF-8</p>
              <div className="flex gap-2 mt-2">
                <div className="w-4 h-4 bg-black"></div>
                <div className="w-4 h-4 bg-red-500"></div>
                <div className="w-4 h-4 bg-green-500"></div>
                <div className="w-4 h-4 bg-yellow-500"></div>
                <div className="w-4 h-4 bg-blue-500"></div>
                <div className="w-4 h-4 bg-magenta-500"></div>
                <div className="w-4 h-4 bg-cyan-500"></div>
                <div className="w-4 h-4 bg-white"></div>
              </div>
            </div>
          </div>
        );
        break;

      case 'help':
        output = (
          <div className="space-y-6 py-2 animate-scroll-up">
            <div className="border border-blue-500/30 rounded-lg overflow-hidden shadow-[0_0_15px_rgba(137,220,235,0.1)]">
              <div className="bg-blue-500/20 px-4 py-2 border-b border-blue-500/30 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-400">Core Navigation</p>
                <span className="text-[10px] opacity-50">PRIORITY: HIGH</span>
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-12">
                {['about', 'skills', 'projects', 'certs', 'contact'].map((cmd) => (
                  <div key={cmd} className="flex items-center justify-between border-b border-white/5 pb-2 group cursor-pointer" onClick={() => handleCommand(cmd)}>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_5px_rgba(137,220,235,0.5)]"></span>
                      <span className="font-bold text-blue-400 group-hover:underline">{cmd}</span>
                    </div>
                    <span className="opacity-60 text-xs">
                      {cmd === 'about' && 'User profile & background'}
                      {cmd === 'skills' && 'Technical expertise & certs'}
                      {cmd === 'projects' && 'Portfolio of work'}
                      {cmd === 'certs' && 'Certifications & achievements'}
                      {cmd === 'contact' && 'Get in touch'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[10px] opacity-40 italic text-center">
              Additional commands are available in the sidebar utility menu.
            </p>
          </div>
        );
        break;

      case 'whoami':
        output = (
          <div className="flex items-center gap-2 py-1 animate-scroll-up">
            <User size={16} className="text-blue-400" />
            <span>wLixin (Networking Specialist / SysAdmin)</span>
          </div>
        );
        break;

      case 'uptime':
        const seconds = Math.floor((Date.now() - startTime.getTime()) / 1000);
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        output = `up ${h > 0 ? `${h} hours, ` : ''}${m} minutes, ${s} seconds`;
        break;

      case 'github':
        window.open('https://github.com/WLixin', '_blank');
        output = "Opening GitHub profile...";
        break;

      case 'htop':
        output = (
          <div className="space-y-2 py-2 animate-scroll-up font-mono text-xs">
            <div className="flex gap-4">
              <span className="text-blue-400">CPU [||||||||||          42.0%]</span>
              <span className="text-green-400">MEM [||||||              24.5%]</span>
            </div>
            <div className="border-t border-white/10 pt-2">
              <p className="font-bold opacity-50">PID  USER      PRI  NI  VIRT   RES   SHR S  CPU% MEM%   TIME+  Command</p>
              <p>1284 wLixin     20   0  1.2G  245M  120M S   4.2  1.2   0:12.45 terminal-os</p>
              <p>1592 wLixin     20   0  850M  120M   80M S   2.1  0.8   0:05.12 vite-dev</p>
              <p>2048 wLixin     20   0  2.4G  512M  200M S   1.5  2.4   0:08.90 chrome-instance</p>
            </div>
          </div>
        );
        break;

      case 'motd':
        const quotes = [
          "The best way to predict the future is to invent it.",
          "Talk is cheap. Show me the code.",
          "Stay hungry, stay foolish.",
          "Simplicity is the ultimate sophistication.",
          "Code is like humor. When you have to explain it, it’s bad."
        ];
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        output = (
          <div className="py-4 px-6 border-2 border-blue-500/30 rounded-lg bg-blue-500/5 italic animate-scroll-up">
            "{quote}"
          </div>
        );
        break;

      case 'log':
      case 'blog':
        output = (
          <div className="space-y-4 py-2 animate-scroll-up">
            <p className="text-blue-400 font-bold underline">System Logs / Blog Posts:</p>
            <div className="space-y-2">
              <div className="border-l-2 border-blue-500 pl-4">
                <p className="font-bold">2024-03-15: Migrating to Arch Linux</p>
                <p className="text-xs opacity-60 italic">"The journey of a thousand pacman -Syu commands..."</p>
              </div>
              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-bold">2024-02-28: Cisco Certification Path</p>
                <p className="text-xs opacity-60 italic">"Understanding the OSI model layer by layer."</p>
              </div>
            </div>
            <p className="text-[10px] opacity-50">Use 'cd blog' and 'cat' to read full entries.</p>
          </div>
        );
        break;

      case 'resume':
        window.open('/resume.pdf', '_blank');
        output = "Opening resume in new tab...";
        break;

      case 'about':
        const isVerboseAbout = args.includes('--verbose');
        output = (
          <div className="flex flex-col md:flex-row gap-6 p-4 border border-current/20 rounded-lg animate-scroll-up">
            <div className="text-blue-400 font-mono text-[10px] leading-tight whitespace-pre border border-current/30 p-2 rounded bg-current/5">
{`    .---.
   /     \\
   |() ()|
    \\ ^ /
     '|'
      |`}
            </div>
            <div className="space-y-2">
              <p className="text-xl font-bold">wLixin</p>
              <p className="opacity-80 text-blue-400">Networking Specialist & System Administrator</p>
              <p><span className="opacity-50">Age:</span> 17</p>
              {isVerboseAbout && (
                <div className="mt-2 space-y-2 text-sm border-t border-white/10 pt-2 animate-fade-in">
                  <p><span className="text-blue-400 font-bold">Background:</span> Passionate about low-level networking and high-availability systems. Started with Minecraft server optimization and evolved into enterprise-grade networking.</p>
                  <p><span className="text-blue-400 font-bold">Philosophy:</span> "If it's not automated, it's broken." I strive for clean, reproducible infrastructure using IaC tools like Terraform.</p>
                </div>
              )}
              <p><span className="opacity-50">Certifications:</span> Cisco Networking Certificate</p>
              <p><span className="opacity-50">Experience:</span> 4y Networking, 3y SysAdmin, 5y Minecraft Dev</p>
              <p className="italic text-sm mt-2">"Building and securing digital infrastructures."</p>
            </div>
          </div>
        );
        break;

      case 'skills':
        const isVerboseSkills = args.includes('--verbose');
        output = (
          <div className="space-y-4 animate-scroll-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 border border-current/20 rounded bg-current/5">
                <p className="font-bold text-blue-400 mb-2 underline flex items-center gap-2">
                  <TerminalIcon size={14} /> Networking
                </p>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Cisco Networking Certified</li>
                  <li>Infrastructure Management</li>
                  <li>Hosting Infrastructure Setup</li>
                  {isVerboseSkills && (
                    <>
                      <li className="text-blue-300/70">BGP & OSPF Routing</li>
                      <li className="text-blue-300/70">VLAN/VXLAN Configuration</li>
                      <li className="text-blue-300/70">Firewall Hardening (iptables/nftables)</li>
                    </>
                  )}
                </ul>
              </div>
              <div className="p-3 border border-current/20 rounded bg-current/5">
                <p className="font-bold text-blue-400 mb-2 underline flex items-center gap-2">
                  <Code size={14} /> Development
                </p>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Java (Minecraft Plugins - 5y)</li>
                  <li>HTML / CSS (Web Dev)</li>
                  <li>Terraform (IaC)</li>
                  {isVerboseSkills && (
                    <>
                      <li className="text-blue-300/70">Bash/Python Scripting</li>
                      <li className="text-blue-300/70">Docker & Kubernetes</li>
                      <li className="text-blue-300/70">CI/CD Pipelines (GitHub Actions)</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
            {!isVerboseSkills && <p className="text-[10px] opacity-40 italic">Tip: Use 'skills --verbose' for detailed breakdown.</p>}
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-4 animate-scroll-up">
            {PROJECTS.map(p => (
              <div key={p.id} className="border-l-2 border-current pl-4 py-1">
                <p className="font-bold text-lg text-blue-400">{p.title}</p>
                <p className="text-sm opacity-80">{p.description}</p>
                <div className="flex gap-2 mt-1">
                  {p.tags.map(t => (
                    <span key={t} className="text-[10px] px-1 border border-current/30 rounded">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'certs':
      case 'certificates':
        output = (
          <div className="space-y-4 animate-scroll-up">
            <p className="opacity-50 italic text-blue-400">Verified Credentials:</p>
            {CERTIFICATES.map(cert => (
              <div key={cert.id} className="border-l-2 border-blue-500 pl-4 py-1 hover:bg-blue-500/5 transition-colors group">
                <p className="font-bold text-lg text-blue-400">{cert.title}</p>
                <div className="flex justify-between items-center">
                  <p className="text-sm opacity-80">{cert.issuer} • {cert.date}</p>
                  <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-400 underline opacity-0 group-hover:opacity-100 transition-opacity">View Certificate</a>
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        const copyToClipboard = (text: string) => {
          navigator.clipboard.writeText(text);
          alert(`Copied ${text} to clipboard!`);
        };
        output = (
          <div className="space-y-4 py-2 animate-scroll-up">
            <p className="text-blue-400 font-bold">Transmission Channels:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 border border-white/10 rounded bg-white/5 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail size={14} className="text-blue-400" />
                  <span className="opacity-50">Email:</span>
                  <a href="mailto:wLixin@devsh.de" className="hover:underline text-blue-400">wLixin@devsh.de</a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <TerminalIcon size={14} className="text-blue-400" />
                  <span className="opacity-50">Discord:</span>
                  <span className="text-blue-400">WLixin#0001</span>
                  <button 
                    onClick={() => copyToClipboard('WLixin#0001')}
                    className="p-1 hover:bg-white/10 rounded transition-colors"
                    title="Copy to clipboard"
                  >
                    <Copy size={12} />
                  </button>
                </div>
              </div>
              <div className="p-3 border border-white/10 rounded bg-white/5 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Github size={14} className="text-blue-400" />
                  <span className="opacity-50">GitHub:</span>
                  <a href="https://github.com/WLixin" target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-400 flex items-center gap-1">
                    github.com/WLixin <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
        break;

      case 'ls':
        const getDirContent = (path: string) => {
          const parts = path.split('/').filter(Boolean);
          let current: any = INITIAL_FILESYSTEM;
          for (const part of parts) {
            if (part === 'home' || part === 'wlixin') continue;
            if (current[part] && current[part].type === 'directory') {
              current = current[part].children;
            } else {
              return null;
            }
          }
          return current;
        };

        const content = getDirContent(currentDir);
        if (content) {
          output = (
            <div className="flex flex-wrap gap-x-6 gap-y-1 py-1">
              {Object.entries(content).map(([name, info]: [string, any]) => (
                <span key={name} className={info.type === 'directory' ? 'text-blue-400 font-bold' : 'text-white'}>
                  {name}{info.type === 'directory' ? '/' : ''}
                </span>
              ))}
            </div>
          );
        } else {
          output = "ls: cannot access directory: No such file or directory";
        }
        break;

      case 'cd':
        const target = args[1];
        if (!target || target === '~') {
          setCurrentDir('/home/wlixin');
        } else if (target === '..') {
          if (currentDir !== '/home/wlixin') {
            const parts = currentDir.split('/').filter(Boolean);
            parts.pop();
            setCurrentDir('/' + parts.join('/'));
          }
        } else {
          const parts = currentDir.split('/').filter(Boolean);
          let current: any = INITIAL_FILESYSTEM;
          for (const part of parts) {
            if (part === 'home' || part === 'wlixin') continue;
            current = current[part].children;
          }
          
          if (current[target] && current[target].type === 'directory') {
            setCurrentDir(`${currentDir}/${target}`);
          } else {
            output = `cd: ${target}: No such directory`;
          }
        }
        break;

      case 'pwd':
        output = currentDir;
        break;

      case 'cat':
        const fileName = args[1];
        if (!fileName) {
          output = "usage: cat [file]";
        } else {
          const parts = currentDir.split('/').filter(Boolean);
          let current: any = INITIAL_FILESYSTEM;
          for (const part of parts) {
            if (part === 'home' || part === 'wlixin') continue;
            current = current[part].children;
          }

          if (current[fileName] && current[fileName].type === 'file') {
            output = (
              <div className="whitespace-pre-wrap py-1 opacity-90">
                {current[fileName].content}
              </div>
            );
          } else {
            output = `cat: ${fileName}: No such file`;
          }
        }
        break;

      case 'exit':
        window.location.reload();
        return;

      case '':
        break;

      default:
        output = `Command not found: ${baseCmd}. Type 'help' for assistance.`;
    }

    const historyItem = {
      command: silent ? '' : cmd,
      output,
      timestamp: new Date().toLocaleTimeString()
    };

    if (output || !silent) {
      setHistory(prev => [...prev, historyItem]);
    }
  };

  return { handleCommand };
};
