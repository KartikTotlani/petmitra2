import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Veterinary_dermatologist from './Veterinary_dermatologist.svg'
import Veterinary_cardiologist from './Veterinary_cardiologist.svg'
import General_vet from './General_Vet.svg'
import Veterinary_surgeon from './Veterinary_surgeon.svg'
import Exotic_animal_specialist from './Exotic_animal_specialist.svg'
import Veterinary_dentist from './Veterinary_dentist.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
      speciality: 'General Vet',
      image: General_vet,
    },
    {
      speciality: 'Veterinary Surgeon',
      image: Veterinary_surgeon,
    },
    {
      speciality: 'Veterinary Dermatologist',
      image: Veterinary_dermatologist,
    },
    {
      speciality: 'Veterinary Dentist',
      image: Veterinary_dentist,
    },
    {
      speciality: 'Exotic Animal Specialist',
      image: Exotic_animal_specialist,
    },
    {
      speciality: 'Veterinary Cardiologist',
      image: Veterinary_cardiologist,
    },
  ];
  export const doctors = [
    {
      _id: 'vet1',
      name: 'Dr. Richard James',
      image: doc1,
      speciality: 'General Vet',
      degree: 'BVSc',
      experience: '4 Years',
      about: 'Dr. James is dedicated to providing comprehensive pet healthcare including regular checkups, vaccinations, and preventive care.',
      fees: 50,
      address: {
        line1: 'Koramangala 4th Block',
        line2: 'Bangalore, Karnataka'
      }
    },
    {
      _id: 'vet2',
      name: 'Dr. Emily Larson',
      image: doc2,
      speciality: 'Veterinary Surgeon',
      degree: 'BVSc & AH',
      experience: '3 Years',
      about: 'Dr. Larson specializes in soft-tissue and orthopedic surgeries with a gentle approach for your pets.',
      fees: 60,
      address: {
        line1: 'Banjara Hills',
        line2: 'Hyderabad, Telangana'
      }
    },
    {
      _id: 'vet3',
      name: 'Dr. Sarah Patel',
      image: doc3,
      speciality: 'Veterinary Dermatologist',
      degree: 'BVSc',
      experience: '1 Years',
      about: 'Dr. Patel provides specialized care for pet skin, coat, and allergy issues with a focus on natural treatments.',
      fees: 30,
      address: {
        line1: 'DLF Phase 3',
        line2: 'Gurgaon, Haryana'
      }
    },
    {
      _id: 'vet4',
      name: 'Dr. Christopher Lee',
      image: doc4,
      speciality: 'Veterinary Dentist',
      degree: 'BVSc',
      experience: '2 Years',
      about: 'Dr. Lee ensures your pets have healthy teeth and gums through professional dental services and education.',
      fees: 40,
      address: {
        line1: 'Nungambakkam',
        line2: 'Chennai, Tamil Nadu'
      }
    },
    {
      _id: 'vet5',
      name: 'Dr. Jennifer Garcia',
      image: doc5,
      speciality: 'Veterinary Cardiologist',
      degree: 'BVSc & AH',
      experience: '4 Years',
      about: 'Dr. Garcia is passionate about pet heart health, offering diagnostic and long-term cardiac care.',
      fees: 50,
      address: {
        line1: 'Salt Lake Sector V',
        line2: 'Kolkata, West Bengal'
      }
    },
    {
      _id: 'vet6',
      name: 'Dr. Andrew Williams',
      image: doc6,
      speciality: 'Veterinary Cardiologist',
      degree: 'BVSc & AH',
      experience: '4 Years',
      about: 'Dr. Williams has expertise in treating heart conditions and ensures quality cardiac monitoring for pets.',
      fees: 50,
      address: {
        line1: 'Pimple Saudagar',
        line2: 'Pune, Maharashtra'
      }
    },
    {
      _id: 'vet7',
      name: 'Dr. Christopher Davis',
      image: doc7,
      speciality: 'General Vet',
      degree: 'BVSc',
      experience: '4 Years',
      about: 'Dr. Davis offers holistic care for pets, combining traditional medicine with wellness practices.',
      fees: 50,
      address: {
        line1: 'Panampilly Nagar',
        line2: 'Kochi, Kerala'
      }
    },
    {
      _id: 'vet8',
      name: 'Dr. Timothy White',
      image: doc8,
      speciality: 'Veterinary Surgeon',
      degree: 'BVSc',
      experience: '3 Years',
      about: 'Dr. White provides expert surgical intervention for a wide variety of small and large animal cases.',
      fees: 60,
      address: {
        line1: 'Civil Lines',
        line2: 'Jaipur, Rajasthan'
      }
    },
    {
      _id: 'vet9',
      name: 'Dr. Ava Mitchell',
      image: doc9,
      speciality: 'Veterinary Dermatologist',
      degree: 'BVSc',
      experience: '1 Years',
      about: 'Dr. Mitchell treats skin diseases in dogs and cats with an evidence-based approach.',
      fees: 30,
      address: {
        line1: 'Vasant Kunj',
        line2: 'New Delhi'
      }
    },
    {
      _id: 'vet10',
      name: 'Dr. Jeffrey King',
      image: doc10,
      speciality: 'Veterinary Dentist',
      degree: 'BVSc',
      experience: '2 Years',
      about: 'Dr. King ensures pets have proper oral hygiene and helps prevent long-term dental issues.',
      fees: 40,
      address: {
        line1: 'Alkapuri',
        line2: 'Vadodara, Gujarat'
      }
    },
    {
      _id: 'vet11',
      name: 'Dr. Zoe Kelly',
      image: doc11,
      speciality: 'Veterinary Cardiologist',
      degree: 'BVSc & AH',
      experience: '4 Years',
      about: 'Dr. Kelly uses cutting-edge technology to diagnose and treat pet heart conditions.',
      fees: 50,
      address: {
        line1: 'Kukatpally',
        line2: 'Hyderabad, Telangana'
      }
    },
    {
      _id: 'vet12',
      name: 'Dr. Patrick Harris',
      image: doc12,
      speciality: 'Veterinary Cardiologist',
      degree: 'BVSc',
      experience: '4 Years',
      about: 'Dr. Harris provides specialized care for dogs and cats with cardiovascular conditions.',
      fees: 50,
      address: {
        line1: 'Saket',
        line2: 'New Delhi'
      }
    },
    {
      _id: 'vet13',
      name: 'Dr. Chloe Evans',
      image: doc13,
      speciality: 'General Vet',
      degree: 'BVSc',
      experience: '4 Years',
      about: 'Dr. Evans focuses on annual wellness, vaccinations, and parasite prevention in pets.',
      fees: 50,
      address: {
        line1: 'Jayanagar 9th Block',
        line2: 'Bangalore, Karnataka'
      }
    },
    {
      _id: 'vet14',
      name: 'Dr. Ryan Martinez',
      image: doc14,
      speciality: 'Veterinary Surgeon',
      degree: 'BVSc & AH',
      experience: '3 Years',
      about: 'Dr. Martinez performs complex surgeries with high success rates and post-op care.',
      fees: 60,
      address: {
        line1: 'Camp Area',
        line2: 'Pune, Maharashtra'
      }
    },
    {
      _id: 'vet15',
      name: 'Dr. Amelia Hill',
      image: doc15,
      speciality: 'Veterinary Dermatologist',
      degree: 'BVSc',
      experience: '1 Years',
      about: 'Dr. Hill is known for her compassionate treatment of chronic skin conditions in pets.',
      fees: 30,
      address: {
        line1: 'Satellite Road',
        line2: 'Ahmedabad, Gujarat'
      }
    }
  ];
  