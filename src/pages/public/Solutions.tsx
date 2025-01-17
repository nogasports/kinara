export default function Solutions() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="container relative z-10 text-white">
          <h1 className="text-5xl font-bold mb-6">Our Solutions</h1>
          <p className="text-xl max-w-2xl">
            Discover our range of innovative solar energy solutions designed for every need.
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-[2deg] overflow-hidden">
              <div className="aspect-video relative">
                <img 
                  src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
                  alt="Home Solar Systems"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-4">Home Solar Systems</h3>
                <p className="text-gray-600 mb-6">
                  Complete solar solutions for homes, including panels, inverters, and batteries. 
                  Perfect for families looking to reduce their energy bills and carbon footprint.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-primary-600 rounded-full mr-2"></span>
                    Easy installation and maintenance
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-primary-600 rounded-full mr-2"></span>
                    24/7 power backup
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-primary-600 rounded-full mr-2"></span>
                    Monitoring system included
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 rounded-[2deg] overflow-hidden">
              <div className="aspect-video relative">
                <img 
                  src="https://images.unsplash.com/photo-1497440001374-f26997328c1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
                  alt="Portable Solutions"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-4">Portable Solutions</h3>
                <p className="text-gray-600 mb-6">
                  Compact and efficient solar products for lighting and charging. 
                  Ideal for outdoor activities or areas with limited power access.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-primary-600 rounded-full mr-2"></span>
                    Lightweight and durable
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-primary-600 rounded-full mr-2"></span>
                    Multiple charging options
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-primary-600 rounded-full mr-2"></span>
                    Long battery life
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}