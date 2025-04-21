import React from 'react'

const About = () => {
  return (
    <div className='max-w-6xl mx-auto px-4 py-8'>
      <h1 className='text-3xl font-semibold text-center text-primary mb-6'>About Us</h1>

      <div className='text-lg text-gray-700'>
        <p className='mb-4'>
          Welcome to our platform! We are committed to providing quality services to our community by connecting individuals
          with qualified professionals, such as doctors, veterinarians, and NGOs. Our goal is to make healthcare, veterinary 
          services, and social support easily accessible to everyone.
        </p>

        <h2 className='text-2xl font-semibold text-primary mb-4'>Our Mission</h2>
        <p className='mb-4'>
          Our mission is to offer a seamless and user-friendly experience for both users and service providers. We aim to bridge 
          the gap between those in need of medical, veterinary, or social assistance and those who provide these services.
        </p>

        <h2 className='text-2xl font-semibold text-primary mb-4'>Our Services</h2>
        <ul className='list-disc pl-5 mb-4'>
          <li>Connecting you to experienced doctors in various fields of medicine</li>
          <li>Providing veterinary care through a network of qualified vets</li>
          <li>Helping NGOs reach the people who need their services the most</li>
          <li>Access to AI-driven help for medical inquiries and assistance</li>
        </ul>

        <h2 className='text-2xl font-semibold text-primary mb-4'>Why Choose Us?</h2>
        <p className='mb-4'>
          We are dedicated to offering high-quality services that are easy to access, whether you are looking for a doctor, a vet, 
          or an NGO to assist with various causes. We prioritize reliability, ease of use, and transparency. Our platform is designed 
          to ensure that you can find the help you need quickly and with minimal hassle.
        </p>

        <h2 className='text-2xl font-semibold text-primary mb-4'>Contact Us</h2>
        <p className='mb-4'>
          If you have any questions or would like to learn more about our services, feel free to contact us! Our team is always 
          here to assist you.
        </p>

        <div className='text-center'>
          <button
            onClick={() => window.location.href = '/contact'}
            className='bg-primary text-white px-8 py-3 rounded-full font-light'>
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  )
}

export default About
