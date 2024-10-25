import React from 'react';
import { render, screen, waitFor, within, act } from '@testing-library/react';
import FeedbackPage from '../pages/car/FeedbackPage';
import AverageRating from '../modules/components/AverageRating'; 
import FeedbackCard from '../modules/components/FeedbackCard'; 
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '@testing-library/jest-dom'; 


jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

describe('FeedbackPage', () => {
  const mockFeedbackData = [
    {
      UserName: 'John Doe',
      UserProfilePic: '/path/to/pic.jpg',
      Rate: 5,
      FeedbackDate: '2024-01-01',
      FeedbackDescription: 'Great car!',
    },
    {
      UserName: 'Jane Doe',
      UserProfilePic: '/path/to/pic.jpg',
      Rate: 4,
      FeedbackDate: '2024-01-02',
      FeedbackDescription: 'Good service.',
    },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockFeedbackData });
    useLocation.mockReturnValue({
      state: { carId: 1 },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });


  it('fetches feedback data correctly', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <FeedbackPage />
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/api/feedback/1');
    });
  });

  it('renders feedback data after fetch', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <FeedbackPage />
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
      expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument();
    });
  });
});

describe('AverageRating Component', () => {
  const mockFeedbackData = [
    {
      UserName: 'John Doe',
      UserProfilePic: '/path/to/pic.jpg',
      Rate: 5,
      FeedbackDate: '2024-01-01',
      FeedbackDescription: 'Great car!',
    },
    {
      UserName: 'Jane Doe',
      UserProfilePic: '/path/to/pic.jpg',
      Rate: 4,
      FeedbackDate: '2024-01-02',
      FeedbackDescription: 'Good service.',
    },
  ];


  it('displays the correct average rating', () => {
    render(<AverageRating feedbackData={mockFeedbackData} />);

    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('renders 5-star rating row correctly', () => {
    render(<AverageRating feedbackData={mockFeedbackData} />);

    const fiveStarRow = screen.getByText('5 ★').closest('.rating-row');
    expect(within(fiveStarRow).getByText('1')).toBeInTheDocument(); 
  });

  it('renders 4-star rating row correctly', () => {
    render(<AverageRating feedbackData={mockFeedbackData} />);

    const fourStarRow = screen.getByText('4 ★').closest('.rating-row');
    expect(within(fourStarRow).getByText('1')).toBeInTheDocument(); 
  });
});

describe('FeedbackCard Component', () => {
  const feedback = {
    userName: 'John Doe',
    starRate: 5,
    date: '2024-01-01',
    content: 'Great car!',
  };

  it('renders the user name correctly', () => {
    render(<FeedbackCard {...feedback} />);

    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
  });

  it('renders the feedback date correctly', () => {
    render(<FeedbackCard {...feedback} />);

    expect(screen.getByText('2024-01-01')).toBeInTheDocument();
  });

  it('renders the feedback content correctly', () => {
    render(<FeedbackCard {...feedback} />);

    expect(screen.getByText('Great car!')).toBeInTheDocument();
  });

  it('renders the correct number of stars', () => {
    render(<FeedbackCard {...feedback} />);

    const stars = screen.getAllByText('★');
    expect(stars).toHaveLength(5);
  });
});
