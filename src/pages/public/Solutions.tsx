import { useState } from 'react';
import { ArrowRight, Sun, Battery, Zap, Building2, Home, Truck } from 'lucide-react';

export default function Solutions() {
  const [activeTab, setActiveTab] = useState('residential');

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
          <h1 className="text-5xl font-bold mb-6">Solar Energy Solutions</h1>
          <p className="text-xl max-w-2xl">
            Harness the power of the sun with our comprehensive range of solar solutions. 
            From residential installations to commercial systems, we have the perfect solution for your energy needs.
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Solar Solutions?</h2>
            <p className="text-gray-600">
              We offer end-to-end solar energy solutions that are customized to your specific needs, 
              backed by cutting-edge technology and expert support.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-[2deg] shadow-sm">
              <Sun className="h-12 w-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Sustainable Energy</h3>
              <p className="text-gray-600">
                Reduce your carbon footprint and contribute to a cleaner environment with renewable solar energy.
              </p>
            </div>

            <div className="bg-white p-8 rounded-[2deg] shadow-sm">
              <Battery className="h-12 w-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Energy Independence</h3>
              <p className="text-gray-600">
                Take control of your energy needs with reliable power storage and backup solutions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-[2deg] shadow-sm">
              <Zap className="h-12 w-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Cost Savings</h3>
              <p className="text-gray-600">
                Significantly reduce your energy bills and enjoy long-term financial benefits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Tabs */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveTab('residential')}
              className={`px-6 py-3 rounded-full ${
                activeTab === 'residential'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Residential Solutions
            </button>
            <button
              onClick={() => setActiveTab('commercial')}
              className={`px-6 py-3 rounded-full ${
                activeTab === 'commercial'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Commercial Solutions
            </button>
            <button
              onClick={() => setActiveTab('industrial')}
              className={`px-6 py-3 rounded-full ${
                activeTab === 'industrial'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Industrial Solutions
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {activeTab === 'residential' && (
              <>
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold mb-6">Home Solar Solutions</h2>
                  <p className="text-gray-600">
                    Transform your home into an energy-efficient powerhouse with our comprehensive residential solar solutions.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <Home className="h-6 w-6 text-primary-600 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-2">Complete Home Systems</h4>
                        <p className="text-gray-600">Solar panels, inverters, and batteries designed for optimal home performance.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Zap className="h-6 w-6 text-primary-600 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-2">Smart Energy Management</h4>
                        <p className="text-gray-600">Monitor and optimize your energy usage with our smart home integration.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Battery className="h-6 w-6 text-primary-600 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-2">Power Backup Solutions</h4>
                        <p className="text-gray-600">Never worry about power outages with our reliable battery backup systems.</p>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-primary flex items-center gap-2 mt-6">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="aspect-square relative rounded-[2deg] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                    alt="Residential Solar Installation"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </>
            )}

            {activeTab === 'commercial' && (
              <>
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold mb-6">Commercial Solar Solutions</h2>
                  <p className="text-gray-600">
                    Reduce operating costs and enhance your business's sustainability with our commercial solar installations.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <Building2 className="h-6 w-6 text-primary-600 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-2">Building Integration</h4>
                        <p className="text-gray-600">Seamlessly integrate solar solutions into your commercial building infrastructure.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Zap className="h-6 w-6 text-primary-600 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-2">Peak Load Management</h4>
                        <p className="text-gray-600">Optimize energy consumption during peak hours and reduce demand charges.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Truck className="h-6 w-6 text-primary-600 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-2">Turnkey Solutions</h4>
                        <p className="text-gray-600">End-to-end project management from design to installation and maintenance.</p>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-primary flex items-center gap-2 mt-6">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="aspect-square relative rounded-[2deg] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1497440001374-f26997328c1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                    alt="Commercial Solar Installation"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </>
            )}

            {activeTab === 'industrial' && (
              <>
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold mb-6">Industrial Solar Solutions</h2>
                  <p className="text-gray-600">
                    Power your industrial operations with reliable and scalable solar energy systems designed for maximum efficiency and output.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <Building2 className="h-6 w-6 text-primary-600 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-2">Large-Scale Installations</h4>
                        <p className="text-gray-600">Custom solar solutions for factories, warehouses, and industrial complexes.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Zap className="h-6 w-6 text-primary-600 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-2">High-Power Output</h4>
                        <p className="text-gray-600">Maximize energy production with advanced solar technology and optimal placement.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Battery className="h-6 w-6 text-primary-600 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-2">Industrial Storage</h4>
                        <p className="text-gray-600">Large-scale battery systems for consistent power supply and grid stability.</p>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-primary flex items-center gap-2 mt-6">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="aspect-square relative rounded-[2deg] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1605980413988-9ff24c537935?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                    alt="Industrial Solar Installation"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-gray-600">
              Hear from businesses and homeowners who have transformed their energy consumption with our solar solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-[2deg] shadow-sm">
              <p className="text-gray-600 mb-6">
                "The residential solar system has completely transformed our home energy usage. We're saving significantly on bills and love being energy independent."
              </p>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <Home className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Sarah Johnson</h4>
                  <p className="text-gray-500">Homeowner</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2deg] shadow-sm">
              <p className="text-gray-600 mb-6">
                "Our commercial building's energy costs have been reduced by 60% since installing the solar system. The ROI has been remarkable."
              </p>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Michael Chen</h4>
                  <p className="text-gray-500">Business Owner</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2deg] shadow-sm">
              <p className="text-gray-600 mb-6">
                "The industrial solar installation has not only reduced our carbon footprint but also provided us with a reliable power source for our operations."
              </p>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <Truck className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">David Smith</h4>
                  <p className="text-gray-500">Factory Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}