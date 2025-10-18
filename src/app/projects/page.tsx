'use client';

import { useState } from 'react';
import Link from 'next/link';
import { projectsData, Project } from '@/data/projects_data';
import { VscArrowLeft, VscLinkExternal, VscCalendar, VscCode, VscTag } from 'react-icons/vsc';

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
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center text-gray-600 hover:text-[#E02435] transition-colors mb-4"
                    >
                        <VscArrowLeft className="mr-2" />
                        Kembali ke Beranda
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Portfolio Projek Kami</h1>
                            <p className="text-gray-600">
                                Jelajahi berbagai projek yang telah kami selesaikan dengan dedikasi dan keahlian
                            </p>
                        </div>

                        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4">
                            {/* Category Filter */}
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E02435] focus:border-transparent"
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>

                            {/* Sort Filter */}
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E02435] focus:border-transparent"
                            >
                                <option value="newest">Terbaru</option>
                                <option value="oldest">Terlama</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">📁</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak ada projek</h3>
                        <p className="text-gray-600">
                            Tidak ada projek yang ditemukan untuk kategori {selectedCategory}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

// Project Card Component
function ProjectCard({ project }: { project: Project }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
            {/* Project Image */}
            {project.image ? (
                <div className="h-48 bg-gray-200 relative">
                    <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover"
                    />
                </div>
            ) : (
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <VscCode className="text-gray-400 text-4xl" />
                </div>
            )}

            {/* Project Content */}
            <div className="p-6">
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <VscTag className="mr-1" size={12} />
                        {project.category}
                    </span>

                    <div className="flex items-center text-sm text-gray-500">
                        <VscCalendar className="mr-1" size={14} />
                        {project.year}
                    </div>
                </div>

                {/* Project Name */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {project.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {project.description}
                </p>

                {/* Technologies */}
                <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                            <span
                                key={index}
                                className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Action Button */}
                <div className="flex justify-between items-center">
                    {project.link ? (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-[#E02435] text-white rounded-lg hover:bg-[#c41e2e] transition-colors text-sm font-medium"
                        >
                            Lihat Projek
                            <VscLinkExternal className="ml-2" size={14} />
                        </a>
                    ) : (
                        <span className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-500 rounded-lg text-sm font-medium cursor-not-allowed">
                            Tidak Tersedia
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}