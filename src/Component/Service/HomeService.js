import axios from 'axios';

export const companies = [
  {
    id: 1,
    name: 'Adobe',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Adobe_Corporate_Logo.png/220px-Adobe_Corporate_Logo.png'
  },
  {
    id: 2,
    name: 'PayPal',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/124px-PayPal.svg.png'
  },
  {
    id: 3,
    name: 'Goldman Sachs',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Goldman_Sachs.svg/220px-Goldman_Sachs.svg.png'
  },
  {
    id: 4,
    name: 'Canva',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Canva_icon_2021.svg/150px-Canva_icon_2021.svg.png'
  },
  {
    id: 5,
    name: 'Airbnb',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/220px-Airbnb_Logo_B%C3%A9lo.svg.png'
  },
  {
    id: 6,
    name: 'Stripe',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/220px-Stripe_Logo%2C_revised_2016.svg.png'
  },
  {
    id: 7,
    name: 'LinkedIn',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/220px-LinkedIn_Logo.svg.png'
  },
  {
    id: 8,
    name: 'Atlassian',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Atlassian_Logo.svg/220px-Atlassian_Logo.svg.png'
  }
];

export const getCompanies = async () => {
  try {
    // In a real application, this would be an API call
    // const response = await axios.get(`${process.env.REACT_APP_API_URL}/companies`);
    // return response.data;
    return companies;
  } catch (error) {
    throw error;
  }
};

export const requestDemo = async (data) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/request-demo`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getStarted = async (data) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/get-started`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}; 