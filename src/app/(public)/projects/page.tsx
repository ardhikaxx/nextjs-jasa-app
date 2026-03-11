'use client';

import Link from 'next/link';
import { FiArrowLeft, FiExternalLink, FiCalendar } from 'react-icons/fi';
import Footer from '@/components/Footer';
import { projects } from '@/data/projects';
import { useI18n } from '@/i18n/LanguageProvider';

export default function ProjectsPage() {
  const { t } = useI18n();

  return (
    <div className="flex flex-col bg-black text-white min-h-screen">
      <div className="flex-1 py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-gray-300 hover:text-white mb-8 transition"
          >
            <FiArrowLeft className="me-2" />
            {t('home.back')}
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 font-daydream">
              {t('projects.title')}
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              {t('projects.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#c41e2e]/50 transition group"
              >
                <div className="aspect-video bg-gray-800 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    <span className="text-4xl">📁</span>
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#c41e2e] text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-[#a31825] transition"
                    >
                      <FiExternalLink size={16} />
                      {t('projects.viewDetail')}
                    </a>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                    <FiCalendar size={14} />
                    <span>{t('projects.year')}: {project.year}</span>
                  </div>

                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech, index) => (
                      <span
                        key={index}
                        className="text-xs bg-[#c41e2e]/20 text-[#c41e2e] px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
