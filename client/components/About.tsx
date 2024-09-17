
import { Handshake, CopyCheck, Heart } from 'lucide-react';

const teamMembers = [
  {
    name: 'Edward Soung',
    role: 'Product Owner',
    img: 'images/Eddie.png',
    GitHub: 'https://github.com/EddieWeddie11',
  },
  {
    name: 'Hayden Flintoft',
    role: 'Product Owner / Backend Engineer',
    img: 'images/Hayden.png',
    GitHub: 'https://github.com/hayden-flintoft',
  },
  {
    name: 'Edward Rainger',
    role: 'Frontend Engineer',
    img: 'images/Ted.png',
    GitHub: 'https://github.com/edward-rainger',
  },
  {
    name: 'Karl Bloomfield',
    role: 'Backend Engineer',
    img: 'images/Karl.png',
    GitHub: 'https://github.com/karl-bloomfield',
  },
];

const AboutUs = () => {
  return (
    <div className="about-us bg-white">
      {/* Hero Section */}
      <section className="px-6 py-20 text-center bg-[#FFF5E6] rounded-3xl">
        <h1 className="mb-6 text-6xl font-bold text-[#9E3700] leading-tight">
        We believe that creativity in the kitchen does not need to come with a long grocery list.
        </h1>
      </section>

      {/* Our Story Section */}
      <section className="px-6 py-16 bg-[#9E3700] rounded-3xl">
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-6 text-4xl font-bold text-[#FFF5E6] leading-tight">
            Our Story
          </h2>
          <p className="mb-10 text-xl text-[#FFF5E6]">
            Born from the idea that you can make the most of what you already have, our app helps you transform a few ingredients into a meal. We understand that not everyone has the time or energy to shop for complex recipes or follow long ingredient lists. With Let 'em Cook, we want to make cooking simple, fun, and accessible for everyone, no matter your skill level.
          </p>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="px-6 py-16 bg-[#FFF5E6] rounded-3xl">
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-6 text-4xl font-bold text-[#9E3700] leading-tight text-center">
            How it Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Handshake className="h-16 w-16 mx-auto mb-4 text-[#9E3700]" />
              <p className="text-lg text-gray-700">Filter ingredients you have, and we'll provide creative meal ideas.</p>
            </div>
            <div className="text-center">
              <Heart className="h-16 w-16 mx-auto mb-4 text-[#9E3700]" />
              <p className="text-lg text-gray-700">Save recipes to your profile by liking or reacting.</p>
            </div>
            <div className="text-center">
              <CopyCheck className="h-16 w-16 mx-auto mb-4 text-[#9E3700]" />
              <p className="text-lg text-gray-700">Intuitive app design for a seamless experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="px-6 py-16 bg-[#9E3700] rounded-3xl">
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-6 text-4xl font-bold text-[#FFF5E6] leading-tight">
            Our Mission
          </h2>
          <p className="mb-10 text-xl text-[#FFF5E6]">
            Our mission is to inspire you to use what you have and reduce food waste, all while still enjoying flavorful, home-cooked meals. Whether you're a busy professional, a student, or someone looking to save money by using up ingredients before they spoil, Let 'em Cook is here to help you make the most out of every ingredient.
          </p>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="px-6 py-16 bg-[#FFF5E6] rounded-3xl">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-12 text-4xl font-bold text-[#9E3700] leading-tight text-center">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-32 h-32 mx-auto mb-4 rounded-full object-cover"
                />
                <h3 className="text-xl font-semibold text-[#9E3700]">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
                <a
                  href={member.GitHub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9E3700] hover:underline mt-2 inline-block"
                >
                  GitHub
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;