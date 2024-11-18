import React, { useState } from "react";

function Project() {
  const [hoveredProject, setHoveredProject] = useState(null);
  const projects = [
    {
      id: 1,
      title: "E-commerce Website",
      description: "Built with React & Node.js",
      image: "/api/placeholder/300/200",
    },
    {
      id: 2,
      title: "Social Media App",
      description: "MERN Stack Application",
      image: "/api/placeholder/300/200",
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "React & Tailwind CSS",
      image: "/api/placeholder/300/200",
    },
  ];
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-8">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-600">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Project;
