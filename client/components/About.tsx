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
]

const AboutUs = () => {
  return (
    <div className="about-us px-6 py-12">
      {/* Our Story Section */}
      <section className="px-8 py-12 bg-white">
  <h1 className="mb-6 text-5xl font-bold text-[#9E3700] leading-tight">
  We believe that creativity in the kitchen does not need to come with a long grocery list.
  </h1>
  <br></br>
  <p className="mb-10 text-xl text-[#9E3700]0">
     Born from the idea that you can make the most of what you already have, our app helps you transform a few ingredients from your pantry or fridge into a delicious, satisfying meal. How often have you found yourself staring at random ingredients, unsure of what to cook? That is exactly the problem we set out to solve. We understand that not everyone has the time or energy to shop for complex recipes or follow long ingredient lists. With Let &apos;em Cook, we want to make cooking simple, fun, and accessible for everyone, no matter your skill level.
  </p>

  <h2 className="mb-6 text-5xl font-bold text-[#9E3700] leading-tight">
    Our Mission
  </h2>
  <p className="mb-10 text-lg text-gray-600">
    Our mission is to inspire you to use what you have and reduce food waste, all while still enjoying flavorful, home-cooked meals. Whether you are a busy professional, a student, or someone looking to save money by using up ingredients before they spoil, Let &apos;em Cook is here to help you make the most out of every ingredient.
  </p>

  <h2 className="mb-4 text-4xl font-extrabold text-[#9E3700]">
    How it Works
  </h2>
  <p className="mb-10 text-lg text-[#9E3700]">
    Simply enter the ingredients you have on hand, and we will provide you with quick, easy, and creative meal ideas. The app is designed to be intuitive, offering recipe suggestions that fit your lifestyle—whether you are in the mood for something fast and simple or a bit more adventurous.
  </p>
</section>


      {/* All Members Section */}
      <section className="all-members text-center">
        <h2 className="mb-8 text-4xl font-extrabold text-[#9E3700]">
          Meet the Team
        </h2>
        <div className="team-grid grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {teamMembers.map((member, index) => (
            <div className="team-member" key={index}>
              <img
                src={member.img}
                alt={member.name}
                className="member-image mx-auto mb-4 h-32 w-32 rounded-full object-cover"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
              <div className="social-icons mt-4">
                {member.GitHub && (
                  <a
                    href={member.GitHub}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9E3700] hover:underline"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default AboutUs
