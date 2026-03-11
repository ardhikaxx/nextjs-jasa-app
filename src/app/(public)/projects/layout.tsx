import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portofolio Proyek | Mumet.in - Sudah Bertugas 30+ Proyek',
  description:
    'Lihat portofolio proyek website, aplikasi mobile, dan sistem yang telah kami selesaikan. Lebih dari 30 proyek successfully delivered untuk berbagai klien.',
  keywords: 'portofolio proyek, portofolio website, hasil karya, proyek selesai, proyek web development, portofolio aplikasi mobile, showcase proyek',
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
