import React from 'react';
import styled from 'styled-components';
import { FaPrayingHands } from 'react-icons/fa';
import { RiPlantLine } from 'react-icons/ri';
import { MdRecycling } from 'react-icons/md';

const Services = () => {
  return (
    <Wrapper className='section'>
      <h3 className='text-center'>Define Beauty. Define You</h3>
      <div className='services-container'>
        <article className='service'>
          <span className='service-icon'>
            <FaPrayingHands />
          </span>
          <h4 className='text-center'>Hand-crafted</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus nam omnis amet neque debitis consectetur recusandae
            officia eius quos ut! Ut quo voluptatibus architecto, eum asperiores
            quia porro provident dolor.
          </p>
        </article>
        <article className='service'>
          <span className='service-icon'>
            <RiPlantLine />
          </span>
          <h4 className='text-center'>Vegan</h4>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam
            a cum vero molestias adipisci corporis expedita inventore, facilis
            quae hic amet, consectetur vel vitae corrupti numquam et nesciunt
            consequatur quia?
          </p>
        </article>
        <article className='service'>
          <span className='service-icon'>
            <MdRecycling />
          </span>
          <h4 className='text-center'>Recycled Materials</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non eius
            animi placeat! Minus sed ducimus, magni officiis architecto, ipsam
            recusandae voluptates adipisci rerum, distinctio obcaecati nostrum
            velit eveniet ad dolores!
          </p>
        </article>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: #f7f9f1;

  .services-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin-top: 4rem;
  }

  .service {
    background: #d3dfb8;
    color: #252525;
    max-width: 350px;
    padding: 1rem 2rem;
    border-radius: 10px;
    margin: 2rem 1rem;
  }

  .service p {
    text-align: justify;
  }

  .service-icon {
    position: relative;
    display: block;
    margin: 1rem auto;
    width: 3.5rem;
    height: 3.5rem;
    background: #f7f9f1;
    padding: 2rem;
    border-radius: 50%;
  }

  .service-icon svg {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 2.75rem;
    transform: translate(-50%, -50%);
  }
`;

export default Services;
