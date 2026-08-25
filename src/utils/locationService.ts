import cityTimezones from 'city-timezones';
import { LocationData } from '../types';

// Curated comprehensive dataset of Indian Cities, Spiritual/Pilgrimage Hubs, and Metro Aliases
// with exact coordinates and standard Indian Standard Time (IST - Asia/Kolkata, UTC +05:30)
const INDIAN_LOCATIONS_DATABASE: Array<{
  city: string;
  aliases?: string[];
  state: string;
  country: string;
  countryCode: string;
  lat: number;
  lng: number;
  timezone: string;
  pop: number;
}> = [
  // Major Metros & Capital Regions
  { city: 'Delhi', aliases: ['New Delhi', 'NCR', 'Old Delhi', 'Dilli'], state: 'Delhi', country: 'India', countryCode: 'IN', lat: 28.6139, lng: 77.2090, timezone: 'Asia/Kolkata', pop: 33000000 },
  { city: 'New Delhi', aliases: ['Delhi', 'NCR'], state: 'Delhi', country: 'India', countryCode: 'IN', lat: 28.6139, lng: 77.2090, timezone: 'Asia/Kolkata', pop: 33000000 },
  { city: 'Noida', aliases: ['Gautam Buddha Nagar', 'Greater Noida'], state: 'Uttar Pradesh', country: 'India', countryCode: 'IN', lat: 28.5355, lng: 77.3910, timezone: 'Asia/Kolkata', pop: 640000 },
  { city: 'Gurugram', aliases: ['Gurgaon'], state: 'Haryana', country: 'India', countryCode: 'IN', lat: 28.4595, lng: 77.0266, timezone: 'Asia/Kolkata', pop: 876969 },
  { city: 'Faridabad', state: 'Haryana', country: 'India', countryCode: 'IN', lat: 28.4089, lng: 77.3178, timezone: 'Asia/Kolkata', pop: 1414050 },
  { city: 'Ghaziabad', state: 'Uttar Pradesh', country: 'India', countryCode: 'IN', lat: 28.6692, lng: 77.4538, timezone: 'Asia/Kolkata', pop: 2375820 },
  
  // Western India Metros & Cities
  { city: 'Mumbai', aliases: ['Bombay', 'Greater Mumbai', 'South Mumbai'], state: 'Maharashtra', country: 'India', countryCode: 'IN', lat: 19.0760, lng: 72.8777, timezone: 'Asia/Kolkata', pop: 21000000 },
  { city: 'Navi Mumbai', aliases: ['New Bombay', 'Panvel', 'Vashi'], state: 'Maharashtra', country: 'India', countryCode: 'IN', lat: 19.0330, lng: 73.0297, timezone: 'Asia/Kolkata', pop: 1120000 },
  { city: 'Thane', state: 'Maharashtra', country: 'India', countryCode: 'IN', lat: 19.2183, lng: 72.9781, timezone: 'Asia/Kolkata', pop: 1841488 },
  { city: 'Kalyan-Dombivli', aliases: ['Kalyan', 'Dombivli'], state: 'Maharashtra', country: 'India', countryCode: 'IN', lat: 19.2403, lng: 73.1305, timezone: 'Asia/Kolkata', pop: 1247327 },
  { city: 'Vasai-Virar', aliases: ['Vasai', 'Virar'], state: 'Maharashtra', country: 'India', countryCode: 'IN', lat: 19.3919, lng: 72.8397, timezone: 'Asia/Kolkata', pop: 1222142 },
  { city: 'Pune', aliases: ['Poona', 'Pimpri-Chinchwad'], state: 'Maharashtra', country: 'India', countryCode: 'IN', lat: 18.5204, lng: 73.8567, timezone: 'Asia/Kolkata', pop: 6500000 },
  { city: 'Pimpri-Chinchwad', aliases: ['PCMC', 'Pune'], state: 'Maharashtra', country: 'India', countryCode: 'IN', lat: 18.6298, lng: 73.7997, timezone: 'Asia/Kolkata', pop: 1727692 },
  { city: 'Nagpur', aliases: ['Orange City'], state: 'Maharashtra', country: 'India', countryCode: 'IN', lat: 21.1458, lng: 79.0882, timezone: 'Asia/Kolkata', pop: 2405665 },
  { city: 'Nashik', aliases: ['Nasik', 'Trimbak', 'Trimbakeshwar'], state: 'Maharashtra', country: 'India', countryCode: 'IN', lat: 19.9975, lng: 73.7898, timezone: 'Asia/Kolkata', pop: 1486053 },
  { city: 'Chhatrapati Sambhajinagar', aliases: ['Aurangabad'], state: 'Maharashtra', country: 'India', countryCode: 'IN', lat: 19.8762, lng: 75.3433, timezone: 'Asia/Kolkata', pop: 1175116 },
  { city: 'Shirdi', aliases: ['Sai Nagar Shirdi'], state: 'Maharashtra', country: 'India', countryCode: 'IN', lat: 19.7667, lng: 74.4764, timezone: 'Asia/Kolkata', pop: 36000 },
  { city: 'Kolhapur', aliases: ['Mahalaxmi Kolhapur'], state: 'Maharashtra', country: 'India', countryCode: 'IN', lat: 16.7050, lng: 74.2433, timezone: 'Asia/Kolkata', pop: 549236 },
  { city: 'Solapur', state: 'Maharashtra', country: 'India', countryCode: 'IN', lat: 17.6599, lng: 75.9064, timezone: 'Asia/Kolkata', pop: 951558 },
  { city: 'Ahmednagar', aliases: ['Ahilya Nagar'], state: 'Maharashtra', country: 'India', countryCode: 'IN', lat: 19.0948, lng: 74.7480, timezone: 'Asia/Kolkata', pop: 350859 },
  { city: 'Jalgaon', state: 'Maharashtra', country: 'India', countryCode: 'IN', lat: 21.0077, lng: 75.5626, timezone: 'Asia/Kolkata', pop: 460228 },
  { city: 'Akola', state: 'Maharashtra', country: 'India', countryCode: 'IN', lat: 20.7002, lng: 77.0082, timezone: 'Asia/Kolkata', pop: 425817 },
  { city: 'Amravati', state: 'Maharashtra', country: 'India', countryCode: 'IN', lat: 20.9374, lng: 77.7796, timezone: 'Asia/Kolkata', pop: 647057 },
  { city: 'Nanded', aliases: ['Nanded Waghala'], state: 'Maharashtra', country: 'India', countryCode: 'IN', lat: 19.1383, lng: 77.3210, timezone: 'Asia/Kolkata', pop: 550439 },
  { city: 'Sangli', aliases: ['Sangli-Miraj-Kupwad'], state: 'Maharashtra', country: 'India', countryCode: 'IN', lat: 16.8524, lng: 74.5815, timezone: 'Asia/Kolkata', pop: 513703 },

  // Gujarat
  { city: 'Ahmedabad', aliases: ['Amdavad', 'Karnavati'], state: 'Gujarat', country: 'India', countryCode: 'IN', lat: 23.0225, lng: 72.5714, timezone: 'Asia/Kolkata', pop: 8400000 },
  { city: 'Surat', aliases: ['Diamond City'], state: 'Gujarat', country: 'India', countryCode: 'IN', lat: 21.1702, lng: 72.8311, timezone: 'Asia/Kolkata', pop: 6100000 },
  { city: 'Vadodara', aliases: ['Baroda'], state: 'Gujarat', country: 'India', countryCode: 'IN', lat: 22.3072, lng: 73.1812, timezone: 'Asia/Kolkata', pop: 1822221 },
  { city: 'Rajkot', state: 'Gujarat', country: 'India', countryCode: 'IN', lat: 22.3039, lng: 70.8022, timezone: 'Asia/Kolkata', pop: 1390640 },
  { city: 'Bhavnagar', state: 'Gujarat', country: 'India', countryCode: 'IN', lat: 21.7645, lng: 72.1519, timezone: 'Asia/Kolkata', pop: 593768 },
  { city: 'Jamnagar', state: 'Gujarat', country: 'India', countryCode: 'IN', lat: 22.4707, lng: 70.0577, timezone: 'Asia/Kolkata', pop: 600934 },
  { city: 'Dwarka', aliases: ['Devbhoomi Dwarka', 'Dwaraka'], state: 'Gujarat', country: 'India', countryCode: 'IN', lat: 22.2442, lng: 68.9685, timezone: 'Asia/Kolkata', pop: 38873 },
  { city: 'Somnath', aliases: ['Prabhas Patan', 'Veraval'], state: 'Gujarat', country: 'India', countryCode: 'IN', lat: 20.9011, lng: 70.4011, timezone: 'Asia/Kolkata', pop: 185000 },
  { city: 'Gandhinagar', state: 'Gujarat', country: 'India', countryCode: 'IN', lat: 23.2156, lng: 72.6369, timezone: 'Asia/Kolkata', pop: 292797 },
  { city: 'Junagadh', state: 'Gujarat', country: 'India', countryCode: 'IN', lat: 21.5222, lng: 70.4579, timezone: 'Asia/Kolkata', pop: 319462 },
  { city: 'Anand', state: 'Gujarat', country: 'India', countryCode: 'IN', lat: 22.5645, lng: 72.9289, timezone: 'Asia/Kolkata', pop: 288092 },
  { city: 'Bhuj', aliases: ['Kutch'], state: 'Gujarat', country: 'India', countryCode: 'IN', lat: 23.2420, lng: 69.6669, timezone: 'Asia/Kolkata', pop: 213514 },

  // South India Metros & Cities
  { city: 'Bengaluru', aliases: ['Bangalore', 'Bangaluru'], state: 'Karnataka', country: 'India', countryCode: 'IN', lat: 12.9716, lng: 77.5946, timezone: 'Asia/Kolkata', pop: 13200000 },
  { city: 'Chennai', aliases: ['Madras'], state: 'Tamil Nadu', country: 'India', countryCode: 'IN', lat: 13.0827, lng: 80.2707, timezone: 'Asia/Kolkata', pop: 11500000 },
  { city: 'Hyderabad', aliases: ['Secunderabad', 'Cyberabad'], state: 'Telangana', country: 'India', countryCode: 'IN', lat: 17.3850, lng: 78.4867, timezone: 'Asia/Kolkata', pop: 10500000 },
  { city: 'Kochi', aliases: ['Cochin', 'Ernakulam'], state: 'Kerala', country: 'India', countryCode: 'IN', lat: 9.9312, lng: 76.2673, timezone: 'Asia/Kolkata', pop: 2100000 },
  { city: 'Thiruvananthapuram', aliases: ['Trivandrum'], state: 'Kerala', country: 'India', countryCode: 'IN', lat: 8.5241, lng: 76.9366, timezone: 'Asia/Kolkata', pop: 957730 },
  { city: 'Kozhikode', aliases: ['Calicut'], state: 'Kerala', country: 'India', countryCode: 'IN', lat: 11.2588, lng: 75.7804, timezone: 'Asia/Kolkata', pop: 609224 },
  { city: 'Thrissur', aliases: ['Trichur'], state: 'Kerala', country: 'India', countryCode: 'IN', lat: 10.5276, lng: 76.2144, timezone: 'Asia/Kolkata', pop: 315957 },
  { city: 'Guruvayur', state: 'Kerala', country: 'India', countryCode: 'IN', lat: 10.5948, lng: 76.0407, timezone: 'Asia/Kolkata', pop: 21287 },
  { city: 'Sabarimala', aliases: ['Pathanamthitta'], state: 'Kerala', country: 'India', countryCode: 'IN', lat: 9.4402, lng: 77.0818, timezone: 'Asia/Kolkata', pop: 15000 },
  { city: 'Coimbatore', aliases: ['Kovai'], state: 'Tamil Nadu', country: 'India', countryCode: 'IN', lat: 11.0168, lng: 76.9558, timezone: 'Asia/Kolkata', pop: 2800000 },
  { city: 'Madurai', aliases: ['Temple City'], state: 'Tamil Nadu', country: 'India', countryCode: 'IN', lat: 9.9252, lng: 78.1198, timezone: 'Asia/Kolkata', pop: 1561129 },
  { city: 'Tiruchirappalli', aliases: ['Trichy', 'Tiruchi', 'Srirangam'], state: 'Tamil Nadu', country: 'India', countryCode: 'IN', lat: 10.7905, lng: 78.7047, timezone: 'Asia/Kolkata', pop: 1022287 },
  { city: 'Salem', state: 'Tamil Nadu', country: 'India', countryCode: 'IN', lat: 11.6643, lng: 78.1460, timezone: 'Asia/Kolkata', pop: 829267 },
  { city: 'Tirunelveli', aliases: ['Nellai'], state: 'Tamil Nadu', country: 'India', countryCode: 'IN', lat: 8.7139, lng: 77.7567, timezone: 'Asia/Kolkata', pop: 473637 },
  { city: 'Rameswaram', aliases: ['Rameshwaram'], state: 'Tamil Nadu', country: 'India', countryCode: 'IN', lat: 9.2876, lng: 79.3129, timezone: 'Asia/Kolkata', pop: 44856 },
  { city: 'Kanchipuram', aliases: ['Kanchi', 'Conjeevaram'], state: 'Tamil Nadu', country: 'India', countryCode: 'IN', lat: 12.8342, lng: 79.7036, timezone: 'Asia/Kolkata', pop: 164384 },
  { city: 'Tiruvannamalai', aliases: ['Arunachalam', 'Tiruvanamalai'], state: 'Tamil Nadu', country: 'India', countryCode: 'IN', lat: 12.2253, lng: 79.0747, timezone: 'Asia/Kolkata', pop: 145278 },
  { city: 'Palani', aliases: ['Pazhani'], state: 'Tamil Nadu', country: 'India', countryCode: 'IN', lat: 10.4500, lng: 77.5167, timezone: 'Asia/Kolkata', pop: 70467 },
  { city: 'Mysuru', aliases: ['Mysore'], state: 'Karnataka', country: 'India', countryCode: 'IN', lat: 12.2958, lng: 76.6394, timezone: 'Asia/Kolkata', pop: 920550 },
  { city: 'Mangaluru', aliases: ['Mangalore', 'Kudla'], state: 'Karnataka', country: 'India', countryCode: 'IN', lat: 12.9141, lng: 74.8560, timezone: 'Asia/Kolkata', pop: 623841 },
  { city: 'Hubballi-Dharwad', aliases: ['Hubli', 'Dharwad'], state: 'Karnataka', country: 'India', countryCode: 'IN', lat: 15.3647, lng: 75.1240, timezone: 'Asia/Kolkata', pop: 943788 },
  { city: 'Belagavi', aliases: ['Belgaum'], state: 'Karnataka', country: 'India', countryCode: 'IN', lat: 15.8497, lng: 74.4977, timezone: 'Asia/Kolkata', pop: 610350 },
  { city: 'Kalaburagi', aliases: ['Gulbarga'], state: 'Karnataka', country: 'India', countryCode: 'IN', lat: 17.3297, lng: 76.8343, timezone: 'Asia/Kolkata', pop: 533587 },
  { city: 'Udupi', aliases: ['Udipi', 'Manipal'], state: 'Karnataka', country: 'India', countryCode: 'IN', lat: 13.3409, lng: 74.7421, timezone: 'Asia/Kolkata', pop: 125306 },
  { city: 'Hampi', aliases: ['Vijayanagara', 'Hospet'], state: 'Karnataka', country: 'India', countryCode: 'IN', lat: 15.3350, lng: 76.4600, timezone: 'Asia/Kolkata', pop: 30000 },
  { city: 'Visakhapatnam', aliases: ['Vizag', 'Waltair'], state: 'Andhra Pradesh', country: 'India', countryCode: 'IN', lat: 17.6868, lng: 83.2185, timezone: 'Asia/Kolkata', pop: 2200000 },
  { city: 'Vijayawada', aliases: ['Bezawada'], state: 'Andhra Pradesh', country: 'India', countryCode: 'IN', lat: 16.5062, lng: 80.6480, timezone: 'Asia/Kolkata', pop: 1476931 },
  { city: 'Guntur', state: 'Andhra Pradesh', country: 'India', countryCode: 'IN', lat: 16.3067, lng: 80.4365, timezone: 'Asia/Kolkata', pop: 743354 },
  { city: 'Tirupati', aliases: ['Tirumala', 'Balaji'], state: 'Andhra Pradesh', country: 'India', countryCode: 'IN', lat: 13.6288, lng: 79.4192, timezone: 'Asia/Kolkata', pop: 459985 },
  { city: 'Nellore', state: 'Andhra Pradesh', country: 'India', countryCode: 'IN', lat: 14.4426, lng: 79.9865, timezone: 'Asia/Kolkata', pop: 558548 },
  { city: 'Kurnool', state: 'Andhra Pradesh', country: 'India', countryCode: 'IN', lat: 15.8281, lng: 78.0373, timezone: 'Asia/Kolkata', pop: 484327 },
  { city: 'Srisailam', aliases: ['Mallikarjuna'], state: 'Andhra Pradesh', country: 'India', countryCode: 'IN', lat: 16.0747, lng: 78.8687, timezone: 'Asia/Kolkata', pop: 10288 },
  { city: 'Warangal', aliases: ['Orugallu', 'Hanamkonda'], state: 'Telangana', country: 'India', countryCode: 'IN', lat: 17.9689, lng: 79.5941, timezone: 'Asia/Kolkata', pop: 811844 },
  { city: 'Nizamabad', state: 'Telangana', country: 'India', countryCode: 'IN', lat: 18.6725, lng: 78.0941, timezone: 'Asia/Kolkata', pop: 311152 },
  { city: 'Karimnagar', state: 'Telangana', country: 'India', countryCode: 'IN', lat: 18.4386, lng: 79.1288, timezone: 'Asia/Kolkata', pop: 261185 },

  // North & Central India Metros, States & Spiritual Centers
  { city: 'Lucknow', aliases: ['Nawab City'], state: 'Uttar Pradesh', country: 'India', countryCode: 'IN', lat: 26.8467, lng: 80.9462, timezone: 'Asia/Kolkata', pop: 3800000 },
  { city: 'Kanpur', aliases: ['Cawnpore'], state: 'Uttar Pradesh', country: 'India', countryCode: 'IN', lat: 26.4499, lng: 80.3319, timezone: 'Asia/Kolkata', pop: 3100000 },
  { city: 'Varanasi', aliases: ['Kashi', 'Banaras', 'Benares'], state: 'Uttar Pradesh', country: 'India', countryCode: 'IN', lat: 25.3176, lng: 82.9739, timezone: 'Asia/Kolkata', pop: 1435113 },
  { city: 'Prayagraj', aliases: ['Allahabad', 'Sangam City', 'Illahabad'], state: 'Uttar Pradesh', country: 'India', countryCode: 'IN', lat: 25.4358, lng: 81.8463, timezone: 'Asia/Kolkata', pop: 1536218 },
  { city: 'Agra', aliases: ['Taj City'], state: 'Uttar Pradesh', country: 'India', countryCode: 'IN', lat: 27.1767, lng: 78.0081, timezone: 'Asia/Kolkata', pop: 1760285 },
  { city: 'Ayodhya', aliases: ['Saket', 'Faizabad', 'Ram Janmabhoomi'], state: 'Uttar Pradesh', country: 'India', countryCode: 'IN', lat: 26.7922, lng: 82.1998, timezone: 'Asia/Kolkata', pop: 167544 },
  { city: 'Mathura', aliases: ['Braj', 'Brajbhoomi', 'Shri Krishna Janmabhoomi'], state: 'Uttar Pradesh', country: 'India', countryCode: 'IN', lat: 27.4924, lng: 77.6737, timezone: 'Asia/Kolkata', pop: 454930 },
  { city: 'Vrindavan', aliases: ['Brindavan', 'Mathura Vrindavan'], state: 'Uttar Pradesh', country: 'India', countryCode: 'IN', lat: 27.5806, lng: 77.7006, timezone: 'Asia/Kolkata', pop: 63005 },
  { city: 'Meerut', state: 'Uttar Pradesh', country: 'India', countryCode: 'IN', lat: 28.9845, lng: 77.7064, timezone: 'Asia/Kolkata', pop: 1524908 },
  { city: 'Bareilly', state: 'Uttar Pradesh', country: 'India', countryCode: 'IN', lat: 28.3670, lng: 79.4304, timezone: 'Asia/Kolkata', pop: 903668 },
  { city: 'Aligarh', state: 'Uttar Pradesh', country: 'India', countryCode: 'IN', lat: 27.8974, lng: 78.0880, timezone: 'Asia/Kolkata', pop: 874408 },
  { city: 'Moradabad', state: 'Uttar Pradesh', country: 'India', countryCode: 'IN', lat: 28.8386, lng: 78.7733, timezone: 'Asia/Kolkata', pop: 887871 },
  { city: 'Saharanpur', state: 'Uttar Pradesh', country: 'India', countryCode: 'IN', lat: 29.9671, lng: 77.5510, timezone: 'Asia/Kolkata', pop: 705478 },
  { city: 'Gorakhpur', aliases: ['Gorakhnath'], state: 'Uttar Pradesh', country: 'India', countryCode: 'IN', lat: 26.7606, lng: 83.3732, timezone: 'Asia/Kolkata', pop: 673446 },
  { city: 'Jhansi', state: 'Uttar Pradesh', country: 'India', countryCode: 'IN', lat: 25.4484, lng: 78.5685, timezone: 'Asia/Kolkata', pop: 505693 },
  { city: 'Jaunpur', state: 'Uttar Pradesh', country: 'India', countryCode: 'IN', lat: 25.7464, lng: 82.6837, timezone: 'Asia/Kolkata', pop: 180362 },

  // Uttarakhand & Himachal Pradesh
  { city: 'Haridwar', aliases: ['Hardwar', 'Mayapuri', 'Ganga Dwar'], state: 'Uttarakhand', country: 'India', countryCode: 'IN', lat: 29.9457, lng: 78.1642, timezone: 'Asia/Kolkata', pop: 228832 },
  { city: 'Rishikesh', aliases: ['Hrishikesh', 'Yoga Capital'], state: 'Uttarakhand', country: 'India', countryCode: 'IN', lat: 30.0869, lng: 78.2676, timezone: 'Asia/Kolkata', pop: 102138 },
  { city: 'Dehradun', aliases: ['Doon'], state: 'Uttarakhand', country: 'India', countryCode: 'IN', lat: 30.3165, lng: 78.0322, timezone: 'Asia/Kolkata', pop: 574840 },
  { city: 'Nainital', state: 'Uttarakhand', country: 'India', countryCode: 'IN', lat: 29.3919, lng: 79.4542, timezone: 'Asia/Kolkata', pop: 41377 },
  { city: 'Kedarnath', state: 'Uttarakhand', country: 'India', countryCode: 'IN', lat: 30.7352, lng: 79.0669, timezone: 'Asia/Kolkata', pop: 5000 },
  { city: 'Badrinath', state: 'Uttarakhand', country: 'India', countryCode: 'IN', lat: 30.7433, lng: 79.4938, timezone: 'Asia/Kolkata', pop: 5000 },
  { city: 'Shimla', aliases: ['Simla'], state: 'Himachal Pradesh', country: 'India', countryCode: 'IN', lat: 31.1048, lng: 77.1734, timezone: 'Asia/Kolkata', pop: 169578 },
  { city: 'Dharamshala', aliases: ['Dharamsala', 'McLeod Ganj'], state: 'Himachal Pradesh', country: 'India', countryCode: 'IN', lat: 32.2190, lng: 76.3234, timezone: 'Asia/Kolkata', pop: 53543 },
  { city: 'Manali', state: 'Himachal Pradesh', country: 'India', countryCode: 'IN', lat: 32.2432, lng: 77.1892, timezone: 'Asia/Kolkata', pop: 25000 },
  { city: 'Kullu', state: 'Himachal Pradesh', country: 'India', countryCode: 'IN', lat: 31.9579, lng: 77.1095, timezone: 'Asia/Kolkata', pop: 43795 },

  // Punjab, Haryana, J&K
  { city: 'Chandigarh', aliases: ['Tricity', 'Panchkula', 'Mohali'], state: 'Chandigarh', country: 'India', countryCode: 'IN', lat: 30.7333, lng: 76.7794, timezone: 'Asia/Kolkata', pop: 1150000 },
  { city: 'Ludhiana', state: 'Punjab', country: 'India', countryCode: 'IN', lat: 30.9010, lng: 75.8573, timezone: 'Asia/Kolkata', pop: 1618879 },
  { city: 'Amritsar', aliases: ['Golden Temple City'], state: 'Punjab', country: 'India', countryCode: 'IN', lat: 31.6340, lng: 74.8723, timezone: 'Asia/Kolkata', pop: 1159227 },
  { city: 'Jalandhar', aliases: ['Jullundur'], state: 'Punjab', country: 'India', countryCode: 'IN', lat: 31.3260, lng: 75.5762, timezone: 'Asia/Kolkata', pop: 862818 },
  { city: 'Patiala', state: 'Punjab', country: 'India', countryCode: 'IN', lat: 30.3398, lng: 76.3869, timezone: 'Asia/Kolkata', pop: 446246 },
  { city: 'Bathinda', aliases: ['Bhatinda'], state: 'Punjab', country: 'India', countryCode: 'IN', lat: 30.2110, lng: 74.9455, timezone: 'Asia/Kolkata', pop: 285782 },
  { city: 'Kurukshetra', aliases: ['Dharmakshetra', 'Thanesar'], state: 'Haryana', country: 'India', countryCode: 'IN', lat: 29.9695, lng: 76.8783, timezone: 'Asia/Kolkata', pop: 154962 },
  { city: 'Panipat', state: 'Haryana', country: 'India', countryCode: 'IN', lat: 29.3909, lng: 76.9635, timezone: 'Asia/Kolkata', pop: 442277 },
  { city: 'Ambala', state: 'Haryana', country: 'India', countryCode: 'IN', lat: 30.3782, lng: 76.7767, timezone: 'Asia/Kolkata', pop: 207934 },
  { city: 'Rohtak', state: 'Haryana', country: 'India', countryCode: 'IN', lat: 28.8955, lng: 76.6066, timezone: 'Asia/Kolkata', pop: 374292 },
  { city: 'Hisar', aliases: ['Hissar'], state: 'Haryana', country: 'India', countryCode: 'IN', lat: 29.1492, lng: 75.7217, timezone: 'Asia/Kolkata', pop: 307222 },
  { city: 'Karnal', state: 'Haryana', country: 'India', countryCode: 'IN', lat: 29.6857, lng: 76.9905, timezone: 'Asia/Kolkata', pop: 302140 },
  { city: 'Jammu', state: 'Jammu and Kashmir', country: 'India', countryCode: 'IN', lat: 32.7266, lng: 74.8570, timezone: 'Asia/Kolkata', pop: 502197 },
  { city: 'Katra', aliases: ['Vaishno Devi Katra'], state: 'Jammu and Kashmir', country: 'India', countryCode: 'IN', lat: 32.9928, lng: 74.9318, timezone: 'Asia/Kolkata', pop: 21996 },
  { city: 'Srinagar', state: 'Jammu and Kashmir', country: 'India', countryCode: 'IN', lat: 34.0837, lng: 74.7973, timezone: 'Asia/Kolkata', pop: 1200000 },
  { city: 'Leh', aliases: ['Ladakh'], state: 'Ladakh', country: 'India', countryCode: 'IN', lat: 34.1526, lng: 77.5771, timezone: 'Asia/Kolkata', pop: 30870 },

  // Rajasthan
  { city: 'Jaipur', aliases: ['Pink City'], state: 'Rajasthan', country: 'India', countryCode: 'IN', lat: 26.9124, lng: 75.7873, timezone: 'Asia/Kolkata', pop: 3100000 },
  { city: 'Jodhpur', aliases: ['Sun City', 'Blue City'], state: 'Rajasthan', country: 'India', countryCode: 'IN', lat: 26.2389, lng: 73.0243, timezone: 'Asia/Kolkata', pop: 1138300 },
  { city: 'Kota', state: 'Rajasthan', country: 'India', countryCode: 'IN', lat: 25.2138, lng: 75.8648, timezone: 'Asia/Kolkata', pop: 1001694 },
  { city: 'Bikaner', state: 'Rajasthan', country: 'India', countryCode: 'IN', lat: 28.0229, lng: 73.3119, timezone: 'Asia/Kolkata', pop: 644406 },
  { city: 'Ajmer', aliases: ['Ajmer Sharif'], state: 'Rajasthan', country: 'India', countryCode: 'IN', lat: 26.4499, lng: 74.6399, timezone: 'Asia/Kolkata', pop: 542321 },
  { city: 'Pushkar', aliases: ['Brahma Temple Pushkar'], state: 'Rajasthan', country: 'India', countryCode: 'IN', lat: 26.4897, lng: 74.5511, timezone: 'Asia/Kolkata', pop: 21626 },
  { city: 'Udaipur', aliases: ['City of Lakes'], state: 'Rajasthan', country: 'India', countryCode: 'IN', lat: 24.5854, lng: 73.7125, timezone: 'Asia/Kolkata', pop: 451100 },
  { city: 'Bhilwara', state: 'Rajasthan', country: 'India', countryCode: 'IN', lat: 25.3463, lng: 74.6364, timezone: 'Asia/Kolkata', pop: 359483 },
  { city: 'Alwar', state: 'Rajasthan', country: 'India', countryCode: 'IN', lat: 27.5530, lng: 76.6346, timezone: 'Asia/Kolkata', pop: 315379 },
  { city: 'Sikar', state: 'Rajasthan', country: 'India', countryCode: 'IN', lat: 27.6094, lng: 75.1398, timezone: 'Asia/Kolkata', pop: 237579 },

  // Madhya Pradesh & Chhattisgarh
  { city: 'Indore', aliases: ['Mini Bombay'], state: 'Madhya Pradesh', country: 'India', countryCode: 'IN', lat: 22.7196, lng: 75.8577, timezone: 'Asia/Kolkata', pop: 2170000 },
  { city: 'Bhopal', aliases: ['City of Lakes MP'], state: 'Madhya Pradesh', country: 'India', countryCode: 'IN', lat: 23.2599, lng: 77.4126, timezone: 'Asia/Kolkata', pop: 1886100 },
  { city: 'Jabalpur', state: 'Madhya Pradesh', country: 'India', countryCode: 'IN', lat: 23.1815, lng: 79.9864, timezone: 'Asia/Kolkata', pop: 1268846 },
  { city: 'Gwalior', state: 'Madhya Pradesh', country: 'India', countryCode: 'IN', lat: 26.2183, lng: 78.1828, timezone: 'Asia/Kolkata', pop: 1069276 },
  { city: 'Ujjain', aliases: ['Mahakal', 'Avantika', 'Ujjayini', 'Mahakaleshwar'], state: 'Madhya Pradesh', country: 'India', countryCode: 'IN', lat: 23.1765, lng: 75.7885, timezone: 'Asia/Kolkata', pop: 515215 },
  { city: 'Omkareshwar', aliases: ['Narmada Mandhata'], state: 'Madhya Pradesh', country: 'India', countryCode: 'IN', lat: 22.2458, lng: 76.1517, timezone: 'Asia/Kolkata', pop: 12000 },
  { city: 'Sagar', state: 'Madhya Pradesh', country: 'India', countryCode: 'IN', lat: 23.8388, lng: 78.7378, timezone: 'Asia/Kolkata', pop: 370296 },
  { city: 'Dewas', state: 'Madhya Pradesh', country: 'India', countryCode: 'IN', lat: 22.9676, lng: 76.0534, timezone: 'Asia/Kolkata', pop: 289550 },
  { city: 'Satna', state: 'Madhya Pradesh', country: 'India', countryCode: 'IN', lat: 24.6005, lng: 80.8322, timezone: 'Asia/Kolkata', pop: 280222 },
  { city: 'Ratlam', state: 'Madhya Pradesh', country: 'India', countryCode: 'IN', lat: 23.3315, lng: 75.0367, timezone: 'Asia/Kolkata', pop: 264914 },
  { city: 'Raipur', state: 'Chhattisgarh', country: 'India', countryCode: 'IN', lat: 21.2514, lng: 81.6296, timezone: 'Asia/Kolkata', pop: 1123558 },
  { city: 'Bhilai', aliases: ['Durg-Bhilai'], state: 'Chhattisgarh', country: 'India', countryCode: 'IN', lat: 21.1938, lng: 81.3509, timezone: 'Asia/Kolkata', pop: 625700 },
  { city: 'Bilaspur', state: 'Chhattisgarh', country: 'India', countryCode: 'IN', lat: 22.0797, lng: 82.1409, timezone: 'Asia/Kolkata', pop: 331030 },

  // East & North East India
  { city: 'Kolkata', aliases: ['Calcutta'], state: 'West Bengal', country: 'India', countryCode: 'IN', lat: 22.5726, lng: 88.3639, timezone: 'Asia/Kolkata', pop: 15000000 },
  { city: 'Howrah', state: 'West Bengal', country: 'India', countryCode: 'IN', lat: 22.5958, lng: 88.2636, timezone: 'Asia/Kolkata', pop: 1077070 },
  { city: 'Durgapur', state: 'West Bengal', country: 'India', countryCode: 'IN', lat: 23.5204, lng: 87.3119, timezone: 'Asia/Kolkata', pop: 566517 },
  { city: 'Asansol', state: 'West Bengal', country: 'India', countryCode: 'IN', lat: 23.6739, lng: 86.9524, timezone: 'Asia/Kolkata', pop: 563917 },
  { city: 'Siliguri', state: 'West Bengal', country: 'India', countryCode: 'IN', lat: 26.7271, lng: 88.3953, timezone: 'Asia/Kolkata', pop: 513264 },
  { city: 'Darjeeling', state: 'West Bengal', country: 'India', countryCode: 'IN', lat: 27.0410, lng: 88.2663, timezone: 'Asia/Kolkata', pop: 120414 },
  { city: 'Patna', aliases: ['Pataliputra'], state: 'Bihar', country: 'India', countryCode: 'IN', lat: 25.5941, lng: 85.1376, timezone: 'Asia/Kolkata', pop: 2046652 },
  { city: 'Gaya', aliases: ['Bodh Gaya', 'Vishnupad'], state: 'Bihar', country: 'India', countryCode: 'IN', lat: 24.7914, lng: 85.0002, timezone: 'Asia/Kolkata', pop: 474093 },
  { city: 'Bhagalpur', state: 'Bihar', country: 'India', countryCode: 'IN', lat: 25.2425, lng: 86.9842, timezone: 'Asia/Kolkata', pop: 400146 },
  { city: 'Muzaffarpur', state: 'Bihar', country: 'India', countryCode: 'IN', lat: 26.1209, lng: 85.3647, timezone: 'Asia/Kolkata', pop: 354462 },
  { city: 'Ranchi', state: 'Jharkhand', country: 'India', countryCode: 'IN', lat: 23.3441, lng: 85.3096, timezone: 'Asia/Kolkata', pop: 1126741 },
  { city: 'Jamshedpur', aliases: ['Tatanagar'], state: 'Jharkhand', country: 'India', countryCode: 'IN', lat: 22.8046, lng: 86.2029, timezone: 'Asia/Kolkata', pop: 1339000 },
  { city: 'Dhanbad', state: 'Jharkhand', country: 'India', countryCode: 'IN', lat: 23.7957, lng: 86.4304, timezone: 'Asia/Kolkata', pop: 1162472 },
  { city: 'Bhubaneswar', aliases: ['Temple City Odisha'], state: 'Odisha', country: 'India', countryCode: 'IN', lat: 20.2961, lng: 85.8245, timezone: 'Asia/Kolkata', pop: 885363 },
  { city: 'Cuttack', state: 'Odisha', country: 'India', countryCode: 'IN', lat: 20.4625, lng: 85.8828, timezone: 'Asia/Kolkata', pop: 610189 },
  { city: 'Puri', aliases: ['Jagannath Puri', 'Purushottama Kshetra'], state: 'Odisha', country: 'India', countryCode: 'IN', lat: 19.8135, lng: 85.8312, timezone: 'Asia/Kolkata', pop: 200564 },
  { city: 'Rourkela', state: 'Odisha', country: 'India', countryCode: 'IN', lat: 22.2604, lng: 84.8536, timezone: 'Asia/Kolkata', pop: 552734 },
  { city: 'Guwahati', aliases: ['Gauhati', 'Kamakhya'], state: 'Assam', country: 'India', countryCode: 'IN', lat: 26.1445, lng: 91.7362, timezone: 'Asia/Kolkata', pop: 962334 },
  { city: 'Shillong', state: 'Meghalaya', country: 'India', countryCode: 'IN', lat: 25.5788, lng: 91.8933, timezone: 'Asia/Kolkata', pop: 143229 },
  { city: 'Agartala', state: 'Tripura', country: 'India', countryCode: 'IN', lat: 23.8315, lng: 91.2868, timezone: 'Asia/Kolkata', pop: 400004 },
  { city: 'Imphal', state: 'Manipur', country: 'India', countryCode: 'IN', lat: 24.8170, lng: 93.9368, timezone: 'Asia/Kolkata', pop: 268243 },
  { city: 'Aizawl', state: 'Mizoram', country: 'India', countryCode: 'IN', lat: 23.7271, lng: 92.7176, timezone: 'Asia/Kolkata', pop: 293416 },
  { city: 'Kohima', state: 'Nagaland', country: 'India', countryCode: 'IN', lat: 25.6751, lng: 94.1086, timezone: 'Asia/Kolkata', pop: 99039 },
  { city: 'Itanagar', state: 'Arunachal Pradesh', country: 'India', countryCode: 'IN', lat: 27.0844, lng: 93.6053, timezone: 'Asia/Kolkata', pop: 59490 },
  { city: 'Gangtok', state: 'Sikkim', country: 'India', countryCode: 'IN', lat: 27.3314, lng: 88.6138, timezone: 'Asia/Kolkata', pop: 100286 },
  { city: 'Port Blair', aliases: ['Andaman'], state: 'Andaman and Nicobar Islands', country: 'India', countryCode: 'IN', lat: 11.6234, lng: 92.7265, timezone: 'Asia/Kolkata', pop: 100608 },
  { city: 'Puducherry', aliases: ['Pondicherry'], state: 'Puducherry', country: 'India', countryCode: 'IN', lat: 11.9416, lng: 79.8083, timezone: 'Asia/Kolkata', pop: 244377 },
  { city: 'Panaji', aliases: ['Goa', 'Panjim'], state: 'Goa', country: 'India', countryCode: 'IN', lat: 15.4909, lng: 73.8278, timezone: 'Asia/Kolkata', pop: 114405 },
  { city: 'Margao', aliases: ['Madgaon', 'Goa'], state: 'Goa', country: 'India', countryCode: 'IN', lat: 15.2832, lng: 73.9862, timezone: 'Asia/Kolkata', pop: 87650 },
];

