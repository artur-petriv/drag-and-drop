import React from "react";
import "./App.css";

import Icon1 from "./assets/img/Podcast.png";
import Icon2 from "./assets/img/Clock.png";
import Icon3 from "./assets/img/Maps.png";
import Icon4 from "./assets/img/Phone.png";
import Icon5 from "./assets/img/Photos.png";
import Icon6 from "./assets/img/Mail.png";
import Icon7 from "./assets/img/Settings.png";

function App() {
  const [appsList, setAppsList] = React.useState([
    { id: 1, img: Icon1, order: 1 },
    { id: 2, img: Icon2, order: 2 },
    { id: 3, img: Icon3, order: 3 },
    { id: 4, img: Icon7, order: 4 },
  ]);
  const [menuList, setMenuList] = React.useState([
    { id: 5, img: Icon4, order: 1 },
    { id: 6, img: Icon5, order: 2 },
    { id: 7, img: Icon6, order: 3 },
  ]);
  const [currentItem, setCurrentItem] = React.useState(null);

  function dragStartHandler(e, item) {
    setCurrentItem(item);
  }

  function dragLeaveHandler(e) {
    e.target.style.borderColor = "transparent";
  }

  function dragEndHandler(e) {
    // e.target.style.borderColor = "initial";
  }

  function dragOverHandler(e) {
    e.preventDefault();
    e.target.style.borderColor = "rgba(255, 255, 255, .2)";
  }

  function dropHandler(e, selectedItem) {
    e.preventDefault();

    setAppsList(
      appsList.map((item) => {
        if (selectedItem.id === item.id)
          return { ...item, order: currentItem.order };

        if (currentItem.id === item.id)
          return { ...item, order: selectedItem.order };

        return item;
      })
    );
  }

  const sortCards = (a, b) => (a.order > b.order ? 1 : -1);

  return (
    <div className="App">
      <h1 className="title">Drag and Drop</h1>

      <div className="container">
        <div className="apps">
          {appsList.sort(sortCards).map((item) => (
            <div
              className="item"
              draggable
              onDragStart={(e) => dragStartHandler(e, item)} // When user took card
              onDragLeave={(e) => dragLeaveHandler(e)} // If item out of other card
              onDragEnd={(e) => dragEndHandler(e)} // When user unpress click
              onDragOver={(e) => dragOverHandler(e, item)} // When item over other object
              onDrop={(e) => dropHandler(e, item)} // When user drop item and wait for some action
              key={item.id}
            >
              <img
                src={item.img}
                alt=""
                className="img"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          ))}
        </div>

        <div className="menu">
          {menuList.map((item) => (
            <div
              className="item"
              draggable
              onDragStart={(e) => dragStartHandler(e, item)} // When user took card
              onDragLeave={(e) => dragLeaveHandler(e)} // If item out of other card
              onDragEnd={(e) => dragEndHandler(e)} // When user unpress click
              onDragOver={(e) => dragOverHandler(e)} // When item over other object
              onDrop={(e) => dropHandler(e, item)} // When user drop item and wait for some action
              key={item.id}
            >
              <img src={item.img} alt="" className="img" />
            </div>
          ))}

          <div
            className="item"
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default App;
