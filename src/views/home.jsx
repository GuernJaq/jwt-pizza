import React from 'react';
import { useNavigate } from 'react-router-dom';
import View from './view';
import Card from '../components/card';
import Carousel from '../components/carousel';
import Quote from '../components/quote';
import Button from '../components/button';

export default function Home() {
  const navigate = useNavigate();

  function orderNow() {
    navigate('/menu');
  }

  return (
    <View title="The valley's best pizza">
      <div className='bg-fixed w-screen h-64 bg-top bg-cover bg-no-repeat' style={{ backgroundImage: 'url(/pizza-hero2.jpg)' }}></div>
      <div className='flow flow-col justify-center'>
        <Button title='Order now' onPress={orderNow} />

        <Carousel
          slides={[
            <Quote quote='Most amazing pizza experience of my life.' author='Megan Fox, Springville' />,
            <Quote quote='Milan reborn!' author='张伟, Provo' />,
            <Quote quote='All I can say is WOW!' author='José García, Orem' />,
            <Quote quote='Best pizza ever. I can eat this every day!' author='Terrence Jones, Mapleton' />,
          ]}
        />
      </div>
      <p
        className='text-neutral-100 text-left mx-4 pb-4 first-line:uppercase first-line:tracking-widest
  first-letter:text-7xl first-letter:font-bold first-letter:text-orange-800
  first-letter:mr-3 first-letter:float-left'
      >
        Pizza is an absolute delight that brings joy to people of all ages. The perfect combination of crispy crust, savory sauce, and gooey cheese
        makes pizza an irresistible treat. At Pizza Shop, we take pride in serving the valley's best pizza, crafted with love and passion. Our skilled
        chefs use only the finest ingredients to create mouthwatering pizzas that will leave you craving for more. Whether you prefer classic flavors
        or adventurous toppings, our diverse menu has something for everyone. So why wait? Indulge in the pizza experience of a lifetime and visit
        Pizza Shop today!
      </p>
      <img src='/pizza-shop-logo.png' className='w-64 m-4 float-right' />
      <p className='text-neutral-100 text-left mx-4 pb-4'>
        Pizza has come a long way since its humble beginnings. From its origins in Italy to becoming a global sensation, pizza has captured the hearts
        and taste buds of people worldwide. It has become a symbol of comfort, celebration, and togetherness. At Pizza Shop, we understand the magic
        of pizza and strive to deliver an unforgettable dining experience. Our cozy ambiance, friendly staff, and delectable pizzas create the perfect
        setting for a memorable meal. Whether you're dining with family, friends, or enjoying a solo pizza night, Pizza Shop is the place to be.
      </p>
      <p className='text-neutral-100 text-left mx-4 pb-4'>
        Pizza is not just a food; it's an experience. The aroma of freshly baked pizza, the sight of melted cheese stretching with every bite, and the
        explosion of flavors in your mouth - it's a sensory journey like no other. At Pizza Shop, we believe in the power of pizza to bring people
        together. Our inviting atmosphere and warm hospitality make every visit a special occasion. Whether you're celebrating a birthday,
        anniversary, or simply craving a delicious meal, Pizza Shop is here to make your experience extraordinary. Join us and discover the magic of
        pizza at its finest.
      </p>
      <p className='text-neutral-100 text-left mx-4 pb-4'>
        Pizza is a universal language that transcends borders and cultures. It's a dish that brings people from all walks of life together, united by
        their love for this culinary masterpiece. At Pizza Shop, we embrace diversity and celebrate the joy of sharing a pizza with friends and
        family. Our menu features a wide range of flavors inspired by different cuisines, ensuring there's something for everyone. Whether you're a
        meat lover, a vegetarian, or have dietary restrictions, our pizzas are crafted to satisfy every palate. Come and experience the magic of pizza
        at Pizza Shop today!
      </p>
      <p className='text-neutral-100 text-left mx-4 pb-4'>
        Pizza is more than just a meal; it's an expression of artistry and craftsmanship. Our talented chefs at Pizza Shop pour their heart and soul
        into every pizza they create. From kneading the dough to selecting the freshest ingredients, every step is executed with precision and
        passion. The result? A pizza that is not only visually stunning but also bursting with flavor. At Pizza Shop, we believe that every bite
        should be a moment of pure bliss. So treat yourself to the valley's best pizza and embark on a culinary adventure that will leave you craving
        for more.
      </p>

      {/* <img className='w-screen bg-slate-50' src='/pizza-hero.jpg' alt='pizza' /> */}
    </View>
  );
}
