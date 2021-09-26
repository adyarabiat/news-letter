import { useRef } from "react";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
   const emailInput = useRef(null);

   function registrationHandler(event) {
      event.preventDefault();
      // fetch user input (state or refs)
      // optional: validate input
      // send valid data to API
      const enteredEmail = emailInput.current.value;
      const reqBody = { email: enteredEmail };
      console.log(enteredEmail);

      fetch("/api/emails", {
         method: "POST",
         body: JSON.stringify(reqBody),
         headers: {
            "Content-Type": "application/json",
         },
      })
         .then((response) => response.json())
         .then((data) => console.log(data));
   }

   return (
      <section className={classes.newsletter}>
         <h2>Sign up to stay updated!</h2>
         <form onSubmit={registrationHandler}>
            <div className={classes.control}>
               <input
                  ref={emailInput}
                  type="email"
                  id="email"
                  placeholder="Your email"
                  aria-label="Your email"
               />
               <button>Register</button>
            </div>
         </form>
      </section>
   );
}

export default NewsletterRegistration;
