"use client"
import React, { useState } from 'react'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'

import useEmblaCarousel from 'embla-carousel-react'

const EmblaCarousel = ({posts , alt, toggleTab, options},props) => {
  //const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)


  const array = [1,2,3,4,5,6,7]
  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {posts?.map((post,index) => (
            <div onClick={()=> toggleTab(index)} className="embla__slide" key={index}>
              <img src={post} alt={alt} />
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel
