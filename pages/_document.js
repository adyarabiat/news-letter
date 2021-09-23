// So we add this file manually and it is like the _app
// but lets think about it as
// _app is the root div in the body but the _documant is the whole body

// Head here is diffrent than the head in the _app here we just use it here
import Document, { Html, Head, Main, NextScript } from "next/document";

// it must be a class based component
class MyDocument extends Document {
   // now we can add things like lan to the Html

   //  !now
   // why I would add this
   // so here we can add things which is outside the normal components as example for react portals for portal this element for modal and stuff like this

   //  so this extra HTML elements outside of our app tree can be usfull sometimes
   render() {
      return (
         <Html lan="en">
            <Head />
            <body>
               {/* we can add this div aswell  */}
               <div id="overlays" />
               <Main />
               <NextScript />
            </body>
         </Html>
      );
   }
}
export default MyDocument;
