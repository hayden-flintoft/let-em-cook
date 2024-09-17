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
    <div className="about-us">
      {/* Our Story Section */}
      <section className="our-story text-center">
        <h2>Our Story</h2>
        <p>
          We believe that creativity in the kitchen does not need to come with a
          long grocery list. Born from the idea that you can make the most of
          what you already have, our app helps you transform a few ingredients
          from your pantry or fridge into a delicious, satisfying meal. How
          often have you found yourself staring at random ingredients, unsure of
          what to cook? That’s exactly the problem we set out to solve. We
          understand that not everyone has the time or energy to shop for
          complex recipes or follow long ingredient lists. With Let &apos;em
          Cook we want to make cooking simple, fun, and accessible for everyone
          no matter your skill level
        </p>
        <h2>Our Mission</h2>
        <p>
          Our mission is to inspire you to use what you have and reduce food
          waste while still enjoying flavorful, home-cooked meals. Whether you
          are a busy professional, a student, or someone looking to save money
          by using up ingredients before they go to waste, Let &apos;em is here
          to help you make the most out of every ingredient
        </p>
        <h2>How it works</h2>
        <p>
          Simply enter the ingredients you have on hand, and we will provide you
          with quick, easy, and creative meal ideas. The app is designed to be
          intuitive, offering recipe suggestions that fit your lifestyle,
          whether you are in the mood for something fast and simple or a bit
          more adventurous
        </p>
      </section>

      {/* All Members Section */}
      <section className="all-members text-center">
        <h2>Meet the Team</h2>
        <br></br>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div className="team-member" key={index}>
              <img
                src={member.img}
                alt={member.name}
                className="member-image"
              />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              <div className="social-icons">
                {member.GitHub && (
                  <a
                    href={member.GitHub}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Styles */}
      <style jsx>{`
        .about-us {
          padding: 40px 20px;
        }
        .our-story {
          margin-bottom: 40px;
        }
        .story-image {
          max-width: 100%;
          height: auto;
          margin-top: 20px;
        }
        .all-members {
          margin-top: 40px;
        }
        .team-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .team-member {
          text-align: center;
        }
        .member-image {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 50%;
          margin-bottom: 10px;
        }
        .social-icons {
          margin-top: 10px;
        }
        .social-icons a {
          margin: 0 10px;
          text-decoration: none;
          color: #333;
        }
      `}</style>
    </div>
  )
}

export default AboutUs
