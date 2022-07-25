import React, {useState} from "react";
import MyStory from "./MyStory";
import StoryAvatar from "./StoryAvatar";
import Slider from "infinite-react-carousel";

import PropTypes from 'prop-types'

function PrevButton(props) {
  
  return (
     <button className={props.className} disabled={props.index === 0} onClick={props.onClick}>
       prev
     </button>
  )
}

function NextButton(props) {
return (
   <button className={props.className}  disabled={props.index === (props.stories.length / 11) - 1} onClick={props.onClick} >
     next
   </button>
)
}

function Stories(props) {
const [index, setIndex] = useState(0)
  // const {stories} = props
  const stories = [
    { name: "chouaieb", image: "https://picsum.photos/seed/picsum/200/300" },
    { name: "amir", image: "https://picsum.photos/seed/picsum/200/300" },
    { name: "momo", image: "https://picsum.photos/seed/picsum/200/300" },
    { name: "hamma", image: "https://picsum.photos/seed/picsum/200/300" },
    { name: "anissa", image: "https://picsum.photos/seed/picsum/200/300" },
    { name: "chouaieb", image: "https://picsum.photos/seed/picsum/100/300" },
    { name: "chouaieb", image: "https://picsum.photos/seed/picsum/100/300" },
    { name: "chouaieb", image: "https://picsum.photos/seed/picsum/100/300" },
    { name: "chouaieb", image: "https://picsum.photos/seed/picsum/100/300" },
    { name: "chouaieb", image: "https://picsum.photos/seed/picsum/100/300" },
    { name: "chouaieb", image: "https://picsum.photos/seed/picsum/100/300" },
    { name: "chouaieb", image: "https://picsum.photos/seed/picsum/100/300" },
    { name: "chouaieb", image: "https://picsum.photos/seed/picsum/100/300" },
    { name: "chouaieb", image: "https://picsum.photos/seed/picsum/100/300" },
    { name: "chouaieb", image: "https://picsum.photos/seed/picsum/100/300" },
    { name: "chouaieb", image: "https://picsum.photos/seed/picsum/100/300" },
    { name: "chouaieb", image: "https://picsum.photos/seed/picsum/100/300" },
    { name: "chouaieb", image: "https://picsum.photos/seed/picsum/100/300" },
    { name: "chouaieb", image: "https://picsum.photos/seed/picsum/100/300" },
    { name: "chouaieb", image: "https://picsum.photos/seed/picsum/100/300" },
    { name: "chouaieb", image: "https://picsum.photos/seed/picsum/100/300" },
    { name: "chouaieb", image: "https://picsum.photos/seed/picsum/100/300" },
    { name: "chouaieb", image: "https://picsum.photos/seed/picsum/100/300" },
    { name: "chouaieb", image: "https://picsum.photos/seed/picsum/100/300" },
  ];
  const aiecaramba = stories.map((el) => (
    <StoryAvatar name={el.name} image={el.image} />
  ));
 
 function bc(oldIndex,newIndex){
   console.log(newIndex)
  setIndex(newIndex) 
 }
  const settings = {
    rows:1,
    slidesPerRow: 10,
    duration: 100,
    shift: 0,
    // arrowsScroll : 0.5,
    // centerMode :true,
    prevArrow: <PrevButton index={index} />,
    nextArrow: <NextButton index={index} stories={stories}/>,
    beforeChange : bc, 
    initialSlide : 0
  };
  
  const carouselStyle = {
  //  width: '95%',
   
  }
  

  return (
    <div>
      <div style={carouselStyle}>
        <Slider {...settings}  >
          <MyStory   />
          {aiecaramba}
        </Slider>
      </div>
    
    </div>
  );
}

export default Stories;
