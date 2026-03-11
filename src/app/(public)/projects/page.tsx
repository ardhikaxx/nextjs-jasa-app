'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiExternalLink, FiCalendar, FiArrowUpRight } from 'react-icons/fi';
import Footer from '@/components/Footer';
import { projects } from '@/data/projects';
import { useI18n } from '@/i18n/LanguageProvider';

export default function ProjectsPage() {
  const { t } = useI18n();

  const years = [...new Set(projects.map(p => p.year))].sort((a, b) => b - a);

  return (
    <div className="flex flex-col bg-black text-white min-h-screen">
      <div className="flex-1 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center justify-between mb-12">
            <Link
              href="/"
              className="group flex items-center gap-3 px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#c41e2e] text-white group-hover:scale-110 transition-transform">
                <FiArrowLeft size={16} />
              </span>
              <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                {t('home.back')}
              </span>
            </Link>

            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
              <span className="w-2 h-2 rounded-full bg-[#c41e2e] animate-pulse"></span>
              <span>{projects.length} Proyek</span>
            </div>
          </nav>

          <div className="text-center mb-20 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#c41e2e]/10 rounded-full blur-3xl -z-10"></div>
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c41e2e]"></span>
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Portfolio</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c41e2e]"></span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              {t('projects.title')}
            </h1>
            
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              {t('projects.subtitle')}
            </p>
            
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/20"></div>
              <div className="w-2 h-2 rotate-45 border border-[#c41e2e]"></div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/20"></div>
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
                        className="text-xs px-2.5 py-1 rounded-lg border border-white/20 bg-white/10 text-gray-300"
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
