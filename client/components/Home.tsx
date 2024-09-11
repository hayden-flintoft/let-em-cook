export default function Home() {
  const popularCategories = [
    { name: 'French', imageUrl: 'images/French.png' },
    { name: 'Indian', imageUrl: '/images/Indian.png' },
    { name: 'Italian', imageUrl: '/images/Italian.png' },
    { name: 'Japanese', imageUrl: '/images/Japanese.png' },
    { name: 'Mexican', imageUrl: '/images/Mexican.png' },
    { name: 'Thai', imageUrl: '/images/Thai.png' },
  ]
  const PopularCategory = ({ name, imageUrl }) => (
    <div className="flex flex-col items-center">
      <img
        src={imageUrl}
        alt={name}
        className="mb-2 h-16 w-16 rounded-full object-cover"
      />
      <span className="text-sm">{name}</span>
    </div>
  )

  return (
    <div>
      {/* <div className="relative w-full">
        <div className="h-[1000px] w-full overflow-hidden rounded-3xl">
          <img
            src="/images/Meals-by-Chefkraft.png"
            alt="Food"
            className="h-auto w-full"
          />
        </div>
      </div> */}
      {/* Main Image */}
      <div>
        <div className="relative mb-8 h-[500px] w-full overflow-hidden rounded-3xl">
          <img
            src="/images/Meals-by-Chefkraft.png"
            alt="Various delicious meals"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h2 className="text-4xl font-bold text-white drop-shadow-lg md:text-5xl lg:text-6xl">
                &apos;I have nothing to eat&apos;,
                <br />
                <span className="text-[#FFB649]">
                  is just an unwritten recipe
                </span>
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Categories */}
      <section>
        <h3 className="mb-4 text-2xl font-semibold">Popular Categories</h3>
        <div className="grid grid-cols-6 gap-4">
          {popularCategories.map((category) => (
            <PopularCategory key={category.name} {...category} />
          ))}
        </div>
      </section>
    </div>
  )
}
