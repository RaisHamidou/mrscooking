"use client"

import image1 from "../../../public/image/photo/1.jpg"
import image2 from "../../../public/image/photo/2.jpg"
import image3 from "../../../public/image/photo/3.jpg"
import image4 from "../../../public/image/photo/4.jpg"
import image5 from "../../../public/image/photo/5.jpg"
const Posts = () => {

 

  const imgs = [image1,image2,image3,image4,image5]

  
  return (
    <section id="posts">
      {/*  <h1>Dernieres réalisations</h1> */}

      <div className="container-posts">

      
        {imgs.map((img, index)=>{
          return( <div key={index} className="post">
            <div className="img-post">
            <img src={img.src} alt="" />
            </div>
          </div>)
        })}
       {/*  <div className="post">
          <img src={image1.src} alt="" />
        </div>
        <div className="post">a</div>
        <div className="post">a</div>
        <div className="post">a</div>
        <div className="post">a</div>  */}
        
      </div>
    </section>
  );
};

export default Posts;
