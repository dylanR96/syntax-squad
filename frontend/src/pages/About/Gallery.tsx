import Image_1 from './../../assets/images/image_1.jpg';
import Image_2 from './../../assets/images/image_2.jpg';
import Image_3 from './../../assets/images/image_3.jpg';
import Image_4 from './../../assets/images/image_4.jpg';
import Image_5 from './../../assets/images/image_5.jpg';
import Image_6 from './../../assets/images/image_6.jpg';
import Image_7 from './../../assets/images/image_7.jpg';
import Image_8 from './../../assets/images/image_8.jpg';

const Gallery = () => {
  return (
    <>
      <section className="gallery__container">
      <img src={Image_1}
      alt="Bakverk" 
      className="gallery__image-img"/>
      <img src={Image_2} 
      alt="Bakverk" 
      className="gallery__image-img"/>
      <img src={Image_3}
      alt="Bakverk" 
      className="gallery__image-img"/>
      <img src={Image_4}
      alt="Bakverk" 
      className="gallery__image-img"/>
      <img src={Image_5}
      alt="Bakverk" 
      className="gallery__image-img"/>
      <img src={Image_6}
      alt="Bakverk" 
      className="gallery__image-img"/>
      <img src={Image_7}
      alt="Bakverk" 
      className="gallery__image-img"/>
      <img src={Image_8}
      alt="Bakverk" 
      className="gallery__image-img"/>
      </section>
    </>
  );
};

export default Gallery;