// Helper to determine UTC offset in hours from IANA timezone string
export function getTimezoneOffsetHours(timeZone: string): number {
  if (!timeZone || timeZone === 'Asia/Kolkata' || timeZone === 'IST') {
    return 5.5; // IST standard
  }
  try {
    const now = new Date();
    // Format in UTC
    const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
    // Format in target TimeZone
    const tzDate = new Date(now.toLocaleString('en-US', { timeZone }));
    const diffMinutes = Math.round((tzDate.getTime() - utcDate.getTime()) / 60000);
    return parseFloat((diffMinutes / 60).toFixed(2));
  } catch (err) {
    // Fallback based on known common timezones
    const known: Record<string, number> = {
      'Asia/Kolkata': 5.5,
      'Asia/Calcutta': 5.5,
      'Asia/Dubai': 4,
      'Asia/Kathmandu': 5.75,
      'Asia/Colombo': 5.5,
      'Asia/Dhaka': 6,
      'Asia/Bangkok': 7,
      'Asia/Singapore': 8,
      'Asia/Hong_Kong': 8,
      'Asia/Tokyo': 9,
      'Europe/London': 0,
      'Europe/Paris': 1,
      'Europe/Berlin': 1,
      'America/New_York': -5,
      'America/Chicago': -6,
      'America/Denver': -7,
      'America/Los_Angeles': -8,
      'America/Toronto': -5,
      'America/Vancouver': -8,
      'Australia/Sydney': 10,
      'Australia/Melbourne': 10,
      'Pacific/Auckland': 12,
    };
    return known[timeZone] !== undefined ? known[timeZone] : 5.5;
  }
}

