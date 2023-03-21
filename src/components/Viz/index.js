import classNames from 'classnames';
import React, {useContext} from 'react';
import './Viz.css';

import { RegionContext } from '../../app/regionContext';

import { useState, useEffect } from 'react'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
import './VizGallery.css'
import { GetVizPhotoList } from '../../utils/cibic_actions';

// eslint-disable-next-line
const VizGallery = ({Hidden})=>{

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const {region_name} = useContext(RegionContext)

  const [images, setImages] = useState([]);

  useEffect(() => {
    GetVizPhotoList(region_name).then((data) => {
      setImages(data.map((src, index) => {
        let datetimeString = src.split('2F').slice(-1)[0].split('.')[0]
        if(datetimeString.length > 10){
          datetimeString = datetimeString.substring(0, datetimeString.length-1)
        }
        let theDate = new Date(parseInt(datetimeString))
        return{
          id: index,
          src: src,
          alt: `Image ${index}`
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
    <div className={classNames("VizGallery", {"hidden": Hidden})}>
      <div id="vizgallery" className="gallery-container">
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
            //imageCaption={images[selectedImageIndex].caption}
          />
        )}
      </div>
    </div>
  )
}









function Viz({Hidden}) {
  const {region_name} = useContext(RegionContext);
  return (
    <div id="viz" className={classNames({"hidden": !Hidden, "region-LA":region_name==="la", "region-BA":region_name==="ba"})}>
      <VizGallery/>
    </div>
  );
}

export default Viz;
