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
      setImages(data.map((src, index) => ({
        id: index,
        src: src,
        alt: `Image ${index}`
      })));
    });
  }, [region_name]);

   const openLightbox = (index) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
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
            onImageLoad={() => {
              window.dispatchEvent(new Event('resize'));
            }}
            onCloseRequest={closeLightbox}
            // imageCaption={images[selectedImageIndex].caption}
          />
        )}
      </div>
    </div>
  )
}

export default Gallery
