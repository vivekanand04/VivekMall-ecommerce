import React, { useEffect, useRef } from 'react'
// import banner3 from '../assets/banner6.jpeg'
import bannerMobile from '../assets/banner-mobile.jpg'
import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'
import { Link, useNavigate } from 'react-router-dom'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'
import { useState } from 'react'

// import BannerCarousel from './BannerCarousel'
// const banner3="https://res.cloudinary.com/dkqvwdfyp/image/upload/v1757274198/ecommercee/ykxzoqxqjoy0ixcsm36a.jpg";
const banners = [
  "https://res.cloudinary.com/dkqvwdfyp/image/upload/v1757316801/ecommercee/nr4xjdgc772ggthznku8.jpg",
  "https://res.cloudinary.com/dkqvwdfyp/image/upload/v1757274198/ecommercee/ykxzoqxqjoy0ixcsm36a.jpg",

  // "https://res.cloudinary.com/dkqvwdfyp/image/upload/v1757309205/ecommercee/zof0gbyfnktdievz6pvp.jpg",
  "https://res.cloudinary.com/dkqvwdfyp/image/upload/v1757316447/ecommercee/g1nhtxsugjg5t9dpauyi.jpg"
]
// export const BannerCarousel = () => {
//   const carouselRef = useRef(null)
//   const [isHover, setIsHover] = useState(false)

//   // Auto-scroll
//   useEffect(() => {
//     const container = carouselRef.current
//     if (!container) return

//     let rafId
//     const speed = 0.5

//     const step = () => {
//       if (!isHover) {
//         container.scrollLeft += speed
//         // seamless loop
//         if (container.scrollLeft >= container.scrollWidth / 2) {
//           container.scrollLeft -= container.scrollWidth / 2
//         }
//       }
//       rafId = requestAnimationFrame(step)
//     }

//     rafId = requestAnimationFrame(step)
//     return () => cancelAnimationFrame(rafId)
//   }, [isHover])

//   const scrollLeft = () => {
//     if (carouselRef.current) {
//       carouselRef.current.scrollLeft -= 300
//     }
//   }

//   const scrollRight = () => {
//     if (carouselRef.current) {
//       carouselRef.current.scrollLeft += 300
//     }
//   }

//   return (
//     <div className="relative w-full overflow-hidden rounded-2xl mt-5">
//       <div
//         ref={carouselRef}
//         className="flex gap-2 w-max"
//         onMouseEnter={() => setIsHover(true)}
//         onMouseLeave={() => setIsHover(false)}
//       >
//         {[...banners, ...banners].map((banner, index) => (
//           <img
//             key={index}
//             src={banner}
//             alt={`banner-${index}`}
//             className="h-[200px] w-screen object-cover flex-shrink-0"
//           />
//         ))}
//       </div>

//       <button
//         onClick={scrollLeft}
//         className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition"
//       >
//         &#8592;
//       </button>

//       <button
//         onClick={scrollRight}
//         className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition"
//       >
//         &#8594;
//       </button>
//     </div>
//   )
// }




const Home = () => {
  const loadingCategory = useSelector(state => state.product.loadingCategory)
  const categoryData = useSelector(state => state.product.allCategory)
  const subCategoryData = useSelector(state => state.product.allSubCategory)
  const navigate = useNavigate()

  const handleRedirectProductListpage = (id, cat) => {
    console.log(id, cat)
    const subcategory = subCategoryData.find(sub => {
      const filterData = sub.category.some(c => {
        return c._id == id
      })

      return filterData ? true : null
    })
    const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`

    navigate(url)
    console.log(url)
  }


  return (
    <section className='bg-white'>

      <div className='container mx-auto'>
        <div className={`w-full h-full min-h-48 rounded mt-5 ${!banners && "animate-pulse my-2"} `}>
          {/* <img
                src={banner3}
                className=' w-[96%] h-[200px] hidden lg:block rounded-2xl mx-auto '
                alt='banner' 
              /> */}

          <img
            src={bannerMobile}
            className='w-full h-full lg:hidden transform transition duration-300 ease-in-out 
             hover:scale-105 hover:bg-gray-50'
            alt='banner'
          />
          <div className='relative w-[96%] overflow-hidden my-5 mx-auto rounded-sm'>
            {/* Desktop & Tablet */}
            <div className='hidden lg:block'>
              <div className='flex w-[300%] animate-scroll gap-2'>
                {banners.concat(banners).map((banner, index) => (
                  <img
                    key={index}
                    src={banner}
                    className=' w-[90%] h-[200px] hidden lg:block mx-0 rounded-md  hover:mx-2.5 transform transition duration-300 ease-in-out 
             hover:scale-105 hover:bg-gray-50 hover:rounded-md'
                    alt={`banner-${index}`}
                  />
                ))}``
              </div>
            </div>

            {/* Mobile */}
            {/* <div className='lg:hidden'>
    <div className='flex w-[200%] animate-scroll gap-2'>
      {banners.concat(banners).map((banner, index) => (
        <img
          key={index}
          src={banner}
          className='w-full h-[200px] object-cover rounded-2xl'
          alt={`banner-mobile-${index}`}
        />
      ))}
    </div>
  </div> */}

            <style>
              {`
      @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-scroll {
        display: flex;
        animation: scroll 20s linear infinite;
      }
    `}
            </style>
          </div>


        </div>
      </div>

      <div className='container mx-auto px-4 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10  gap-2 cursor-pointer '>
        {
          loadingCategory ? (
            new Array(12).fill(null).map((c, index) => {
              return (
                <div key={index + "loadingcategory"} className='bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse'>
                  <div className='bg-blue-100 min-h-24 rounded'></div>
                  <div className='bg-blue-100 h-8 rounded'></div>
                </div>
              )
            })
          ) : (
            categoryData.map((cat, index) => {
              return (
                <div key={cat._id + "displayCategory"} className='w-full h-full' onClick={() => handleRedirectProductListpage(cat._id, cat.name)}>
                  <div>
                    <img
                      src={cat.image}
                      className='w-full h-full object-scale-down transform transition duration-300 ease-in-out 
             hover:scale-105 hover:bg-gray-50'
                    />
                  </div>
                </div>
              )
            })

          )
        }
      </div>

      {/***display category product */}
      {
        categoryData?.map((c, index) => {
          return (
            <CategoryWiseProductDisplay
              key={c?._id + "CategorywiseProduct"}
              id={c?._id}
              name={c?.name}
            />
          )
        })
      }



    </section>
  )
}

export default Home
