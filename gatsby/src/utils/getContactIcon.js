import React from "react";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";

export default function GetContactIcon(contactType, props) {
  switch (contactType) {
    case "phone":
      return <PhoneRoundedIcon {...props} />;
    case "facebook":
      return <FacebookRoundedIcon {...props} />;
    case "location":
      return <LocationOnRoundedIcon {...props} />;
    case "email":
      return <EmailRoundedIcon {...props} />;
    case "instagram":
      return <></>;
    default:
      return <AlternateEmailRoundedIcon {...props} />;
  }
}
