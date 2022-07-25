import { Input } from "@material-ui/core";
import React, { useContext, useEffect, useState, useRef } from "react";
import { UiContext } from "../../context/UiContext";

const EditableElement = (props) => {
  const { onChange } = props;
  const element = useRef();

  let elements = React.Children.toArray(props.children);
  if (elements.length > 1) {
    throw Error("Can't have more than one child");
  }
  const onMouseUp = () => {
    const value = element.current?.value || element.current?.innerText;
    onChange(value);
  };
  useEffect(() => {
    const value = element.current?.value || element.current?.innerText;
    onChange(value);
  }, []);
  elements = React.cloneElement(elements[0], {
    contentEditable: true,
    suppressContentEditableWarning: true,
    ref: element,
    onKeyUp: onMouseUp,
  });
  return elements;
};
function CardListItem(props) {
  const { article, myCommande, setMyCommande } = props;
  const { getIndex } = useContext(UiContext);
  console.log(myCommande,"article00")
  // function getIndex(value, arr, prop) {
  //   for (var i = 0; i < arr.length; i++) {
  //     if (arr[i][prop] === value) {
  //       return i;
  //     }
  //   }
  //   return -1;
  // }
  // var index = getIndex(article.id, myCommande, "id");

  const [index, setIndex] = useState(0);
  useEffect(() => {
    myCommande &&
      myCommande.length &&
      setIndex(getIndex(article.id, myCommande, "id"));
  }, [props]);
  useEffect(() => {
    console.log(index, "carListItemIndex");
  }, [index]);




  function removeArticle() {
    setMyCommande((prevCommande) => {
      let items = [...prevCommande];

      const indexArticle = items.findIndex((el) => el.id === article.id);

      items.splice(indexArticle, 1);
      return items;
    });
  }

  return (
    <div className="lists">
      {myCommande && article && (
        <div className="list-item" style={{display:"flex",borderBottom:"1px solid #e8e8e8",marginBottom:"margin-bottom: 2rem"}}>
          <img
            src={`https://${article.image}`}
            style={{ width: "70px", height: "70px" }}
          />
          <div className="list-item-details">  

            <div className="first-details"   >
              <div className="details-food" > 
  
                <span className="food-name"  >{article.name}</span>  
              </div>
              <i className="fal fa-trash-alt" onClick={removeArticle} />  
            </div>
            <div className="new-price" style={{fontSize:"1.8rem",color:"#ff6900"}}  >
              <span>{article.price} dt</span>  

            </div>

          </div>
        </div>
      )}
    </div>
  );
}

CardListItem.propTypes = {};

export default CardListItem;
