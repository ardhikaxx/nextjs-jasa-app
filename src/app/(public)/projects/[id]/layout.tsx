import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  
  return {
    title: `Proyek #${id} | Mumet.in - Portofolio Detail`,
    description:
      'Detail proyek portofolio Mumet.in. Lihat spesifikasi lengkap website, aplikasi, atau sistem yang telah kami kembangkan.',
    keywords: 'portofolio detail, proyek web, detail aplikasi, showcase proyek digital',
  };
}

export default function ProjectDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
