import React, { useState, useEffect } from "react";
// import menuLinksData from "./data/menu_links.json";

const Header = () => {
  const [menuLinksData, setMenuLinksData] = useState([]);

  const loadMenuLinksData = async () => {
    // Query the API Gateway
    const base_url = import.meta.env.VITE_BASE_URL;
    const response = await fetch(`${base_url}/Production/menu_links`);

    // Assign response data to the state variable
    let data = await response.json();
    setMenuLinksData(data);
  };

  useEffect(() => {
    //Loads the menu Links data from the AWS API Gateway
    loadMenuLinksData();
  }, []);

  return (
    <header id="intro">
      <article className="fullheight">
        <div className="hgroup">
          <h1>Landon Hotel</h1>
          <h2>West London</h2>
          <p>
            <a href="#welcome">
              <img
                src="https://landonhotel.com/images/misc/arrow.png"
                alt="down arrow"
              />
            </a>
          </p>
        </div>
      </article>

      <nav id="nav">
        <div className="navbar">
          <div className="brand">
            <a href="#welcome">
              Landon <span>Hotel</span>
            </a>
          </div>
          <ul>
            {menuLinksData.map((menulink) => (
              <li key={menulink.href}>
                <a className={`icon ${menulink.class}`} href={menulink.href}>
                  <span>{menulink.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
