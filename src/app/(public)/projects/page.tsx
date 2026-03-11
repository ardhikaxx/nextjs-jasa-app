'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiExternalLink, FiCalendar, FiCode, FiArrowUpRight } from 'react-icons/fi';
import Footer from '@/components/Footer';
import { projects } from '@/data/projects';
import { useI18n } from '@/i18n/LanguageProvider';

const techColors: Record<string, string> = {
  'HTML': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'CSS': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Bootstrap': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'PHP': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
  'Laravel': 'bg-red-500/20 text-red-400 border-red-500/30',
  'JavaScript': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Tailwind': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'Dart': 'bg-teal-500/20 text-teal-400 border-teal-500/30',
  'Flutter': 'bg-sky-500/20 text-sky-400 border-sky-500/30',
  'GSAP': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Vite': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'Firebase': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'Python': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Naive Bayes ML': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  'DOMPDF': 'bg-red-500/20 text-red-400 border-red-500/30',
  'Maatwebsite Excel': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Spatie Permission': 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  'Simple QRCode': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

export default function ProjectsPage() {
  const { t } = useI18n();

  const getTechColor = (tech: string) => {
    return techColors[tech] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const years = [...new Set(projects.map(p => p.year))].sort((a, b) => b - a);

  return (
    <div className="flex flex-col bg-black text-white min-h-screen">
      <div className="flex-1 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-all duration-300 group"
          >
            <FiArrowLeft className="me-2 group-hover:-translate-x-1 transition-transform" />
            {t('home.back')}
          </Link>

          <div className="text-center mb-16 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#c41e2e]/20 rounded-full blur-3xl -z-10"></div>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 font-daydream relative">
              <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
                {t('projects.title')}
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t('projects.subtitle')}
            </p>
            
            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="h-1 w-12 bg-[#c41e2e] rounded-full"></div>
              <div className="h-1 w-3 bg-[#c41e2e]/50 rounded-full"></div>
              <div className="h-1 w-1 bg-[#c41e2e]/30 rounded-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group relative bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 rounded-3xl overflow-hidden hover:border-[#c41e2e]/40 transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(196,30,46,0.3)] hover:-translate-y-2"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#c41e2e]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="aspect-[16/10] bg-gray-900 relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/10">
                      <FiCalendar size={12} />
                      {project.year}
                    </span>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#c41e2e] text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-[#a31825] transition-all hover:scale-105 shadow-lg shadow-[#c41e2e]/30"
                    >
                      <FiExternalLink size={18} />
                      {t('projects.viewDetail')}
                      <FiArrowUpRight size={16} />
                    </a>
                  </div>
                </div>

                <div className="p-6 relative">
                  <h3 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-[#c41e2e] transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-5 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-2.5 py-1 rounded-lg border ${getTechColor(tech)}`}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-xs px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 text-gray-400">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c41e2e] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 text-gray-500">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-gray-700"></div>
              <span className="text-sm font-medium">{projects.length} {t('projects.title')}</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-gray-700"></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
