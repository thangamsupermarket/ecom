import React from "react";

const ContactUs = () => {
  const onFormSubmission = () => {
        Email.send({
          Host: "smtp.gmail.com",
          Username: "sender@email_address.com",
          Password: "Enter your password",
          To: 'livingstone.it@gmail.com',
          From: "livingstone.it@gmail.com",
          Subject: "Sending Email From DailyDevotion",
          Body: "Well that was easy!!",
        })
          .then(function (message) {
            alert("mail sent successfully")
          });
  };
  return (
    <div>
         <script src=
    "https://smtpjs.com/v3/smtp.js">
  </script>
      <h2 className="text-center m-1 p-1">Contact Us</h2>
      <div className="container w-50">
        <div className="row">
          <div className="column d-flex justify-content-center">
            <p className="m-1 p-1 text-sm-start">
              Feel free to reach out to us. We are more than happy to respond to
              your mails.
            </p>
          </div>
        </div>
        <form className="m-1 p-3 min-vw-50 rounded border border-success border-1">
          <div className="row">
            <div className="column mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
            </div>
          </div>
          <div className="row">
            <div className="column mb-3">
              <input
                type="email"
                className="form-control min-vw-50 p-2"
                id="emailInput"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
          </div>
          <div className="row">
            <div className="column mb-3">
             &nbsp;
            </div>
          </div>
          <div className="row">
            <div className="column mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                What You Would Like to Tell Us
              </label>
            </div>
          </div>

          <div className="row">
            <div className="column mb-3">
              <textarea
                type="text"
                cols="100"
                className="form-control min-vw-50 p-2"
                id="textAreaContactUs"
                aria-describedby="messageHelp"
              />
            </div>
          </div>

          <div className="row w-50">
            <div className="column mb-3">
              <button
                onClick={onFormSubmission}
                type="button"
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