// Format UTC offset nicely (e.g. "UTC +05:30", "UTC -05:00", "UTC +00:00")
export function formatUtcOffset(offsetHours: number): string {
  const sign = offsetHours >= 0 ? '+' : '-';
  const absHours = Math.abs(offsetHours);
  const h = Math.floor(absHours);
  const m = Math.round((absHours - h) * 60);
  return `UTC ${sign}${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

// Build unified normalized in-memory index
let unifiedLocationsCache: LocationData[] | null = null;

function getUnifiedLocations(): LocationData[] {
  if (unifiedLocationsCache) {
    return unifiedLocationsCache;
  }

  const list: LocationData[] = [];
  const addedKeys = new Set<string>();

  // 1. Add curated Indian locations first (high priority)
  for (const loc of INDIAN_LOCATIONS_DATABASE) {
    const key = `${loc.city.toLowerCase()}_${loc.countryCode.toLowerCase()}`;
    addedKeys.add(key);
    
    // Add primary
    list.push({
      city: loc.city,
      state: loc.state,
      country: loc.country,
      countryCode: loc.countryCode,
      lat: loc.lat,
      lng: loc.lng,
      timezone: loc.timezone,
      utcOffsetHours: 5.5,
      displayName: `${loc.city}, ${loc.state}, ${loc.country}`
    });

    // Add aliases if present (e.g. Bangalore -> Bengaluru, Bombay -> Mumbai, Kashi -> Varanasi)
    if (loc.aliases && loc.aliases.length > 0) {
      for (const alias of loc.aliases) {
        const aliasKey = `${alias.toLowerCase()}_${loc.countryCode.toLowerCase()}`;
        if (!addedKeys.has(aliasKey)) {
          addedKeys.add(aliasKey);
          list.push({
            city: alias,
            state: loc.state,
            country: loc.country,
            countryCode: loc.countryCode,
            lat: loc.lat,
            lng: loc.lng,
            timezone: loc.timezone,
            utcOffsetHours: 5.5,
            displayName: `${alias} (${loc.city}), ${loc.state}, ${loc.country}`
          });
        }
      }
    }
  }

  // 2. Add global cities from city-timezones
  try {
    const cityMapping = (cityTimezones as any).cityMapping || [];
    for (const item of cityMapping) {
      if (!item || !item.city) continue;
      const key = `${item.city.toLowerCase()}_${(item.iso2 || '').toLowerCase()}`;
      if (addedKeys.has(key)) continue;
      addedKeys.add(key);

      const tz = item.timezone || 'UTC';
      const offset = getTimezoneOffsetHours(tz);
      const stateStr = item.province ? item.province : '';
      const display = stateStr
        ? `${item.city}, ${stateStr}, ${item.country}`
        : `${item.city}, ${item.country}`;

      list.push({
        city: item.city,
        state: stateStr,
        country: item.country || 'World',
        countryCode: item.iso2 || '',
        lat: typeof item.lat === 'number' ? item.lat : parseFloat(item.lat) || 0,
        lng: typeof item.lng === 'number' ? item.lng : parseFloat(item.lng) || 0,
        timezone: tz,
        utcOffsetHours: offset,
        displayName: display
      });
    }
  } catch (err) {
    console.warn('city-timezones load warning:', err);
  }

  unifiedLocationsCache = list;
  return unifiedLocationsCache;
}

// Top default / popular suggestions for astrology natives
export const DEFAULT_POPULAR_LOCATIONS: LocationData[] = [
  { city: 'Delhi', state: 'Delhi', country: 'India', countryCode: 'IN', lat: 28.6139, lng: 77.2090, timezone: 'Asia/Kolkata', utcOffsetHours: 5.5, displayName: 'Delhi, Delhi, India' },
  { city: 'Mumbai', state: 'Maharashtra', country: 'India', countryCode: 'IN', lat: 19.0760, lng: 72.8777, timezone: 'Asia/Kolkata', utcOffsetHours: 5.5, displayName: 'Mumbai, Maharashtra, India' },
  { city: 'Bengaluru', state: 'Karnataka', country: 'India', countryCode: 'IN', lat: 12.9716, lng: 77.5946, timezone: 'Asia/Kolkata', utcOffsetHours: 5.5, displayName: 'Bengaluru, Karnataka, India' },
  { city: 'Varanasi', state: 'Uttar Pradesh', country: 'India', countryCode: 'IN', lat: 25.3176, lng: 82.9739, timezone: 'Asia/Kolkata', utcOffsetHours: 5.5, displayName: 'Varanasi (Kashi), Uttar Pradesh, India' },
  { city: 'Kolkata', state: 'West Bengal', country: 'India', countryCode: 'IN', lat: 22.5726, lng: 88.3639, timezone: 'Asia/Kolkata', utcOffsetHours: 5.5, displayName: 'Kolkata, West Bengal, India' },
  { city: 'Chennai', state: 'Tamil Nadu', country: 'India', countryCode: 'IN', lat: 13.0827, lng: 80.2707, timezone: 'Asia/Kolkata', utcOffsetHours: 5.5, displayName: 'Chennai, Tamil Nadu, India' },
  { city: 'Hyderabad', state: 'Telangana', country: 'India', countryCode: 'IN', lat: 17.3850, lng: 78.4867, timezone: 'Asia/Kolkata', utcOffsetHours: 5.5, displayName: 'Hyderabad, Telangana, India' },
  { city: 'Ahmedabad', state: 'Gujarat', country: 'India', countryCode: 'IN', lat: 23.0225, lng: 72.5714, timezone: 'Asia/Kolkata', utcOffsetHours: 5.5, displayName: 'Ahmedabad, Gujarat, India' },
  { city: 'Pune', state: 'Maharashtra', country: 'India', countryCode: 'IN', lat: 18.5204, lng: 73.8567, timezone: 'Asia/Kolkata', utcOffsetHours: 5.5, displayName: 'Pune, Maharashtra, India' },
  { city: 'Jaipur', state: 'Rajasthan', country: 'India', countryCode: 'IN', lat: 26.9124, lng: 75.7873, timezone: 'Asia/Kolkata', utcOffsetHours: 5.5, displayName: 'Jaipur, Rajasthan, India' },
  { city: 'Lucknow', state: 'Uttar Pradesh', country: 'India', countryCode: 'IN', lat: 26.8467, lng: 80.9462, timezone: 'Asia/Kolkata', utcOffsetHours: 5.5, displayName: 'Lucknow, Uttar Pradesh, India' },
  { city: 'London', state: 'England', country: 'United Kingdom', countryCode: 'GB', lat: 51.5074, lng: -0.1278, timezone: 'Europe/London', utcOffsetHours: 0, displayName: 'London, England, United Kingdom' },
  { city: 'New York', state: 'New York', country: 'United States', countryCode: 'US', lat: 40.7128, lng: -74.0060, timezone: 'America/New_York', utcOffsetHours: -5, displayName: 'New York, New York, United States' },
  { city: 'Dubai', state: 'Dubai', country: 'United Arab Emirates', countryCode: 'AE', lat: 25.2048, lng: 55.2708, timezone: 'Asia/Dubai', utcOffsetHours: 4, displayName: 'Dubai, United Arab Emirates' },
  { city: 'Singapore', state: '', country: 'Singapore', countryCode: 'SG', lat: 1.3521, lng: 103.8198, timezone: 'Asia/Singapore', utcOffsetHours: 8, displayName: 'Singapore, Singapore' },
];

/**
 * Fast optimized local search function
 * Queries local dataset as the user types with prefix & fuzzy scoring.
 * Limits results to top 10-15 matches.
 */
export function searchLocations(query: string, limit = 12): LocationData[] {
  const trimmed = (query || '').trim().toLowerCase();
  if (!trimmed) {
    return DEFAULT_POPULAR_LOCATIONS.slice(0, limit);
  }

  const all = getUnifiedLocations();
  const results: Array<{ item: LocationData; score: number }> = [];

  for (let i = 0; i < all.length; i++) {
    const loc = all[i];
    const cityNameLower = loc.city.toLowerCase();
    const stateLower = (loc.state || '').toLowerCase();
    const countryLower = loc.country.toLowerCase();
    const displayLower = loc.displayName.toLowerCase();

    let score = -1;

    // Exact city match
    if (cityNameLower === trimmed) {
      score = 1000;
    }
    // City starts with query
    else if (cityNameLower.startsWith(trimmed)) {
      score = 800 - cityNameLower.length;
    }
    // City contains query as word or substring
    else if (cityNameLower.includes(trimmed)) {
      score = 500;
    }
    // State or Country starts with query
    else if (stateLower.startsWith(trimmed) || countryLower.startsWith(trimmed)) {
      score = 300;
    }
    // Display string contains query
    else if (displayLower.includes(trimmed)) {
      score = 100;
    }

    if (score > 0) {
      // Prioritize Indian locations for Vedic calculations
      if (loc.countryCode === 'IN') {
        score += 50;
      }
      results.push({ item: loc, score });
    }
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);

  return results.slice(0, limit).map((r) => r.item);
}

/**
 * Find exact or best matching LocationData for an existing text string (e.g. from saved profiles)
 */
export function findLocationByName(name: string): LocationData | null {
  if (!name || typeof name !== 'string') return null;
  const matches = searchLocations(name, 1);
  return matches.length > 0 ? matches[0] : null;
}

export function getDefaultLocation(): LocationData {
  return DEFAULT_POPULAR_LOCATIONS[0];
}
