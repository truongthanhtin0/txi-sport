import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import "./style.css";

function Captcha({setIsVerified}) {
  return (
    <div className="check__recaptcha">
      <ReCAPTCHA
        sitekey="6LddrBEeAAAAAOwxG2BirDcrAMF3UWd4L9PdwiMq"
        onChange={() => setIsVerified(true)}
      />
      {/* https://www.google.com/recaptcha/admin/site/504474717/setup */}
    </div>
  );
}

export default Captcha;
