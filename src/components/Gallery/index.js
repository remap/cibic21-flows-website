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

  //TODO: Remove console.logs
  console.log('images');
  console.log(images);

 // TODO: Remove testing comments
// images for testing
//   const images = [
//   {
//     id: 1,
//     src: "https://images.squarespace-cdn.com/content/v1/5e8ffaa1cd14a73a8f14d32b/1613777518674-149MGYOFETCUTDBJES67/sdf-example-01.png",
//     alt: "Random image 1",
//     caption: "we can display a caption here too"
//   },
//   {
//     id: 2,
//     src: "https://images.squarespace-cdn.com/content/v1/5e8ffaa1cd14a73a8f14d32b/1631904455422-6QSES554ZA704AX44ECT/keys-comp.jpg",
//     alt: "Random image 2",
//     caption: "we can display a caption here too"
//   },
//   {
//     id: 3,
//     src: "https://images.squarespace-cdn.com/content/v1/5e8ffaa1cd14a73a8f14d32b/1631907140624-HR5JHGE5IG2MS2ET3XEF/InvoluntaryReaction+%283%29.gif",
//     alt: "Random image 3",
//     caption: "we can display a caption here too"
//   },
//   {
//     id: 4,
//     src: "https://images.squarespace-cdn.com/content/v1/54cf0ea3e4b0bdddd2208e53/1533595153985-GE6BMMVQT8ISBK13ZCZJ/image-asset.jpeg",
//     alt: "Random image 4",
//     caption: "we can display a caption here too"
//   },
//   {
//     id: 5,
//     src: "https://images.squarespace-cdn.com/content/v1/5e8ffaa1cd14a73a8f14d32b/1631909758070-HAZ8DVT8K5I9Z4KLXHZH/sand-dune-v01.png",
//     alt: "Random image 5",
//     caption: "we can display a caption here too"
//   },
//   {
//     id: 6,
//     src: "https://picsum.photos/id/241/800/400",
//     alt: "Random image 5",
//     caption: "we can display a caption here too"
//   },
//   {
//     id: 7,
//     src: "https://images.squarespace-cdn.com/content/v1/5e8ffaa1cd14a73a8f14d32b/1613778026225-CEQ658DYXVWBADVEVS1Q/kinect_armature.gif",
//     alt: "Random image 5",
//     caption: "we can display a caption here too"
//   },
//   {
//     id: 8,
//     src: "https://picsum.photos/id/241/800/400",
//     alt: "Random image 5",
//     caption: "we can display a caption here too"
//   },
//   {
//     id: 9,
//     src: "https://images.squarespace-cdn.com/content/v1/5e8ffaa1cd14a73a8f14d32b/1631901922187-LKLW5OYUDXRCJQIIAXQS/AutoCuePoints.png",
//     alt: "Random image 5",
//     caption: "we can display a caption here too"
//   },
//   {
//     id: 10,
//     src: "https://images.squarespace-cdn.com/content/v1/5e8ffaa1cd14a73a8f14d32b/1631902278096-ZP8WACQZLBAGI04S2OVC/fluidLoop_out.gif",
//     alt: "Random image 5",
//     caption: "we can display a caption here too"
//   },
// ];

  return (
    <div className={classNames("Gallery", {"hidden": !Hidden})}>
      <div id="gallery">
        {images.map((image, index) => (
          <div key={image.id} className="gallery-item">
            <img
              src={image.src}
              alt={image.alt}
              onClick={() => openLightbox(index)}
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
            imageCaption={images[selectedImageIndex].caption}
          />
        )}
      </div>
    </div>
  )
}

export default Gallery
