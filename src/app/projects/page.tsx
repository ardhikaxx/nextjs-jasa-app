'use client';

import { useState } from 'react';
import Link from 'next/link';
import { projectsData, Project } from '@/data/projects_data';
import { 
    VscArrowLeft, 
    VscLinkExternal, 
    VscCalendar, 
    VscCode,
    VscFilter,
    VscSortPrecedence,
    VscGlobe,
    VscRocket,
    VscArrowCircleDown
} from 'react-icons/vsc';

export default function ProjectsPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

    // Get unique categories
    const categories = ['All', ...new Set(projectsData.map(project => project.category))];

    // Filter and sort projects
    const filteredProjects = projectsData
        .filter(project => selectedCategory === 'All' || project.category === selectedCategory)
        .sort((a, b) => {
            if (sortBy === 'newest') {
                return b.year - a.year;
            } else {
                return a.year - b.year;
            }
        });

    return (
        <div className="min-h-screen bg-black py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <Link
                        href="/"
                        className="inline-flex items-center text-gray-400 hover:text-[#E02435] transition-all duration-300 mb-6 group"
                    >
                        <VscArrowLeft className="mr-3 transform group-hover:-translate-x-1 transition-transform" size={20} />
                        <span className="font-medium">Kembali ke Beranda</span>
                    </Link>

                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                        <div className="flex-1">
                            <div className="inline-flex items-center px-4 py-2 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 text-gray-300 text-sm mb-4">
                                <VscRocket className="mr-2" size={16} />
                                Portofolio Projek
                            </div>
                            <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-4">
                                Portofolio <span className="text-[#E02435]">Projek</span>
                            </h1>
                            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                                Kumpulan projek yang telah selesai dengan penuh dedikasi dan inovasi
                            </p>
                        </div>

                        {/* Filters */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Category Filter */}
                            <div className="relative">
                                <div className="relative flex items-center bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-4 py-3 hover:border-white/20 transition-all duration-300">
                                    <VscFilter className="text-[#E02435] mr-3" size={30} />
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="bg-transparent text-white border-none focus:ring-0 focus:outline-none cursor-pointer appearance-none pr-8 w-full"
                                    >
                                        {categories.map(category => (
                                            <option key={category} value={category} className="bg-gray-900">
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute right-4 text-[#E02435]">
                                        <VscArrowCircleDown  size={20} />
                                    </div>
                                </div>
                            </div>

                            {/* Sort Filter */}
                            <div className="relative">
                                <div className="relative flex items-center bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-4 py-3 hover:border-white/20 transition-all duration-300">
                                    <VscSortPrecedence className="text-[#E02435] mr-3" size={35} />
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
                                        className="bg-transparent text-white border-none focus:ring-0 focus:outline-none cursor-pointer appearance-none pr-8 w-full"
                                    >
                                        <option value="newest" className="bg-gray-900">Terbaru</option>
                                        <option value="oldest" className="bg-gray-900">Terlama</option>
                                    </select>
                                    <div className="pointer-events-none absolute right-4 text-[#E02435]">
                                        <VscArrowCircleDown  size={20} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap gap-3 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 border ${
                                selectedCategory === category
                                    ? 'bg-[#E02435] text-white border-[#E02435] shadow-lg shadow-[#E02435]/30 transform scale-105'
                                    : 'bg-white/5 backdrop-blur-lg text-gray-300 border-white/10 hover:border-[#E02435]/50 hover:text-white'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Projects Counter */}
                <div className="mb-8 flex items-center justify-between">
                    <div className="text-white font-semibold">
                        Menampilkan <span className="text-[#E02435]">{filteredProjects.length}</span> dari{' '}
                        <span className="text-[#E02435]">{projectsData.length}</span> projek
                    </div>
                    <div className="text-gray-400 text-sm">
                        {selectedCategory !== 'All' && `Kategori: ${selectedCategory}`}
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-32 h-32 mx-auto mb-6 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 flex items-center justify-center">
                            <VscCode className="text-gray-500 text-5xl" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">Tidak ada projek</h3>
                        <p className="text-gray-400 text-lg">
                            Tidak ada projek yang ditemukan untuk kategori{" "}
                            <span className="text-[#E02435] font-semibold">{selectedCategory}</span>
                        </p>
                    </div>
                )}

                {/* Stats */}
                <div className="mt-20 pt-12 border-t border-white/10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-[#E02435]/30 transition-all duration-300">
                            <div className="text-4xl font-bold text-[#E02435] mb-3">
                                {projectsData.length}
                            </div>
                            <div className="text-gray-300 font-medium">Total Projek</div>
                        </div>
                        <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-[#E02435]/30 transition-all duration-300">
                            <div className="text-4xl font-bold text-white mb-3">
                                {new Set(projectsData.map(p => p.category)).size}
                            </div>
                            <div className="text-gray-300 font-medium">Kategori</div>
                        </div>
                        <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-[#E02435]/30 transition-all duration-300">
                            <div className="text-4xl font-bold text-white mb-3">
                                {Math.min(...projectsData.map(p => p.year))}
                            </div>
                            <div className="text-gray-300 font-medium">Tahun Mulai</div>
                        </div>
                        <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-[#E02435]/30 transition-all duration-300">
                            <div className="text-4xl font-bold text-white mb-3">
                                {Math.max(...projectsData.map(p => p.year))}
                            </div>
                            <div className="text-gray-300 font-medium">Tahun Terbaru</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Project Card Component
function ProjectCard({ project }: { project: Project }) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    return (
        <div className="group relative bg-white/10 backdrop-blur-lg rounded-3xl border border-white/10 overflow-hidden hover:border-[#E02435]/50 transition-all duration-500 hover:transform hover:-translate-y-3">
            {/* Project Image */}
            <div className="relative h-60 bg-gray-800 overflow-hidden">
                {project.image && !imageError ? (
                    <>
                        <div className={`absolute inset-0 bg-gray-800 flex items-center justify-center transition-opacity duration-500 ${
                            imageLoaded ? 'opacity-0' : 'opacity-100'
                        }`}>
                            <div className="flex space-x-2">
                                <div className="w-3 h-3 bg-[#E02435] rounded-full animate-bounce"></div>
                                <div className="w-3 h-3 bg-[#E02435] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                <div className="w-3 h-3 bg-[#E02435] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            </div>
                        </div>
                        <img
                            src={project.image}
                            alt={project.name}
                            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                                imageLoaded ? 'opacity-100' : 'opacity-0'
                            }`}
                            onLoad={() => setImageLoaded(true)}
                            onError={() => setImageError(true)}
                        />
                    </>
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                        <VscCode className="text-gray-600 text-6xl" />
                    </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    </div>
                </div>

                {/* Year Badge */}
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-lg text-white px-4 py-2 rounded-2xl text-sm font-semibold flex items-center border border-white/10">
                    <VscCalendar className="mr-2" size={16} />
                    {project.year}
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-lg text-white px-4 py-2 rounded-2xl text-sm font-semibold border border-white/10">
                    {project.category}
                </div>
            </div>

            {/* Project Content */}
            <div className="relative p-7">
                {/* Project Name */}
                <h3 className="text-2xl font-bold text-white mb-4 line-clamp-2 group-hover:text-[#E02435] transition-colors duration-300 leading-tight">
                    {project.name}
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-sm mb-6 line-clamp-3 leading-relaxed">
                    {project.description}
                </p>

                {/* Technologies */}
                <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((tech, index) => (
                            <span
                                key={index}
                                className="inline-block px-3 py-2 text-xs bg-white/10 backdrop-blur-lg text-gray-300 rounded-xl border border-white/10 font-semibold hover:border-[#E02435]/30 hover:text-white transition-all duration-300"
                            >
                                {tech}
                            </span>
                        ))}
                        {project.technologies.length > 4 && (
                            <span className="inline-block px-3 py-2 text-xs bg-white/10 backdrop-blur-lg text-gray-400 rounded-xl border border-white/10 font-semibold">
                                +{project.technologies.length - 4}
                            </span>
                        )}
                    </div>
                </div>

                {/* Action Button */}
                <div className="flex justify-between items-center pt-5 border-t border-white/10">
                    {project.link ? (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-[#E02435] text-white rounded-2xl hover:bg-[#c41e2e] transition-all duration-300 font-semibold text-sm shadow-lg shadow-[#E02435]/30 hover:shadow-[#E02435]/50 hover:transform hover:-translate-y-1 group/btn"
                        >
                            <VscGlobe className="mr-2" size={16} />
                            Lihat Projek
                            <VscLinkExternal className="ml-2 transform group-hover/btn:translate-x-1 transition-transform" size={14} />
                        </a>
                    ) : (
                        <span className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-lg text-gray-500 rounded-2xl text-sm font-semibold cursor-not-allowed border border-white/10">
                            <VscCode className="mr-2" size={16} />
                            Segera Hadir
                        </span>
                    )}
                    
                    {/* Tech Count */}
                    <div className="text-gray-500 text-xs font-medium bg-white/5 backdrop-blur-lg px-3 py-2 rounded-xl border border-white/10">
                        {project.technologies.length} tech
                    </div>
                </div>
            </div>

            {/* Hover Border Effect */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#E02435]/30 rounded-3xl transition-all duration-500 pointer-events-none"></div>
        </div>
    );
}