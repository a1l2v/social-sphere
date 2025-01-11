import React, { useState } from "react";
import Layout from "../components/Layout/Layout";

const ClubsList = () => {
  const [Clubs, setClubs] = useState([
    {
      ClubName: "Singularity",
      Description: `Singularity is a student-run astronomy club at B.M.S. College of Engineering in Bengaluru that hosts events and seminars to inspire a passion for space exploration and astronomy.

      Activities:
      Singularity offers a range of activities for beginners and astronomy enthusiasts.

      Events:
      Singularity hosts events and seminars to explore the wonders of space science.

      Orientation:
      Singularity hosts an orientation for new members to connect with fellow enthusiasts and learn more about the universe.`,
    },
    {
      ClubName: "Pentagram",
      Description: `Pentagram is the mathematical society at B.M.S. College of Engineering (BMSCE) in Bengaluru that promotes a love for numbers and mathematics.

      Purpose:
      Pentagram's mission is to promote higher mathematics among students and provide a platform for them to share their knowledge.

      Events:
      Pentagram hosts events like crossword competitions, puzzles, and riddles. They also organize inter-collegiate competitions to promote a love for numbers.

      Activities:
      Pentagram members share a passion for mathematics and are part of a vibrant community that encourages intellectual curiosity and creativity.`,
    },
    {
      ClubName: "BIG Foundation",
      Description: `BIG FOUNDATION fosters innovation through rigorous research and collaborative efforts, leveraging domain expertise to develop impactful products and technologies. Here at BIG, we cultivate entrepreneurial spirit and support start-ups through tailored incubation facilities, consultancy services, and enhanced industry-institute interaction.

      Vision:
      Create products, technologies or processes to address societal needs.

      Mission:
      Encourage entrepreneurship by supporting innovation and transferring technology for commercial use through diverse approaches.`,
    },
    {
      ClubName: "FALCONS",
      Description: `The Falcon Club, or FALCONS, is the official multimedia club at BMS College of Engineering (BMSCE). The club is student-run and combines creativity with technology.

      The club offers a variety of roles, including:
      - DSLR photographer
      - DSLR videographer
      - Mobile videographer
      - Editor
      - Designer
      - Filmmaker

      Some benefits of joining the club include:
      - Access to events like PhaseShift and Utsav
      - Opportunities to work on pre-fest projects
      - Networking with other students
      - Expanding your creative portfolio.`,
    },
    {
      ClubName: "Rotaract BMSCE",
      Description: `Rotaract Club of B.M.S. College of Engineering majorly focuses on planning, organizing, execution, and management of techno-societal projects with students from various technological domains. Sustainable techno-societal projects in the domain of education, social engineering, policy, and youth empowerment are a part of the club’s functional priorities, which align with the institution’s vision and mission.

      The Rotaract Club was conceived in the year 2014 and has been actively involved in different streams of helplines under the guidance of Dr. Chandra Shekara G, Assistant Professor, Department of Mathematics, BMSCE.`,
    },
    {
      ClubName: "GDG BMSCE",
      Description: `GDG BMSCE (Google Developer Group, BMS College of Engineering) is a student-run organization that focuses on bringing together tech enthusiasts, developers, and engineers in the BMSCE community. The club is part of the global Google Developer Groups network and aims to foster collaboration, learning, and innovation in the fields of software development, technology, and entrepreneurship.`,
    },
    {
      ClubName: "NSS",
      Description: `NSS provides an opportunity to the student community to take part in various government-led community service activities & programs. The sole aim of the NSS is to provide hands-on experience to young students in delivering community service. The NSS Unit of BMSCE aims to inculcate the spirit of volunteerism in the students and help them become accomplished social leaders, efficient administrators, and individuals who understand human nature.`,
    },
    {
      ClubName: "Chiranthana",
      Description: `The club we are going to expound at this juncture is CHIRANTANA, the Kannada Sangha of BMS College of Engineering, well-known to most localities, owing to its presence in the heart of the city for over seven decades now. Higher education, particularly technical education in Karnataka, draws a lot of attraction from various states of India. Although the medium of instruction is English, the chores of a common man day after day have to travel amidst the waves of Kannada.

      An insight into Kannada Literature showcases the widest range of styles and vocabulary through its history. From Pampa of the yore to DVG of yesterday, Kannada has witnessed writers of exceptional class, matching or even surpassing their counterparts in other languages across the globe. It is but natural for a literary enthusiast to safeguard and propagate the findings in Kannada literature. And we, at Chirantana, do just that.`,
    },
  ]);

  return (
    <Layout>
      <div className="bg-gradient-to-b from-indigo-100 to-white min-h-screen">
        <h1 className="text-center text-4xl font-extrabold text-indigo-700 py-8 drop-shadow-md">
          Clubs at BMSCE
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
          {Clubs.map((club, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-2xl font-bold text-indigo-600 mb-4 text-center">
                {club.ClubName}
              </h3>
              <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
                {club.Description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ClubsList;
