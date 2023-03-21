import classNames from 'classnames'
import React, { useState, useEffect, useContext } from 'react'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
import './Gallery.css'
import { GetPhotoList } from '../../utils/cibic_actions'
import { RegionContext } from '../../app/regionContext'

const Gallery = ({Hidden})=>{

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const {region_name} = useContext(RegionContext)

  const [images, setImages] = useState([]);

  useEffect(() => {
    GetPhotoList(region_name).then((data) => {
      data.reverse();
      setImages(data.map((src, index) => {
        let datetimeString = src.split('2F').slice(-1)[0].split('.')[0]
        console.log(datetimeString)
        if(datetimeString.length > 13){
          datetimeString = datetimeString.substring(0, datetimeString.length-1)
        }
        console.log(parseInt(datetimeString))
        let theDate = new Date(parseInt(datetimeString))
        console.log(theDate)
        return{
          id: index,
          src: src,
          alt: `Image ${index}`,
          caption: `${theDate.toLocaleString()}`
        }
      }));
    });
  }, [region_name]);

   const openLightbox = (index) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const handleArrowLeft = () => {
    setSelectedImageIndex((selectedImageIndex + images.length - 1) % images.length);
  };

  const handleArrowRight = () => {
    setSelectedImageIndex((selectedImageIndex + 1) % images.length);
  };


  return (
    <div className={classNames("Gallery", {"hidden": !Hidden})}>
      <div id="gallery" className="gallery-container">
        {images.map((image, index) => (
          <div key={image.id} className="gallery-item">
            <img
              src={image.src}
              alt={image.alt}
              onClick={() => openLightbox(index)}
              className="gallery-image"
            />
          </div>
        ))}
        {selectedImageIndex !== null && (
          <Lightbox
            mainSrc={images[selectedImageIndex].src}
            nextSrc={images[(selectedImageIndex+1) % images.length].src}
            prevSrc={images[(selectedImageIndex + images.length - 1) % images.length].src}
            onImageLoad={() => {
              window.dispatchEvent(new Event('resize'));
            }}
            onCloseRequest={closeLightbox}
            onMovePrevRequest={handleArrowLeft}
            onMoveNextRequest={handleArrowRight}
            imageCaption={images[selectedImageIndex].caption}
          />
        )}
      </div>
    </div>
  )
}

export default Gallery
