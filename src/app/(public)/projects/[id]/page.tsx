'use client';

import { useEffect, useState } from 'react';
import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiExternalLink, FiCalendar, FiCode } from 'react-icons/fi';
import Footer from '@/components/Footer';
import { projects } from '@/data/projects';
import { useI18n } from '@/i18n/LanguageProvider';

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { t } = useI18n();
  const resolvedParams = use(params);
  const [project, setProject] = useState<typeof projects[0] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const projectId = parseInt(resolvedParams.id);
    const found = projects.find(p => p.id === projectId);
    setProject(found || null);
    setLoading(false);
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="flex flex-col bg-black text-white min-h-screen">
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col bg-black text-white min-h-screen">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Proyek tidak ditemukan</h1>
            <Link href="/projects" className="text-[#c41e2e] hover:underline">
              Kembali ke halaman proyek
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-black text-white min-h-screen">
      <div className="flex-1 py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition mb-8"
          >
            <FiArrowLeft size={18} />
            {t('home.back')}
          </Link>

          <div className="relative aspect-video rounded-2xl overflow-hidden mb-8">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="flex items-center gap-2 text-gray-400">
              <FiCalendar size={18} />
              {project.year}
            </span>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#c41e2e] hover:bg-[#a31825] transition"
            >
              <FiExternalLink size={18} />
              Kunjungi Website
            </a>
          </div>

          <h1 className="text-3xl font-bold mb-6 font-daydream">
            {project.title}
          </h1>

          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            {project.description}
          </p>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FiCode size={20} />
              {t('projects.technologies')}
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg border border-white/20 bg-white/10 text-gray-300 text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
