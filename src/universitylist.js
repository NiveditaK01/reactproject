// UniversityList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: #343a40;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const UniversityList = () => {
  const [universities, setUniversities] = useState([]);
  const [country, setCountry] = useState('');
  const [highestCount, setHighestCount] = useState(0);
  const [lowestCount, setLowestCount] = useState(0);

  useEffect(() => {
    axios.get(`http://universities.hipolabs.com/search?name=${country}`)
      .then(response => {
        const data = response.data;

        // Count universities by country
        const counts = data.reduce((acc, uni) => {
          acc[uni.country] = (acc[uni.country] || 0) + 1;
          return acc;
        }, {});

        // Find the country with the highest and lowest university counts
        const countries = Object.keys(counts);
        setHighestCount(Math.max(...countries.map(c => counts[c])));
        setLowestCount(Math.min(...countries.map(c => counts[c])));

        // Update state with the fetched data
        setUniversities(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [country]);

  return (
    <Container>
      <Title>University List</Title>
      <SearchInput
        type="text"
        placeholder="Search by Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <p>Total universities in {country}: {universities.length}</p>

      <Button onClick={() => alert(`Country with the most universities: ${highestCount}\nCountry with the least universities: ${lowestCount}`)}>
        Show Highest/Lowest
      </Button>

      <ul>
        {universities.map(uni => (
          <li key={uni.name}>{uni.name}</li>
        ))}
      </ul>
    </Container>
  );
};

export default UniversityList;
