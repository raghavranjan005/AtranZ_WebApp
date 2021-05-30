import React from 'react';
import { BrowserRouter} from 'react-router-dom';


function AboutScreen() {
  
  return (
        <BrowserRouter>
        <div className="row center large">
            <h1 className="large"> About Us</h1>
        </div>
        <div className="row-about">
        <div className="col-2 leftpad">
        <img src="/Atranz-bag.png" className="Bag" align="left"/>
        
        <div className="about-us col-3">
                <p className="C">AtranZ presents to you women's apparel at your very own doorsteps.</p><p> Our online wardrobe collection, ranging from top quality sarees to elegant looking suits with a wide<br></br> variety of line up handpicked from the finest weavers all over India.</p><p> We at AtranZ are immensely inspired by traditional Indian clothing and are working hard to spread <br></br>and trend traditional clothing with a modern approach.</p><p> With quality products at a reasonable price, we tend to resonate with what the customers really want. </p><p>Choose your desired dress, and we will deliver it to your doorsteps before your big function.</p><p> So what are you waiting for, <strong>Shop Today!!!</strong></p>
        </div>
        <br clear="left" /><br clear="top"/>

        </div>


        </div>
        </BrowserRouter>
  );
}
export default AboutScreen