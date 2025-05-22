import React from 'react';

const ResumeSection = () => {
  const data = [
    {
      title: 'EDUCATION',
      items: [
        { year: '2022 - Present', degree: 'Computer Science', desc: 'Pursuing Btech from Graphic Era University.' },
        { year: '2020-2022', degree: 'Senior Secondary', desc: 'Completed Senior Secondary from CBSE Board.' },
        { year: '2020', degree: 'High School', desc: 'Completed High School from CBSE Board with 90% marks.' },
      ]
    },
    {
      title: 'SKILLS/ACHIEVEMENTS',
      items: [
        { year: '2022 - 2023', degree: 'Web Designer', desc: 'Worked on UI/UX design for web applications, handling responsiveness and usability.' },
        { year: '2024 - 2025', degree: 'Problem Solving', desc: 'Reached top 10% in a Leetcode, showcasing exceptional problem-solving skills.' },
        { year: '2023 - 2024', degree: 'Fitness App', desc: 'Created a fitness app using Android Studio, demonstrating proficiency in mobile development.' },
      ]
    }
  ];

  return (
    <div className="w-full p-8 space-y-12">
      {data.map((section, idx) => (
        <div key={idx}>
          <h2 className="text-2xl font-extrabold font-title mb-2">{section.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {section.items.map((item, index) => (
              <div key={index} className="bg-mygray p-4 rounded shadow-md transition-transform duration-300 hover:scale-110 cursor-none">
                <span className="bg-myyellow text-black px-2 py-1 text-sm font-semibold">{item.year}</span>
                <h3 className="text-lg font-bold mt-2">{item.degree}</h3>
                <p className="text-sm mt-1 text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResumeSection;
