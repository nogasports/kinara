import { Users, Award, Globe, Heart, Target, Rocket, Shield, Leaf } from 'lucide-react';

export default function About() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="container relative z-10 text-white">
          <h1 className="text-5xl font-bold mb-6">About Kinara Energy</h1>
          <p className="text-xl max-w-2xl">
            Leading the way in sustainable energy solutions for a brighter future.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Our Story</h2>
            <div className="space-y-6 text-gray-600">
              <p>
                Founded in 2020, Kinara Energy was born from a vision to make clean energy accessible to everyone. We recognized the growing need for sustainable energy solutions in East Africa and set out to create products that would meet this demand while being affordable and reliable.
              </p>
              <p>
                Our journey began with a simple solar lamp, but we quickly expanded our product line to include comprehensive home solar systems, energy storage solutions, and more. Today, we're proud to be at the forefront of the renewable energy revolution in East Africa.
              </p>
              <p>
                With a commitment to innovation and sustainability, we continue to develop new solutions that help communities thrive while protecting our planet for future generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-[2deg] shadow-md text-center">
              <Leaf className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Sustainability</h3>
              <p className="text-gray-600">
                Prioritizing eco-friendly solutions that protect our planet for future generations.
              </p>
            </div>
            <div className="bg-white p-6 rounded-[2deg] shadow-md text-center">
              <Rocket className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p className="text-gray-600">
                Continuously improving and adapting to meet evolving energy needs.
              </p>
            </div>
            <div className="bg-white p-6 rounded-[2deg] shadow-md text-center">
              <Users className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Empowerment</h3>
              <p className="text-gray-600">
                Enabling individuals and communities to take control of their energy future.
              </p>
            </div>
            <div className="bg-white p-6 rounded-[2deg] shadow-md text-center">
              <Shield className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Integrity</h3>
              <p className="text-gray-600">
                Operating with transparency, honesty, and accountability in all we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <Users className="h-16 w-16 mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div>Households Powered</div>
            </div>
            <div className="text-center">
              <Globe className="h-16 w-16 mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div>Tons of CO₂ Reduced</div>
            </div>
            <div className="text-center">
              <Heart className="h-16 w-16 mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">100+</div>
              <div>Communities Served</div>
            </div>
            <div className="text-center">
              <Award className="h-16 w-16 mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">15+</div>
              <div>Industry Awards</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Our Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-[2deg] overflow-hidden shadow-md group hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
                  alt="CEO"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <h3 className="text-xl font-semibold text-white mb-1">John Doe</h3>
                  <p className="text-primary-400">CEO & Founder</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600">
                  With over 15 years in renewable energy, John leads our mission to democratize solar power.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-[2deg] overflow-hidden shadow-md group hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
                  alt="CTO"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <h3 className="text-xl font-semibold text-white mb-1">Jane Smith</h3>
                  <p className="text-primary-400">Chief Technology Officer</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600">
                  Jane brings innovative technical solutions to our product development process.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-[2deg] overflow-hidden shadow-md group hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
                  alt="COO"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <h3 className="text-xl font-semibold text-white mb-1">Mike Johnson</h3>
                  <p className="text-primary-400">Chief Operations Officer</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600">
                  Mike ensures our operations run smoothly and efficiently across all regions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-[2deg] shadow-md">
              <Target className="h-12 w-12 text-primary-600 mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To democratize access to clean energy by providing innovative, affordable, and sustainable solar solutions that empower individuals, communities, and businesses to thrive.
              </p>
            </div>
            <div className="bg-white p-8 rounded-[2deg] shadow-md">
              <Rocket className="h-12 w-12 text-primary-600 mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
              <p className="text-gray-600">
                A world where clean, renewable energy is accessible to all, driving economic growth, environmental preservation, and social equity.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}